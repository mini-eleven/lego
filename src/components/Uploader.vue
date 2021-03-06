<template>
    <div class="file-upload">
        <div class="upload-area" :class="{ 'is-dragover': drag && isDragOver }" v-on="events">
            <slot v-if="isUploading" name="loading">
                <button disabled>正在上传</button>
            </slot>
            <slot name="uploaded" v-else-if="lastFileData && lastFileData.loaded" :uploadedData="lastFileData.data">
                <button>点击上传</button>
            </slot>
            <slot v-else name="default">
                <button>点击上传</button>
            </slot>
            <span v-if="isUploading">正在上传</span>
            <span v-else>点击上传</span>
        </div>
        <input ref="fileInput" type="file" :style="{ display: 'none' }" @change="handleFileChange" />
        <ul>
            <li :class="`uploaded-file upload-${file.status}`" v-for="file in uploadedFiles" :key="file.uid">
                <span class="filename">{{ file.name }}</span>
                <button class="delete-icon" @click="removeFile(file.uid)">Del</button>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, reactive, ref } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { last } from 'lodash-es'
import axios from 'axios'
type UploadStatus = 'ready' | 'loading' | 'success' | 'error'
type CheckUpload = (file: File) => boolean | Promise<File>
export interface UploadFile {
    uid: string
    size: number
    name: string
    status: UploadStatus
    raw: File
    resp?: any
}
export default defineComponent({
    props: {
        action: {
            type: String,
            required: true
        },
        beforeUpload: {
            type: Function as PropType<CheckUpload>
        },
        drag: {
            type: Boolean,
            default: false
        }
    },
    setup(props) {
        const fileInput = ref<null | HTMLInputElement>(null)
        const uploadedFiles = ref<UploadFile[]>([])
        const isDragOver = ref(false)
        const isUploading = computed(() => {
            return uploadedFiles.value.some(x => x.status == 'loading')
        })
        const lastFileData = computed(() => {
            const lastFile = last(uploadedFiles.value)
            if (lastFile) {
                return {
                    loaded: lastFile.status == 'success',
                    data: lastFile.resp
                }
            }
            return false
        })
        const removeFile = (id: string) => {
            uploadedFiles.value = uploadedFiles.value.filter(x => x.uid != id)
        }
        const triggerUpload = () => {
            if (fileInput.value) {
                fileInput.value.click()
            }
        }
        const postFile = (uploadedFile: File) => {
            const formData = new FormData()
            formData.append(uploadedFile.name, uploadedFile)
            const fileObj = reactive<UploadFile>({
                uid: uuidv4(),
                name: uploadedFile.name,
                size: uploadedFile.size,
                status: 'loading',
                raw: uploadedFile
            })
            uploadedFiles.value.push(fileObj)
            axios.post(props.action, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(resp => {
                fileObj.status = 'success'
                fileObj.resp = resp.data
            }).catch(err => {
                fileObj.status = 'error'
            }).finally(() => {
                if (fileInput.value) {
                    fileInput.value.value = ''
                }
            })
        }

        const uplodFiles = (files: FileList | null) => {
            if (files) {
                const uploadedFile = files[0]
                if (props.beforeUpload) {
                    const result = props.beforeUpload(uploadedFile)
                    if (result && result instanceof Promise) {
                        result.then(processedFile => {
                            if (processedFile instanceof File) {
                                postFile(processedFile)
                            } else {
                                throw new Error('beforeUpload Promise should return File Object')
                            }
                        }).catch(e => {
                            console.error(e)
                        })
                    } else if (result) {
                        postFile(uploadedFile)
                    }
                } else {
                    postFile(uploadedFile)
                }
            }
        }

        let events: { [key: string]: ((e: any) => void) } = {
            'click': triggerUpload,
        }
        const a = events.click

        const handleFileChange = (e: Event) => {
            const target = e.target as HTMLInputElement
            const files = target.files
            uplodFiles(files)
        }

        const handleDrag = (e: DragEvent, over: boolean) => {
            // 取消默认行为
            e.preventDefault()
            isDragOver.value = over
        }

        const handleDrop = (e: DragEvent) => {
            e.preventDefault()
            isDragOver.value = false
            if (e.dataTransfer) {
                uplodFiles(e.dataTransfer.files)
            }
        }

        if (props.drag) {
            events = {
                ...events,
                'dragover': (e: DragEvent) => { handleDrag(e, true) },
                'dragleave': (e: DragEvent) => { handleDrag(e, false) },
                'drop': handleDrop
            }
        }

        return {
            fileInput,
            isUploading,
            triggerUpload,
            handleFileChange,
            uploadedFiles,
            removeFile,
            lastFileData,
            isDragOver,
            events
        }
    }
})
</script>

<style>
.upload-loading {
    color: yellow
}

.upload-success {
    color: green
}

.upload-error {
    color: red
}

.file-upload .upload-area {
    background: #efefef;
    border: 1px dashed #ccc;
    border-radius: 4px;
    cursor: pointer;
    padding: 20px;
    width: 360px;
    height: 180px;
    text-align: center;

}
</style>
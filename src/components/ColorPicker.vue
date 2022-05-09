<template>
    <div class="color-picker">
        <div class="native-color-container">
            <input type="color" :value="value" @input="onChange($event.target?.value)" />
        </div>
        <ul class="picked-color-list">
            <li v-for="(item, key) in colors" :key="key" :class="`item-${key}`" @click.prevent="onChange(item)">
                <div :style="{ backgroundColor: item }" class="color-item" v-if="item.startsWith('#')"></div>
                <div v-else class="color-item transparent-back"></div>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
const defaultColors = ['#ffffff', '#f5222d', '#fa541c', '#fadb14', '#52c41a', '#1890ff', '#722ed1', '#8c8c8c', '#000000', '']
export default defineComponent({
    props: {
        value: {
            type: String
        },
        colors: {
            type: Array as PropType<string[]>,
            default: defaultColors
        }
    },
    emits: ['change'],
    setup(props, context) {
        const onChange = (color: string) => {
            context.emit('change', color)
        }
        return {
            onChange
        }
    }
})
</script>

<style>
.color-picker {
    display: flex;
}

.picked-color-list {
    display: flex;
    justify-content: space-between;
    width: 60%;
    flex-wrap: wrap;
}

.picked-color-list li {
    flex: 1;
    width: 20%;
    min-width: 20%;
    max-width: 20%;
}

.color-item {
    padding: 3px;
    width: 20px;
    height: 20px;
    border-radius: 3px;
    margin-right: 5px;
    cursor: pointer;
    border: 1px solid #ccc;
}
</style>
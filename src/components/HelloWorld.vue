<template>
    <h1>{{ msg }}</h1>
    <button @click="setCount">{{ count }}</button>
    <input type="text" v-model="todo" />
    <button class="addTodo" @click="addTodo">add</button>
    <button class="loadUser" @click="loadUser">load</button>
    <p v-if="user.loading" class="loading">Loading</p>
    <div v-else class="userName">{{ user.data && user.data.username }}</div>
    <p v-if="user.error" class="error">Error!</p>
    <ul>
        <li v-for="(todo, index) in todos" :key="index">{{ todo }}</li>
    </ul>
    <hello msg="123"></hello>
</template>

<script lang="ts">
import user from '@/store/modules/user'
import { defineComponent, reactive, ref } from 'vue'
import axios from 'axios'
import Hello from './Hello.vue'
export default defineComponent({
    name: 'HelloWorld',
    components: {
        Hello
    },
    props: {
        msg: String
    },
    emits: ['send'],
    setup(props, context) {
        const count = ref(1)
        const todo = ref('')
        const todos = ref([])
        const user = reactive({
            data: null as any,
            loading: false,
            error: false
        })
        const setCount = () => {
            count.value++
        }
        const addTodo = () => {
            if (todo.value) {
                todos.value.push(todo.value)
                context.emit('send', todo.value)
            }
        }
        const loadUser = () => {
            user.loading = true
            axios.get('https://jsonplaceholder.typicode.com/users/1').then(resp => {
                console.log(resp)
                user.data = resp.data
            }).catch(() => {
                user.error = true
            }).finally(() => {
                user.loading = false
            })
        }
        return {
            count,
            user,
            setCount,
            addTodo,
            loadUser,
            todo,
            todos
        }
    }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
    margin: 40px 0 0;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline-block;
    margin: 0 10px;
}

a {
    color: #42b983;
}
</style>

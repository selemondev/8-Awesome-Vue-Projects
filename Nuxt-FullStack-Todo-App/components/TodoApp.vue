<script setup lang="ts">
const todo = ref("");
const isCompleted = ref(false);
const completed = ref(true);
const todoStore = useTodoStore();
const todos = ref([]);
const loading = ref(false);
const todosLoading = ref(false);
useAsyncData(() => todoStore.getAllTodos(), { initialCache: false });
watchEffect(() => {
    todos.value = todoStore.todos;
    loading.value = todoStore.stateLoading;
    todosLoading.value = todoStore.todosLoading;
})
const handleAddTodo = async () => {
    await todoStore.createTodo(todo.value, isCompleted.value);
    setTimeout(() => {
        todo.value = "";
    }, 1000)
};

const handleDeleteTodo = async (id: string) => {
    await todoStore.deleteTodo(id)
};

const handleUpdateTodo = async (id: string) => {
    await todoStore.updateTodo(id, completed.value);
}
</script>
<template>
    <div class="grid-layout space-y-6">
        <div class="mt-20">
            <h1 class="text-2xl md:text-4xl">Todo List</h1>
        </div>

        <div class="flex-center space-x-3">
            <input type="text" v-model="todo"
                class="py-2 text-black px-2 w-48 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 md:py-3 md:w-96">
            <button @click="handleAddTodo()"
                class="py-2 px-4 bg-white text-black rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 hover:ring-2 hover:ring-green-500 transition duration-200 ease-in md:py-3">
                <span v-if="loading" class="grid-layout">
                    <Loader/>
                </span>

                <span v-else>
                    Add
                </span>
            </button>
        </div>
        <div>
            <div v-if="todos.length === 0">
                <p class="text-gray-400 text-xl md:text-2xl">You have no todos</p>
            </div>
            <div>
                <TransitionGroup name="fade" tag="ul">
                    <li v-for="{ task, _id, complete } in todos" :key="_id"
                        class="px-2 flex-between w-64 h-12 mb-2 bg-white rounded-md flex-center md:h-14 md:w-96">
                        <div class="flex-center space-x-2">
                            <input type="checkbox" :checked="complete" class="accent-green-600"
                                @change="handleUpdateTodo(_id)" />
                            <p :class="[complete ? 'line-through text-black font-bold' : 'text-black font-bold']">{{
                            task }}</p>
                        </div>

                        <div class="cursor-pointer">
                            <Icon @click="handleDeleteTodo(_id)" name="bi:trash-fill" class="text-red-500" />
                        </div>
                    </li>
                </TransitionGroup>
            </div>
        </div>
    </div>
</template>

<style scoped>
.fade-move,
.fade-enter-active,
.fade-leave-active {
    transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: scaleY(0.01) translate(30px, 0);
}

.fade-leave-active {
    position: absolute;
}
</style>
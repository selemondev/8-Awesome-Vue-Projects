<script setup lang="ts">
import { collection, getFirestore, query, onSnapshot, updateDoc, doc, deleteDoc } from "firebase/firestore";
import TrashIcon from "./Icons/TrashIcon.vue";
const todo = ref("");
const completed = ref(false);
const handleAddTodo = async () => {
    if (!todo.value) return;
    await addTodo(todo.value, completed.value);
    setTimeout(() => {
        todo.value = "";
    }, 1000);
};

const todos = ref([]);

watchEffect(() => {
    const db = getFirestore();
    const q = query(collection(db, "todos"));
    const unsub = onSnapshot(q, querySnapshot => {
        let todosArray = [];
        querySnapshot.forEach(doc => {
            todosArray.push({ ...doc.data(), id: doc.id })
        });
        todos.value = todosArray;
    });
    return () => unsub();
});

const handleCompleted = async (task: any) => {
    const db = getFirestore();
    await updateDoc(doc(db, "todos", task.id), {
        completed: !task.completed
    })
};

const handleDelete = async (task: any) => {
    const db = getFirestore();
    await deleteDoc(doc(db, "todos", task.id))
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
                class="py-2 px-6 bg-white text-black rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 hover:ring-2 hover:ring-green-500 transition duration-200 ease-in md:py-3">Add</button>
        </div>
        <div v-if="todos.length === 0">
            <p class="text-gray-400 text-xl md:text-2xl">You have no todos</p>
        </div>
        <div>
            <TransitionGroup name="fade" tag="ul">
                <li v-for="task in todos" :key="task.id"
                    class="px-2 flex-between w-64 h-12 mb-2 bg-white rounded-md flex-center md:h-14 md:w-96">
                    <div class="flex-center space-x-2">
                        <input type="checkbox" :checked="task.completed" class="accent-green-600"
                            @change="handleCompleted(task)" />
                        <p :class="[task.completed ? 'line-through text-black' : 'text-black font-bold']">{{ task.todo
                        }}</p>
                    </div>

                    <div class="cursor-pointer">
                        <TrashIcon @click="handleDelete(task)" />
                    </div>
                </li>
            </TransitionGroup>
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
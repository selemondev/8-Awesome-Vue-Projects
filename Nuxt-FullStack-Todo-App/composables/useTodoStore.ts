import { defineStore } from "pinia";
import { TodoInterface } from "~~/Types/todo.interface";
import useToast from "./useToast";
export const useTodoStore = defineStore({
    id: "todoStore",
    state: () => ({
        todos: [] as TodoInterface[]
    }),

    actions: {
        // get all the todos from the db
        async getAllTodos() {
            try {
                const data = await $fetch<TodoInterface[]>("/api/todos");
                this.todos = data;
                return data as TodoInterface[]
            } catch (err) {
                useToast().error(err.message)
            }
        },
        
        async createTodo(task:string) {
            try {
                await $fetch("/api/todos/create", {
                    method: "POST",
                    body: { task }
                });

                await this.getAllTodos();
                useToast().success("Todo created successfully")
            } catch (err) {
                useToast().error(err.message)
            }
        }
    }

})
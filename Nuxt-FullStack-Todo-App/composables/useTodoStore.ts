import { defineStore } from "pinia";
import { TodoInterface } from "~~/Types/todo.interface";
import useToast from "./useToast";
export const useTodoStore = defineStore({
    id: "todoStore",
    state: () => ({
        todos: [] as TodoInterface[],
        stateLoading: false,
        todosLoading: false,
    }),

    actions: {
        // get all the todos from the db
        async getAllTodos() {
            try {
                this.todosLoading = true;
                const data = await $fetch<TodoInterface[]>("/api/todos");
                this.todos = data;
                this.todosLoading = false;
                return data as TodoInterface[]
            } catch (err) {
                useToast().error(err.message)
            }
        },

        async createTodo(task: string, complete: boolean) {
            try {
                this.stateLoading = true;
                await $fetch("/api/todos/create", {
                    method: "POST",
                    body: { task, complete }
                });

                await this.getAllTodos();
                this.stateLoading = false;
                useToast().success("Todo created successfully")
            } catch (err) {
                useToast().error(err.message)
            }
        },

        async updateTodo(id: string, complete: boolean) {
            try {
                await $fetch(`/api/todos/${id}`, {
                    method: "PUT",
                    body: { complete }
                });
                await this.getAllTodos();
                useToast().success("Todo successfully updated");
            } catch (err) {
                useToast().error(err.message)
            }
        },

        async deleteTodo(id: string) {
            try {
                await $fetch(`/api/todos/${id}`, {
                    method: "DELETE",
                    body: { id }
                });
                await this.getAllTodos();
                useToast().success("Todo successfully deleted")
            } catch (err) {
                useToast().error(err.message)
            }
        },
    }

})
import TodoModel from "~~/server/models/Todo.model";

export default defineEventHandler(async (event) => {
    // return all the todos from the db
    return await TodoModel.find().sort({"createdAt": -1});
})
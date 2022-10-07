import TodoModel from "~~/server/models/Todo.model";
export default defineEventHandler(async (event) => {
    const body = await useBody(event)
    const id = event.context.params.id;
    try {
        await TodoModel.findByIdAndUpdate(id, body);
        return {
            message: "Todo successfully updated"
        }
    } catch (err) {
        throw createError({
            message: err.message
        })
    }
});

import TodoModel from "~~/server/models/Todo.model";

export default defineEventHandler(async (event) => {
    const id = event.context.params.id;

    try {
        await TodoModel.findByIdAndDelete(id);
        return {
            message: "Todo successfully deleted"
        }
    } catch (err) {
        throw createError({
            message: err.message
        })
    }
});

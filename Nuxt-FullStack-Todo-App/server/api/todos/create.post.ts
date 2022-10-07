import { TodoSchema } from "~~/server/validation";
import TodoModel from "~~/server/models/Todo.model";

export default defineEventHandler(async (event) => {
    // get data from body
    const body = await useBody(event);

    // validate the data gotten from the body
    let { error } = TodoSchema.validate(body);

    if (error) {
        throw createError({
            message: error.message,
            statusCode: 400,
            fatal: false

        })
    };

    try {
        await TodoModel.create(body);

        return {
            message: "Todo created"
        }
    } catch (err) {
        throw createError({
            message: error.message
        })
    }

})
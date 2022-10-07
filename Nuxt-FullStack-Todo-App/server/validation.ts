import Joi from "joi";

// Todo validation
export const TodoSchema = Joi.object({
    task: Joi.string().min(3).required(),
    complete: Joi.bool()
});
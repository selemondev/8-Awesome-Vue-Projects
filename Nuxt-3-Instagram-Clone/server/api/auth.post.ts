export default defineEventHandler(async (event) => {
    // @ts-ignore
    const { user } = await useBody(event);
    // @ts-ignore
    event = user;

    return { updated: true }
})
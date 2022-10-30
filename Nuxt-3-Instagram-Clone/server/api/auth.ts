export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { user } = await useBody(body);
    // @ts-ignore
    req.user = user;

    return { updated: true }
})
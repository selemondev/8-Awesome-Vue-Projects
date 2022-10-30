export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    // @ts-ignore
    const userCookie = useCookie(body, "userCookie");
    //@ts-ignore
    req.user = userCookie;
});
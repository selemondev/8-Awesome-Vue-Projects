export default defineEventHandler((event) => {
    //@ts-ignore
    const userCookie = useCookie(event, "userCookie");
    //@ts-ignore
    event = userCookie;
})
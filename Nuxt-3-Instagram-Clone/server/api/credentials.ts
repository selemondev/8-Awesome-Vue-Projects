export default defineEventHandler((event) => {
    const user = event;
    return user ? user : "User is signed out";
})
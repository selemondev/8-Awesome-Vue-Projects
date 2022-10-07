export default defineNuxtPlugin(() => {
    addRouteMiddleware('auth', () => {
        const { $auth } = useNuxtApp()
        if (!$auth?.currentUser?.uid) {
            return navigateTo("/")
        }
    })
})
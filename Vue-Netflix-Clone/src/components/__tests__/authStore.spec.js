import { createPinia, setActivePinia } from "pinia";
import { useAuthStore } from "../../stores/authStore";

// Here we are testing the authStore and making sure that before any logic is executed, the store is empty.
describe("Test authStore", () => { 
    beforeEach(() => {
        setActivePinia(createPinia());
    });
    test("The authStore state properties should all be empty", () => {
        const authStore = useAuthStore();
        expect(authStore.userData).toBe(null)
        expect(authStore.registerErrorMsg).toBe("")
        expect(authStore.registerLoading).toBe(false)
        expect(authStore.loginErrorMsg).toBe("")
        expect(authStore.loginLoading).toBe(false)
        expect(authStore.logOutErrorMsg).toBe("")
        expect(authStore.logOutLoading).toBe(false)
    })
})
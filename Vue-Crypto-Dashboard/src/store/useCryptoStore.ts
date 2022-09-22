import { defineStore , acceptHMRUpdate } from "pinia";

export const useCrypto = defineStore({
    id: "crypto",
    state: () => ({
        
    }),

    getters: {

    },

    actions: {

    }
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useCrypto, import.meta.hot))
}
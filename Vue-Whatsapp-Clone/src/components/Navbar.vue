<script setup>
import Logo from "../assets/whatsapp-logo.png";
import { useDark, useToggle } from '@vueuse/core';
import { SunIcon, MoonIcon } from "@heroicons/vue/24/outline";
import { useAuthStore } from "../store/authStore";
import { ref, watchEffect } from "vue";
const authStore = useAuthStore();
const token = ref("");
watchEffect(() => {
    token.value = authStore.userData;
});
const isDark = useDark();
const toggleDark = useToggle(isDark);
</script>
    <template>
    <div>
        <header>
            <nav class="w-full h-14 flex-between p-2 border-b border-gray-200 dark:border-b dark:border-gray-700">
                <div>
                    <img :src="Logo" alt="Logo" class="w-10 h-10">
                </div>

                <div v-if="!token">
                    <router-link to="/">
                    <button class="navbar-btn">
                    Login
                    </button>
                    </router-link>
                </div>

                <div v-else>
                    <SunIcon v-if="isDark" class="w-6 h-6 dark:text-white cursor-pointer" @click="toggleDark()"/>
                    <MoonIcon v-else class="w-6 h-6 cursor-pointer" @click="toggleDark()"/>
                </div>
            </nav>
        </header>
    </div>
</template>
<script setup>
import Logo from "../assets/whatsapp-logo.png";
import { SunIcon, MoonIcon } from "@heroicons/vue/24/outline";
import { useAuthStore } from "../store/authStore";
import { ref, watchEffect } from "vue";
const authStore = useAuthStore();
const token = ref("");
watchEffect(() => {
    token.value = authStore.userData;
})
</script>
    <template>
    <div>
        <header>
            <nav class="w-full h-14 flex-between p-2 border-b border-gray-200">
                <div>
                    <img :src="Logo" alt="Logo" class="w-10 h-10">
                </div>

                <div v-if="!token">
                    <button class="navbar-btn">
                        <router-link to="/">Login</router-link>
                    </button>
                </div>

                <div v-else>
                    <SunIcon class="w-6 h-6" />
                </div>
            </nav>
        </header>
    </div>
</template>
<script setup>
import Logo from "../assets/whatsapp-logo.png";
import { useAuthStore } from "../store/authStore";
import { ref, watchEffect } from "vue";
const authStore = useAuthStore();
const token = ref("");
watchEffect(() => {
    token.value = authStore.userData;
});
</script>
    <template>
    <div>
        <header>
            <nav class="w-full h-14 flex-between p-2 border-b border-gray-700">
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
            </nav>
        </header>
    </div>
</template>
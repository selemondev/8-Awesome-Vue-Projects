<script setup>
import Placeholder from "../assets/Placeholder.png";
import Sidebar from "../components/Sidebar.vue";
import ChatHeader from "../components/ChatHeader.vue";
import MessageInput from "../components/MessageInput.vue";
import MessageContainer from "../components/MessageContainer.vue";
import { SunIcon, MoonIcon } from "@heroicons/vue/24/outline";
import { EllipsisVerticalIcon, MagnifyingGlassIcon } from "@heroicons/vue/24/solid";
import { db, auth } from "../firebaseConfig";
import {
    collection,
    query,
    where,
    onSnapshot,
    orderBy,
    doc,
    getDoc,
    updateDoc,
} from "firebase/firestore";
import { watchEffect, ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../store/authStore";
const authStore = useAuthStore()
const router = useRouter();
const currentUser = auth.currentUser.uid;
const users = ref([]);
const user = ref([]);
const search = ref("");
const selectedUser = ref("")
const messagesContainer = ref([]);
const contactContainer = ref([]);
watchEffect(() => {
    const userReference = collection(db, "users");
    const q = query(userReference, where("uid", "not-in", [currentUser]));
    const unsub = onSnapshot(q, querySnapshot => {
        let userContacts = [];
        querySnapshot.forEach(doc => {
            userContacts.push({ ...doc.data(), id: doc.id })
        });
        users.value = userContacts;
    });
    return () => unsub();
});

watchEffect(() => {
    getDoc(doc(db, "users", currentUser)).then((docSnap) => {
        if (docSnap.exists()) {
            user.value.push(docSnap.data());
        }
    })
});

const selectUser = async (userId, username, avatar, contact) => {
    contactContainer.value = contact;
    selectedUser.value = contactContainer.value.uid;
    // all the conversation between the currentUser and the selectedUser will be stored in this id
    const id = currentUser > selectedUser.value ? `${currentUser + selectedUser.value}` : `${selectedUser.value + currentUser}`;
    const messagesReference = collection(db, "messages", id, "chat");
    const q = query(messagesReference, orderBy("createdAt", "asc"));
    onSnapshot(q, querySnapshot => {
        let messages = [];
        querySnapshot.forEach((doc) => {
            messages.push({ ...doc.data(), id: doc.id });
        });
        messagesContainer.value = messages;
    });

    // we get the last messages between the currentUser and the selectedUser
    const docSnap = await getDoc(doc(db, "lastMessage", id));
    // if the last message is not from the currentUser the unread will be false
    if (docSnap.data() && docSnap.data().from !== currentUser) {
        // update last message document and set unread to false
        await updateDoc(doc(db, "lastMessage", id), {
            unread: false
        });
    }
}

const handleLogOut = () => {
    authStore.logOut();
    router.push("/")
}
</script>
<template>
    <!-- component -->
    <div>
        <div class="container mx-auto">
            <div class="h-screen">
                <div class="flex border border-grey rounded shadow-lg h-full">

                    <!-- Left -->
                    <div class="w-1/3 border flex flex-col">

                        <!-- Header -->
                        <div class="py-2 px-3 bg-grey-lighter flex flex-row justify-between items-center">
                            <div class="" v-for="profile in user">
                                <img class="w-10 h-10 rounded-full"
                                    :src="[profile.avatar ? profile.avatar : Placeholder]" />
                            </div>

                            <div class="flex-center space-x-2">
                                <div>
                                    <SunIcon class="w-6 h-6" @click="handleLogOut()" />
                                </div>
                                <div class="hidden lg:flex">
                                    <EllipsisVerticalIcon class="w-6 h-6" />
                                </div>
                            </div>
                        </div>

                        <!-- Search -->

                        <form>
                            <label for="default-search"
                                class="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
                            <div class="relative ml-2 hidden lg:block">
                                <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                    <MagnifyingGlassIcon class="w-6 h-6 text-gray-400" />
                                </div>
                                <input type="search" id="default-search" v-model="search"
                                    class="appearance-none block py-2 px-2 pl-10 w-80 rounded-full text-sm text-gray-900 bg-gray-100 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-green-400 xl:w-96"
                                    placeholder="Search or start new chat" required>

                            </div>
                        </form>


                        <!-- Contacts -->
                        <div class="bg-grey-lighter flex-1 overflow-auto" v-for="contact in users">
                            <Sidebar :currentUserId="currentUser" :contact=contact :userId="contact.uid"
                                :avatar="contact.avatar" :username="contact.username" @changeChat="selectUser" />
                        </div>

                    </div>


                    <!-- Right -->
                    <div v-if="contactContainer.uid" class="w-2/3 border flex flex-col">
                        <!-- Header -->
                        <div class="py-2 px-3 bg-grey-lighter flex flex-row justify-between items-center">
                            <ChatHeader :chatUsername="contactContainer.username" :chatAvatar="contactContainer.avatar"
                                :chatTimestamp="contactContainer.createdAt" :chatOnline="contactContainer.online" />
                            <div class="flex-center space-x-2">
                                <div>
                                    <MagnifyingGlassIcon class="w-5 h-5" />
                                </div>
                                <div>
                                    <EllipsisVerticalIcon class="w-6 h-6" />
                                </div>
                            </div>
                        </div>

                        <!-- Messages -->
                        <div class="flex-1 overflow-auto" style="background-color: #DAD3CC">
                            <div v-for="messages in messagesContainer">
                                <MessageContainer :messages="messages" :currentUserId="currentUser" />
                            </div>
                        </div>

                        <!-- Input -->
                        <div v-if="contactContainer.uid">
                            <MessageInput :contactId="contactContainer.uid" :currentUserId="currentUser" />
                        </div>
                    </div>

                    <div v-else class="flex justify-center items-center">
                        <p>Select a chat</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
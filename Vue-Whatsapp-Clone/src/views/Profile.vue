<script setup>
import Navbar from "../components/Navbar.vue";
import Placeholder from "../assets/Placeholder.png";
import { auth, storage, db } from "../firebaseConfig";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref as storageRef, uploadBytes } from "firebase/storage";
import { ref, reactive, watchEffect } from "vue";
import { useRouter } from "vue-router";
import { CameraIcon, PencilIcon } from "@heroicons/vue/24/outline";
const user = ref([]);
const selectedImage = ref("");
const blob = ref("");
const router = useRouter();
const loading = ref(false);
const currentUser = auth?.currentUser.uid;
watchEffect(() => {
    getDoc(doc(db, "users", currentUser)).then((docSnap) => {
        if (docSnap.exists()) {
            user.value.push(docSnap.data());
        }
    })
});

const fileUpload = () => {
    const target = event.target;
    const file = target.files[0];
    selectedImage.value = file;
    blob.value = URL.createObjectURL(file);
};

const formData = reactive({
    bio: "",
});
const handleSubmit = async () => {
    try {
        loading.value = true;
        let sentImage;
        const imageReference = storageRef(storage, `images/${new Date().getTime()} - ${selectedImage.name}`);
        const snap = await uploadBytes(imageReference, selectedImage.value);
        const downloadImageUrl = await getDownloadURL(storageRef(storage, snap.ref.fullPath));
        sentImage = downloadImageUrl
        // after uploading our image to the firebase storage, we update our users collection with our new profile image
        // we need the avatarPath so that we can be able to delete our profile image if needed
        await updateDoc(doc(db, "users", currentUser), {
            bio: formData.bio,
            avatar: sentImage,
            avatarPath: snap.ref.fullPath
        });
        loading.value = false;
        selectedImage.value = "";
        router.push("/chat")
    } catch (error) {
        console.log(error.message)
    }
};
</script>
    <template>
    <div>
        <Navbar />
        <div class="grid-center">
            <div v-for="currentUser in user" class="max-w-sm w-72 mt-6 md:w-80 md:mt-10">
                <form @submit.prevent="handleSubmit"
                    class="bg-white w-full border border-gray-200 shadow-md rounded-md py-4 px-6">
                    <div class="grid-center">
                        <h1 class="text-green-500 font-bold text-xl md:text-2xl">Set Up Your Profile</h1>
                    </div>
                    <div class='grid-center relative group mt-2'>
                        <label for="fileUpload"
                            class='opacity-0 group-hover:opacity-100 duration-300 absolute left-0 top-50 right-0 z-10 flex justify-center items-end text-xl text-black'>
                            <CameraIcon class="w-6 h-6" />
                        </label>
                        <img v-if="blob" :src="blob" alt="profile-placeholder" class='h-32 w-32 rounded-full' />
                        <img v-else :src="[currentUser.avatar ? currentUser.avatar : Placeholder]" alt="profile-placeholder"
                            class='h-32 w-32 rounded-full' />
                        <input type="file" @change="fileUpload" hidden name="fileUpload" id="fileUpload"
                            accept="image/*" />
                    </div>

                    <div class="pb-3 sm:pb-4">
                        <div class="flex-between">
                            <label for="username" class="form-label">Username</label>
                            <PencilIcon class="w-4 h-4" />
                        </div>
                        <input type="text" placeholder="Username" class="form-input" v-model="currentUser.username" />
                    </div>

                    <div class="pb-3 sm:pb-4">
                        <div class="flex-between">
                            <label for="email" class="form-label">Bio</label>
                            <PencilIcon class="w-4 h-4" />
                        </div>
                        <div v-if="!currentUser?.bio">
                            <input type="bio" placeholder="Make it interesting" class="form-input"
                                v-model="formData.bio" />
                        </div>

                        <div v-else>
                            <input type="bio" placeholder="Make it interesting" class="form-input"
                                v-model="currentUser.bio" />
                        </div>
                    </div>

                    <div>
                        <button type="submit" class="form-btn">
                            {{  loading ? "Loading...." : "Start Chat"  }}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
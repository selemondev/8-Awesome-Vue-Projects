<script setup lang="ts">
const firebaseUser = useFirebaseUser();
</script>
<template>
    <div>
        <header>
            <nav class="flex-between h-14 w-full border-b border-gray-200 dark:border dark:border-gray-800 px-4">
                <div>
                    <NuxtLink to="/">
                        <Icon name="simple-icons:instagram" class="text-3xl dark:text-gray-200" />
                    </NuxtLink>
                </div>

                <div class="hidden lg:block">
                    <input type="text" placeholder="Search" class="navbar-search">
                </div>
                <div class="flex-center space-x-3">
                    <NavbarIcons/>
                    <ProfileImageComponent/>
                    <ColorModeSwitch />
                    <button v-if="!firebaseUser" class="navbar-btn">Sign In</button>
                </div>
            </nav>
        </header>
    </div>
</template>
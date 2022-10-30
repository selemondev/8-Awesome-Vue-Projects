<template>
    <div>
        <header>
            <nav class="flex-between h-14 w-full border-b border-gray-200 px-4">
                <div>
                    <span class="hidden lg:block">
                        <Icon name="logos:instagram" class="text-[120px]" />
                    </span>
                    <span class="lg:hidden">
                        <Icon name="logos:instagram-icon" class="text-3xl" />
                    </span>
                </div>
                <div class="flex-center space-x-3">
                    <ColorModeSwitch />
                    <button class="navbar-btn">Sign In</button>
                </div>
            </nav>
        </header>
    </div>
</template>
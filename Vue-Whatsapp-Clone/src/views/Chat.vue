<script setup>
import { FaceSmileIcon, PaperClipIcon, MicrophoneIcon, SunIcon, MoonIcon } from "@heroicons/vue/24/outline";
import { EllipsisVerticalIcon, MagnifyingGlassIcon } from "@heroicons/vue/24/solid";
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
                            <div class="">
                                <img class="w-10 h-10 rounded-full" src="http://andressantibanez.com/res/avatar.png" />
                            </div>

                            <div class="flex-center space-x-2">
                                <div>
                                    <SunIcon class="w-6 h-6"/>
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
                                <input type="search" id="default-search"
                                    class="appearance-none block py-2 px-2 pl-10 w-80 rounded-full text-sm text-gray-900 bg-gray-100 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-green-400 xl:w-96"
                                    placeholder="Search or start new chat" required="">

                            </div>
                        </form>


                        <!-- Contacts -->
                        <div class="bg-grey-lighter flex-1 overflow-auto">

                            <div
                                class="space-x-3 flex-center bg-grey-light cursor-pointer my-2 hover:bg-gray-200/70 md:px-2 md:py-1">
                                <div>
                                    <img class="h-12 w-12 rounded-full m-2 lg:m-0"
                                        src="https://darrenjameseeley.files.wordpress.com/2014/09/expendables3.jpeg" />
                                </div>
                                <div class="ml-4 flex-1 py-4 md:border-b md:border-grey-lighter lg:block">
                                    <div class="flex items-bottom justify-between">
                                        <p class="hidden text-grey-darkest md:block">
                                            Stallone
                                        </p>
                                        <p class="hidden text-xs text-grey-darkest lg:block">
                                            12:45 pm
                                        </p>
                                    </div>
                                    <p class="hidden text-grey-dark mt-1 text-sm lg:block">
                                        Get Andrés on this movie ASAP!
                                    </p>
                                </div>
                            </div>

                        </div>

                    </div>


                    <!-- Right -->
                    <div class="w-2/3 border flex flex-col">

                        <!-- Header -->
                        <div class="py-2 px-3 bg-grey-lighter flex flex-row justify-between items-center">
                            <div class="flex items-center">
                                <div>
                                    <img class="w-10 h-10 rounded-full"
                                        src="https://darrenjameseeley.files.wordpress.com/2014/09/expendables3.jpeg" />
                                </div>
                                <div class="ml-4">
                                    <p class="text-grey-darkest">
                                        Stallon
                                    </p>
                                    <p class="hidden text-grey-darker text-xs mt-1 md:block">
                                        Last seen on Monday
                                    </p>
                                </div>
                            </div>

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
                            <div class="py-2 px-3">

                                <div class="flex justify-center mb-2">
                                    <div class="rounded py-2 px-4" style="background-color: #DDECF2">
                                        <p class="text-sm uppercase">
                                            February 20, 2018
                                        </p>
                                    </div>
                                </div>

                                <div class="flex justify-center mb-4">
                                    <div class="rounded py-2 px-4" style="background-color: #FCF4CB">
                                        <p class="text-xs">
                                            Messages to this chat and calls are now secured with end-to-end encryption.
                                            Tap for more info.
                                        </p>
                                    </div>
                                </div>

                                <div class="flex mb-2">
                                    <div class="rounded py-2 px-3" style="background-color: #F2F2F2">
                                        <p class="text-sm text-teal">
                                            Sylverter Stallone
                                        </p>
                                        <p class="text-sm mt-1">
                                            Hi everyone! Glad you could join! I am making a new movie.
                                        </p>
                                        <p class="text-right text-xs text-grey-dark mt-1">
                                            12:45 pm
                                        </p>
                                    </div>
                                </div>

                                <div class="flex mb-2">
                                    <div class="rounded py-2 px-3" style="background-color: #F2F2F2">
                                        <p class="text-sm text-purple">
                                            Tom Cruise
                                        </p>
                                        <p class="text-sm mt-1">
                                            Hi all! I have one question for the movie
                                        </p>
                                        <p class="text-right text-xs text-grey-dark mt-1">
                                            12:45 pm
                                        </p>
                                    </div>
                                </div>

                                <div class="flex mb-2">
                                    <div class="rounded py-2 px-3" style="background-color: #F2F2F2">
                                        <p class="text-sm text-orange">
                                            Harrison Ford
                                        </p>
                                        <p class="text-sm mt-1">
                                            Again?
                                        </p>
                                        <p class="text-right text-xs text-grey-dark mt-1">
                                            12:45 pm
                                        </p>
                                    </div>
                                </div>

                                <div class="flex mb-2">
                                    <div class="rounded py-2 px-3" style="background-color: #F2F2F2">
                                        <p class="text-sm text-orange">
                                            Russell Crowe
                                        </p>
                                        <p class="text-sm mt-1">
                                            Is Andrés coming for this one?
                                        </p>
                                        <p class="text-right text-xs text-grey-dark mt-1">
                                            12:45 pm
                                        </p>
                                    </div>
                                </div>

                                <div class="flex mb-2">
                                    <div class="rounded py-2 px-3" style="background-color: #F2F2F2">
                                        <p class="text-sm text-teal">
                                            Sylverter Stallone
                                        </p>
                                        <p class="text-sm mt-1">
                                            He is. Just invited him to join.
                                        </p>
                                        <p class="text-right text-xs text-grey-dark mt-1">
                                            12:45 pm
                                        </p>
                                    </div>
                                </div>

                                <div class="flex justify-end mb-2">
                                    <div class="rounded py-2 px-3" style="background-color: #E2F7CB">
                                        <p class="text-sm mt-1">
                                            Hi guys.
                                        </p>
                                        <p class="text-right text-xs text-grey-dark mt-1">
                                            12:45 pm
                                        </p>
                                    </div>
                                </div>

                                <div class="flex justify-end mb-2">
                                    <div class="rounded py-2 px-3" style="background-color: #E2F7CB">
                                        <p class="text-sm mt-1">
                                            Count me in
                                        </p>
                                        <p class="text-right text-xs text-grey-dark mt-1">
                                            12:45 pm
                                        </p>
                                    </div>
                                </div>

                                <div class="flex mb-2">
                                    <div class="rounded py-2 px-3" style="background-color: #F2F2F2">
                                        <p class="text-sm text-purple">
                                            Tom Cruise
                                        </p>
                                        <p class="text-sm mt-1">
                                            Get Andrés on this movie ASAP!
                                        </p>
                                        <p class="text-right text-xs text-grey-dark mt-1">
                                            12:45 pm
                                        </p>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <!-- Input -->
                        <div class="bg-grey-lighter px-4 py-4 flex items-center">
                            <div class="flex-center space-x-1 md:space-x-2">
                                <FaceSmileIcon class="w-4 h-4 md:w-6 md:h-6" />
                                <PaperClipIcon class="w-4 h-4 md:w-6 md:h-6" />
                            </div>
                            <div class="flex-1 mx-2">
                                <input class="input-style" placeholder="Type a message.." />
                            </div>
                            <div>
                                <MicrophoneIcon class="w-4 h-4 md:w-6 md:h-6" />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>
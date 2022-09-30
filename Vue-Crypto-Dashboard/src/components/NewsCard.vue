<script setup lang="ts">
import dayjs from "dayjs";
interface Props {
    name: string;
    url: string;
    description: string;
    about?: About[];
    datePublished: string;
    category?: Category;
}

interface About {
    _type: AboutType;
    readLink: string;
    name: string;
}

enum AboutType {
    Thing = "Thing",
}

enum Category {
    Business = "Business",
    ScienceAndTechnology = "ScienceAndTechnology",
}

const props = defineProps<Props>()
const formatDate = (dateString: string) => {
    const dateFormat = dayjs(dateString);
    return dateFormat.format("MMMM D, YYYY")
};
</script>
<template>
    <div>
        <div class="px-2 bg-[#4B6790]/20 rounded-md m-2 w-64 h-64 space-y-2 cursor-pointer">
            <div class="py-2 mt-1">
                <h1 class="line-clamp-2">{{ props.name }}</h1>
            </div>

            <div>
                <p class="line-clamp-4 text-gray-300">{{ props.description}}</p>
            </div>

            <div>
                <span class="text-sm text-gray-400">Published: {{ formatDate(props.datePublished)}}</span>
            </div>

            <div>
                <a :href="props.url" target="_blank">
                    <button class="py-1 px-2 border border-blue-500 rounded-md hover:border hover:border-blue-600 hover:bg-blue-600 transition duration-200 ease-in">
                        Read More
                    </button>
                </a>
            </div>
        </div>
    </div>
</template>
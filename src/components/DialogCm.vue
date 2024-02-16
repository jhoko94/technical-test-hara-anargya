<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    showDialog: {
        type: Boolean,
        default: false,
    },
    closeDialog: {
        type: Function,
        default: () => { },
    },
    selectedUser: {
        type: Object,
        default: () => { },
    },
});
</script>

<template>
    <transition name="fade">
        <div v-if="props.showDialog" class="fixed inset-0 overflow-y-auto">
            <div class="flex items-center justify-center min-h-screen">
                <div class="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div class="absolute inset-0 bg-gray-500 opacity-60"></div>
                </div>
                <div class="bg-white rounded-lg overflow-hidden shadow-xl z-10 w-[40vw] h-[50vh]">
                    <div class="grid place-items-end pt-3 pr-3">
                        <Icon class="text-xl text-[#ff0026] cursor-pointer" icon="ion:close" @click="props.closeDialog" />
                    </div>
                    <div class="flex ml-8">
                        <img :src="props.selectedUser.profile_picture" alt="Avatar" class="h-60 w-60 rounded-full mr-2">
                        <div class="pt-16 ml-5">
                            <div class="text-5xl font-semibold text-left">{{ `${props.selectedUser.first_name}
                                                            ${props.selectedUser.last_name}`
                            }}</div>
                            <div class="text-2xl font-semibold text-left">{{ props.selectedUser.email }}</div>
                            <div class="text-2xl font-semibold text-left">{{ props.selectedUser.phone }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<style scoped></style>

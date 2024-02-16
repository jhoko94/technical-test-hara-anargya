<template>
    <div class="drawer bg-white text-white w-1/5 h-full fixed top-0 left-0 overflow-y-auto text-left px-8 pt-10 shadow">
        <label class="text-3xl font-extrabold text-indigo-950">heylink.</label>
        <ul class="mt-7">
            <li v-for="(route, index) in routes" :key="index">
                <router-link :to="route.path" class="block py-2 px-4 text-black rounded-xl text-lg flex"
                    :class="{ 'hover:bg-[#e3f2fd]': true, 'bg-[#e3f2fd]': $route.path === route.path }">
                    <Icon class="text-black text-2xl mr-2" :icon="route.icon" />
                    {{ route.name }}
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import Overview from '../views/Overview.vue';
import Dashboard from '../views/Dashboard.vue';

const routes = ref([
    {
        path: '/',
        name: 'Dashboard',
        icon: 'tabler:home-stats',
        component: Dashboard
    },
    {
        path: '/overview',
        name: 'Overview',
        icon: 'lets-icons:chart-alt',
        component: Overview
    }
]);
</script>
<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import dayjs from 'dayjs';
import DialogCmp from '../components/DialogCm.vue'

const itemsCard = [
    {
        title: 'Pending',
        value: '2.480,30',
        percentChange: '2.5%',
        trendIcon: 'iconamoon:trend-up-fill',
        colorPercent: '#00b715',
    },
    {
        title: 'Paid',
        value: '84.310',
        percentChange: '1.10%',
        trendIcon: 'iconamoon:trend-down-fill',
        colorPercent: '#e80918',
    },
    {
        title: 'Rejected',
        value: '12.155',
        percentChange: '2.5%',
        trendIcon: 'iconamoon:trend-up-fill',
        colorPercent: '#00b715',
    }
];

const limit = 6;
let currentPage = 1;
let totalPages = 1;
const users = ref([]);
const loadUsers = async () => {
    try {
        const params = {
            limit: limit,
            offset: (currentPage - 1) * limit
        };
        const response = await axios.get('https://api.slingacademy.com/v1/sample-data/users', { params });
        users.value = response.data.users;
        totalPages = Math.ceil(response.data.total_users / limit);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

onMounted(() => {
    loadUsers();
});

const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
        currentPage = page;
        loadUsers();
    }
};

const formatBirthDate = (date) => {
    return dayjs(date).format('DD / MM / YYYY');
};

const showDialog = ref(false);
const selectedUser = ref(null);
const openDialog = (item) => {
    selectedUser.value = item;
    showDialog.value = true;
};
</script>

<template>
    <div class="flex flex-wrap">
        <div v-for="(item, index) in itemsCard" :key="index" class="w-1/3 py-5 px-5">
            <div class="bg-white h-32 rounded-xl shadow-lg rounded-b-none py-5 px-7">
                <div class="flex flex-row">
                    <div class="basis-11/12">
                        <label class="text-[#727272] font-bold">{{ item.title }}</label>
                    </div>
                    <div class="basis-1/12 pl-5">
                        <Icon class="text-lg text-[#727272]"
                            icon="streamline:interface-arrows-data-transfer-diagonal-arrows-arrow-server-data-diagonal-internet-transfer-network" />
                    </div>
                </div>
                <div class="mt-1">
                    <label class="font-bold text-3xl">
                        <span>{{ item.value.split(',')[0] }}</span>
                        <span v-if="item.value.split(',')[1]" class="text-[#9A9A9A]">{{ `,${item.value.split(',')[1]}`
                        }}</span>
                    </label>
                </div>
            </div>
            <div class="bg-[#f9fafc] h-14 rounded-xl shadow-lg rounded-t-none py-4 px-7 flex flex-row">
                <div class="flex w-1/2">
                    <Icon class="text-xl mr-1" :class="`text-[${item.colorPercent}]`" :icon="item.trendIcon" />
                    <span class="font-normal text-sm mr-2" :style="`color: ${item.colorPercent}`">{{ item.percentChange
                    }}</span>
                    <span class="text-[#9A9A9A] font-normal text-sm">Last Month</span>
                </div>
                <div class="w-1/2 text-right">
                    <router-link to="#" class="text-[#727272] font-bold text-sm">View More</router-link>
                </div>
            </div>
        </div>
        <div class="w-full py-5 px-5">
            <div class="bg-white h-32 rounded-xl shadow-lg rounded-b-none py-5 text-left">
                <label class="text-2xl font-bold mx-7">User List</label>

                <table class="min-w-full divide-y divide-gray-200 mt-5">
                    <thead class="bg-gray-50">
                        <tr>
                            <th scope="col" class="px-6 py-3 text-center text-sm font-medium text-gray-500 tracking-wider">
                                ID
                            </th>
                            <th scope="col" class="px-6 py-3 text-left text-sm font-medium text-gray-500 tracking-wider">
                                User
                            </th>
                            <th scope="col" class="px-6 py-3 text-center text-sm font-medium text-gray-500 tracking-wider">
                                Date
                                Of Birth
                            </th>
                            <th scope="col" class="px-6 py-3 text-left text-sm font-medium text-gray-500 tracking-wider">
                                Email
                            </th>
                            <th scope="col" class="px-6 py-3 text-left text-sm font-medium text-gray-500 tracking-wider">Job
                            </th>
                            <th scope="col" class="px-6 py-3 text-left text-sm font-medium text-gray-500 tracking-wider">
                                Country
                            </th>
                            <th scope="col" class="px-6 py-3 text-center text-sm font-medium text-gray-500 tracking-wider">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                        <tr v-for="user in users" :key="user.id">
                            <td class="px-6 py-4 whitespace-nowrap text-[#727272] text-sm text-center">{{ user.id }}</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-bold flex">
                                <img :src="user.profile_picture" alt="Avatar" class="h-8 w-8 rounded-full mr-2">
                                <span class="mt-1">{{ `${user.first_name} ${user.last_name}` }}</span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-[#727272] text-sm text-center">{{
                                formatBirthDate(user.date_of_birth) }}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-bold text-left">{{ user.email }}</td>
                            <td class="px-6 py-4 whitespace-nowrap text-[#727272] text-sm text-left">{{ user.job }}</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-bold text-left">{{ user.country }}</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-bold text-center">
                                <button
                                    class="bg-white text-black px-3 py-1 rounded-md hover:bg-[#e3f2fd] mx-1 shadow-lg">Select</button>
                                <button class="bg-white text-black px-3 py-1 rounded-md hover:bg-[#e3f2fd] mx-1 shadow-lg"
                                    @click="openDialog(user)">View
                                    Detail</button>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div class="flex justify-center mt-4">
                    <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1"
                        class="px-4 py-2 bg-gray-200 rounded-l-md hover:bg-gray-300">Previous</button>
                    <div class="flex">
                        <button v-if="currentPage > 3" @click="goToPage(currentPage - 2)"
                            class="px-4 py-2 mx-1 bg-gray-200 rounded-md hover:bg-gray-300">{{ currentPage - 2 }}</button>
                        <button v-if="currentPage > 2" @click="goToPage(currentPage - 1)"
                            class="px-4 py-2 mx-1 bg-gray-200 rounded-md hover:bg-gray-300">{{ currentPage - 1 }}</button>
                        <button @click="goToPage(currentPage)"
                            class="px-4 py-2 mx-1 bg-gray-500 text-white rounded-md hover:bg-gray-600">{{ currentPage
                            }}</button>
                        <button v-if="currentPage < totalPages - 1" @click="goToPage(currentPage + 1)"
                            class="px-4 py-2 mx-1 bg-gray-200 rounded-md hover:bg-gray-300">{{ currentPage + 1 }}</button>
                        <button v-if="currentPage < totalPages - 2" @click="goToPage(currentPage + 2)"
                            class="px-4 py-2 mx-1 bg-gray-200 rounded-md hover:bg-gray-300">{{ currentPage + 2 }}</button>
                    </div>
                    <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages"
                        class="px-4 py-2 bg-gray-200 rounded-r-md hover:bg-gray-300">Next</button>
                </div>
            </div>
        </div>
    </div>

    <DialogCmp :showDialog="showDialog" :closeDialog="() => { showDialog = false }" :selectedUser="selectedUser" />
</template>

<style scoped></style>
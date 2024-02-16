<script setup>
import { ref, computed } from 'vue';
import provinceData from '../assets/js/province.js';
import cityData from '../assets/js/city.js';

const provinces = ref(provinceData);
const selectedProvince = ref(null);
const selectedCityId = ref(null);
const sortOrder = ref('asc');

const sortedProvinces = computed(() => {
    return provinces.value.slice().sort((a, b) => {
        if (sortOrder.value === 'asc') {
            return a.id - b.id;
        } else {
            return b.id - a.id;
        }
    });
});

const cities = computed(() => {
    if (!selectedProvince.value) {
        return cityData;
    } else {
        return cityData.filter(city => city.provinsi_id === selectedProvince.value);
    }
});

const provinceName = computed(() => {
    if (!selectedCityId.value) {
        return null;
    } else {
        const city = cityData.find(city => city.id == selectedCityId.value);
        const province = provinces.value.find(province => province.id == city.provinsi_id);
        return province.name;
    }
});

</script>

<template>
    <div class="flex h-full overflow-auto">
        <div class="w-1/3">
            <h2>1. Daftar Kota Berdasarkan ID Provinsi</h2>
            <select v-model="selectedProvince">
                <option v-for="province in provinces" :key="province.id" :value="province.id">{{ province.name }}</option>
            </select>
            <ul v-if="cities.length">
                <li v-for="city in cities" :key="city.id">{{ city.name }}</li>
            </ul>
        </div>
        <div class="w-1/3">
            <h2>2. Nama Provinsi Berdasarkan ID Kota</h2>
            <input type="text" v-model="selectedCityId">
            <p v-if="provinceName">Nama Provinsi: {{ provinceName }}</p>
        </div>
        <div class="w-1/3">
            <h2>3. Urutkan Provinsi</h2>
            <select v-model="sortOrder">
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
            </select>
            <ul>
                <li v-for="province in sortedProvinces" :key="province.id">{{ province.name }}</li>
            </ul>
        </div>
    </div>
</template>

<style scoped></style>
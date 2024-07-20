<script setup>
const dataview = ref(true)
</script>
<template>
    <div>
        <div v-if="dataview" class=" md:w-1/2  apx-4 md:p-5 text-center mx-auto">
            <h1 class="text-xl p-3 font-bold">Account Activity Stats</h1>
        </div>
    </div>
</template>
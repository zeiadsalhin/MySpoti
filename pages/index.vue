<script setup>
import { getAccessToken } from '~/utils/token';
import { getUserData } from '~/utils/get-user';
onBeforeMount(() => {
    GetToken()
})
// watch token
const dataview = ref(false)
const displayname = ref();
async function GetToken() {
    try {
        const response = await getAccessToken();
        if (response) {
            dataview.value = true
            let token = await response.data
            const userData = await getUserData();
            displayname.value = userData.display_name

        } else {
            console.error('Failed to fetch token:', response);
            navigateTo('/auth')
        }
    } catch (error) {
        console.error('Error:', error);
    }
}
// useSeoMeta({
//     title: 'Alfa Store - Home',
//     ogTitle: 'Alfa Store - Home',
//     description: 'Welcome to most progressive E-commerce platform with Safest and Secured Payment in programming services',
//     ogDescription: 'Welcome to most progressive E-commerce platform with Safest and Secured Payment in programming services',
//     ogImage: 'https://alfastorecommerce.netlify.app/mainicon.ico',
//     twitterCard: 'summary_large_image',
// })
</script>
<template>
    <div v-if="dataview" class=" md:w-1/2 p-4 mx-auto">
        <h1 class="text-xl p-3 font-bold">Welcome, {{ displayname }}</h1>
    </div>
</template>

<script setup>
import { getAccessToken } from '~/utils/token';
onBeforeMount(() => {
    GetToken()
})
// watch token
const dataview = ref(false)
async function GetToken() {
    try {
        const response = await getAccessToken();
        if (response) {
            dataview.value = true
            let token = await response.data

            // console.log(response);
            // tokenExist.value = token;
            // console.log('Token VALID :' + tokenExist.value);
            // checkCurrentlyPlaying();
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
    <div v-if="dataview">

    </div>
</template>

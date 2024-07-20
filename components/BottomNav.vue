<template>
    <div>
        <v-bottom-navigation :ripple="false" permanent class="bg-transparent" min-height="auto" height="auto">
            <div class="mt-28 flex justify-center">
                <nuxt-link to="/" active-Class="text-[#1DB954] brightness-100"
                    class="mx-8 brightness-75 flex flex-col items-center ma-3">
                    <v-icon size="30">mdi-home</v-icon>
                    <p class="text-md">Home</p>
                </nuxt-link>
                <nuxt-link to="/stats" active-Class="text-[#1DB954] brightness-100"
                    class="mx-8 brightness-75  flex flex-col items-center ma-3">
                    <v-icon size="30">mdi-chart-bar</v-icon>
                    <p class="text-md">Stats</p>
                </nuxt-link>
                <nuxt-link to="/user/" active-Class="text-[#1DB954] brightness-100"
                    class="mx-8 brightness-75 flex flex-col items-center ma-3">
                    <v-icon size="30">mdi-account</v-icon>
                    <p class="text-md">Account</p>
                </nuxt-link>
            </div>
        </v-bottom-navigation>
    </div>
</template>
<style scoped>
.v-bottom-navigation {
    background: linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.011));
    /* Set linear gradient background */
}
</style>

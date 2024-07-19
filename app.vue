<template>
  <div>
    <NuxtLayout>
      <v-app>
        <Loader />
        <v-main>
          <NuxtPage />
        </v-main>
        <div class="bottom-nav1">
          <minspotify />
        </div>
        <BottomNav v-if="!$route.path.includes('/auth')" />
      </v-app>
    </NuxtLayout>
  </div>
</template>
<script setup lang="ts">
useSeoMeta({
  title: 'My Spoti',
  ogTitle: 'My Spoti',
  description: 'Welcome to My Spoti, a stats fm alternative for spotify activity',
  ogDescription: 'Welcome to My Spoti, a stats fm alternative for spotify activity',
  ogImage: 'https://alfastorecommerce.netlify.app/mainicon.ico',
  twitterCard: 'summary_large_image',
})
</script>
<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.1s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;

}

.bottom-nav1 {
  position: fixed;
  bottom: 4.2rem;
  width: 100%;
  z-index: 10;
  /* Ensure it's above other content */
}
</style>

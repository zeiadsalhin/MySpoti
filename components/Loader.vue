<template>
    <div>
        <transition name="fade">
            <div v-if="loading" class="fixed left-0 top-0 h-full w-full bg-zinc-950">
                <div class="flex justify-center items-center h-full">
                    <div class="flex flex-col items-center">
                        <div>
                            <img src="/my-spoti-white.svg" alt="MoryLogo" srcset="/my-spoti-white.svg"
                                class="w-48 animate-pulsea text-zinc-300">
                        </div>
                    </div>
                </div>

            </div>
        </transition>
    </div>
</template>

<script setup>
const loading = ref(true);
setTimeout(() => {
    // loading.value = false
}, 1500);
onNuxtReady(() => {
    loading.value = false
})
</script>
<style>
.fixed {
    z-index: 9999999;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>
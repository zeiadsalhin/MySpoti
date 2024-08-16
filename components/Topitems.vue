<script setup>
import { getAccessToken } from '~/utils/token';
const token = getAccessToken();

const fetchedTopTracks = ref()
const fetchedTopArtists = ref()
const term = ref('long_term');
const termArtists = ref('long_term');
const computedTerm = computed(() => term.value);
const computedTermArtists = computed(() => termArtists.value);

const selectTerm = ((val) => {
    term.value = val
    getUserDataTracks()
})

const selectTermArtists = ((val2) => {
    termArtists.value = val2
    getUserDataArtists()
})

const getUserDataTracks = async () => {
    const result = await fetch(`https://api.spotify.com/v1/me/top/tracks?time_range=${computedTerm.value}&limit=50`, {
        method: "GET", headers: { Authorization: `Bearer ${token}` }
    });

    if (result.ok) {
        const data = await result.json();
        // console.log('TRACKS: ' + JSON.stringify(data, null));
        fetchedTopTracks.value = data.items
        // console.log(fetchedTopTracks.value);

        return data
    } else {
        throw new Error('Failed to get user tracks');
    }
    return result

};



const mode = ref('grid')
// change display mode
const changeDisplayTracks = () => {
    const topElement = document.querySelector(".topTracks");

    // Toggle between 'flex-row' and 'flex-wrap'
    if (topElement.classList.contains('flex-row')) {
        topElement.classList.remove('flex-row');
        topElement.classList.add('flex-wrap');
        mode.value = 'row'
    } else {
        topElement.classList.remove('flex-wrap');
        topElement.classList.add('flex-row');
        mode.value = 'grid'
    }
};

/// artists
const getUserDataArtists = async () => {
    const result = await fetch(`https://api.spotify.com/v1/me/top/artists?time_range=${computedTermArtists.value}&limit=50`, {
        method: "GET", headers: { Authorization: `Bearer ${token}` }
    });

    if (result.ok) {
        const data = await result.json();
        // console.log('TRACKS: ' + JSON.stringify(data, null));
        fetchedTopArtists.value = data.items
        // console.log(fetchedTopArtists.value);

        return data
    } else {
        throw new Error('Failed to get user Artists');
    }
    return result

};



const modeArtists = ref('grid')
// change display mode
const changeDisplayArtists = () => {
    const topElement = document.querySelector(".topArtists");

    // Toggle between 'flex-row' and 'flex-wrap'
    if (topElement.classList.contains('flex-row')) {
        topElement.classList.remove('flex-row');
        topElement.classList.add('flex-wrap');

        modeArtists.value = 'row'
    } else {
        topElement.classList.remove('flex-wrap');
        topElement.classList.add('flex-row');
        modeArtists.value = 'grid'
    }
};



onMounted(() => {
    getUserDataTracks()
    getUserDataArtists()
})
</script>
<template>
    <div>
        <div class="main mb-40">
            <v-lazy>
                <div class="main">
                    <div class="title flex justify-between">
                        <h2 class="my-auto text-xl p-2 font-semibold">
                            <p class="font-black text-2xl inline-block">#1</p> Top Tracks
                        </h2>
                        <div class="flex">
                            <v-menu transition="slide-y-transition" class="pa-2">
                                <template v-slot:activator="{ props }">
                                    <v-btn v-bind="props" class="mr-5a my-auto text-subtitle-1" variant="text"
                                        icona>select
                                        period</v-btn>
                                </template>
                                <v-list>
                                    <v-list-item> <button @click="selectTerm('long_term')"
                                            class="w-full flex justify-start bg-transparent">All time
                                        </button>
                                    </v-list-item>
                                    <v-list-item> <button @click="selectTerm('medium_term')"
                                            class="w-full justify-start bg-transparent">Past 6
                                            Months</button>
                                    </v-list-item>
                                    <v-list-item> <button @click="selectTerm('short_term')"
                                            class="w-full justify-start bg-transparent">latest
                                            time </button>
                                    </v-list-item>
                                </v-list>
                            </v-menu>
                            <v-icon @click="changeDisplayTracks" size="20" class="w-fit mx-2 my-auto">{{
                                mode == 'grid' ? 'mdi-view-grid-outline' : 'mdi-menu'
                                }}</v-icon>
                        </div>
                    </div>
                    <!-- <v-transition mode="in-out"> -->
                    <div class="tracks">
                        <div class="mainTracks img p-2 mx-auto min-h-[16rem]">
                            <div
                                class="topTracks flex flex-row items-center min-h-[12rem] gap-3 mx-auto overflow-x-auto w-full whitespace-nowrap space-x-2a amd:space-x-4 mb-5">
                                <div v-for="(track, index) in fetchedTopTracks" :key="index"
                                    class="flex-none max-w-[7rem] w-[7rem] min-w-[7rem] text-righta mx-autoa backdrop-blur-3xl p-2">
                                    <nuxt-link :to="track.album.external_urls.spotify">
                                        <v-img :src="track.album.images[1].url"
                                            class="w-[7rem] min-w-[7rem] h-f[7rem] min-h-[7rem] rounded-sm" width="100%"
                                            cover alt="tracks"></v-img>
                                        <div class="flex flex-col justify-start">
                                            <p class="text-m p-1 text-sm font-semibold">{{
                                                (track.name).length > 18 ?
                                                    (track.name).slice(0, 15) + '...' : (track.name) }}</p>
                                            <p class="px-1 text-xs opacity-90">by {{ track.artists[0].name }}</p>
                                            <p class="text-sm px-2 opacity-90"></p>
                                            <p class="text-sm px-2 mt-1 mb-10 opacity-85"></p>
                                        </div>
                                    </nuxt-link>
                                </div>
                            </div>

                        </div>
                    </div>
                    <!-- </v-transition> -->
                </div>
            </v-lazy>
            <v-lazy>
                <div class="main2">
                    <div class="title flex justify-between">
                        <h2 class="my-auto text-xl p-2 font-semibold">
                            <p class="font-black text-2xl inline-block">#2</p> Top Artists
                        </h2>
                        <div class="flex">
                            <v-menu transition="slide-y-transition" class="pa-2">
                                <template v-slot:activator="{ props }">
                                    <v-btn v-bind="props" class="mr-5a my-auto text-subtitle-1" variant="text"
                                        icona>select
                                        period</v-btn>
                                </template>
                                <v-list>
                                    <v-list-item> <button @click="selectTermArtists('long_term')"
                                            class="w-full flex justify-start bg-transparent">All time
                                        </button>
                                    </v-list-item>
                                    <v-list-item> <button @click="selectTermArtists('medium_term')"
                                            class="w-full justify-start bg-transparent">Past 6
                                            Months</button>
                                    </v-list-item>
                                    <v-list-item> <button @click="selectTermArtists('short_term')"
                                            class="w-full justify-start bg-transparent">latest
                                            time </button>
                                    </v-list-item>
                                </v-list>
                            </v-menu>
                            <v-icon @click="changeDisplayArtists" size="20" class="w-fit mx-2 my-auto">{{
                                modeArtists == 'grid' ? 'mdi-view-grid-outline' : 'mdi-menu'
                                }}</v-icon>
                        </div>
                    </div>

                    <div class="artists">
                        <div class="main2 img2 p-2 mx-auto  h-[18rem]">
                            <div
                                class="topArtists flex flex-row items-center min-h-[12rem] gap-3 mx-auto overflow-x-auto w-full whitespace-nowrap space-x-2a amd:space-x-4 mb-">
                                <div v-for="(artist, index) in fetchedTopArtists" :key="index"
                                    class="flex-none max-w-[7rem] w-[7rem] min-w-[7rem] text-righta mx-autoa backdrop-blur-3xl p-2">
                                    <nuxt-link :to="artist.external_urls.spotify">
                                        <v-img :src="artist.images[0].url"
                                            class="w-[7rem] min-w-[7rem] h-[7rem] min-h-[7rem] rounded-sm" width="100%"
                                            height="100%" cover alt="artists"></v-img>
                                        <div class="flex flex-col justify-start">
                                            <p class="text-m p-1 text-sm font-semibold">{{
                                                (artist.name).length > 18 ?
                                                    (artist.name).slice(0, 15) + '...' : (artist.name) }}</p>
                                            <p class="px-1 text-xs opacity-90">{{ artist.genres[0] }}</p>
                                            <p class="text-xs font-light mt-1 px-1 opacity-90">followers {{
                                                artist.followers.total }}</p>
                                            <p class="text-sm px-1 mt-1 mb-10 opacity-85"></p>
                                        </div>
                                    </nuxt-link>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </v-lazy>
        </div>
    </div>
</template>
<style>
/* .top,
.topArtistsa::-webkit-scrollbar {
    display: none;
} */

/* Hide scrollbar for Firefox */
/* .top,
.topArtistsa {
    scrollbar-width: none;
} */
</style>
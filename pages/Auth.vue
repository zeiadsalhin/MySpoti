<script setup>
import axios from 'axios';
import { ref, watchEffect, watch, onMounted } from 'vue';
import fetchWithAuth from '~/utils/api';
import { getAccessToken } from '~/utils/token';

const tokenExist = ref(null);

// get current play
const playData = ref(null);
const playimg = ref(null);
const coverimg = ref(null);
const startTime = ref(0);
const endTime = ref(0);
const currentMilliseconds = ref(0);
const totalMilliseconds = ref(0);
const progress = ref(0);
const nextQueue = ref(null);
const currQueue = ref(null);
let playInt = null;

// // Simulate progress update (replace with your actual logic)
// watchEffect(() => {
//     const currentTotalSeconds = Math.floor(currentMilliseconds.value / 1000);
//     const totalTotalSeconds = Math.floor(totalMilliseconds.value / 1000);

//     if (totalTotalSeconds > 0) {
//         progress.value = (currentTotalSeconds / totalTotalSeconds) * 100;
//     } else {
//         progress.value = 0; // Handle division by zero or totalMilliseconds being zero
//     }
// });

// async function checkCurrentlyPlaying() {
//     try {
//         const url = 'https://api.spotify.com/v1/me/player/currently-playing';
//         const accessToken = tokenExist.value; // Replace with the access token you obtained
//         // console.log('PLAYING TOKEN : ' + tokenExist.value);
//         const response = await axios.get(url, {
//             headers: {
//                 'Authorization': `Bearer ${accessToken}`
//             }
//         });
//         if (response.status === 200 && response.data.is_playing) {
//             // calculate duration 
//             function formatMillisecondsToMinSec(currentMilliseconds, totalMilliseconds) {
//                 const currentTotalSeconds = Math.floor(currentMilliseconds / 1000);
//                 const totalTotalSeconds = Math.floor(totalMilliseconds / 1000);

//                 const currentMinutes = Math.floor(currentTotalSeconds / 60);
//                 const currentSeconds = currentTotalSeconds % 60;

//                 const totalMinutes = Math.floor(totalTotalSeconds / 60);
//                 const totalSeconds = totalTotalSeconds % 60;

//                 const currentFormatted = `${currentMinutes.toString().padStart(2, '0')}:${currentSeconds.toString().padStart(2, '0')}`;
//                 const totalFormatted = `${totalMinutes.toString().padStart(2, '0')}:${totalSeconds.toString().padStart(2, '0')}`;
//                 startTime.value = currentFormatted;
//                 endTime.value = totalFormatted;
//                 return currentFormatted + totalFormatted;
//             }

//             //// Increment progress
//             currentMilliseconds.value = response.data.progress_ms;
//             totalMilliseconds.value = response.data.item.duration_ms;

//             playimg.value = '';
//             playData.value = response.data.item;
//             const playback = formatMillisecondsToMinSec(response.data.progress_ms, response.data.item.duration_ms);
//             playimg.value = response.data.item.album.images[0].url;

//             return true;
//         } else {
//             // console.log('No track currently playing.');
//             playData.value = 'No track currently playing.';
//             playimg.value = '';
//             return false;
//         }
//     } catch (error) {
//         console.log(error.code);
//         if (!error.message == "Network Error") {
//             console.log('no internet');
//             await WatchTokenExp()
//         } else {
//             // tokenExist.value = 'sessionExpired'
//             await WatchTokenExp()
//             return false;
//         }
//         return false;
//     }
// }

// // get queue
// async function getQueue() {
//     try {
//         const url = 'https://api.spotify.com/v1/me/player/queue';
//         const accessToken = tokenExist.value; // Replace with the access token you obtained

//         const response = await axios.get(url, {
//             headers: {
//                 'Authorization': `Bearer ${accessToken}`
//             }
//         });
//         if (response.status === 200) {
//             // console.log(response.data.queue[0]);
//             nextQueue.value = { name: `${response?.data?.queue[0].name}`, artist: `${response?.data?.queue[0].artists[0].name}`, nextimg: `${response?.data?.queue[0].album.images[2].url}`, length: `${((Math.floor(response?.data?.queue[0].duration_ms / 60000)) % 60).toString().padStart(2, '0')}:${((Math.floor(response?.data?.queue[0].duration_ms / 1000)) % 60).toString().padStart(2, '0')}` };
//         }
//     } catch (error) {
//         console.log('Queue: ' + error);
//     }
// }

// // Watch for changes in playData to call changeQueue
// watch(() => playData?.value?.name, (newVal, oldVal) => {
//     if (newVal !== oldVal) {
//         getQueue();
//     }
// });

// // Watch for changes in tokenExist to update currently playing and start interval
// watch(() => tokenExist?.value, (newVal, oldVal) => {
//     if (newVal !== oldVal) {
//         if (playInt) {
//             clearInterval(playInt);
//         }
//         // checkCurrentlyPlaying();
//         console.log('player started' + tokenExist.value);
//         playInt = setInterval(async () => {
//             await checkCurrentlyPlaying();
//             if (tokenExist.value === 'sessionExpired') {
//                 clearInterval(playInt);
//                 console.log('player cleared');
//                 return false;
//             }
//         }, 3000);
//     } else {
//         console.log('no token, no player');
//     }
// });

// // cover image
// watch(() => playimg?.value, (newVal, oldVal) => {
//     if (newVal !== oldVal) {
//         // console.log('Change image');
//         coverimg.value = '';
//         setTimeout(() => {
//             coverimg.value = playimg.value;
//         }, 200);
//     }
// });

// // queue manage
// watch(() => nextQueue?.value, (newVal, oldVal) => {
//     if (newVal !== oldVal) {
//         // console.log('Change queue');
//         setTimeout(() => {
//             currQueue.value = nextQueue.value;
//         }, 200);
//     }
// });

const shouldShowCarousel = ref(true);
const ShowCarousel = () => {
    shouldShowCarousel.value = false
    setTimeout(() => {
        document.getElementById("aaa").classList.remove('translate-y-10');
        document.getElementById("aaa").classList.add('-translate-y-10');
        // Apply the Tailwind CSS class

    }, 1000);
};

// // token refresh
async function WatchTokenExp() {
    try {
        const response = await fetchWithAuth('https://api.spotify.com/v1/me');
        if (response.ok) {
            let token = await getAccessToken();
            tokenExist.value = token;
            // console.log('Token VALID :' + tokenExist.value);
            // checkCurrentlyPlaying();
        } else {
            console.error('Failed to fetch new token:', response.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}
// WatchTokenExp();

onBeforeMount(async () => {
    try {
        // Initialize tokenExist.value here, assuming it's done somewhere in your code
        // Example: tokenExist.value = await fetchToken();
        if (!tokenExist.value) {
            // tokenExist.value = await getAccessToken();
            await WatchTokenExp();
        }
    } catch (error) {
        console.error('Error during mount:', error);
    }
});

// authorize spotify user 
const router = useRouter();
const authorize = () => {
    const client_id = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
    const redirect_uri = process.env.NODE_ENV === 'production'
        ? 'https://my-spoti.netlify.app/callback'
        : 'http://localhost:3000/callback'; // Replace with your registered redirect URI

    const scope = 'user-read-playback-state user-read-currently-playing user-read-email user-read-private user-library-read user-library-modify user-top-read user-follow-read user-follow-modify playlist-read-private playlist-read-collaborative playlist-modify-public playlist-modify-private streaming app-remote-control user-modify-playback-state';

    const authUrl = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=code&redirect_uri=${encodeURIComponent(redirect_uri)}&scope=${encodeURIComponent(scope)}`;

    // Redirect user to Spotify authorization page
    navigateTo(authUrl, { external: true });
};
onMounted(() => {
    // setTimeout(() => {
    //     document.getElementById("aaa").classList.remove('translate-y-10');
    //     document.getElementById("aaa").classList.add('-translate-y-10');
    //     // Apply the Tailwind CSS class

    // }, 200);
})

const step = ref(1)
</script>
<template>
    <div>
        <!--intro-->
        <div class="flex flex-col justify-center m-auto h-screena">
            <v-carousel v-model="step" v-if="shouldShowCarousel" progress="green" height="100%"
                class="p-2 myCarousel my-auto" :continuous="false" :hide-delimiters="true" :show-arrows="false"
                hide-delimiter-background>
                <template v-slot:prev="{ props }">
                    <v-btn color="success" variant="elevated" @click="props.onClick">Previous</v-btn>
                </template>
                <template v-slot:next="{ props }">
                    <v-btn color="info" variant="elevated" @click="props.onClick">Next</v-btn>
                </template>
                <v-carousel-item :value="1">
                    <div class="h-fit mt-10">
                        <h2 class="text-4xl font-extrabold px-4 mt-4">Discover</h2>
                        <p class="text-xl font-bold px-6 py-2 mb-16 opacity-85">Your Spotify Profile Stats & Tracks
                        </p>
                        <v-lazy name="fade" mode="out-in">
                            <v-img id="aaa" src="/s1.webp" class="m-8 -rotate-2 translate-x-2 opacity-90 rounded-lg"
                                cover max-height="auto" min-height="450" height="450"></v-img>
                        </v-lazy>
                    </div>
                </v-carousel-item>
                <v-carousel-item :value="2">
                    <div class="h-fit mt-10">
                        <h2 class="text-4xl font-extrabold px-4 mt-4">Analyze</h2>
                        <p class="text-xl font-bold px-6 py-2 mb-16 opacity-85">Your listening activity</p>
                        <v-img id="aaa" src="/s2.webp" class="m-8 rotate-2 -translate-x-2 opacity-90 rounded-lg" cover
                            max-height="auto" min-height="450" height="450"></v-img>
                    </div>
                </v-carousel-item>
                <v-carousel-item :value="3">
                    <div class="h-fit mt-10">
                        <h2 class="text-4xl font-extrabold px-4 mt-4">Share</h2>
                        <p class="text-xl font-bold px-6 py-2  mb-16 opacity-85">Your Profile and playlists</p>
                        <v-img id="aaa" src="/s3.webp" class="m-8 -rotate-2 -translate-x-2 opacity-90 rounded-lg" cover
                            max-height="auto" min-height="450" height="450"></v-img>
                    </div>
                </v-carousel-item>
                <v-carousel-item :value="4">
                    <div class="w-full h-fit">
                        <div class="flex flex-col justify-center h-screen m-auto">
                            <h2 class="text-4xl text-center font-bold px-4 mt-">And more!</h2>
                            <p class="text-xl text-center font-bold px-6 py-2  mb-5 opacity-85">Waiting to be
                                discovered</p>
                            <v-btn color="green-darken-4" variant="elevated" height="50"
                                class="text-h5 w-11/12 mx-auto font-weight-medium" @click="ShowCarousel">Get
                                Started</v-btn>
                        </div>
                    </div>
                </v-carousel-item>
            </v-carousel>
            <div v-if="shouldShowCarousel" class="controls flex justify-end p-5">
                <v-btn v-if="step != 4" color="green-lighten-1" variant="tonal" width="140" height="45"
                    class="text-h6 font-weight-bold" @click="step++">Next</v-btn>
            </div>
        </div>
        <div v-if="!shouldShowCarousel">
            <v-slide-y-reverse-transition :duration="3000">
                <v-img id="aaa" src="/wallpaper.jpeg" cover max-height="auto" min-height="100" height="auto"
                    gradient="to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0)),linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.1)),linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.6)"
                    class="aaa translate-y-10 h-screen min-h-screen max-h-screen transform transition-all ease-in-out duration-1000 fade-in">
                    <div v-if="tokenExist == null" class="flex flex-col justify-center items-center h-screen w-full">
                        <div class="images flex justify-center space-x-4">
                            <v-img src="/my-spoti-white.svg" max-width="150" max-height="150" min-width="150"
                                min-height="150" class="pa-3 my-auto"></v-img>
                            <svg class="my-auto" xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="25" height="25"
                                viewBox="0 0 256 256" xml:space="preserve">
                                <!-- SVG content here -->
                            </svg>
                            <v-img src="/spotify.svg" max-width="80" max-height="80" min-width="80" min-height="80"
                                class="my-auto brightness-75 invert"></v-img>
                        </div>
                        <h1 class="text-[2rem] font-black p-3">Welcome to My Spoti !</h1>
                        <p class="text-lg text-center font-semibold mt-3 p-3">To Start the App please Connect your
                            Spotify Account
                        </p>
                        <p class="text- text-center font-semibold mt-3 mb-6">Click the button below to authorize your
                            Spotify
                            account.</p>
                        <button @click="authorize"
                            class="bg-zinc-800 p-4 font-semibold focus:ring-4 ring-green-700 focus:scale-105 text-md rounded-3xl"
                            variant="tonal" rounded="xl">Authorize Spotify</button>
                    </div>
                </v-img>
            </v-slide-y-reverse-transition>
        </div>

        <!-- <div v-if="!playData && tokenExist" class="flex justify-center items-center min-h-screen">
            <v-progress-circular color="grey-darken-1" indeterminate class="my-auto"></v-progress-circular>
        </div> -->
        <Swipe>
            <slot />
        </Swipe>
        <!-- <div v-else class="text-center">{{ playData }}</div> -->
    </div>
</template>
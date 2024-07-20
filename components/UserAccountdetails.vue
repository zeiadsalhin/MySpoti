<script setup>
import { useTheme } from 'vuetify'
const theme = useTheme();
import axios from 'axios';
import { getUserData } from '~/utils/get-user';
import { useMainStore } from '@/store';
const mainStore = useMainStore();
// const supabase = useSupabaseClient()
// const user = useSupabaseUser()
const dataview = ref()
const avatar = ref()
const displayname = ref()
const userID = ref()
const isDisabledp = ref(true);
const profileURL = ref()
const isDisablede = ref(true);
const followers = ref(null);
const country = ref(null);
const signin = ref()
const auth = ref()
onBeforeMount(() => {
    FetchUserData()
})
//fetch user data
async function FetchUserData() {
    try {
        const userData = await getUserData();
        // console.log(userData);
        dataview.value = true
        avatar.value = userData.images[0]
        displayname.value = userData.display_name
        userID.value = userData.id
        profileURL.value = userData.external_urls.spotify
        followers.value = userData.followers.total
    } catch (error) {
        console.log(error);
    }
}

async function LogOut() {
    try {
        (() => {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            return Promise.resolve();
        })().then(() => {
            navigateTo("/auth");
        });

    } catch (error) {
        console.log(error)
    }
}

// Copy
const copied = ref(false);
const copyToClipboard = () => {
    const textToCopy = userID.value;
    navigator.clipboard.writeText(textToCopy)
    copied.value = true
}

</script>
<template>
    <div>
        <div v-if="dataview" class=" md:w-1/2  apx-4 md:p-5 text-center mx-auto">
            <h1 class="text-xl p-3 font-bold">Account And Privacy</h1>

            <div class="welcome flex w-full h-fit space-x-3 p-2">
                <div class="w-1.5 h-10 bg-zinc-950 rounded-sm"></div>
                <p class="font-semibold text-xl text-left my-auto">Logged in as {{ displayname }}
                </p>
                <div class="icon p-"><v-img v-if="avatar" :src="avatar" width="50"
                        class="mx-auto rounded-full min-h-[3.1rem] outline outline-2 outline-green-600"></v-img>
                    <v-icon v-else size="40" class="opacity-80">mdi-account-outline</v-icon>
                </div>
            </div>
            <div class="welcome flex flex-col w-fit h-fit  ml-7  space-x-3">
                <p class="font-semibold text-lg text-left my-auto">Username:
                </p>
                <p class="max-w-fit text-left my-auto opacity-80">@{{ userID }}<v-icon @click="copyToClipboard"
                        size="19" class="mx-2">{{ copied ? 'mdi-check' : 'mdi-content-copy' }}</v-icon></p>
            </div>
            <div class="welcome flex flex-col w-fit h-fit  ml-7 mt-7 space-x-3">
                <p class="font-semibold text-lg text-left my-auto">Spotify URL:
                    <a :href="profileURL" class="max-w-fit p-1 text-left my-auto opacity-80"><v-btn
                            variant="tonal">Visit</v-btn></a>
                </p>

            </div>
            <div class="welcome flex flex-col justify-center p-10">
                <p class="text-2xl font-bold">{{ followers }}</p>
                <p>Followers</p>
            </div>
            <div class="bg-zinc-800 w-1/3 mx-auto h-0.5 mt-10 mb-5"></div>
            <v-btn @click="LogOut" min-height="40" min-width="100" :elevation="0" class="m-5"
                color="red-darken-3"><v-icon class="mx-1">mdi-link-variant-off</v-icon>Disconnect Spotify</v-btn>
        </div>
    </div>
</template>
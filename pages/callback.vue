<template>
    <div>
        <!-- <h1>Authorization Callback</h1> -->
        <!-- <p>Handling Spotify authorization...</p> -->
    </div>
</template>

<script setup>
import axios from 'axios';
// const { $encodeBase64 } = useNuxtApp()
import { Buffer } from 'buffer'

const route = useRoute();
const router = useRouter();
const client_id = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const client_secret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
const redirect_uri = process.env.NODE_ENV === 'production'
    ? 'https://alfastorecommerce.netlify.app/callback'
    : 'http://localhost:3000/callback'; // Replace process.env.NODE_ENV === 'production' 

const auth_token = Buffer.from(`${client_id}:${client_secret}`, 'utf-8').toString('base64');

onMounted(async () => {
    const code = route.query.code;

    try {
        //make post request to SPOTIFY API for access token, sending relavent info
        const token_url = 'https://accounts.spotify.com/api/token';
        // const data = qs.stringify({ 'grant_type': 'client_credentials' });

        const response = await axios.post(token_url, {
            code: code,
            redirect_uri: redirect_uri,
            grant_type: 'authorization_code'
        }, {
            headers: {
                'Authorization': `Basic ${auth_token}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        //return access token
        // return response.data.access_token;
        console.log(response.data);
        localStorage.setItem('access_token', response.data.access_token);
        localStorage.setItem('refresh_token', response.data.refresh_token);
        const expiresIn = response.data.expires_in;
        const expiryTimestamp = Date.now() + expiresIn * 1000;
        localStorage.setItem('expiryTimestamp', expiryTimestamp);
        navigateTo('/')
    } catch (error) {
        //on fail, log the error in console
        console.log(error);
        navigateTo('/')
    }
}
);
</script>
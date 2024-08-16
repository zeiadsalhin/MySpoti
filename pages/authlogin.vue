<template>
    <div>
        <h1>Authorization Callback</h1>
        <p>Handling Spotify authorization...</p>
    </div>
</template>

<script setup>
import axios from 'axios';
import { Buffer } from 'buffer'

const route = useRoute();
const router = useRouter();
const client_id = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const client_secret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
const redirect_uri = 'http://localhost:3000/callback'; // Replace with your registered redirect URI
const scope = 'user-read-playback-state user-read-currently-playing user-read-email user-read-private user-library-read user-library-modify user-top-read user-follow-read user-follow-modify playlist-read-private playlist-read-collaborative playlist-modify-public playlist-modify-private streaming app-remote-control user-modify-playback-state';
// const auth_token = Buffer.from(`${client_id}:${client_secret}`, 'utf-8').toString('base64');
const code = route.query.code;
const handleAuthorization = () => {
    const state = generateRandomString(16); // Function to generate a random state string

    const authorizationUrl = `https://accounts.spotify.com/authorize?` +
        `response_type=code` +
        `&client_id=${client_id}` +
        `&scope=${encodeURIComponent(scope)}` +
        `&redirect_uri=${encodeURIComponent(redirect_uri)}` +
        `&state=${state}`

    // Redirect the user to the Spotify authorization URL
    navigateTo(authorizationUrl, { external: true });
    return
};
onMounted(() => {
    handleAuthorization()
})
</script>
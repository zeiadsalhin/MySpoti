export const getAccessToken = () => localStorage.getItem('access_token');
export const getRefreshToken = () => localStorage.getItem('refresh_token');
const setAccessTokenTry = (state) => localStorage.setItem('Token_Refresh', 'TRUE x2');
export const setAccessToken = (token) => localStorage.setItem('access_token', token);
export const setRefreshToken = (token) => localStorage.setItem('refresh_token', token);

export const refreshAccessToken = async () => {
    const refreshToken = getRefreshToken();
    const url = "https://accounts.spotify.com/api/token";

    const payload = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
            client_id: import.meta.env.VITE_SPOTIFY_CLIENT_ID, // Use environment variables for sensitive data
            client_secret: import.meta.env.VITE_SPOTIFY_CLIENT_SECRET, // Use environment variables for sensitive data
        }),
    };

    const response = await fetch(url, payload);
    const data = await response.json();

    if (response.ok) {
        setAccessToken(data.access_token);
        setAccessTokenTry()
        if (data.refresh_token) {
            setRefreshToken(data.refresh_token);
        }
        return data.access_token;
    } else {
        throw new Error('Failed to refresh access token');
    }
};
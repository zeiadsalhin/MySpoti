import { getAccessToken } from './token';

export const getUserData = async () => {
    const token = getAccessToken();
    const result = await fetch("https://api.spotify.com/v1/me", {
        method: "GET", headers: { Authorization: `Bearer ${token}` }
    });

    if (result.ok) {
        return await result.json();
    } else {
        throw new Error('Failed to get user');
    }
    return result

};
export default getUserData;
const authEndpoint = 'https://accounts.spotify.com/authorize';
const redirectUri = 'http://localhost:3000/login';
const clientID = '6c7ab0edccb94006b37134f2c90789d1';
const clientSecret = '617244b22cca41b994814569109a586d';
const scopes = [
    'user-read-currently-playing',
    'user-read-recently-played',
    'user-read-playback-state',
    'user-top-read',
    'user-modify-playback-state',
];

export const loginUrl = `${authEndpoint}?client_id=${clientID}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`;

export const getTokenFromUrl = () => {        
    const urlParams = new URLSearchParams(window.location.hash)    
    return urlParams.get('#access_token')
};
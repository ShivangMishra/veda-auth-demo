import axios from "axios";
import { Buffer } from 'buffer/';
const config = {
    clientId: '',
    vedaAuthBaseUrl: '',
    superClientId: '',
    clientSecret: '',
    underMaintenance: false,
}

const axiosInstance = axios.create({
    baseURL: config.vedaAuthBaseUrl,
    withCredentials: false,
    headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json'
    }
});

const getClientSecret = async (clientId) => {
    const {data: {custos_client_secret}} = await axiosInstance.get(
        `/identity-management/credentials`,
        {
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`
            },
            params: {
                'client_id': clientId
            }
        }
    );
    return custos_client_secret;
}

const getClientAuthBase64 = async (clientId = null, clientSec = null) => {
    if (clientId === null && clientSec === null) {
        clientId = config.clientId;
        clientSec = config.clientSecret;
    } else if (clientId !== null && clientSec === null) {
        clientSec = await getClientSecret(clientId);
    }

    let clientAuthBase64 = `${clientId}:${clientSec}`;
    clientAuthBase64 = Buffer.from(clientAuthBase64).toString('base64');
    clientAuthBase64 = `Bearer ${clientAuthBase64}`
    return clientAuthBase64;
}

const fetchAuthorizationEndpoint = async () => {
    const openIdConfigEndpoint = "/identity-management/.well-known/openid-configuration";
    const redirectUri = "http://localhost:5173/";
    const {data: {authorization_endpoint}} = await axiosInstance.get(openIdConfigEndpoint,
        {params: {'client_id': config.clientId,}});
    window.location.href = `${authorization_endpoint}?response_type=code&client_id=${config.clientId}&redirect_uri=${redirectUri}&scope=openid&kc_idp_hint=oidc`;
}

const fetchToken = async ({code}) => {
    const clientAuthBase64 = await getClientAuthBase64(); // You need to implement this function

    const {data} = await axiosInstance.post("/identity-management/token", {
            code: code,
            redirect_uri: window.location.origin,
            grant_type: 'authorization_code'
    }, {
        headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json',
            'Authorization': clientAuthBase64
        }
    });
    return data;
}

export {fetchAuthorizationEndpoint, fetchToken}
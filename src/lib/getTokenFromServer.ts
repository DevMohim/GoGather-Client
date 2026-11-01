import { auth } from "./auth";

export const getTokenFromServer = async() => {
    const jwtToken = await auth.api.getToken();
    const token = jwtToken?.token;
    return token
}
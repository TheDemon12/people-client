import http from 'services/http';
import config from 'config';

interface LoginTypes {
	email: string;
	password: string;
}

interface SignupTypes {
	name: string;
	email: string;
	password: string;
}

interface verifyOTPTypes {
	email: string;
	otp: string;
}

export const LOGIN_GOOGLE_API_URL = `${config.API_URL}/register/google`;

export async function signup({ name, email, password }: SignupTypes) {
	const signupAPI = `${config.API_URL}/register`;

	const response = await http.post(
		signupAPI,
		{ name, email, password },
		{ withCredentials: true }
	);

	return response;
}

export async function verifyOTP({ email, otp }: verifyOTPTypes) {
	const verifyOTPAPI = `${config.API_URL}/verify-otp`;

	const response = await http.post(
		verifyOTPAPI,
		{ email, otp },
		{ withCredentials: true }
	);

	return response;
}

export async function login({ email, password }: LoginTypes) {
	const loginAPI = `${config.API_URL}/login`;

	const response = await http.post(
		loginAPI,
		{ email, password },
		{ withCredentials: true }
	);

	return response;
}

export async function logout() {
	const logoutAPI = `${config.API_URL}/logout`;

	const response = await http.get(logoutAPI, { withCredentials: true });

	return response;
}

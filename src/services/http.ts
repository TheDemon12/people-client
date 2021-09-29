import axios from 'axios';

interface ResponseError {
	response: {
		status: number;
	};
}

// Internal Server Errors
axios.interceptors.response.use(undefined, (error: ResponseError) => {
	const expectedError =
		error.response &&
		error.response.status >= 400 &&
		error.response.status < 500;

	if (!expectedError) {
		console.log('error is', error);
	}

	return Promise.reject(error);
});

export default axios;

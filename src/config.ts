const config = {
	BASE_URL: process.env.BASE_URL || 'http://localhost',
	API_PORT: process.env.PEOPLE_API_PORT || 5000,
	get API_URL() {
		return process.env.PEOPLE_API || `${this.BASE_URL}:${this.API_PORT}/api`;
	},
};

export default config;

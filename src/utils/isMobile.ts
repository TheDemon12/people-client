let isMobile = false;

if (process.browser) {
	isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
}

export { isMobile };

import { useEffect } from 'react';
import Router from 'next/router';
import NProgress from 'nprogress';

import styles from './styles.module.scss';

NProgress.configure({
	template: `
    <div class=${styles.progressContainer}>
      <div class=${styles.bar} role="bar">
        <div class=${styles.peg}></div>
      </div>
      <div class=${styles.spinner} role="spinner">
        <div class=${styles.spinnerIcon}></div>
      </div>
    </div>`,
});

export default function useProgressBar() {
	useEffect(() => {
		Router.events.on('routeChangeStart', () => NProgress.start());
		Router.events.on('routeChangeComplete', () => NProgress.done());
		Router.events.on('routeChangeError', () => NProgress.done());

		return () => {
			Router.events.off('routeChangeStart', () => NProgress.start());
			Router.events.off('routeChangeComplete', () => NProgress.done());
			Router.events.off('routeChangeError', () => NProgress.done());
		};
	});
}

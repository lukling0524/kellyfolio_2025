import { fileURLToPath } from 'url';

export default defineNuxtConfig({
	ssr: true,
	experimental: { appManifest: false },
	compatibilityDate: '2024-11-01',
	devtools: { enabled: true },
	alias: {
		'@': fileURLToPath(new URL('./', import.meta.url)),
		'@css': fileURLToPath(new URL('./assets/scss', import.meta.url)),
	},
	css: ['@css/style.scss'],
	vite: {
		build: {
			cssMinify: true,
		},
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: '@use "@css/abstracts" as *;',
				},
			},
		},
	},
	modules: ['@nuxt/image'],
	plugins: ['@/plugins/gsap.client.js'],
	nitro: {
		compressPublicAssets: true,
	},
	image: {
		format: ['webp', 'avif', 'png'],
		screens: {
			sm: 500,
			md: 768,
			lg: 1100,
			xl: 1400,
		},
	},
});

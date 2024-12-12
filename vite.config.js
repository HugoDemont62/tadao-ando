import { defineConfig } from 'vite'
import injectHTML from 'vite-plugin-html-inject'

export default defineConfig({
	plugins: [injectHTML()],
	root: 'src',
	build: {
		outDir: '../dist',
		rollupOptions: {
			input: {
				main: 'pages/home.html',
				projects: 'pages/projects.html',
			},
		},
	},
	server: {
		open: '/pages/home.html', // This will open home.html when you run the dev server
	},
	css: {
		preprocessorOptions: {
			scss: {
				api: 'modern',
			},
		},
	},
})
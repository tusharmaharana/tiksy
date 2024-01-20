import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgrPlugin from 'vite-plugin-svgr';
import checker from 'vite-plugin-checker';

// https://vitejs.dev/config/
export default defineConfig({
	// This changes the output dir from dist to build
	build: {
		outDir: 'build',
		minify: 'esbuild',
		sourcemap: false,
		chunkSizeWarningLimit: 1024,
		rollupOptions: {
			cache: false,
		},
	},
	plugins: [
		react(),
		svgrPlugin({
			svgrOptions: {
				icon: true,
			},
		}),
		checker({
			typescript: true,
		}),
	],
	server: {
		port: 3000,
	},
	preview: {
		port: 3000,
	},
});

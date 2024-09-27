import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [react()],
	server: {
		open: true,
	},
	build: {
		rollupOptions: {
			output: {
				manualChunks(id) {
					if (id.includes('node_modules')) {
						return id.split('node_modules/')[1].split('/')[0]; // Crea un chunk per ogni pacchetto
					}
					if (id.includes('src/components')) {
						return 'components'; // Tutti i componenti in un chunk separato
					}
					if (id.includes('src/pages')) {
						return 'pages'; // Tutte le pagine in un chunk separato
					}
				},
			},
		},
		chunkSizeWarningLimit: 600,
	},
});

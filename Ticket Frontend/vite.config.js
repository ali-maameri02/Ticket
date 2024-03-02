import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build',
},
// define: {
//     'import.meta.env.VITE_HOST': JSON.stringify(process.env.VITE_HOST),
//   },
})

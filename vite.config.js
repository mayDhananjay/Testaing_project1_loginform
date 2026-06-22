import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['beige-mails-press.loca.lt', 'solid-doodles-walk.loca.lt'],
  },
})

import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

export default defineConfig({
  base: "/chef/",   // ✅ MOST IMPORTANT FIX
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
})
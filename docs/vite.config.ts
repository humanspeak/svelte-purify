import { sentrySvelteKit } from '@sentry/sveltekit/vite'
import adapter from '@sveltejs/adapter-cloudflare'
import { sveltekit } from '@sveltejs/kit/vite'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import tailwindcss from '@tailwindcss/vite'
import { mdsvex } from 'mdsvex'
import { defineConfig } from 'vitest/config'

export default defineConfig({
    plugins: [
        tailwindcss(),
        sentrySvelteKit({
            org: 'humanspeak',
            project: 'markdown-svelte-page',
            telemetry: false
        }),
        sveltekit({
            // Consult https://svelte.dev/docs/kit/integrations
            // for more information about preprocessors
            preprocess: [vitePreprocess(), mdsvex()],
            extensions: ['.svelte', '.svx'],
            // adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
            // If your environment is not supported, or you settled on a specific environment, switch out the adapter.
            // See https://svelte.dev/docs/kit/adapters for more information about adapters.
            adapter: adapter(),
            csp: {
                mode: 'hash',
                directives: {
                    'default-src': ['self'],
                    'script-src': [
                        'self',
                        'https://kit.fontawesome.com',
                        'https://*.ingest.us.sentry.io',
                        'https://*.ahrefs.com',
                        'https://t.svelte.page',
                        'unsafe-inline'
                    ],
                    'style-src': ['self', 'unsafe-inline', 'https://kit.fontawesome.com'],
                    'img-src': ['self', 'data:', 'https:'],
                    'font-src': [
                        'self',
                        'data:',
                        'https://kit.fontawesome.com',
                        'https://ka-p.fontawesome.com'
                    ],
                    'worker-src': ['self', 'blob:'],
                    'connect-src': ['self', 'https:'],
                    'frame-ancestors': ['none'],
                    'form-action': ['self'],
                    'base-uri': ['self'],
                    'upgrade-insecure-requests': true
                }
            }
        })
    ],

    test: {
        include: ['src/**/*.{test,spec}.{js,ts}']
    }
})

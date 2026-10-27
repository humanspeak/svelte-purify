import { defineEnvVars } from '@sveltejs/kit/env'

// Read at runtime from the Cloudflare environment (wrangler.jsonc `vars` / dashboard
// variables and secrets). Missing values fall back to '' so the hooks skip init,
// except PUBLIC_ENVIRONMENT, which defaults to 'local' as it did under Kit 2.
export const variables = defineEnvVars({
    PUBLIC_SENTRY_DSN: { public: true, schema: (input) => input ?? '' },
    PUBLIC_ENVIRONMENT: { public: true, schema: (input) => input || 'local' },
    PUBLIC_POSTHOG_PROJECT_TOKEN: { public: true, schema: (input) => input ?? '' },
    PUBLIC_POSTHOG_HOST: { public: true, schema: (input) => input ?? '' }
})

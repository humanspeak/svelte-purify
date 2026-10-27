import {
    PUBLIC_ENVIRONMENT,
    PUBLIC_POSTHOG_HOST,
    PUBLIC_POSTHOG_PROJECT_TOKEN,
    PUBLIC_SENTRY_DSN
} from '$app/env/public'
import * as Sentry from '@sentry/sveltekit'
import { handleErrorWithSentry, replayIntegration } from '@sentry/sveltekit'
import type { HandleClientError } from '@sveltejs/kit/hooks'
import posthog from 'posthog-js'

Sentry.init({
    dsn: PUBLIC_SENTRY_DSN,
    environment: PUBLIC_ENVIRONMENT,

    tracesSampleRate: 1.0,

    // This sets the sample rate to be 10%. You may want this to be 100% while
    // in development and sample at a lower rate in production
    replaysSessionSampleRate: 0.01,

    // If the entire session is not sampled, use the below sample rate to sample
    // sessions when an error occurs.
    replaysOnErrorSampleRate: 1.0,

    // If you don't want to use Session Replay, just remove the line below:
    integrations: [replayIntegration()]
})

export async function init() {
    if (!PUBLIC_POSTHOG_PROJECT_TOKEN || !PUBLIC_POSTHOG_HOST) {
        return
    }

    posthog.init(PUBLIC_POSTHOG_PROJECT_TOKEN, {
        ['api_host']: PUBLIC_POSTHOG_HOST,
        ['ui_host']: 'https://us.posthog.com',
        defaults: '2026-01-30',
        ['capture_exceptions']: true
    })
}

// Kit 3 routes expected errors (404s, `error()` calls) through this hook too;
// only report genuinely unexpected ones, as Kit 2 did. Returning nothing keeps
// SvelteKit's default status and message.
const posthogHandleError: HandleClientError = ({ kind, error }) => {
    if (kind === 'unknown') posthog.captureException(error)
}

// Sentry wraps the PostHog handler so both receive client errors
// (handleErrorWithSentry v11 likewise only reports kind === 'unknown')
export const handleError = handleErrorWithSentry(posthogHandleError)

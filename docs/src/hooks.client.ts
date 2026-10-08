import { env } from '$env/dynamic/public'
import * as Sentry from '@sentry/sveltekit'
import { handleErrorWithSentry, replayIntegration } from '@sentry/sveltekit'
import type { HandleClientError } from '@sveltejs/kit'
import posthog from 'posthog-js'

Sentry.init({
    dsn: env.PUBLIC_SENTRY_DSN,
    environment: env.PUBLIC_ENVIRONMENT ?? 'local',

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
    if (!env.PUBLIC_POSTHOG_PROJECT_TOKEN || !env.PUBLIC_POSTHOG_HOST) {
        return
    }

    posthog.init(env.PUBLIC_POSTHOG_PROJECT_TOKEN, {
        ['api_host']: env.PUBLIC_POSTHOG_HOST,
        ['ui_host']: 'https://us.posthog.com',
        defaults: '2026-01-30',
        ['capture_exceptions']: true
    })
}

const posthogHandleError: HandleClientError = async ({ error, status, message }) => {
    posthog.captureException(error)

    return {
        message,
        status
    }
}

// Sentry wraps the PostHog handler so both receive client errors
export const handleError = handleErrorWithSentry(posthogHandleError)

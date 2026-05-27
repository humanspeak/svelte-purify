<script lang="ts">
    import '../app.css'
    import { ModeWatcher } from 'mode-watcher'
    import { page } from '$app/state'

    const { children } = $props()
    const imageLocation = `${page.url.origin}/`
</script>

<svelte:head>
    <title>Svelte Purify · Safe HTML rendering for Svelte 5 powered by DOMPurify</title>
    <meta
        name="description"
        content="Safe HTML rendering for Svelte powered by DOMPurify. SSR-ready, browser-only entry, and edge-friendly options. XSS protection with a tiny, runes-friendly Svelte 5 wrapper."
    />

    <!-- Open Graph / Social Media -->
    <meta property="og:title" content="Svelte Purify · Safe HTML rendering powered by DOMPurify" />
    <meta
        property="og:description"
        content="A tiny, friendly HTML sanitizer for Svelte 5. Strips scripts, unsafe URLs, and sneaky attributes via DOMPurify — SSR-ready, edge-friendly, full TypeScript."
    />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://purify.svelte.page" />
    <meta property="og:image" content="{imageLocation}svelte-purify-opengraph.png" />

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Svelte Purify · Safe HTML for Svelte 5" />
    <meta
        name="twitter:description"
        content="DOMPurify-powered HTML sanitization for Svelte 5. SSR-ready, edge-friendly, XSS-safe, and runes-friendly."
    />
    <meta name="twitter:image" content="{imageLocation}svelte-purify-twitter.png" />

    <!-- Keywords -->
    <meta
        name="keywords"
        content="svelte, sveltekit, dompurify, sanitize, sanitization, xss, security, html, safe-html, render, renderer, ssr, edge, svelte5, svelte-component, svelte-library"
    />

    <!-- Additional Meta -->
    <meta name="author" content="Humanspeak, Inc." />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="https://purify.svelte.page" />

    <!-- JSON-LD structured data -->
    <script type="application/ld+json">
        {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Svelte Purify",
            "applicationCategory": "DeveloperApplication",
            "operatingSystem": "Any",
            "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
            },
            "author": {
                "@type": "Organization",
                "name": "Humanspeak, Inc.",
                "url": "https://humanspeak.com"
            },
            "programmingLanguage": ["Svelte", "TypeScript"],
            "description": "Safe HTML rendering for Svelte 5 powered by DOMPurify. SSR-ready by default with a browser-only entry, edge-friendly options, and full TypeScript support.",
            "license": "MIT",
            "url": "https://purify.svelte.page",
            "downloadUrl": "https://www.npmjs.com/package/@humanspeak/svelte-purify",
            "requirements": "Svelte 5.0 or higher",
            "releaseNotes": "https://github.com/humanspeak/svelte-purify/releases",
            "keywords": "svelte, dompurify, sanitize, xss, security, safe-html"
        }
    </script>
</svelte:head>
<ModeWatcher />

{@render children?.()}

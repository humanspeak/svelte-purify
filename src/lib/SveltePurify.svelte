<script lang="ts">
    import { BrowserDOMPurify } from '$lib/helpers/browser.svelte'
    import type { Config } from 'dompurify'
    import { onMount, type Snippet } from 'svelte'

    type Props = {
        html: string
        options?: Config
        maxLength?: number
        preHtml?: Snippet<[number]>
        postHtml?: Snippet<[number]>
    }
    let {
        html,
        options = undefined,
        maxLength = undefined,
        preHtml = undefined,
        postHtml = undefined
    }: Props = $props()

    const sanitize = $derived(new BrowserDOMPurify(html, options))
    const truncatedHtml = $derived(maxLength ? sanitize.html.slice(0, maxLength) : sanitize.html)
    let mounted = $state(false)

    onMount(() => {
        mounted = true
    })
</script>

{#if mounted}
    {@render preHtml?.(sanitize.html.length)}
    <!-- trunk-ignore(eslint/svelte/no-at-html-tags) -->
    {@html truncatedHtml}
    {@render postHtml?.(sanitize.html.length)}
{/if}

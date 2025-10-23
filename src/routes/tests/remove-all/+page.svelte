<script lang="ts">
    import { SveltePurify } from '$lib/index.js'

    const html = ` <span style="color: hotpink">♥</span>`
</script>

<div data-testid="sanitized-html">
    <SveltePurify {html} options={{ ALLOWED_TAGS: [] }} />
</div>

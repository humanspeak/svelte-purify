# @humanspeak/svelte-purify

A tiny, friendly sanitizer for Svelte that keeps your HTML shiny and safe using DOMPurify. SSR-ready by default.

[![NPM version](https://img.shields.io/npm/v/@humanspeak/svelte-purify.svg)](https://www.npmjs.com/package/@humanspeak/svelte-purify)
[![Build Status](https://github.com/humanspeak/svelte-purify/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/humanspeak/svelte-purify/actions/workflows/npm-publish.yml)
[![Coverage Status](https://coveralls.io/repos/github/humanspeak/svelte-purify/badge.svg?branch=main)](https://coveralls.io/github/humanspeak/svelte-purify?branch=main)
[![License](https://img.shields.io/npm/l/@humanspeak/svelte-purify.svg)](https://github.com/humanspeak/svelte-purify/blob/main/LICENSE)
[![Downloads](https://img.shields.io/npm/dm/@humanspeak/svelte-purify.svg)](https://www.npmjs.com/package/@humanspeak/svelte-purify)
[![CodeQL](https://github.com/humanspeak/svelte-purify/actions/workflows/codeql.yml/badge.svg)](https://github.com/humanspeak/svelte-purify/actions/workflows/codeql.yml)
[![Install size](https://packagephobia.com/badge?p=@humanspeak/svelte-purify)](https://packagephobia.com/result?p=@humanspeak/svelte-purify)
[![Code Style: Trunk](https://img.shields.io/badge/code%20style-trunk-blue.svg)](https://trunk.io)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)
[![Types](https://img.shields.io/npm/types/@humanspeak/svelte-purify.svg)](https://www.npmjs.com/package/@humanspeak/svelte-purify)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/humanspeak/svelte-purify/graphs/commit-activity)

## Features

- 🚀 **Fast and tiny**: DOMPurify under the hood, minimal wrapper
- 🔒 **XSS protection**: strips scripts, unsafe URLs, and sneaky attributes
- 🧰 **Options passthrough**: you control DOMPurify via `options`
- 🧭 **SSR-ready**: default component works on server and client
- 🧪 **Tested**: unit tests with Vitest/JSDOM
- 🧑‍💻 **Full TypeScript**: proper types for options and props
- 🧿 **Svelte 5 runes-friendly**: clean, modern Svelte API

## Installation

```bash
npm i -S @humanspeak/svelte-purify
# or
pnpm add @humanspeak/svelte-purify
# or
yarn add @humanspeak/svelte-purify
```

## Basic Usage

### Default

```svelte
<script lang="ts">
    import { SveltePurify } from '@humanspeak/svelte-purify'

    const html = `<p>Hello <strong>world</strong><script>alert(1)</script></p>`
</script>

<SveltePurify {html} />
```

### Limit output length

```svelte
<SveltePurify {html} maxLength={120} />
```

### Render hooks (preHtml/postHtml)

You can render UI before and after the sanitized HTML. Each hook receives the sanitized HTML length as a number.

```svelte
<script lang="ts">
    import { SveltePurify } from '@humanspeak/svelte-purify'
    const html = `<p><strong>Hello</strong> world!</p>`
</script>

<SveltePurify
    {html}
    preHtml={(len) => <>Sanitized length: {len}</>}
    postHtml={(len) => <> • {len} chars</>}
/>
```

## Options (DOMPurify)

Pass any `DOMPurify.sanitize` options. We don’t hide anything—use the full power of DOMPurify.

```svelte
<script lang="ts">
    import { SveltePurify } from '@humanspeak/svelte-purify'

    const html = `<a href="javascript:alert(1)" title="nope">click me</a>`
    const options = {
        ALLOWED_TAGS: ['a'],
        ALLOWED_ATTR: ['href', 'title']
    }
</script>

<SveltePurify {html} {options} />
```

Note: The component returns sanitized HTML as a string (not DOM nodes).

## Props

| Component      | Prop        | Type                                       | Description                                    |
| -------------- | ----------- | ------------------------------------------ | ---------------------------------------------- |
| `SveltePurify` | `html`      | `string`                                   | Raw HTML to sanitize and render                |
|                | `options`   | `Parameters<typeof DOMPurify.sanitize>[1]` | DOMPurify options (all supported)              |
|                | `maxLength` | `number`                                   | If set, truncates the sanitized HTML string    |
|                | `preHtml`   | `Snippet<[number]>`                        | Renders before HTML; receives sanitized length |
|                | `postHtml`  | `Snippet<[number]>`                        | Renders after HTML; receives sanitized length  |

## Exports

```ts
import { SveltePurify } from '@humanspeak/svelte-purify'
```

- **SveltePurify**: SSR-friendly sanitizer component

## Security

This library delegates sanitization to [DOMPurify](https://github.com/cure53/DOMPurify), a battle-tested sanitizer. It removes script tags, event handler attributes (like `onerror`), and unsafe URLs (`javascript:`), among many other protections.

## Examples

Strip a specific tag with DOMPurify options:

```svelte
<SveltePurify html="<p>Hello <strong>world</strong></p>" options={{ FORBID_TAGS: ['strong'] }} />
```

Allow an extra tag:

```svelte
<SveltePurify
    html="<iframe src=\"about:blank\"></iframe>"
    options={{ ADD_TAGS: ['iframe'] }}
/>
```

## License

MIT © [Humanspeak, Inc.](LICENSE)

## Credits

Made with ❤️ by [Humanspeak](https://humanspeak.com)

Special thanks to [@jill64](https://github.com/jill64) — her years of Svelte contributions taught me so much and inspired this work.

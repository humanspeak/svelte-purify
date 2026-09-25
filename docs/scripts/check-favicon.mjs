import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { preview } from 'vite'

const expected = await readFile('static/favicon.png')
assert.equal(expected.subarray(0, 8).toString('hex'), '89504e470d0a1a0a')
assert.equal(expected.readUInt32BE(16), 192)
assert.equal(expected.readUInt32BE(20), 192)
const server = await preview({ preview: { host: '127.0.0.1', port: 0, open: false } })
try {
    const origin = server.resolvedUrls.local[0]
    for (const path of ['/', '/social-cards']) {
        const response = await fetch(new URL(path, origin))
        assert.equal(response.status, 200, path)
        const html = await response.text()
        const icons = html.match(/<link[^>]*rel="icon"[^>]*>/g) ?? []
        assert.equal(icons.length, 1, 'one favicon declaration')
        assert.match(icons[0], /href="\/favicon\.png"/)
    }
    const icon = await fetch(new URL('/favicon.png', origin))
    assert.equal(icon.status, 200)
    assert.match(icon.headers.get('content-type') ?? '', /^image\/png(?:;|$)/)
    assert.deepEqual(Buffer.from(await icon.arrayBuffer()), expected)
    console.log('Favicon verified in production HTML and served as a 192px PNG')
} finally {
    await server.close()
}

// Cloudflare preview emulators can keep handles alive after Vite closes.
// Reaching here means all assertions and preview cleanup succeeded.
process.exit(0)

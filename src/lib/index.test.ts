import { describe, expect, it } from 'vitest'

describe('package entry', () => {
    it('exports expected components', async () => {
        const mod = await import('./index.js')
        expect(mod).toBeTruthy()
        expect(mod).toHaveProperty('SveltePurify')
    })
})

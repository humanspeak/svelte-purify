import { expect, test } from '@playwright/test'

test.describe('remove-all sanitization', () => {
    test('color: hotpink is not present', async ({ page }) => {
        await page.goto('/tests/remove-all')

        // Scope all checks to the sanitized container
        const container = page.getByTestId('sanitized-html')
        await expect(container).toBeVisible()

        // The heart should render (as text) but without style attributes
        const heart = container.getByText('♥')
        await expect(heart).toBeVisible()

        // Ensure no inline style attribute exists on any span or element
        await expect(container.locator('[style]')).toHaveCount(0)

        // Ensure the string 'hotpink' is nowhere in the DOM
        const hasHotpink = await container.evaluate((el) =>
            el.innerHTML.toLowerCase().includes('hotpink')
        )
        expect(hasHotpink).toBeFalsy()
    })
})

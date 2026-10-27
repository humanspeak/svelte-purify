import type { RequestHandler } from '@sveltejs/kit'

export const GET: RequestHandler = async ({ fetch }) => {
    try {
        const response = await fetch('https://svelte.page/api/v1/others')
        const data = await response.json()
        return Response.json(data)
    } catch (error) {
        console.error('Failed to fetch components:', error)

        return Response.json([])
    }
}

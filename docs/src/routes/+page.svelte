<script lang="ts">
    import { localStore } from '#lib/state/localStore.svelte.js'
    import { Textarea } from '#lib/shadcn/components/ui/textarea/index.js'
    import { SveltePurify } from '@humanspeak/svelte-purify'
    import * as Card from '#lib/shadcn/components/ui/card/index.js'
    import MainContainer from '#lib/components/MainContainer.svelte'
    import { page } from '$app/state'

    let urlText = page.url.searchParams.get('html')
    if (urlText) {
        try {
            urlText = decodeURIComponent(urlText)
        } catch {
            urlText = null
        }
    }

    const ogText = `<h1> Welcome to My HTML Playground! 🎨 </h1>

Hey there! This is a <i>fun</i> example of mixing <em>HTML</em> .

You can even use <sup>superscript</sup> and <sub>subscript</sub> text!

Where did the iframe below go?!

<iframe src="about:blank"></iframe>

<details>
<summary>Want to see something cool?</summary>
Here's a hidden surprise! 🎉
</details>

Happy coding! <span style="color: hotpink">♥</span>`

    const text = localStore<string>('html', ogText, urlText)
    let source = $state(text.value)
    let timeout: number | null = null

    const onChangeTextArea = (_event: Event) => {
        if (!window) return
        if (timeout) clearTimeout(timeout)
        timeout = window.setTimeout(() => {
            source = text.value
        }, 500)
    }
</script>

<MainContainer>
    <div class="flex h-full min-h-0 w-full">
        <div class="flex h-full min-h-0 w-full justify-center p-4">
            <div class="grid h-full min-h-0 w-full grid-cols-[25%_auto] gap-8">
                <div class="h-full min-h-0">
                    <Card.Root class="flex h-full flex-col">
                        <Card.Header>
                            <Card.Title>Editor</Card.Title>
                            <Card.Description>Just edit the text 🥰</Card.Description>
                        </Card.Header>
                        <Card.Content class="flex flex-1 flex-col">
                            <Textarea
                                onkeyupcapture={onChangeTextArea}
                                bind:value={text.value}
                                class="w-full flex-1 resize-none"
                            />
                        </Card.Content>
                    </Card.Root>
                </div>
                <div class="h-auto min-h-0">
                    <Card.Root class="flex h-full w-full flex-col">
                        <Card.Header>
                            <Card.Title>HTML</Card.Title>
                            <Card.Description>Your renderded HTML 👩🏼‍💻</Card.Description>
                        </Card.Header>
                        <Card.Content class="flex min-h-0 flex-1 flex-col">
                            <div
                                class="h-full min-h-0 w-full flex-1 overflow-y-auto rounded-md border p-4"
                            >
                                <SveltePurify html={source} />
                            </div>
                        </Card.Content>
                    </Card.Root>
                </div>
            </div>
        </div>
    </div>
</MainContainer>

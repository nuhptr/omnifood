export async function loadSections() {
    const placeholders = Array.from(document.querySelectorAll("[data-section]"))

    await Promise.all(
        placeholders.map(async (placeholder) => {
            const sectionName = placeholder.dataset.section
            if (!sectionName) return

            try {
                const response = await fetch(`./sections/${sectionName}.html`)
                if (!response.ok) {
                    throw new Error(`Failed to load section "${sectionName}" (${response.status})`)
                }

                const markup = await response.text()
                const template = document.createElement("template")
                template.innerHTML = markup.trim()

                placeholder.replaceWith(template.content)
            } catch (error) {
                console.error(error)
            }
        }),
    )
}

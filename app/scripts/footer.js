export function initFooter() {
    const yearEl = document.querySelector("[data-current-year]")
    if (!yearEl) return

    yearEl.textContent = String(new Date().getUTCFullYear())
}

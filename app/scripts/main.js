import { initNavigation } from "./navigation.js"
import { initMealsFilter } from "./meals-filter.js"
import { initCtaForm } from "./cta-form.js"

initNavigation()
initMealsFilter()
initCtaForm()

const yearEl = document.querySelector("[data-current-year]")
if (yearEl) {
    yearEl.textContent = String(new Date().getUTCFullYear())
}

import { loadSections } from "./loader.js"
import { initNavigation } from "./navigation.js"
import { initMealsFilter } from "./meals-filter.js"
import { initCtaForm } from "./cta-form.js"
import { initFooter } from "./footer.js"

async function bootstrap() {
    await loadSections()
    initNavigation()
    initMealsFilter()
    initCtaForm()
    initFooter()
}

bootstrap()

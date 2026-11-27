export function initNavigation() {
    const header = document.querySelector(".site-header")
    const toggleBtn = document.querySelector(".site-header__toggle")
    const heroSection = document.querySelector(".hero")

    if (!header) return

    const closeMenu = () => {
        header.classList.remove("site-header--open")
        toggleBtn?.setAttribute("aria-expanded", "false")
    }

    if (toggleBtn) {
        toggleBtn.addEventListener("click", () => {
            const isOpen = header.classList.toggle("site-header--open")
            toggleBtn.setAttribute("aria-expanded", String(isOpen))
        })
    }

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && header.classList.contains("site-header--open")) {
            closeMenu()
            toggleBtn?.focus()
        }
    })

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    document.addEventListener("click", (event) => {
        const link = event.target.closest('a[href^="#"]')
        if (!link) return

        const href = link.getAttribute("href")
        if (!href) return

        if (href === "#" || href === "#top") {
            event.preventDefault()
            window.scrollTo({
                top: 0,
                behavior: prefersReducedMotion ? "auto" : "smooth",
            })
            closeMenu()
            return
        }

        const target = document.querySelector(href)
        if (target) {
            event.preventDefault()
            target.scrollIntoView({
                behavior: prefersReducedMotion ? "auto" : "smooth",
            })
            closeMenu()
        }
    })

    if (heroSection && "IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries
                document.body.classList.toggle("page--sticky", !entry.isIntersecting)
            },
            {
                root: null,
                threshold: 0,
                rootMargin: "-80px 0px 0px 0px",
            }
        )

        observer.observe(heroSection)
    }
}

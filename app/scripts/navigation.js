export function initNavigation() {
    const header = document.querySelector(".site-header")
    const toggleBtn = document.querySelector(".site-header__toggle")
    const heroSection = document.querySelector(".hero")

    if (!header) return

    const closeMenu = () => {
        header.classList.remove("site-header--open")
        toggleBtn?.setAttribute("aria-expanded", "false")
    }

    toggleBtn?.addEventListener("click", () => {
        const isOpen = header.classList.toggle("site-header--open")
        toggleBtn.setAttribute("aria-expanded", String(isOpen))
    })

    header.addEventListener("click", (event) => {
        if (event.target.closest('a[href^="#"]')) closeMenu()
    })

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && header.classList.contains("site-header--open")) {
            closeMenu()
            toggleBtn?.focus()
        }
    })

    if (heroSection && "IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
            ([entry]) => {
                document.body.classList.toggle("page--sticky", !entry.isIntersecting)
            },
            { threshold: 0, rootMargin: "-80px 0px 0px 0px" },
        )

        observer.observe(heroSection)
    }
}

export function initMealsFilter() {
    const filterButtons = Array.from(document.querySelectorAll(".meals__filter"))
    const mealCards = Array.from(document.querySelectorAll(".meal-card"))

    if (!filterButtons.length || !mealCards.length) return

    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const selectedFilter = button.dataset.filter || "all"

            filterButtons.forEach((btn) => {
                const isActive = btn === button
                btn.classList.toggle("meals__filter--active", isActive)
                btn.setAttribute("aria-selected", String(isActive))
            })

            mealCards.forEach((card) => {
                const diets = (card.dataset.diet || "").split(" ").filter(Boolean)
                const isMatch = selectedFilter === "all" || diets.includes(selectedFilter)
                card.classList.toggle("meal-card--hidden", !isMatch)
            })
        })
    })
}

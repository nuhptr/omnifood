export function initCtaForm() {
    const form = document.querySelector("#cta-signup-form")
    const status = document.querySelector("#cta-form-status")

    if (!form || !status) return

    form.addEventListener("submit", (event) => {
        event.preventDefault()

        if (!form.checkValidity()) {
            form.reportValidity()
            status.textContent = "Please complete all required fields to claim your free meal."
            status.classList.remove("cta__status--success")
            status.classList.add("cta__status--error")
            return
        }

        const formData = new FormData(form)
        const name = String(formData.get("fullName") || "").trim()

        status.textContent = `Welcome, ${name || "there"}. Your complimentary first meal request has been received.`
        status.classList.remove("cta__status--error")
        status.classList.add("cta__status--success")
        form.reset()
    })
}

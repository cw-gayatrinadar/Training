document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const toast = document.querySelector(".success-toast");

    const fields = [
        "first-name",
        "last-name",
        "email",
        "message",
        "consent"
    ].map(id => document.getElementById(id));

    const radioGroup = document.querySelectorAll('input[name="query-type"]');
    const radioError = document.getElementById("query-type-error");

    // Hide all errors on load
    hideAllErrors();

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        let isValid = true;

        // Validate normal fields
        fields.forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });

        // Validate radio group
        if (![...radioGroup].some(r => r.checked)) {
            showError(radioGroup[0], radioError);
            isValid = false;
        } else {
            hideError(radioGroup[0], radioError);
        }

        if (!isValid) {
            focusFirstInvalid();
            return;
        }

        // Simulate successful submit
        form.reset();
        hideAllErrors();
        showToast();
    });

    function validateField(field) {
        const error = document.getElementById(`${field.id}-error`);

        if (!field.checkValidity()) {
            showError(field, error);
            return false;
        }

        hideError(field, error);
        return true;
    }

    function showError(field, error) {
        if (!error) return;

        error.style.display = "block";
        field.setAttribute("aria-invalid", "true");
        field.setAttribute("aria-describedby", error.id);
    }

    function hideError(field, error) {
        if (!error) return;

        error.style.display = "none";
        field.removeAttribute("aria-invalid");
        field.removeAttribute("aria-describedby");
    }

    function hideAllErrors() {
        document.querySelectorAll(".error-message").forEach(error => {
            error.style.display = "none";
        });

        document.querySelectorAll("[aria-invalid]").forEach(field => {
            field.removeAttribute("aria-invalid");
            field.removeAttribute("aria-describedby");
        });
    }

    function focusFirstInvalid() {
        const invalid = form.querySelector("[aria-invalid='true'], :invalid");
        if (invalid) invalid.focus();
    }

    function showToast() {
        toast.classList.add("show");

        setTimeout(() => {
            toast.classList.remove("show");
        }, 4000);
    }
});

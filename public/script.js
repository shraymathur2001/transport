
document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("container");
    const registerBtn = document.getElementById("register");
    const loginBtn = document.getElementById("login");

    const signupForm = document.getElementById("signup-form");
    const signinForm = document.getElementById("signin-form");
    const signupPassword = document.getElementById("signup-password");
    const confirmPassword = document.getElementById("confirm-password");
    const togglePassword = document.getElementById("toggle-password");
    const toggleConfirmPassword = document.getElementById("toggle-confirm-password");

    registerBtn.addEventListener("click", () => {
        container.classList.add("active");
    });

    loginBtn.addEventListener("click", () => {
        container.classList.remove("active");
    });

    // Toggle password visibility for sign-up
    togglePassword.addEventListener("click", function () {
        console.log("i work")
        const type = signupPassword.getAttribute("type") === "password" ? "text" : "password";
        signupPassword.setAttribute("type", type);
        togglePassword.classList.toggle("active");
    });

    // Toggle confirm password visibility for sign-up
    toggleConfirmPassword.addEventListener("click", function () {
        console.log("i work")
        const type = confirmPassword.getAttribute("type") === "password" ? "text" : "password";
        confirmPassword.setAttribute("type", type);
        toggleConfirmPassword.classList.toggle("active");
    });

    // Form submission and validation for sign-up
    signupForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const name = document.getElementById("signup-name").value;
        const email = document.getElementById("signup-email").value;
        const password = signupPassword.value;
        const confirmPass = confirmPassword.value;

        // Validate password and confirm password
        if (password !== confirmPass) {
            alert("Passwords do not match!");
            return;
        }

        // Send user data to the server for sign-up
        fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, city,password })
        })
        .then(response => {
            if (response.ok) {
                signupForm.reset();
            } else {
                throw new Error('Failed to sign up');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Sign up failed. Please try again later.');
        });
    });

    // Form submission and validation for sign-in
    signinForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const email = document.getElementById("signin-email").value;
        const password = document.getElementById("signin-password").value;

        // Send user data to the server for sign-in
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
        .then(response => {
            if (response.ok) {
                // Redirect to maps.html upon successful login
                window.location.href = '/maps.html';
            } else {
                throw new Error('Failed to sign in');
            }
        })
        .catch(error => {
            console.error('Error:', error);
           // alert('Sign in failed. Please try again later.');
        });
    });
});

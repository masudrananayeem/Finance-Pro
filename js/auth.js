const loginBtn =
    document.getElementById("loginBtn");

if (loginBtn) {

    loginBtn.addEventListener("click", () => {

        const email =
            document.getElementById("email").value;

        const password =
            document.getElementById("password").value;

        if (
            email === "admin@gmail.com"
            &&
            password === "123456"
        ) {

            localStorage.setItem(
                "isLoggedIn",
                "true"
            );

            window.location.href =
                "pages/dashboard.html";

        }
        else {

            alert("Wrong Credentials");

        }

    });

}

const logoutBtn =
    document.getElementById("logoutBtn");

if (logoutBtn) {

    logoutBtn.addEventListener(
        "click",
        () => {

            localStorage.clear();

            sessionStorage.clear();

            window.location.href =
                "../index.html";

        });

}



const darkModeToggle =
    document.getElementById("darkMode");

if (localStorage.getItem("theme") === "dark") {

    document.body.classList.add("dark-mode");

    darkModeToggle.checked = true;
}

darkModeToggle.addEventListener("change", () => {

    if (darkModeToggle.checked) {

        document.body.classList.add("dark-mode");

        localStorage.setItem(
            "theme",
            "dark"
        );

    } else {

        document.body.classList.remove("dark-mode");

        localStorage.setItem(
            "theme",
            "light"
        );

    }

});

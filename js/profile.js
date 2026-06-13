const profileName =
    document.getElementById("profileName");

const saveProfile =
    document.getElementById("saveProfile");

if (saveProfile) {

    saveProfile.addEventListener("click", () => {

        const name = profileName.value;

        localStorage.setItem(
            "profileName",
            name
        );

        alert("Profile Updated");

    });

}

if (profileName) {

    profileName.value =
        localStorage.getItem("profileName")
        || "Masud Rana Nayeem";

}


const balance =
    Number(
        localStorage.getItem("balance")
    ) || 0;

const income =
    Number(
        localStorage.getItem("income")
    ) || 0;

const expense =
    Number(
        localStorage.getItem("expense")
    ) || 0;

document.getElementById(
    "profileBalance"
).innerText =
    "৳" + balance;

document.getElementById(
    "profileIncome"
).innerText =
    "৳" + income;

document.getElementById(
    "profileExpense"
).innerText =
    "৳" + expense;

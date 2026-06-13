
let balance =
    Number(localStorage.getItem("balance")) || 1200;

let income =
    Number(localStorage.getItem("income")) || 0;

let expense =
    Number(localStorage.getItem("expense")) || 0;

let transactions =
    JSON.parse(localStorage.getItem("transactions"))
    || [];

updateUI();
renderTransactions();

document
    .getElementById("incomeBtn")
    .addEventListener("click", () => {

        let amount =
            Number(
                document.getElementById("incomeInput").value
            );

        if (amount <= 0) {

            alert("Enter valid amount");
            return;
        }

        income += amount;
        balance += amount;

        addTransaction(
            "Income",
            amount
        );

    });

document
    .getElementById("expenseBtn")
    .addEventListener("click", () => {

        let amount =
            Number(
                document.getElementById("expenseInput").value
            );

        if (amount <= 0) {

            alert("Enter valid amount");
            return;
        }

        if (amount > balance) {

            alert("Insufficient Balance");
            return;
        }

        expense += amount;
        balance -= amount;

        addTransaction(
            "Expense",
            amount
        );

    });

function addTransaction(type, amount) {

    transactions.unshift({

        date:
            new Date().toLocaleString(),

        type: type,

        amount: amount

    });

    saveAll();

}

function saveAll() {

    localStorage.setItem(
        "balance",
        balance
    );

    localStorage.setItem(
        "income",
        income
    );

    localStorage.setItem(
        "expense",
        expense
    );

    localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
    );

    updateUI();
    renderTransactions();

    if (typeof loadChart === "function") {

        loadChart();
    }

}

function updateUI() {

    document
        .getElementById("balance")
        .innerText = "৳" + balance;

    document
        .getElementById("income")
        .innerText = "৳" + income;

    document
        .getElementById("expense")
        .innerText = "৳" + expense;

    document
        .getElementById("savings")
        .innerText =
        "৳" + (income - expense);

}

function renderTransactions() {

    let table =
        document.getElementById(
            "transactionTable"
        );

    table.innerHTML = "";

    transactions.forEach((item, index) => {

        table.innerHTML += `

        <tr>

        <td>${item.date}</td>

        <td>${item.type}</td>

        <td>৳${item.amount}</td>

        <td>

        <button
        onclick="deleteTransaction(${index})"
        class="btn btn-danger btn-sm">
        Delete
        </button>
        </td>
        </tr>
        `;

    });

}

function deleteTransaction(index) {

    transactions.splice(index, 1);

    localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
    );

    renderTransactions();

}


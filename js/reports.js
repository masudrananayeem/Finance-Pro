
document.addEventListener("DOMContentLoaded", () => {

    const transactions =
        JSON.parse(
            localStorage.getItem("transactions")
        ) || [];

    const income =
        Number(
            localStorage.getItem("income")
        ) || 0;

    const expense =
        Number(
            localStorage.getItem("expense")
        ) || 0;

    const savings =
        income - expense;

    const reportIncome =
        document.getElementById(
            "reportIncome"
        );

    const reportExpense =
        document.getElementById(
            "reportExpense"
        );

    const reportSavings =
        document.getElementById(
            "reportSavings"
        );

    const reportBody =
        document.getElementById(
            "reportBody"
        );

    if (reportIncome)
        reportIncome.innerText =
            "৳" + income;

    if (reportExpense)
        reportExpense.innerText =
            "৳" + expense;

    if (reportSavings)
        reportSavings.innerText =
            "৳" + savings;

    if (reportBody) {

        transactions.forEach(item => {

            reportBody.innerHTML += `

            <tr>

                <td>${item.date || "-"}</td>

                <td>${item.type || "-"}</td>

                <td>${item.category || "-"}</td>

                <td>৳${item.amount || 0}</td>

            </tr>

            `;

        });

    }

    const downloadBtn =
        document.getElementById(
            "downloadPdf"
        );

    if (downloadBtn) {

        downloadBtn.addEventListener(
            "click",
            () => {

                const { jsPDF } =
                    window.jspdf;

                const doc =
                    new jsPDF();

                doc.setFontSize(18);

                doc.text(
                    "Finance-Pro Statement",
                    20,
                    20
                );

                doc.setFontSize(12);

                doc.text(
                    "Income: " + income,
                    20,
                    40
                );

                doc.text(
                    "Expense: " + expense,
                    20,
                    50
                );

                doc.text(
                    "Savings: " + savings,
                    20,
                    60
                );

                doc.save(
                    "Finance_Statement.pdf"
                );

            });

    }

});


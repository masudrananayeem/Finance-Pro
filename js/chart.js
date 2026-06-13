
document.addEventListener("DOMContentLoaded", () => {

    const canvas =
    document.getElementById("financeChart");

    if (!canvas) {
        console.log("Canvas not found");
        return;
    }

    const income =
    Number(localStorage.getItem("income")) || 0;

    const expense =
    Number(localStorage.getItem("expense")) || 0;

    const savings =
    income - expense;

    new Chart(canvas, {

        type: "doughnut",

        data: {

            labels: [
                "Income",
                "Expense",
                "Savings"
            ],

            datasets: [{

                data: [
                    income,
                    expense,
                    savings
                ],

                backgroundColor: [

                    "#00b894",
                    "#e63946",
                    "#4361ee"

                ],

                hoverOffset: 10,

                borderWidth: 2

            }]

        },

        options: {

            responsive: true,

            plugins: {

                legend: {

                    position: "bottom"

                },

                title: {

                    display: true,

                    text: "Finance Overview"

                }

            }

        }

    });

});

let financeChart;

function loadChart() {

    const canvas =
        document.getElementById("financeChart");

    if (!canvas) return;

    const income =
        Number(localStorage.getItem("income")) || 0;

    const expense =
        Number(localStorage.getItem("expense")) || 0;

    const savings =
        income - expense;

    if (financeChart) {

        financeChart.destroy();
    }

    financeChart = new Chart(canvas, {

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

                    "#10b981",
                    "#ef4444",
                    "#3b82f6"

                ],

                borderWidth: 0

            }]

        },

        options: {

            responsive: true,

            plugins: {

                legend: {

                    position: "bottom"
                }

            }

        }

    });

}

document.addEventListener(
    "DOMContentLoaded",
    loadChart
);
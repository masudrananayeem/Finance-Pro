// ==========================================
// ===== CHART.JS - FULL FUNCTIONAL (FIXED) =====
// ==========================================

let financeChartInstance = null;
let isChartInitialized = false;
let resizeTimeout = null;
let chartInitAttempts = 0;
const MAX_INIT_ATTEMPTS = 3;

// ===== INITIALIZE CHART =====
function initFinanceChart() {
    const ctx = document.getElementById('financeChart');
    if (!ctx) {
        console.warn('Chart canvas not found');
        return;
    }

    // Prevent multiple initialization
    if (isChartInitialized && financeChartInstance) {
        return;
    }

    // Prevent infinite loop
    if (chartInitAttempts >= MAX_INIT_ATTEMPTS) {
        console.warn('Max chart initialization attempts reached');
        return;
    }

    try {
        chartInitAttempts++;

        // Get data from localStorage
        const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();

        // Filter current month transactions
        const monthTransactions = transactions.filter(t => {
            const date = new Date(t.date);
            return date.getMonth() === currentMonth && date.getFullYear() === currentYear && t.type === 'expense';
        });

        // Group by category
        const categoryMap = {};
        monthTransactions.forEach(t => {
            if (categoryMap[t.category]) {
                categoryMap[t.category] += t.amount;
            } else {
                categoryMap[t.category] = t.amount;
            }
        });

        const categories = Object.keys(categoryMap);
        const amounts = Object.values(categoryMap);

        // Colors for chart
        const colors = [
            '#3b82f6', '#f59e0b', '#ef4444', '#10b981',
            '#8b5cf6', '#ec4899', '#06b6d4', '#f97316',
            '#14b8a6', '#6366f1', '#d946ef', '#f43f5e'
        ];

        // Check if dark mode
        const isDark = document.body.classList.contains('dark-mode');
        const gridColor = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)';
        const textColor = isDark ? '#94a3b8' : '#6b7280';

        // Destroy existing chart if any
        if (financeChartInstance) {
            financeChartInstance.destroy();
            financeChartInstance = null;
        }

        // Create new chart
        financeChartInstance = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: categories.length > 0 ? categories : ['No Data'],
                datasets: [{
                    label: 'Spending by Category (৳)',
                    data: amounts.length > 0 ? amounts : [0],
                    backgroundColor: categories.length > 0 ? colors.slice(0, categories.length) : ['#94a3b8'],
                    borderColor: categories.length > 0 ? categories.map(() => '#ffffff') : ['#ffffff'],
                    borderWidth: 2,
                    borderRadius: 8,
                    maxBarThickness: 50,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: false,
                    },
                    tooltip: {
                        backgroundColor: isDark ? '#1a2a4a' : '#ffffff',
                        titleColor: isDark ? '#ffffff' : '#0b1120',
                        bodyColor: isDark ? '#e5e9f0' : '#1a1a2e',
                        borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
                        borderWidth: 1,
                        cornerRadius: 12,
                        padding: 12,
                        callbacks: {
                            label: function(context) {
                                return '৳' + context.parsed.y.toFixed(2);
                            },
                            title: function(context) {
                                return context[0].label;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '৳' + value.toLocaleString();
                            },
                            color: textColor,
                            font: {
                                size: 11
                            }
                        },
                        grid: {
                            color: gridColor,
                            drawBorder: false,
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: textColor,
                            font: {
                                size: 11
                            },
                            maxRotation: 45,
                            minRotation: 0
                        }
                    }
                },
                animation: {
                    duration: 600,
                    easing: 'easeInOutQuart'
                },
                layout: {
                    padding: {
                        top: 10,
                        bottom: 10
                    }
                }
            }
        });

        isChartInitialized = true;
        chartInitAttempts = 0;

    } catch (error) {
        console.error('Error initializing chart:', error);
        isChartInitialized = false;
    }
}

// ===== UPDATE CHART COLORS FOR DARK MODE =====
function updateChartColors() {
    if (!financeChartInstance) return;

    try {
        const isDark = document.body.classList.contains('dark-mode');
        const gridColor = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)';
        const textColor = isDark ? '#94a3b8' : '#6b7280';

        financeChartInstance.options.scales.y.grid.color = gridColor;
        financeChartInstance.options.scales.y.ticks.color = textColor;
        financeChartInstance.options.scales.x.ticks.color = textColor;
        financeChartInstance.options.plugins.tooltip.backgroundColor = isDark ? '#1a2a4a' : '#ffffff';
        financeChartInstance.options.plugins.tooltip.titleColor = isDark ? '#ffffff' : '#0b1120';
        financeChartInstance.options.plugins.tooltip.bodyColor = isDark ? '#e5e9f0' : '#1a1a2e';
        financeChartInstance.options.plugins.tooltip.borderColor = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)';

        financeChartInstance.update();
    } catch (error) {
        console.error('Error updating chart colors:', error);
    }
}

// ===== REFRESH CHART DATA =====
function refreshChartData() {
    if (!financeChartInstance) {
        initFinanceChart();
        return;
    }

    try {
        const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();

        const monthTransactions = transactions.filter(t => {
            const date = new Date(t.date);
            return date.getMonth() === currentMonth && date.getFullYear() === currentYear && t.type === 'expense';
        });

        const categoryMap = {};
        monthTransactions.forEach(t => {
            if (categoryMap[t.category]) {
                categoryMap[t.category] += t.amount;
            } else {
                categoryMap[t.category] = t.amount;
            }
        });

        const categories = Object.keys(categoryMap);
        const amounts = Object.values(categoryMap);

        const colors = [
            '#3b82f6', '#f59e0b', '#ef4444', '#10b981',
            '#8b5cf6', '#ec4899', '#06b6d4', '#f97316',
            '#14b8a6', '#6366f1', '#d946ef', '#f43f5e'
        ];

        financeChartInstance.data.labels = categories.length > 0 ? categories : ['No Data'];
        financeChartInstance.data.datasets[0].data = amounts.length > 0 ? amounts : [0];
        financeChartInstance.data.datasets[0].backgroundColor = categories.length > 0 ? colors.slice(0, categories.length) : ['#94a3b8'];
        financeChartInstance.data.datasets[0].borderColor = categories.length > 0 ? categories.map(() => '#ffffff') : ['#ffffff'];
        financeChartInstance.update();

    } catch (error) {
        console.error('Error refreshing chart data:', error);
    }
}

// ===== GET CHART INSTANCE =====
function getChartInstance() {
    return financeChartInstance;
}

// ===== DESTROY CHART =====
function destroyChart() {
    try {
        if (resizeTimeout) {
            clearTimeout(resizeTimeout);
            resizeTimeout = null;
        }
        if (financeChartInstance) {
            financeChartInstance.destroy();
            financeChartInstance = null;
            isChartInitialized = false;
        }
        if (window._chartResizeHandler) {
            window.removeEventListener('resize', window._chartResizeHandler);
            window._chartResizeHandler = null;
        }
    } catch (error) {
        console.error('Error destroying chart:', error);
    }
}

// ===== CHECK IF CHART IS INITIALIZED =====
function isChartReady() {
    return isChartInitialized && financeChartInstance !== null;
}

// ===== RESIZE HANDLER WITH DEBOUNCE =====
function handleChartResize() {
    if (resizeTimeout) {
        clearTimeout(resizeTimeout);
    }
    resizeTimeout = setTimeout(function() {
        if (financeChartInstance) {
            financeChartInstance.resize();
        }
        resizeTimeout = null;
    }, 250);
}

// ===== SAFE INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    // Wait for DOM to be fully ready
    setTimeout(function() {
        if (document.getElementById('financeChart')) {
            initFinanceChart();
        }
    }, 1000);
});

// Remove any existing resize listeners and add new one
window.removeEventListener('resize', handleChartResize);
window.addEventListener('resize', handleChartResize);
window._chartResizeHandler = handleChartResize;
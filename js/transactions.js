// ==========================================
// ===== TRANSACTIONS MANAGEMENT =====
// ==========================================

// ===== DEFAULT TRANSACTIONS (ZERO INITIAL STATE) =====
function getDefaultTransactions() {
    return [
        { id: 1, type: 'income', category: 'Salary', amount: 5000, date: new Date().toISOString().split('T')[0], description: 'Monthly salary', status: 'Completed' },
        { id: 2, type: 'expense', category: 'Food', amount: 154, date: new Date().toISOString().split('T')[0], description: 'Dinner', status: 'Completed' },
        { id: 3, type: 'expense', category: 'Food', amount: 30, date: new Date().toISOString().split('T')[0], description: 'Lunch', status: 'Completed' },
        { id: 4, type: 'expense', category: 'Food', amount: 106, date: new Date().toISOString().split('T')[0], description: 'Groceries', status: 'Completed' },
        { id: 5, type: 'income', category: 'Salary', amount: 500, date: new Date().toISOString().split('T')[0], description: 'Bonus', status: 'Completed' },
        { id: 6, type: 'expense', category: 'Food', amount: 110, date: new Date().toISOString().split('T')[0], description: 'Lunch', status: 'Completed' },
        { id: 7, type: 'expense', category: 'Shopping', amount: 200, date: new Date().toISOString().split('T')[0], description: 'New shoes', status: 'Pending' }
    ];
}

// ===== INITIALIZE =====
function initTransactions() {
    // Check if transactions exist, if not create default
    if (!localStorage.getItem('transactions')) {
        localStorage.setItem('transactions', JSON.stringify(getDefaultTransactions()));
    }

    // Initialize other data stores
    if (!localStorage.getItem('budgets')) {
        localStorage.setItem('budgets', JSON.stringify([]));
    }
    if (!localStorage.getItem('goals')) {
        localStorage.setItem('goals', JSON.stringify([]));
    }
    if (!localStorage.getItem('savings')) {
        localStorage.setItem('savings', JSON.stringify([]));
    }
    if (!localStorage.getItem('notes')) {
        localStorage.setItem('notes', JSON.stringify([]));
    }
}

// ===== GET ALL TRANSACTIONS =====
function getTransactions() {
    const data = localStorage.getItem('transactions');
    if (!data) {
        // If no data, initialize with default
        initTransactions();
        return JSON.parse(localStorage.getItem('transactions'));
    }
    return JSON.parse(data);
}

// ===== ADD TRANSACTION =====
function addTransaction(type, category, amount, date, description) {
    const transactions = getTransactions();
    const newTransaction = {
        id: Date.now(),
        type: type,
        category: category,
        amount: parseFloat(amount),
        date: date || new Date().toISOString().split('T')[0],
        description: description || '',
        status: 'Completed',
        createdAt: new Date().toISOString()
    };
    transactions.push(newTransaction);
    localStorage.setItem('transactions', JSON.stringify(transactions));
    return newTransaction;
}

// ===== DELETE TRANSACTION =====
function deleteTransaction(id) {
    let transactions = getTransactions();
    transactions = transactions.filter(t => t.id !== id);
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

// ===== GET TRANSACTION SUMMARY =====
function getTransactionSummary() {
    const transactions = getTransactions();
    let totalIncome = 0,
        totalExpense = 0;
    transactions.forEach(t => {
        if (t.type === 'income') totalIncome += t.amount;
        else totalExpense += t.amount;
    });
    return {
        totalIncome: totalIncome,
        totalExpense: totalExpense,
        netBalance: totalIncome - totalExpense,
        count: transactions.length
    };
}

// ===== CLEAR ALL TRANSACTIONS =====
function clearAllTransactions() {
    localStorage.setItem('transactions', JSON.stringify([]));
}

// ===== RESET TO DEFAULT =====
function resetToDefaultTransactions() {
    localStorage.setItem('transactions', JSON.stringify(getDefaultTransactions()));
}

// ===== EXPORT TRANSACTIONS AS CSV =====
function exportTransactionsCSV() {
    const transactions = getTransactions();
    if (transactions.length === 0) {
        alert('No transactions to export!');
        return;
    }

    let csv = 'Date,Category,Type,Amount,Description,Status\n';
    transactions.forEach(t => {
        csv +=
            `${t.date},${t.category},${t.type},${t.amount.toFixed(2)},${t.description || ''},${t.status || 'Completed'}\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'finance_transactions_export.csv';
    a.click();
    URL.revokeObjectURL(url);
    alert('Transactions exported successfully!');
}

// ===== GET TRANSACTIONS BY MONTH =====
function getTransactionsByMonth(month, year) {
    const transactions = getTransactions();
    return transactions.filter(t => {
        const date = new Date(t.date);
        return date.getMonth() === month && date.getFullYear() === year;
    });
}

// ===== GET TRANSACTIONS BY TYPE =====
function getTransactionsByType(type) {
    const transactions = getTransactions();
    return transactions.filter(t => t.type === type);
}

// ===== GET TRANSACTIONS BY CATEGORY =====
function getTransactionsByCategory(category) {
    const transactions = getTransactions();
    return transactions.filter(t => t.category === category);
}

// Initialize on load
initTransactions();
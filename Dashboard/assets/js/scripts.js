let currentConsumption = 0;
let dailyGoal = 200;
const consumptionEl = document.getElementById('current-consumption');
const goalEl = document.getElementById('daily-goal');
const savingsPercentageEl = document.getElementById('water-savings-percentage');

// Initialize charts
const ctxConsumption = document.getElementById('water-consumption-chart').getContext('2d');
const ctxSavings = document.getElementById('water-savings-chart').getContext('2d');
const ctxGoal = document.getElementById('water-goal-chart').getContext('2d');

let chartConsumption, chartSavings, chartGoal;
let chartDataConsumption = Array(24).fill(0);
let chartDataSavings = Array(24).fill(0);
let chartDataGoal = Array(24).fill(dailyGoal); // Fill with the daily goal

function updateConsumption() {
    currentConsumption += Math.random() * 2; // Simulating random consumption
    consumptionEl.textContent = `${Math.round(currentConsumption)} L`;
    updateSavingsBadge();
    updateChartConsumption();
    updateChartSavings();
    updateChartGoal();
}

function setNewGoal() {
    const newGoal = document.getElementById('goal-input').value;
    if (newGoal && newGoal > 0) {
        dailyGoal = parseInt(newGoal);
        goalEl.textContent = `${dailyGoal} L`;
        updateSavingsBadge();
        updateChartGoal(); // Update goal chart
    }
}

function updateSavingsBadge() {
    const savingsPercentage = Math.max(0, Math.round((1 - currentConsumption / dailyGoal) * 100));
    savingsPercentageEl.textContent = `${savingsPercentage}%`;
}

function updateChartConsumption() {
    chartDataConsumption.push(currentConsumption);
    chartDataConsumption.shift();

    if (!chartConsumption) {
        chartConsumption = new Chart(ctxConsumption, {
            type: 'line',
            data: {
                labels: Array(24).fill('').map((_, i) => `${i}:00`),
                datasets: [{
                    label: 'Hourly Water Consumption (L)',
                    data: chartDataConsumption,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    } else {
        chartConsumption.data.datasets[0].data = chartDataConsumption;
        chartConsumption.update();
    }
}

function updateChartSavings() {
    const savingsPercentage = Math.max(0, Math.round((1 - currentConsumption / dailyGoal) * 100));
    chartDataSavings.push(savingsPercentage);
    chartDataSavings.shift();

    if (!chartSavings) {
        chartSavings = new Chart(ctxSavings, {
            type: 'bar',
            data: {
                labels: Array(24).fill('').map((_, i) => `${i}:00`),
                datasets: [{
                    label: 'Water Savings Percentage',
                    data: chartDataSavings,
                    backgroundColor: 'rgba(75, 192, 192, 0.5)',
                    borderColor: 'rgb(75, 192, 192)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    } else {
        chartSavings.data.datasets[0].data = chartDataSavings;
        chartSavings.update();
    }
}

function updateChartGoal() {
    chartDataGoal.push(dailyGoal);
    chartDataGoal.shift();

    if (!chartGoal) {
        chartGoal = new Chart(ctxGoal, {
            type: 'line',
            data: {
                labels: Array(24).fill('').map((_, i) => `${i}:00`),
                datasets: [{
                    label: 'Daily Water Goal (L)',
                    data: chartDataGoal,
                    borderColor: 'rgb(255, 99, 132)',
                    tension: 0.1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    } else {
        chartGoal.data.datasets[0].data = chartDataGoal;
        chartGoal.update();
    }
}

// Simulate real-time updates
setInterval(updateConsumption, 5000);

// Initial update
updateConsumption();

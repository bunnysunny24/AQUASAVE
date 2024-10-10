let currentConsumption = 0;
let dailyGoal = 200;
const consumptionEl = document.getElementById('current-consumption');
const goalEl = document.getElementById('daily-goal');
const savingsPercentageEl = document.getElementById('savings-percentage');

function updateConsumption() {
    currentConsumption += Math.random() * 2;
    consumptionEl.textContent = `${Math.round(currentConsumption)} L`;
    updateSavingsBadge();
    updateChart();
}

function setNewGoal() {
    const newGoal = document.getElementById('goal-input').value;
    if (newGoal && newGoal > 0) {
        dailyGoal = parseInt(newGoal);
        goalEl.textContent = `${dailyGoal} L`;
        updateSavingsBadge();
    }
}

function updateSavingsBadge() {
    const savingsPercentage = Math.max(0, Math.round((1 - currentConsumption / dailyGoal) * 100));
    savingsPercentageEl.textContent = `${savingsPercentage}%`;
}

// Initialize and update the chart
const ctx = document.getElementById('consumption-chart').getContext('2d');
let chart;
let chartData = Array(24).fill(0);

function updateChart() {
    chartData.push(currentConsumption);
    chartData.shift();

    if (!chart) {
        chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: Array(24).fill('').map((_, i) => `${i}:00`),
                datasets: [{
                    label: 'Hourly Consumption (L)',
                    data: chartData,
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
        chart.data.datasets[0].data = chartData;
        chart.update();
    }
}

// Simulate real-time updates
setInterval(updateConsumption, 5000);

// Initial update
updateConsumption();

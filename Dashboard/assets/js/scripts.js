// Sample data for water usage in liters
const data = [50, 30, 15, 5]; // Values for each section of the pie
const labels = ['Bathroom', 'Kitchen', 'Garden', 'Laundry'];

// Define the width, height, and increased radius for the pie chart
const width = 1600; // Further increased width
const height = 1600; // Further increased height
const radius = Math.min(width, height) / 2 - 20; // Set radius dynamically based on width/height

// Define color scale
const color = d3.scaleOrdinal()
    .domain(labels)
    .range(['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)', 'rgba(75, 192, 192, 0.6)']);

// Create the pie layout
const pie = d3.pie();

// Define the arc for the pie chart
const arc = d3.arc()
    .innerRadius(0)  // Set inner radius for pie (0 for a full pie)
    .outerRadius(radius); // Use the increased radius

// Create the SVG container
const svg = d3.select('#waterUsageChart')
    .attr('viewBox', `0 0 ${width} ${height}`) // Set the viewBox
    .append('g')
    .attr('transform', `translate(${width / 2}, ${height / 2})`); // Center the pie chart

// Create the pie chart arcs
const arcs = svg.selectAll('arc')
    .data(pie(data)) // Bind data to the pie chart
    .enter()
    .append('g')
    .attr('class', 'arc');

// Append the path for each arc
arcs.append('path')
    .attr('d', arc)
    .attr('fill', (d, i) => color(labels[i])); // Set the fill color based on label index

// Append text labels to each arc
arcs.append('text')
    .attr('transform', (d) => `translate(${arc.centroid(d)})`) // Position the text in the center of the arc
    .text((d, i) => labels[i]) // Set text to label
    .style('text-anchor', 'middle') // Center the text
    .style('font-size', '20px') // Independent font size for text
    .style('fill', 'black'); // Set font color

// Function to display water usage values next to the pie chart
function displayWaterUsageSummary() {
    const summaryContainer = d3.select('#waterUsageSummary');

    // Append each label and value to the summary container
    labels.forEach((label, i) => {
        summaryContainer.append('div')
            .style('display', 'flex') // Use flexbox for horizontal layout
            .style('align-items', 'center') // Center items vertically
            .style('margin', '5px 0') // Add some spacing between items
            .html(`
                <div style="width: 20px; height: 20px; background-color: ${color(label)}; margin-right: 10px;"></div>
                <strong>${label}:</strong> ${data[i]} liters
            `);
    });
}

// Call the function to display the summary
displayWaterUsageSummary();

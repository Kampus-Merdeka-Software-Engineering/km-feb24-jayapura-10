document.addEventListener('DOMContentLoaded', function() {
    fetch('dataset.json')
        .then(response => response.json())
        .then(data => {
            const dataset = data;

            // Update card values
            document.getElementById('totalRevenue').innerText = dataset.totalRevenue;
            document.getElementById('totalBlock').innerText = dataset.totalBlock;
            document.getElementById('orderVolume').innerText = dataset.orderVolume;

            // Create charts
            new Chart(document.getElementById('salesReportChart'), {
                type: 'line',
                data: {
                    labels: dataset.salesReport.labels,
                    datasets: [{
                        label: 'Sales Report by Total Unit',
                        data: dataset.salesReport.data,
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 2,
                        fill: false
                    }]
                }
            });

            new Chart(document.getElementById('boroughSalePriceChart'), {
                type: 'bar',
                data: {
                    labels: dataset.boroughSalePrice.labels,
                    datasets: [{
                        label: 'Borough by Sale Price',
                        data: dataset.boroughSalePrice.data,
                        backgroundColor: 'rgba(153, 102, 255, 0.2)',
                        borderColor: 'rgba(153, 102, 255, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });

            new Chart(document.getElementById('topBuildingCategoryChart'), {
                type: 'bar',
                data: {
                    labels: dataset.topBuildingCategory.labels,
                    datasets: [{
                        label: 'Top 5 Building Category',
                        data: dataset.topBuildingCategory.data,
                        backgroundColor: 'rgba(255, 159, 64, 0.2)',
                        borderColor: 'rgba(255, 159, 64, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    indexAxis: 'y',
                    scales: {
                        x: {
                            beginAtZero: true
                        }
                    }
                }
            });

            new Chart(document.getElementById('topNeighborhoodChart'), {
                type: 'bar',
                data: {
                    labels: dataset.topNeighborhood.labels,
                    datasets: [{
                        label: 'Top 1- Neighborhood',
                        data: dataset.topNeighborhood.data,
                        backgroundColor: 'rgba(255, 206, 86, 0.2)',
                        borderColor: 'rgba(255, 206, 86, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    indexAxis: 'y',
                    scales: {
                        x: {
                            beginAtZero: true
                        }
                    }
                }
            });

            new Chart(document.getElementById('priceClassificationChart'), {
                type: 'line',
                data: {
                    labels: dataset.priceClassification.labels,
                    datasets: [{
                        label: 'Price Classification by Borough',
                        data: dataset.priceClassification.data,
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 2,
                        fill: false
                    }]
                }
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});

/* nambahin keterangan tahun*/
document.addEventListener('DOMContentLoaded', function() {
    fetch('dataset.json')
        .then(response => response.json())
        .then(data => {
            const dataset = data;

            // Update card values
            document.getElementById('totalRevenue').innerText = dataset.totalRevenue;
            document.getElementById('totalBlock').innerText = dataset.totalBlock;
            document.getElementById('orderVolume').innerText = dataset.orderVolume;

            // Create charts
            new Chart(document.getElementById('salesReportChart'), {
                type: 'line',
                data: {
                    labels: dataset.salesReport.labels.map(month => `${month} 2016-2017`),
                    datasets: [{
                        label: 'Sales Report by Total Unit',
                        data: dataset.salesReport.data,
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 2,
                        fill: false
                    }]
                },
                options: {
                    scales: {
                        x: {
                            display: true,
                            title: {
                                display: true,
                                text: 'Month and Year'
                            }
                        },
                        y: {
                            display: true,
                            title: {
                                display: true,
                                text: 'Total Units'
                            }
                        }
                    }
                }
            });

            // Other charts...
        })
        .catch(error => console.error('Error fetching data:', error));
});

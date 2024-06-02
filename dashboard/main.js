

document.addEventListener('DOMContentLoaded', function () {
    let dataset;
    fetch('dataset.json')
        .then(response => response.json())
        .then(data => {
            dataset = data;
            let filteredData = dataset;

            // Update Charts Function
            function updateCharts() {
                filteredData = filterData();
                const lineChartCtx = document.getElementById('line-chart').getContext('2d');
                if (window.lineChart) {
                    window.lineChart.destroy();
                }
                
                // Mengelompokkan data berdasarkan bulan dan tahun serta menghitung total units
                const groupedData = filteredData.reduce((acc, item) => {
                    const date = new Date(item.SALE_DATE);
                    const month = date.toLocaleString('default', { month: 'short' });
                    const year = date.getFullYear();
                    const key = `${month}/${year}`;
                
                    if (!acc[key]) {
                        acc[key] = {
                            SALE_DATE: new Date(year, date.getMonth()), // Simpan tanggal bulan pertama untuk label
                            TOTAL_UNITS: 0,
                        };
                    }
                
                    acc[key].TOTAL_UNITS += parseInt(item.TOTAL_UNITS, 10); // Pastikan TOTAL_UNITS adalah angka
                
                    return acc;
                }, {});
                
                // Mengurutkan label berdasarkan tanggal
                const sortedKeys = Object.keys(groupedData)
                    .sort((a, b) => groupedData[a].SALE_DATE - groupedData[b].SALE_DATE);
                
                // Mengambil label dan data dari groupedData
                const labels = sortedKeys.map(key => {
                    const date = groupedData[key].SALE_DATE;
                    return `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
                });
                
                const data = sortedKeys.map(key => groupedData[key].TOTAL_UNITS);
                
                // Membuat chart menggunakan Chart.js
                window.lineChart = new Chart(lineChartCtx, {
                    type: 'line',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: 'Sales Report by Total Units',
                            data: data,
                            borderColor: 'rgba(255, 99, 132, 1)',
                            backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        }]
                    },
                    options: {
                        scales: {
                            x: {
                                title: {
                                    display: true,
                                    text: 'SALE_DATE',
                                    color: '#333',
                                    font: {
                                        size: 16,
                                        weight: 'bold'
                                    }
                                }
                            },
                            y: {
                                beginAtZero: true,
                                title: {
                                    display: true,
                                    text: 'TOTAL_UNITS',
                                    color: '#333',
                                    font: {
                                        size: 16,
                                        weight: 'bold'
                                    }
                                }
                            }
                        }
                    }
                });
                
                
                

                // Update Vertical Bar Chart
                const barChartVerticalCtx = document.getElementById('bar-chart-vertical').getContext('2d');
                if (window.barChartVertical) {
                    window.barChartVertical.destroy();
                }
                window.barChartVertical = new Chart(barChartVerticalCtx, {
                    type: 'bar',
                    data: {
                        labels: filteredData.map(item => item.BOROUGH),
                        datasets: [{
                            label: 'Borough by Sale Price',
                            data: filteredData.map(item => item.SALE_PRICE),
                            backgroundColor: 'rgba(54, 162, 235, 0.2)',
                            borderColor: 'rgba(54, 162, 235, 1)',
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

                // Update Horizontal Bar Chart
                const barChartHorizontalCtx = document.getElementById('bar-chart-horizontal').getContext('2d');
                if (window.barChartHorizontal) {
                    window.barChartHorizontal.destroy();
                }
                window.barChartHorizontal = new Chart(barChartHorizontalCtx, {
                    type: 'bar',
                    data: {
                        labels: filteredData.map(item => item.NEIGHBORHOOD).slice(0, 5),
                        datasets: [{
                            label: 'Top 5 Neighborhood',
                            data: filteredData.map(item => item.SALE_PRICE).slice(0, 5),
                            backgroundColor: 'rgba(255, 99, 132, 0.2)',
                            borderColor: 'rgba(255, 99, 132, 1)',
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

                // Update Horizontal Bar Chart 1
                const barChartHorizontal1Ctx = document.getElementById('bar-chart-horizontal-1').getContext('2d');
                if (window.barChartHorizontal1) {
                    window.barChartHorizontal1.destroy();
                }
                window.barChartHorizontal1 = new Chart(barChartHorizontal1Ctx, {
                    type: 'bar',
                    data: {
                        labels: filteredData.map(item => item.BUILDING_CLASS_CATEGORY).slice(0, 5),
                        datasets: [{
                            label: 'Top 5 Building Categories',
                            data: filteredData.map(item => item.SALE_PRICE).slice(0, 5),
                            backgroundColor: 'rgba(54, 162, 235, 0.2)',
                            borderColor: 'rgba(54, 162, 235, 1)',
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

                // Update Horizontal Bar Chart 2
                const barChartHorizontal2Ctx = document.getElementById('bar-chart-horizontal-2').getContext('2d');
                if (window.barChartHorizontal2) {
                    window.barChartHorizontal2.destroy();
                }
                window.barChartHorizontal2 = new Chart(barChartHorizontal2Ctx, {
                    type: 'bar',
                    data: {
                        labels: filteredData.map(item => item.BOROUGH),
                        datasets: [{
                            label: 'Borough by Sale Price',
                            data: filteredData.map(item => item.SALE_PRICE),
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderColor: 'rgba(75, 192, 192, 1)',
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

                // Update Pie Chart
                // const pieChartCtx = document.getElementById('pie-chart').getContext('2d');
                // if (window.pieChart) {
                //     window.pieChart.destroy();
                // }
                // window.pieChart = new Chart(pieChartCtx, {
                //     type: 'pie',
                //     data: {
                //         labels: filteredData.map(item => `Borough ${item.BOROUGH}`),
                //         datasets: [{
                //             label: 'Borough Distribution',
                //             data: filteredData.map(item => item.SALE_PRICE),
                //             backgroundColor: [
                //                 'rgba(255, 99, 132, 0.2)',
                //                 'rgba(54, 162, 235, 0.2)',
                //                 'rgba(255, 206, 86, 0.2)',
                //                 'rgba(75, 192, 192, 0.2)',
                //                 'rgba(153, 102, 255, 0.2)'
                //             ],
                //             borderColor: [
                //                 'rgba(255, 99, 132, 1)',
                //                 'rgba(54, 162, 235, 1)',
                //                 'rgba(255, 206, 86, 1)',
                //                 'rgba(75, 192, 192, 1)',
                //                 'rgba(153, 102, 255, 1)'
                //             ],
                //             borderWidth: 1
                //         }]
                //     },
                //     options: {
                //         scales: {
                //             y: {
                //                 beginAtZero: true
                //             }
                //         }
                //     }
                // });
                const boroughCounts = filteredData.reduce((acc, curr) => {
                    const borough = curr.BOROUGH;
                    if (!acc[borough]) {
                      acc[borough] = 0;
                    }
                    acc[borough]++;
                    return acc;
                  }, {});
                  
                  const boroughLabels = Object.keys(boroughCounts);
                  const boroughData = Object.values(boroughCounts);
                  
                  const total = boroughData.reduce((a, b) => a + b, 0);
                  
                  const pieChartData = {
                    labels: boroughLabels,
                    datasets: [{
                      label: 'Borough Distribution',
                      data: boroughData.map(count => (count / total) * 100),
                      backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)'
                      ],
                      borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)'
                      ],
                      borderWidth: 1
                    }]
                  };
                  
                  const pieChartCtx = document.getElementById('pie-chart').getContext('2d');
                  if (window.pieChart) {
                    window.pieChart.destroy();
                  }
                  window.pieChart = new Chart(pieChartCtx, {
                    type: 'pie',
                    data: pieChartData,
                    options: {
                      scales: {
                        y: {
                          beginAtZero: true
                        }
                      },
                      plugins: {
                        datalabels: {
                          formatter: (value, ctx) => {
                            return `${value.toFixed(2)}%`;
                          },
                          color: 'white',
                          font: {
                            size: 12
                          }
                        }
                      }
                    }
                  });

                // Update Line Chart 2
                const lineChart2Ctx = document.getElementById('line-chart-2').getContext('2d');
                if (window.lineChart2) {
                    window.lineChart2.destroy();
                }
                window.lineChart2 = new Chart(lineChart2Ctx, {
                    type: 'line',
                    data: {
                        labels: filteredData.map(item => item.BOROUGH),
                        datasets: [{
                            label: 'Price Classification by Borough',
                            data: filteredData.map(item => item.SALE_PRICE),
                            borderColor: 'rgba(153, 102, 255, 1)',
                            backgroundColor: 'rgba(153, 102, 255, 0.2)',
                            tension: 0.1
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

                // Update Score Cards
                document.getElementById('total-revenue').innerText = `$${filteredData.reduce((acc, item) => acc + parseInt(item.SALE_PRICE), 0)}`;
                document.getElementById('total-block').innerText = filteredData.length;
                document.getElementById('order-volume').innerText = filteredData.reduce((acc, item) => acc + parseInt(item.TOTAL_UNITS), 0);
            }

            // Filter Function
            function filterData() {
                let category = Array.from(document.getElementById('category').selectedOptions, option => option.value);
                let dateStart = document.getElementById('date-start').value;
                let dateEnd = document.getElementById('date-end').value;
                let borough = document.getElementById('borough').value;

                let filtered = dataset.filter(item => {
                    return (!category.length || category.includes(item.BUILDING_CLASS_CATEGORY)) &&
                        (!dateStart || new Date(item.SALE_DATE) >= new Date(dateStart)) &&
                        (!dateEnd || new Date(item.SALE_DATE) <= new Date(dateEnd)) &&
                        (!borough || item.BOROUGH === borough);
                });

                return filtered;
            }

            // Initial Charts
            updateCharts();

            // Filter Button Click Event
            document.getElementById('filter-button').addEventListener('click', function () {
                updateCharts();
            });
        });
});

// js untuk data table

$(document).ready(function() {
    const rowsPerPage = 10;
    let currentPage = 1;
    let data = [];
    let filteredData = [];

    function renderTable(data, page = 1) {
        const tableBody = $('#data-table tbody');
        //
        
        
        tableBody.empty();
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        const paginatedData = data.slice(start, end);
        
        paginatedData.forEach(row => {
            const rowElement = $('<tr></tr>');
            for (let key in row) {
                rowElement.append(`<td>${row[key]}</td>`);
            }
            tableBody.append(rowElement);
        });
    }

    function renderPagination(totalRows, rowsPerPage) {
        const pagination = $('#pagination');
        pagination.empty();
        const pageCount = Math.ceil(totalRows / rowsPerPage);

        for (let i = 1; i <= pageCount; i++) {
            const button = $('<span class="pagination-button"></span>').text(i);
            if (i === currentPage) {
                button.addClass('active');
            }
            button.on('click', function() {
                currentPage = i;
                renderTable(filteredData, currentPage);
                renderPagination(filteredData.length, rowsPerPage);
            });
            pagination.append(button);
        }
    }

    function filterData(searchTerm) {
        return data.filter(row => {
            return Object.values(row).some(val => 
                val.toString().toLowerCase().includes(searchTerm.toLowerCase())
            );
        });
    }

    $.getJSON('dataset.json', function(response) {
        data = response;
        filteredData = data.map(item => ({
            SALE_PRICE:item.SALE_PRICE,
            BOROUGH:item.BOROUGH
        }))
        
        renderTable(filteredData, currentPage);
        renderPagination(filteredData.length, rowsPerPage);
    });

    $('#search').on('input', function() {
        const searchTerm = $(this).val();
        filteredData = filterData(searchTerm);
        currentPage = 1;
        renderTable(filteredData, currentPage);
        renderPagination(filteredData.length, rowsPerPage);
    });
});


// $(document).ready(function () {
//     $("#data-table").DataTable({
//       responsive: true,
//       ajax: {
//         url: "./dataset.json",
//         dataSrc: "",
//       },
//       columns: [
//         { data: "BOROUGH" },
//         { data: "NEIGHBORHOOD" },
//         // { data: "building_class_category" },
//         // { data: "address" },
//         // { data: "residential_units" },
//         // { data: "commercial_units" },
//         // { data: "total_units" },
//         // { data: "year_build" },
//         // { data: "tax_class" },
//         // { data: "building_class" },
//         // { data: "sale_price" },
//         // { data: "sale_date" },
//       ],
//     });
//   });
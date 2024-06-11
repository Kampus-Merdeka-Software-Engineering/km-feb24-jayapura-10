/** 
 * ! Jangan di SENTUH, berani nyentuh script nya tak tampol ntar 
 * 
*/
 //* mengambil option value dari dataset

 var select = document.getElementById("category");

 // Lakukan request AJAX untuk mengambil dataset JSON
 var xhr = new XMLHttpRequest();
 xhr.open("GET", "dataset.json", true);
 xhr.onreadystatechange = function () {
   if (xhr.readyState === 4 && xhr.status === 200) {
     // Parsing JSON
     var data = JSON.parse(xhr.responseText);
 
     // Ambil semua nilai kategori BUILDING_CLASS_CATEGORY
     var buildingCategories = data.map(function(item) {
       return item.BUILDING_CLASS_CATEGORY;
     });
 
     // Hapus nilai duplikat
     buildingCategories = [...new Set(buildingCategories)];
 
     // Tambahkan opsi dari dataset JSON ke elemen select
     buildingCategories.forEach(function(category) {
       var option = document.createElement("option");
       option.text = category;
       option.value = category;
       select.appendChild(option);
     });
   }
 };
 xhr.send();


 //*chart


document.addEventListener('DOMContentLoaded', function () {
    let dataset;
    fetch('dataset.json')
        .then(response => response.json())
        .then(data => {
            dataset = data;
            let filteredData = dataset;
            
            //* function untuk angka tidak kebanyakan nol nya
            function abbreviateNumber(value) {
                // Jika nilai lebih dari atau sama dengan satu miliar
                if (value >= 1e9) {
                    return (value / 1e9).toFixed(1).replace(/\.0$/, '') + 'B';
                }
                // Jika nilai lebih dari atau sama dengan satu juta
                if (value >= 1e6) {
                    return (value / 1e6).toFixed(1).replace(/\.0$/, '') + 'M';
                }
                // Jika nilai lebih dari atau sama dengan satu ribu
                if (value >= 1e3) {
                    return (value / 1e3).toFixed(1).replace(/\.0$/, '') + 'K';
                }
                // Nilai kurang dari satu ribu
                return value;
            }

            //* fungsi utuk responsive scatter plot
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


                 //* MAIN CHART
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
                        responsive:true,
                        maintainAspectRatio : false,
                        scales: {
                            x: {
                                title: {
                                    display: true,
                                    text: 'SALE DATE',
                                    color: '#333',
                                    font: {
                                        size: 16,
                                        weight: 'bold'
                                    }
                                }, ticks:{
                                    color:'#333',
                                    beginAtZero: true

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
                                }, ticks:{
                                    color:'#333',
                                    beginAtZero: true

                                }
                            }
                        }
                    }
                });


                //* TOP 5 BOROUGH  BY SALE PRICE
                
                const boroughGroupedData = filteredData.reduce((acc, item) => {
                    const borough = item.BOROUGH;
                    if (!acc[borough]) {
                        acc[borough] = {
                            BOROUGH: borough,
                            TOTAL_SALE_PRICE: 0
                        };
                    }
                    acc[borough].TOTAL_SALE_PRICE += parseInt(item.SALE_PRICE, 10);
                    return acc;
                }, {});

                // Mengonversi objek menjadi array, kemudian mengurutkan dan memilih 5 borough dengan SALE_PRICE tertinggi
                const sortedBoroughData = Object.values(boroughGroupedData)
                    .sort((a, b) => b.TOTAL_SALE_PRICE - a.TOTAL_SALE_PRICE)
                    .slice(0, 5);

                const boroughLabelsVertical = sortedBoroughData.map(item => item.BOROUGH);
                const boroughDataVertical = sortedBoroughData.map(item => item.TOTAL_SALE_PRICE);

                // Update Vertical Bar Chart
                const barChartVerticalCtx = document.getElementById('bar-chart-vertical').getContext('2d');
                if (window.barChartVertical) {
                    window.barChartVertical.destroy();
                }
                window.barChartVertical = new Chart(barChartVerticalCtx, {
                    type: 'bar',
                    data: {
                        labels: boroughLabelsVertical,
                        datasets: [{
                            label: 'Top 5 Boroughs by Sale Price',
                            data: boroughDataVertical,
                            backgroundColor: 'rgba(54, 162, 235, 0.2)',
                            borderColor: 'rgba(54, 162, 235, 1)',
                            borderWidth: 1
                        }]
                    }, 
                    /* styling warna judul chart */
                    
                    options: {
                        responsive:true,
                        maintainAspectRatio : false,
                        plugins: {
                            legend: {
                                labels: {
                                    color: '#333'
                                }
                            }
                        },
                        /* styling warna axis */
                        scales: {
                            y: {
                                beginAtZero: true,
                                ticks:{
                                    color:'#333',
                                    beginAtZero: true,
                                    
                                callback: function(value, index, values) {
                                    // Lakukan singkatan nilai di sini
                                    return abbreviateNumber(value);
                                }

                                },
                            },
                            x: {
                            beginAtZero: true,
                                ticks:{
                                    color:'#333',
                                    beginAtZero: true

                                }
                            }
                        }
                    }
                });


                 
                //* TOP 5 NEIGHBORHOOD
                const barChartHorizontalCtx = document.getElementById('bar-chart-horizontal').getContext('2d');
                if (window.barChartHorizontal) {
                    window.barChartHorizontal.destroy();
                }
                const sortedData = filteredData.sort((a, b) => b.SALE_PRICE - a.SALE_PRICE);

                window.barChartHorizontal = new Chart(barChartHorizontalCtx, {
                    type: 'bar',
                    data: {
                        // labels: filteredData.map(item => item.NEIGHBORHOOD).slice(0, 5),
                        labels: sortedData.map(item => item.NEIGHBORHOOD).slice(0, 5), // Menggunakan sortedData
                        datasets: [{
                            label: 'Top 5 Neighborhood',
                            // data: filteredData.map(item => item.SALE_PRICE).slice(0, 5),
                            data: sortedData.map(item => item.SALE_PRICE).slice(0, 5), // Menggunakan sortedData
                            backgroundColor: 'rgba(255, 99, 132, 0.2)',
                            borderColor: 'rgba(255, 99, 132, 1)',
                            borderWidth: 1
                        }]
                    },
                    options: {
                        responsive:true,
                        maintainAspectRatio : false,
                        indexAxis: 'y',
                        scales: {
                            x: {
                                beginAtZero: true,
                                ticks: {
                                    color: '#333', // Warna putih untuk sumbu X
                                    beginAtZero: true,
                                    callback: function(value, index, values) {
                                        // Lakukan singkatan nilai di sini
                                        return abbreviateNumber(value);
                                    }
                                }
                            },
                            y: {
                                ticks: {
                                    color: '#333' // Warna putih untuk sumbu Y
                                }
                            }
                        }
                    }
                });


                //* TOP 5 BUILDING CATEGORY
                // const barChartHorizontal1Ctx = document.getElementById('bar-chart-horizontal-1').getContext('2d');
                // if (window.barChartHorizontal1) {
                //     window.barChartHorizontal1.destroy();
                // }
                // window.barChartHorizontal1 = new Chart(barChartHorizontal1Ctx, {
                //     type: 'bar',
                //     data: {
                //         labels: filteredData.map(item => item.BUILDING_CLASS_CATEGORY).slice(0, 5),
                //         datasets: [{
                //             label: 'Top 5 Building Categories',
                //             data: filteredData.map(item => item.SALE_PRICE).slice(0, 5),
                //             backgroundColor: 'rgba(54, 162, 235, 0.2)',
                //             borderColor: 'rgba(54, 162, 235, 1)',
                //             borderWidth: 1
                //         }]
                //     },
                //     options: {
                //         indexAxis: 'y',
                //         scales: {
                //             x: {
                //                 beginAtZero: true,
                //                 ticks: {
                //                     color: '#fff' // Warna putih untuk sumbu Y
                //                 }
                //             },
                //             y: {
                //                 ticks: {
                //                     color: '#fff' // Warna putih untuk sumbu Y
                //                 }
                //             }
                //         }
                //     }
                // });
                const barChartHorizontal1Ctx = document.getElementById('bar-chart-horizontal-1').getContext('2d');
                if (window.barChartHorizontal1) {
                    window.barChartHorizontal1.destroy();
                }

                // Mengelompokkan data dan menghitung total SALE_PRICE untuk setiap kategori
                let categoryTotals = {};
                filteredData.forEach(item => {
                    let category = item.BUILDING_CLASS_CATEGORY;
                    let salePrice = parseFloat(item.SALE_PRICE);
                    if (!categoryTotals[category]) {
                        categoryTotals[category] = 0;
                    }
                    categoryTotals[category] += salePrice;
                });

                // Mengonversi objek ke array, mengurutkan berdasarkan total SALE_PRICE, dan mengambil 5 teratas
                let topCategories = Object.keys(categoryTotals)
                    .map(category => ({ category: category, total: categoryTotals[category] }))
                    .sort((a, b) => b.total - a.total)
                    .slice(0, 5);

                // Menyiapkan data untuk chart
                let categoryLabels = topCategories.map(item => item.category);
                let categoryData = topCategories.map(item => item.total);

                window.barChartHorizontal1 = new Chart(barChartHorizontal1Ctx, {
                    type: 'bar',
                    data: {
                        labels: categoryLabels,
                        datasets: [{
                            label: 'Top 5 Building Categories',
                            data: categoryData,
                            backgroundColor: 'rgba(54, 162, 235, 0.2)',
                            borderColor: 'rgba(54, 162, 235, 1)',
                            borderWidth: 1
                        }]
                    },
                    options: {
                        indexAxis: 'y',
                        scales: {
                            x: {
                                beginAtZero: true,
                                ticks: {
                                    color: '#333', // Warna putih untuk sumbu X
                                    callback: function(value, index, values) {
                                        // Lakukan singkatan nilai di sini
                                        return abbreviateNumber(value);
                                    }
                                }
                            },
                            y: {
                                ticks: {
                                    color: '#333' // Warna putih untuk sumbu Y
                                }
                            }
                        }
                    }
                });
                        

                //! bar chart lama
                // const barChartHorizontal2Ctx = document.getElementById('bar-chart-horizontal-2').getContext('2d');
                // if (window.barChartHorizontal2) {
                //     window.barChartHorizontal2.destroy();
                // }
                // window.barChartHorizontal2 = new Chart(barChartHorizontal2Ctx, {
                //     type: 'bar',
                //     data: {
                //         labels: filteredData.map(item => item.BUILDING_CLASS_AT_TIME_OF_SALE),
                //         datasets: [{
                //             label: 'Borough by Sale Price',
                //             data: filteredData.map(item => item.SALE_PRICE),
                //             backgroundColor: 'rgba(75, 192, 192, 0.2)',
                //             borderColor: 'rgba(75, 192, 192, 1)',
                //             borderWidth: 1
                //         }]
                //     },
                //     options: {
                //         indexAxis: 'y',
                //         scales: {
                //             x: {
                //                 beginAtZero: true
                //             }
                //         }
                //     }
                // });

                //! scatter plot
                const buildingClassData = filteredData.reduce((acc, item) => {
                    const buildingClass = item.BUILDING_CLASS_AT_TIME_OF_SALE;
                    if (!acc[buildingClass]) {
                        acc[buildingClass] = {
                            BUILDING_CLASS: buildingClass,
                            TOTAL_UNITS: 0,
                            TOTAL_SALE_PRICE: 0,
                            TRANSACTION_COUNT: 0
                        };
                    }
                    acc[buildingClass].TOTAL_UNITS += parseInt(item.TOTAL_UNITS, 10);
                    acc[buildingClass].TOTAL_SALE_PRICE += parseInt(item.SALE_PRICE, 10);
                    acc[buildingClass].TRANSACTION_COUNT += 1;
                    return acc;
                }, {});
            
                // Mengonversi objek menjadi array, kemudian mengurutkan dan memilih 5 transaksi tertinggi
                const top5BuildingClasses = Object.values(buildingClassData)
                    .sort((a, b) => b.TOTAL_SALE_PRICE - a.TOTAL_SALE_PRICE)
                    .slice(0, 5);
            
                // Menghitung data untuk scatter plot
                const scatterData = top5BuildingClasses.map(item => ({
                    x: item.TOTAL_UNITS / item.TRANSACTION_COUNT,
                    y: item.TOTAL_SALE_PRICE / item.TRANSACTION_COUNT,
                    r: item.TRANSACTION_COUNT * 5, // Ukuran titik berdasarkan jumlah transaksi
                    buildingClass: item.BUILDING_CLASS // Menyimpan informasi nama
                }));
            
                const colors = [
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(153, 102, 255, 1)'
                ];
            
                const scatterChartCtx = document.getElementById('bar-chart-horizontal-2')?.getContext('2d');
                if (!scatterChartCtx) {
                    console.error('Element with id "bar-chart-horizontal-2" not found.');
                    return;
                }
                if (window.scatterChart) {
                    window.scatterChart.destroy();
                }
                window.scatterChart = new Chart(scatterChartCtx, {
                    type: 'bubble',
                    data: {
                        datasets: scatterData.map((item, index) => ({
                            label: item.buildingClass,
                            data: [item],
                            backgroundColor: colors[index % colors.length]
                        }))
                    },
            
                    options: {
                        responsive : true,
                        maintainAspectRatio : false,
                       
                        scales: {
                            x: {
                                title: {
                                    display: true,
                                    text: 'Average Total Units',
                                    color: '#333',
                                    font: {
                                        size: 16,
                                        weight: 'bold'
                                    }
                                },
                                ticks: {
                                    color: '#333',
                                    beginAtZero: true
                                }
                            },
                            y: {
                                title: {
                                    display: true,
                                    text: 'Average Sale Price',
                                    color: '#333',
                                    font: {
                                        size: 16,
                                        weight: 'bold'
                                    }
                                },
                                ticks: {
                                    color: '#333',
                                    beginAtZero: true,
                                    callback: function(value, index, values) {
                                        return abbreviateNumber(value);
                                    }
                                }
                            }
                        },
                        plugins: {
                            tooltip: {
                                callbacks: {
                                    label: function(context) {
                                        const label = context.dataset.label || '';
                                        const x = context.raw.x.toFixed(2);
                                        const y = context.raw.y.toFixed(2);
                                        const r = context.raw.r;
                                        return `${label}: (Avg Units: ${x}, Avg Price: ${y}, Transactions: ${r / 5})`;
                                    }
                                }
                            }
                        }
                    }
                    
                });
                
            
            
            
            // Filter Data Function (Assuming you have a function that filters the data based on user inputs)
            function filteredData() {
                // Implement your data filtering logic here
                return filterData;
            }

                //! pie chart
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
                  
                  // Pie chart
                  const pieChartData = {
                    labels: boroughLabels.map((label, index) => `Borough ${label}`),
                    datasets: [{
                      label: 'Borough Distribution',
                      data: boroughData,
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
                        responsive : true,
                        maintainAspectRatio : false,
                        plugins: {
                        title: {
                            display: true,
                                    text: 'Sales Distribution by Borough',
                                    color: '#333',
                                    font: {
                                        size: 16,
                                        weight: 'bolder'
                                    }
                          },
                        legend: {
                          display: true,
                          position: 'right'
                        },
                        tooltip: {
                          enabled: true,
                          callbacks: {
                            label: function(context) {
                              let label = context.label || '';
                              let value = context.parsed || 0;
                              let percentage = value / total * 100;
                              percentage = parseFloat(percentage.toFixed(2));
                              return `${label}: ${value} (${percentage}%)`;
                            }
                          }
                        }
                      }
                    }
                  });
                  
               

                // Update Line Chart 2
                
           
            let boroughDataa = {};
            filteredData.forEach(item => {
                let borough = item.BOROUGH;
                let date = new Date(item.SALE_DATE);
                let year = date.getFullYear();
                let month = date.getMonth();
                let quarter = Math.floor(month / 3) + 1;
                let quarterKey = `${borough}-${year}-Q${quarter}`;
                if (!boroughDataa[quarterKey]) {
                    boroughDataa[quarterKey] = {
                        count: 0,
                        totalSalePrice: 0
                    };
                }
                boroughDataa[quarterKey].count++;
                boroughDataa[quarterKey].totalSalePrice += parseFloat(item.SALE_PRICE);
            });

            // Menghitung rata-rata SALE_PRICE untuk setiap quarter dan borough
            let averageData = {};
            Object.keys(boroughDataa).forEach(key => {
                let borough = key.split('-')[0];
                let year = key.split('-')[1];
                let quarter = key.split('-')[2];
                let quarterLabel = `Q${quarter} ${year}`;
                if (!averageData[borough]) {
                    averageData[borough] = {
                        labels: [],
                        data: []
                    };
                }
                averageData[borough].labels.push(quarterLabel);
                averageData[borough].data.push(boroughDataa[key].totalSalePrice / boroughDataa[key].count);
            });

            // Mengurutkan label berdasarkan tahun
            Object.keys(averageData).forEach(borough => {
                averageData[borough].labels.sort((a, b) => {
                    // Parsing tahun dari label
                    let yearA = parseInt(a.split(' ')[1]);
                    let yearB = parseInt(b.split(' ')[1]);
                    if (yearA !== yearB) {
                        return yearA - yearB;
                    } else {
                        // Jika tahun sama, urutkan berdasarkan kuartal
                        let quarterA = parseInt(a.split(' ')[0].substring(1));
                        let quarterB = parseInt(b.split(' ')[0].substring(1));
                        return quarterA - quarterB;
                    }
                });
            });

            // Menyiapkan data untuk chart
            let datasets = [];
            Object.keys(averageData).forEach((borough, index) => {
                datasets.push({
                    label:  `Borough ${borough}`,
                    data: averageData[borough].data,
                    borderColor: getBrightColor(index), // Menggunakan warna yang lebih terang
                    backgroundColor: getBrightColor(index, 0.2), // Menggunakan warna yang lebih terang dengan opacity 0.2
                    tension: 0.1
                });
            });

            // Fungsi untuk mendapatkan warna yang lebih terang
            function getBrightColor(index, alpha = 1) {
                // Daftar warna yang lebih terang (dipilih secara manual)
                const brightColors = [
                    'rgba(255, 99, 132, ' + alpha + ')',
                    'rgba(54, 162, 235, ' + alpha + ')',
                    'rgba(255, 205, 86, ' + alpha + ')',
                    'rgba(75, 192, 192, ' + alpha + ')',
                    'rgba(153, 102, 255, ' + alpha + ')'
                ];
                // Memastikan index berada dalam rentang yang valid
                return brightColors[index % brightColors.length];
            }

            // Membuat line chart menggunakan Chart.js
            const lineChart2Ctx = document.getElementById('line-chart-2').getContext('2d');
            if (window.lineChart2) {
                window.lineChart2.destroy();
            }
            window.lineChart2 = new Chart(lineChart2Ctx, {
                type: 'line',
                data: {
                    labels: averageData[Object.keys(averageData)[0]].labels, // Mengambil label dari salah satu borough (karena label sama untuk semua borough)
                    datasets: datasets
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'SUM OF Sale Price',
                                color: '#333',
                                callback: function(value, index, values) {
                                    // Lakukan singkatan nilai di sini
                                    return abbreviateNumber(value);
                                }
                            },ticks: {
                                color: '#333',
                                beginAtZero: true,
                                callback: function(value, index, values) {
                                    // Lakukan singkatan nilai di sini
                                    return abbreviateNumber(value);
                                }
                            }
                        },
                        x: {
                            beginAtZero: true,
                                ticks:{
                                    color:'#333',
                                    beginAtZero: true

                                }
                            }
                    }
                }
            });

            
            

         // Update Score Cards
                // document.getElementById('total-revenue').innerText = `$${filteredData.reduce((acc, item) => acc + parseInt(item.SALE_PRICE), 0)}`;
                document.getElementById('total-revenue').innerText = `${filteredData.reduce((acc, item) => acc + parseInt(item.SALE_PRICE), 0).toLocaleString('en-US', {style: 'currency', currency: 'USD'})}`;
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

document.addEventListener('DOMContentLoaded', function() {
    const rowsPerPage = 10;
    let currentPage = 1;
    let data = [];
    let filteredData = [];

    function renderTable(data, page = 1) {
        const tableBody = document.querySelector('#data-table tbody');
        tableBody.innerHTML = '';
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        const paginatedData = data.slice(start, end);

        paginatedData.forEach(row => {
            const rowElement = document.createElement('tr');
            for (let key in row) {
                const cell = document.createElement('td');
                cell.textContent = row[key];
                rowElement.appendChild(cell);
            }
            tableBody.appendChild(rowElement);
        });
    }

    function renderPagination(totalRows, rowsPerPage) {
        const pagination = document.getElementById('pagination');
        pagination.innerHTML = '';
        const pageCount = Math.ceil(totalRows / rowsPerPage);
        const maxButtons = 5;
        let startPage = Math.max(currentPage - Math.floor(maxButtons / 2), 1);
        let endPage = Math.min(startPage + maxButtons - 1, pageCount);

        if (endPage - startPage < maxButtons - 1) {
            startPage = Math.max(endPage - maxButtons + 1, 1);
        }

        if (currentPage > 1) {
            const prevButton = document.createElement('span');
            prevButton.className = 'pagination-arrow';
            prevButton.textContent = '«';
            prevButton.addEventListener('click', function() {
                currentPage = currentPage - 1;
                renderTable(filteredData, currentPage);
                renderPagination(filteredData.length, rowsPerPage);
            });
            pagination.appendChild(prevButton);
        }

        for (let i = startPage; i <= endPage; i++) {
            const button = document.createElement('span');
            button.className = 'pagination-button';
            button.textContent = i;
            if (i === currentPage) {
                button.classList.add('active');
            }
            button.addEventListener('click', function() {
                currentPage = i;
                renderTable(filteredData, currentPage);
                renderPagination(filteredData.length, rowsPerPage);
            });
            pagination.appendChild(button);
        }

        if (currentPage < pageCount) {
            const nextButton = document.createElement('span');
            nextButton.className = 'pagination-arrow';
            nextButton.textContent = '»';
            nextButton.addEventListener('click', function() {
                currentPage = currentPage + 1;
                renderTable(filteredData, currentPage);
                renderPagination(filteredData.length, rowsPerPage);
            });
            pagination.appendChild(nextButton);
        }
    }

    function filterData(searchTerm) {
        return data.filter(row => {
            return Object.values(row).some(val => 
                val.toString().toLowerCase().includes(searchTerm.toLowerCase())
            );
        });
    }

    fetch('dataset.json')
        .then(response => response.json())
        .then(responseData => {
            data = responseData;
            filteredData = data.map(item => ({ 
                BOROUGH: item.BOROUGH,
                NEIGHBORHOOD: item.NEIGHBORHOOD,
                BUILDING_CLASS_CATEGORY: item.BUILDING_CLASS_CATEGORY,
                TOTAL_UNITS: item.TOTAL_UNITS,
                YEAR_BUILT: item.YEAR_BUILT,
                TAX_CLASS_AT_TIME_OF_SALE: item.TAX_CLASS_AT_TIME_OF_SALE,
                SALE_PRICE: item.SALE_PRICE,
                SALE_DATE: item.SALE_DATE
            }));
            renderTable(filteredData, currentPage);
            renderPagination(filteredData.length, rowsPerPage);
        });

    document.getElementById('search').addEventListener('input', function() {
        const searchTerm = this.value;
        filteredData = filterData(searchTerm).map(item => ({
            BOROUGH: item.BOROUGH,
            NEIGHBORHOOD: item.NEIGHBORHOOD,
            BUILDING_CLASS_CATEGORY: item.BUILDING_CLASS_CATEGORY,
            TOTAL_UNITS: item.TOTAL_UNITS,
            YEAR_BUILT: item.YEAR_BUILT,
            TAX_CLASS_AT_TIME_OF_SALE: item.TAX_CLASS_AT_TIME_OF_SALE,
            SALE_PRICE: item.SALE_PRICE,
            SALE_DATE: item.SALE_DATE
        }));
        currentPage = 1;
        renderTable(filteredData, currentPage);
        renderPagination(filteredData.length, rowsPerPage);
    });
});

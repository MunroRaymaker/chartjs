    /* Charts based on chart.js */

    // chart colors
    // Original
    //var colors = ['#007bff','#28a745','#333333','#c3e6cb','#dc3545','#6c757d'];
    var colors = ['#47ACB1','#F26522','#F9AA7B','#A5A8AA','#686766','#ADD5D7','#FFE8AF','#FFCD34'];
    
    // More contrast
    //var colors = ['#47ACB1','#F26522','#542923','#286C4F','#676766','#C9222B','#96247A','#FFCD34'];

    // get data from API
    function getData(url) {
        var dataValue = [];
        var countValue = [];
        $.ajax({
            url: url,
            dataType: 'json',
            async: false
        }).done(function(data){
            data.forEach(function(data){                                        
                dataValue.push(data.X),
                countValue.push(data.Y)
            });
        });
        return {
            dataValue: dataValue,
            countValue: countValue
        };
    }

    var dataL1_S1 = getData('/api/Report/ChartL1_S1'); // reservation
    var dataL1_S2 = getData('/api/Report/ChartL1_S2'); // confirmation
    var dataL1_S3 = getData('/api/Report/ChartL1_S3'); // cancellation
    var dataB2_S1 = getData('/api/Report/ChartB2/TCAS');
    var dataB2_S2 = getData('/api/Report/ChartB2/TCUK');
    var dataB2_S3 = getData('/api/Report/ChartB2/NOVAIR');
    var dataB2_S4 = getData('/api/Report/ChartB2/ATLANTIC');
    var dataD3 = getData('/api/Report/ChartD3');
    var dataD4 = getData('/api/Report/ChartD4');
    var dataD5 = getData('/api/Report/ChartD5');

    /* large line chart */
    var chLine = document.getElementById('chLine');
    var chartData = {
    labels: dataL1_S1.dataValue,
    datasets: [
    {
        label: 'Reservation',
        data: dataL1_S1.countValue,
        backgroundColor: 'transparent',
        borderColor: colors[4],
        borderWidth: 4,
        pointBackgroundColor: colors[4]
    },
    {
        label: 'Cancellation',
        data: dataL1_S3.countValue,
        backgroundColor: 'transparent',
        borderColor: colors[0],
        borderWidth: 4,
        pointBackgroundColor: colors[0]
    },
    {
        label: 'Confirmation',
        data: dataL1_S2.countValue,
        backgroundColor: colors[2],
        borderColor: colors[1],
        borderWidth: 4,
        pointBackgroundColor: colors[2]
    }
    ]
    };
    
    if (chLine) {
        new Chart(chLine, {
            type: 'line',
            data: chartData,
            options: {
                scales: {
                    xAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Day of week'
                        },
                        ticks: {
                        beginAtZero: false
                        }
                    }],
                    yAxes: [{
                        display: true,
                        scaleLabel: {
                            display: false,
                            labelString: 'Count'
                        }
                    }],
                },
                legend: {
                    display: true,
                    position: 'top'
                },
                responsive: true,
                title: {
                    display: true,
                    text: 'Total # of sent notification emails per week'
                }
            }
    });
    }

    /* bar chart */
    var chBar = document.getElementById('chBar');
    if (chBar) {
        new Chart(chBar, {
            type: 'bar',
            data: {
                labels: dataB2_S1.dataValue,
                datasets: [
                {
                    label: 'TCAS',
                    data: dataB2_S1.countValue,
                    backgroundColor: colors[0]
                },
                {
                    label: 'TCUK',
                    data: dataB2_S2.countValue,
                    backgroundColor: colors[1]
                },
                {
                    label: 'NOVAIR',
                    data: dataB2_S3.countValue,
                    backgroundColor: colors[2]
                },
                {
                    label: 'ATLANTIC',
                    data: dataB2_S4.countValue,
                    backgroundColor: colors[3]
                }
                ]
            },
            options: {
                legend: {
                    display: true,
                    position: 'top'
                },
                scales: {
                    xAxes: [{
                        barPercentage: 0.4,
                        categoryPercentage: 0.5
                    }]
                },

                title: {
                    display: true,
                    text: 'Total # of notifications by market'
                }
            }
        });
    }

    /* 3 donut charts */
    
    var donutOptions = {
        //cutoutPercentage: 85, 
        legend: {
            position:'bottom', 
            padding:5, 
            labels: {
                pointStyle:'circle', 
                usePointStyle:true
            }
        }
    };

    // donut 1
    var chDonutData1 = {
        labels: dataD3.dataValue, 
        datasets: [
            {
            backgroundColor: [colors[0],colors[1],colors[7]],
            borderWidth: 0,
            data: dataD3.countValue
            }
        ]
    };

    var chDonut1 = document.getElementById('chDonut1');
    if (chDonut1) {
        new Chart(chDonut1, {
            type: 'doughnut',
            data: chDonutData1,
            options: donutOptions
        });
    }

    // donut 2
    var chDonutData2 = {
        labels: dataD4.dataValue,
        datasets: [
        {
            backgroundColor: colors.slice(0,3),
            borderWidth: 0,
            data: dataD4.countValue
        }
        ]
    };

    var chDonut2 = document.getElementById('chDonut2');
    if (chDonut2) {
        new Chart(chDonut2, {
            type: 'doughnut',
            data: chDonutData2,
            options: donutOptions
        });
    }

    // donut 3
    var chDonutData3 = {
        labels: dataD5.dataValue,
        datasets: [
        {
            backgroundColor: colors.slice(3,6),
            borderWidth: 0,
            data: dataD5.countValue
        }
        ]
    };

    var chDonut3 = document.getElementById('chDonut3');
    if (chDonut3) {
        new Chart(chDonut3, {
            type: 'pie',
            data: chDonutData3,
            options: donutOptions
        });
    }

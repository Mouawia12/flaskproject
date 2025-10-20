const getOrCreateTooltip = (chart) => {
    let tooltipEl = chart.canvas.parentNode.querySelector('.tooltip-np');
    if (!tooltipEl) {
        tooltipEl = document.createElement('div');
        tooltipEl.className = 'tooltip-np';
        tooltipEl.style.background = 'rgba(255,255,255)';
        tooltipEl.style.borderRadius = '3px';
        tooltipEl.style.color = '#868e96';
        tooltipEl.style.opacity = 1;
        tooltipEl.style.pointerEvents = 'none';
        tooltipEl.style.position = 'absolute';
        tooltipEl.style.transform = 'translate(-50%, 0)';
        tooltipEl.style.transition = 'all .1s ease';
        tooltipEl.style.width = '150px';
        const table = document.createElement('table');
        table.style.margin = '0px';
        tooltipEl.appendChild(table);
        chart.canvas.parentNode.appendChild(tooltipEl);
    }
    return tooltipEl;
};

const externalTooltipHandler = (context) => {
    // Tooltip Element
    const { chart, tooltip } = context;
    const tooltipEl = getOrCreateTooltip(chart);

    // Hide if no tooltip
    if (tooltip.opacity === 0) {
        tooltipEl.style.opacity = 0;
        return;
    }

    // Set Text
    if (tooltip.body) {
        const titleLines = tooltip.title || [];
        const bodyLines = tooltip.body.map(b => b.lines);

        const tableHead = document.createElement('thead');

        titleLines.forEach(title => {
            const tr = document.createElement('tr');
            tr.style.borderWidth = 0;

            const th = document.createElement('th');
            th.style.borderWidth = 0;
            const text = document.createTextNode(title);

            th.appendChild(text);
            tr.appendChild(th);
            tableHead.appendChild(tr);
        });

        const tableBody = document.createElement('tbody');
        bodyLines.forEach((body, i) => {
            const colors = tooltip.labelColors[i];

            const span = document.createElement('span');
            span.style.background = colors.backgroundColor;
            span.style.borderColor = colors.borderColor;
            span.style.borderWidth = '2px';
            span.style.marginRight = '10px';
            span.style.height = '100px';
            span.style.width = '140px';
            span.style.display = 'block';

            const tr = document.createElement('tr');
            tr.style.backgroundColor = 'inherit';
            tr.style.borderWidth = 0;

            const td = document.createElement('td');
            td.style.borderWidth = 0;

            const text = document.createTextNode(body);

            td.appendChild(span);
            td.appendChild(text);
            tr.appendChild(td);
            tableBody.appendChild(tr);
        });

        const tableRoot = tooltipEl.querySelector('table');
 
        // Remove old children
        while (tableRoot.firstChild) {
            tableRoot.firstChild.remove();
        }

        // Add new children
        tableRoot.appendChild(tableHead);
        tableRoot.appendChild(tableBody);
    }

    const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;

    // Display, position, and set styles for font
    tooltipEl.style.opacity = 1;
    tooltipEl.style.left = positionX + tooltip.caretX + 'px';
    tooltipEl.style.top = positionY + tooltip.caretY + 'px';
    tooltipEl.style.font = tooltip.options.bodyFont.string;
    tooltipEl.style.padding = tooltip.options.padding + 'px ' + tooltip.options.padding + 'px';
};


const tooltipContent = (tooltipItems) => {
let sum = 0;
console.log("tooltipContent");

tooltipItems.forEach(function (tooltipItem) {
    sum += tooltipItem.parsed.y;
});
return 'Sum: ' + sum;
};


$("#main_color_div .color-wrap .color-circle2").on("click", function () {
$("#main_color_div").toggle();
$(".colors-mobile-section").toggle();
var target = $(this).data("target");
console.log(target);

var target2 = '#' + target;
$("a[href = '" + target2 + "']").addClass("active");
$("#" + target + "").addClass("active show");
});

var ctx1= document.getElementById('myChart1').getContext('2d');
const data1 = {
    datasets: [
{
    data: [
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,100
        ,
        100
    ],
backgroundColor:["#b72c29",
            "#ac272e",
            "#ae2930",
            "#972633",
            "#7b262e",
            "#68222a",
            "#47272c",
            "#7b3a36",
            "#8a2d2e",
            "#d08b72",
            "#a53933",
            "#db7679",
            "#e7a3aa",
            "#b74239",
            ],
            backgroundName:[
                "RAL 3000 Flame red",
                "RAL 3001 Signal red",
                "RAL 3002 Carmine red",
                "RAL 3003 Ruby red",
                "RAL 3004 Purple red",
                "RAL 3005 Wine red",
                "RAL 3007 Black red",
                "RAL 3009 Oxide red",
                "RAL 3011 Brown red",
                "RAL 3012 Beige red",
                "RAL 3013 Tomato red",
                "RAL 3014 Antique pink",
                "RAL 3015 Light pink",
                "RAL 3016 Coral red",
],          //cutout: '80%',
            cutout: '60%',
                datalabels: {
                    labels: {
                      title: null
                    }
                 }
},
{
data: [
    100
    ,
    100
    ,
    100
    ,
    100
    ,
    100
    ,
    100
    ,
    100
    ,
    100
    ,
    100
    ,
    100
    ,
    100
],
backgroundColor:[
        "#df5861",
        "#dd4654",
        "#d02227",
        "#de6f5b",
        "#ed1e24",
        "#ed2124",
        "#c12645",
        "#d83337",
        "#b7383f",
        "#7f1927",
        "#bb443e"],
        backgroundName:[
            "RAL 3017 Rose",
            "RAL 3018 Strawberry red",
            "RAL 3020 Traffic red",
            "RAL 3022 Salmon red",
            "RAL 3024 Luminous red",
            "RAL 3026 Luminous bright red",
            "RAL 3027 Raspberry red",
            "RAL 3028 Pure red",
            "RAL 3031 Orient red",
            "RAL 3032 Pearl ruby red",
            "RAL 3033 Pearl pink"],          //cutout: '80%',
        cutout: '60%',
            datalabels: {
                labels: {
                  title: null
                }
             }
},

        ]
    };


const config1 = {
        type: 'doughnut',
        data: data1,
        options: {
            plugins: {
                tooltip: {
                    callbacks: {
                    label: function(tooltipItem, data) {
                        //debugger;
                        //return data['datasets'][0]['data'][tooltipItem['index']];
                        return tooltipItem.dataset.backgroundName[tooltipItem.dataIndex];
                    }


                    },
                enabled: false,
                position: 'nearest',
                external: externalTooltipHandler,
                //events: ["click","mouseout"]

            }

            }
        }
                     };

var myChart1 = new Chart(ctx1, config1);

    var ctx18= document.getElementById('myChart18').getContext('2d');
const data18 = {
    datasets: [
{
    data: [
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
    ],
backgroundColor:["#347765","#197340","#29633a","#4e5840","#104347","#104236","#3e433c","#283524","#363932","#243a2e","#3f763c","#67835b","#333f3f","#7a7b5b","#464438","#3d423c"],backgroundName:["RAL 6000 Patina green","RAL 6001 Emerald green","RAL 6002 Leaf green","RAL 6003 Olive green","RAL 6004 Blue green","RAL 6005 Moss green","RAL 6006 Grey olive","RAL 6007 Bottle green","RAL 6008 Brown green","RAL 6009 Fir green","RAL 6010 Grass green","RAL 6011 Reseda olive","RAL 6012 Black green","RAL 6013 Reed green","RAL 6014 Yellow olive","RAL 6015 Black green"],          //cutout: '80%',
            cutout: '60%',
                datalabels: {
                    labels: {
                      title: null
                    }
                 }
},
{
    data: [
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        
    ],
backgroundColor:["#016b55","#3f8843","#30a348","#b6dbaf","#384635","#87a37b","#403d34","#018754","#55743b","#015e53","#82c0bd","#2c5543","#007447","#0d865b","#498c85","#82b2b6","#015030","#025f4c","#008f47","#2ab34b"],backgroundName:["RAL 6016 Turquoise green","RAL 6017 May green","RAL 6018 Yellow green","RAL 6019 Pastel green","RAL 6020 Chrome green","RAL 6021 Pale green","RAL 6022 Olive drab","RAL 6024 Traffic green","RAL 6025 Fern green","RAL 6026 Opal green","RAL 6027 Light green","RAL 6028 Pine green","RAL 6029 Mint green","RAL 6032 Signal green","RAL 6033 Mint turquoise","RAL 6034 Pastel turquoise green","RAL 6035 Pearl green","RAL 6036 Pearl opal green","RAL 6037 Pure green","RAL 6038 Luminous green"],          //cutout: '75%',
            cutout: '60%',
                datalabels: {
                    labels: {
                      title: null
                    }
                 }
},
        ]
    };


const config18 = {
        type: 'doughnut',
        data: data18,
        options: {
            plugins: {
                tooltip: {
                    callbacks: {
                    label: function(tooltipItem, data) {
                        //debugger;
                        //return data['datasets'][0]['data'][tooltipItem['index']];
                        return tooltipItem.dataset.backgroundName[tooltipItem.dataIndex];
                    }


                    },
                enabled: false,
                position: 'nearest',
                external: externalTooltipHandler,
                //events: ["click","mouseout"]

            }

            }
        }
                     };

var myChart18 = new Chart(ctx18, config18);

    var ctx19= document.getElementById('myChart19').getContext('2d');
const data19 = {
    datasets: [
{
    data: [
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
    ],
backgroundColor:["#e57a25","#c8512a","#d13e2a","#f5843c","#f15d24","#ee2d24","#f8991d","#f47639","#ec5a24","#dd6734","#f47b2d","#e26b54","#9f492d"],backgroundName:["Ral 2000 Yellow orange","Ral 2001 Red orange","Ral 2002 Vermilion","Ral 2003 Pastel orange","Ral 2004 Pure orange","Ral 2005 Luminous orange","Ral 2007 Luminous b't orange","Ral 2008 Bright red orange","Ral 2009 Traffic orange","Ral 2010 Signal orange","Ral 2011 Deep orange","Ral 2012 Salmon orange","Ral 2013 Pearl orange"],          //cutout: '80%',
            cutout: '60%',
                datalabels: {
                    labels: {
                      title: null
                    }
                 }
}
        ]
    };


const config19 = {
        type: 'doughnut',
        data: data19,
        options: {
            plugins: {
                tooltip: {
                    callbacks: {
                    label: function(tooltipItem, data) {
                        //debugger;
                        //return data['datasets'][0]['data'][tooltipItem['index']];
                        return tooltipItem.dataset.backgroundName[tooltipItem.dataIndex];
                    }


                    },
                enabled: false,
                position: 'nearest',
                external: externalTooltipHandler,
                //events: ["click","mouseout"]

            }

            }
        }
                     };

var myChart19 = new Chart(ctx19, config19);

    var ctx25= document.getElementById('myChart25').getContext('2d');
const data25 = {
    datasets: [
{
    data: [
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100,
        
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
    ],
backgroundColor:["#faa21f","#8c714a","#8f8371","#f0aa59","#faa831","#e0b227","#fbab1b","#9c9567","#ebe713","#ba9c50","#efc71c","#efc519","#9c9567","#a6957b","#f4de45"],backgroundName:["RAL 1037 Sun Yellow","RAL 1036 Pearl gold","RAL 1035 Pearl beige","RAL 1034 Pastel yellow","RAL 1033 Dahlia yellow","RAL 1032 Broom yellow","RAL 1028 Melon yellow","RAL 1027 Curry","RAL 1026 Luminous yellow","RAL 1024 Ochre yellow","RAL 1023 Traffic yellow","RAL 1021 Rape yellow","RAL 1020 Olive yellow","RAL 1019 Grey beige","RAL 1018 Zinc yellow"],          //cutout: '80%',
            cutout: '60%',
                datalabels: {
                    labels: {
                      title: null
                    }
                 }
},
{
    data: [
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100,
        
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
    ],
backgroundColor:["rgb(240,224,132)","rgb(237,219,107)","rgb(238,215,83)","rgb(230,209,52)","rgb(245,232,188)","rgb(247,231,172)","rgb(249,225,142)","rgb(246,219,108)","rgb(242,211,80)","rgb(246,209,52)","rgb(233,213,162)","rgb(231,203,137)","rgb(223,185,102)","rgb(204,159,61)","rgb(240,226,181)","rgb(232,211,141)","rgb(219,195,98)","rgb(198,173,88)","rgb(190,158,75)","rgb(171,146,84)","rgb(241,214,164)","rgb(230,176,0)","rgb(203,154,45)","rgb(241,168,18)","rgb(213,150,43)","rgb(183,132,56)","rgb(222,180,30)","rgb(194,156,49)"],backgroundName:["RAL 1017 Saffron yellow","RAL 1016 Sulphur yellow","RAL 1015 Light ivory","RAL 1014 ivory","RAL 1013 Oyster White","RAL 1012 Lemon yellow","RAL 1011 Brown beige","RAL 1007 Daffodil yellow","RAL 1006 Maize yellow","RAL 1005 Honey yellow","RAL 1004 Golden yellow","RAL 1003 Signal yellow","RAL 1002 Sand yellow","RAL 1001 Beige","RAL 1000 Green beige"],          //cutout: '75%',
            cutout: '60%',
                datalabels: {
                    labels: {
                      title: null
                    }
                 }
},

        ]
    };


const config25 = {
        type: 'doughnut',
        data: data25,
        options: {
            plugins: {
                tooltip: {
                    callbacks: {
                    label: function(tooltipItem, data) {
                        //debugger;
                        //return data['datasets'][0]['data'][tooltipItem['index']];
                        return tooltipItem.dataset.backgroundName[tooltipItem.dataIndex];
                    }


                    },
                enabled: false,
                position: 'nearest',
                external: externalTooltipHandler,
                //events: ["click","mouseout"]

            }

            }
        }
                     };

var myChart25 = new Chart(ctx25, config25);

    var ctx29= document.getElementById('myChart29').getContext('2d');
const data29 = {
    datasets: [
{
    data: [
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
    ],
backgroundColor:["#808a94","#909ba1","#82806b","#7c7a6e","#9ca0a3","#9ca0a3","#757263","#756645","#5c635b","#585d57","#585d60","#5b6063","#58564a","#57585d"],backgroundName:["RAL 7000 Squirrel grey","RAL 7001 Silver grey","RAL 7002 Olive grey","RAL 7003 Moss grey","RAL 7004 Signal grey","RAL 7005 Mouse grey","RAL 7006 Beige grey","RAL 7008 Khaki grey","RAL 7009 Green grey","RAL 7010 Tarpaulin grey","RAL 7011 Iron grey","RAL 7012 Basalt grey","RAL 7013 Brown grey","RAL 7015 State grey"],          //cutout: '80%',
            cutout: '60%',
                datalabels: {
                    labels: {
                      title: null
                    }
                 }
},
{
    data: [
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
    ],
backgroundColor:["#3a3f43","#2e3235","#4c4d47","#828479","#494a4f","#494a4f","#959188","#606a74","#bbb9aa","#81897a","#929374","#cbd0ca","#989795","#7e7f81","#b3b8b1"],backgroundName:["RAL 7016 Anthracite grey","RAL 7021 Black grey","RAL 7022 Umbra grey","RAL 7023 Concrete grey","RAL 7024 Graphite grey","RAL 7026 Granite grey","RAL 7030 Stone grey","RAL 7031 Blue grey","RAL 7032 Pebble grey","RAL 7033 Cement grey","RAL 7034 Yellow grey","RAL 7035 Light grey","RAL 7036 Platnium grey","RAL 7037 Dusty grey","RAL 7038 Agtate grey"],          //cutout: '75%',
            cutout: '60%',
                datalabels: {
                    labels: {
                      title: null
                    }
                 }
},
{
    data: [
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
    ],
backgroundColor:["#6e6a61","#9ea3a7","#909598","#4e5452","#bfbcb3","#919699","#d0d0d0","#898077"],backgroundName:["RAL 7039 Quartz grey","RAL 7040 Window grey","RAL 7042 Traffic grey A","RAL 7043 Traffic grey B","RAL 7044 Silk grey","RAL 7045 Telegrey 1","RAL 7046 Telegrey 2","RAL 7047 Telegrey 4","RAL 7048 Pearl mouse grey"],          //cutout: '75%',
            cutout: '60%',
                datalabels: {
                    labels: {
                      title: null
                    }
                 }
},

        ]
    };


const config29 = {
        type: 'doughnut',
        data: data29,
        options: {
            plugins: {
                tooltip: {
                    callbacks: {
                    label: function(tooltipItem, data) {
                        //debugger;
                        //return data['datasets'][0]['data'][tooltipItem['index']];
                        return tooltipItem.dataset.backgroundName[tooltipItem.dataIndex];
                    }


                    },
                enabled: false,
                position: 'nearest',
                external: externalTooltipHandler,
                //events: ["click","mouseout"]

            }

            }
        }
                     };

var myChart29 = new Chart(ctx29, config29);

    var ctx30= document.getElementById('myChart30').getContext('2d');
const data30 = {
    datasets: [
{
    data: [
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
       
    ],
backgroundColor:["#394d6e","#1f4864","#2f2e7c","#293857","#1d1f2c","#164988","#3f698f","#323c48","#2e597b","#17467e","#242c3f"],backgroundName:["Ral 5000 Violet blue","Ral 5001 Green blue","Ral 5002 Ultramarine blue","Ral 5003 Sapphire blue","Ral 5004 Black blue","Ral 5005 Signal blue","Ral 5007 Brilliant blue","Ral 5008 Grey blue","Ral 5009 Azure blue","Ral 5010 Gentian blue","Ral 5011 Steel blue"],          //cutout: '80%',
            cutout: '60%',
                datalabels: {
                    labels: {
                      title: null
                    }
                 }
},
{
    data: [
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        
        
    ],
backgroundColor:["#3580b9","#222b52","#6e7e98","#2975b3","#0f518d","#228990","#0d4250","#0d757e","#2e2b5a","#4e678f","#6893b5","#225b6f","#162c53"],backgroundName:["RAL 5012 Light blue","RAL 5013 Cobalt blue","RAL 5014 Piegeon blue","RAL 5015 Sky blue","RAL 5017 Traffic blue","RAL 5018 Turquoise blue","RAL 5019 Capri blue","RAL 5020 Ocean blue","RAL 5021 Water blue","RAL 5022 Night blue","RAL 5023 Distant blue","RAL 5024 Pastel blue","RAL 5025 Pearl gentian blue","RAL 5026 Pearl night blue"],          //cutout: '75%',
            cutout: '60%',
                datalabels: {
                    labels: {
                      title: null
                    }
                 }
}

        ]
    };


const config30 = {
        type: 'doughnut',
        data: data30,
        options: {
            plugins: {
                tooltip: {
                    callbacks: {
                    label: function(tooltipItem, data) {
                        //debugger;
                        //return data['datasets'][0]['data'][tooltipItem['index']];
                        return tooltipItem.dataset.backgroundName[tooltipItem.dataIndex];
                    }


                    },
                enabled: false,
                position: 'nearest',
                external: externalTooltipHandler,
                //events: ["click","mouseout"]

            }

            }
        }
                     };

var myChart30 = new Chart(ctx30, config30);

    var ctx31= document.getElementById('myChart31').getContext('2d');
const data31 = {
    datasets: [
{
    data: [
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
    ],
backgroundColor:["rgb(201,228,228)","rgb(191,223,227)","rgb(181,221,227)","rgb(169,209,214)","rgb(189,221,221)","rgb(175,215,220)","rgb(157,203,210)","rgb(209,231,225)","rgb(199,229,224)","rgb(183,224,222)","rgb(159,215,217)","rgb(216,235,223)","rgb(196,230,216)","rgb(183,228,213)","rgb(176,231,216)","rgb(215,234,222)","rgb(199,229,216)","rgb(188,226,212)","rgb(184,224,209)","rgb(182,223,226)","rgb(153,213,222)","rgb(141,201,211)","rgb(112,195,209)","rgb(184,225,223)","rgb(155,218,217)","rgb(125,213,213)","rgb(92,195,195)","rgb(41,177,180)","rgb(45,160,168)","rgb(185,229,223)"],backgroundName:["NP A22.3","NP A22.4","NP A22.5","NP A22.6","NP A23.4","NP A23.5","NP A23.6","NP A24.3","NP A24.4","NP A24.5","NP A24.6","NP A25.3","NP A25.4","NP A25.5","NP A25.6","NP A26.3","NP A26.4","NP A26.5","NP A26.6","NP B24.1","NP B24.2","NP B24.3","NP B24.4","NP B25.1","NP B25.2","NP B25.3","NP B25.4","NP B25.5","NP B25.6","NP B26.1"],          //cutout: '80%',
            cutout: '60%',
                datalabels: {
                    labels: {
                      title: null
                    }
                 }
},
{
    data: [
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
    ],
backgroundColor:["rgb(163,225,217)","rgb(116,208,196)","rgb(87,195,183)","rgb(65,194,185)","rgb(0,164,156)","rgb(163,224,208)","rgb(134,218,199)","rgb(103,202,182)","rgb(93,203,174)","rgb(59,173,148)","rgb(128,179,198)","rgb(108,168,193)","rgb(77,135,161)","rgb(92,168,185)","rgb(70,147,165)","rgb(194,226,221)","rgb(171,212,212)","rgb(143,204,205)","rgb(108,189,193)","rgb(89,174,177)","rgb(71,154,159)","rgb(206,230,220)","rgb(165,212,204)","rgb(145,206,199)","rgb(124,190,184)","rgb(96,177,172)","rgb(73,153,149)","rgb(194,224,212)","rgb(176,216,205)","rgb(155,212,198)"],backgroundName:["NP B26.2","NP B26.3","NP B26.4","NP B26.5","NP B26.6","NP B27.2","NP B27.3","NP B27.4","NP B27.5","NP B27.6","NP C24.4","NP C24.5","NP C24.6","NP C25.5","NP C25.6","NP C26.1","NP C26.2","NP C26.3","NP C26.4","NP C26.5","NP C26.6","NP C27.1","NP C27.2","NP C27.3","NP C27.4","NP C27.5","NP C27.6","NP C28.1","NP C28.2","NP C28.3"],          //cutout: '75%',
            cutout: '60%',
                datalabels: {
                    labels: {
                      title: null
                    }
                 }
},
{
    data: [
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
    ],
backgroundColor:["rgb(132,195,181)","rgb(94,177,162)","rgb(78,156,142)","rgb(181,209,209)","rgb(150,191,192)","rgb(131,167,169)","rgb(109,144,147)","rgb(94,127,130)","rgb(74,106,109)","rgb(176,206,201)","rgb(149,187,183)","rgb(132,168,165)","rgb(106,144,141)","rgb(94,128,126)","rgb(77,106,106)","rgb(177,210,205)","rgb(149,190,181)","rgb(131,168,160)","rgb(0,153,166)","rgb(8,142,153)","rgb(0,138,147)","rgb(0,121,131)","rgb(0,107,116)","rgb(0,92,98)","rgb(0,166,158)","rgb(18,145,139)","rgb(0,143,137)","rgb(0,121,116)","rgb(30,105,101)","rgb(17,96,92)"],backgroundName:["NP C28.4","NP C28.5","NP C28.6","NP D17.1","NP D17.2","NP D17.3","NP D17.4","NP D17.5","NP D17.6","NP D18.1","NP D18.2","NP D18.3","NP D18.4","NP D18.5","NP D18.6","NP D19.1","NP D19.2","NP D19.3","NP E16.1","NP E16.2","NP E16.3","NP E16.4","NP E16.5","NP E16.6","NP E17.1","NP E17.2","NP E17.3","NP E17.4","NP E17.5","NP E17.6"],          //cutout: '70%',
            cutout: '60%',
                datalabels: {
                    labels: {
                      title: null
                    }
                 }
},
{
    data: [
        100
        ,
        100
    ],
backgroundColor:["rgb(73,188,204)","rgb(0,165,181)"],backgroundName:["NP B24.5","NP B24.6"],          //cutout: '65%',
            cutout: '60%',
                datalabels: {
                    labels: {
                      title: null
                    }
                 }
},

        ]
    };


const config31 = {
        type: 'doughnut',
        data: data31,
        options: {
            plugins: {
                tooltip: {
                    callbacks: {
                    label: function(tooltipItem, data) {
                        //debugger;
                        //return data['datasets'][0]['data'][tooltipItem['index']];
                        return tooltipItem.dataset.backgroundName[tooltipItem.dataIndex];
                    }


                    },
                enabled: false,
                position: 'nearest',
                external: externalTooltipHandler,
                //events: ["click","mouseout"]

            }

            }
        }
                     };

var myChart31 = new Chart(ctx31, config31);

    var ctx32= document.getElementById('myChart32').getContext('2d');
const data32 = {
    datasets: [
{
    data: [
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
    ],
backgroundColor:["rgb(240,225,214)","rgb(244,224,215)","rgb(244,218,209)","rgb(244,212,202)","rgb(240,204,196)","rgb(238,222,211)","rgb(236,216,206)","rgb(244,224,219)","rgb(244,223,218)","rgb(244,216,213)","rgb(240,226,225)","rgb(241,222,222)","rgb(240,218,220)","rgb(239,207,216)","rgb(236,190,205)","rgb(242,227,223)","rgb(238,219,226)","rgb(235,211,224)","rgb(231,202,220)","rgb(222,184,211)","rgb(235,225,225)","rgb(231,219,224)","rgb(236,228,227)","rgb(235,226,228)","rgb(232,222,226)","rgb(231,216,210)","rgb(228,214,207)","rgb(224,207,203)","rgb(220,199,193)","rgb(227,214,206)"],backgroundName:["NP A10.1","NP A10.2","NP A10.3","NP A10.4","NP A10.5","NP A11.3","NP A11.4","NP A12.3","NP A12.4","NP A12.5","NP A13.2","NP A13.3","NP A13.4","NP A13.5","NP A13.6","NP A14.2","NP A14.3","NP A14.4","NP A14.5","NP A14.6","NP A15.2","NP A15.3","NP A16.1","NP A16.2","NP A16.3","NP A41.1","NP A41.2","NP A41.4","NP A41.5","NP A42.3"],          //cutout: '80%',
            cutout: '60%',
                datalabels: {
                    labels: {
                      title: null
                    }
                 }
},
{
    data: [
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
    ],
backgroundColor:["rgb(242,193,199)","rgb(237,177,182)","rgb(232,158,171)","rgb(231,147,159)","rgb(221,135,147)","rgb(215,113,132)","rgb(232,178,194)","rgb(231,169,186)","rgb(223,152,174)","rgb(215,136,161)","rgb(208,120,151)","rgb(209,110,142)","rgb(229,192,213)","rgb(223,174,201)","rgb(215,158,188)","rgb(213,146,184)","rgb(198,117,163)","rgb(204,110,159)","rgb(229,199,219)","rgb(220,177,208)","rgb(214,163,199)","rgb(212,148,192)","rgb(208,134,180)","rgb(192,104,155)","rgb(235,196,190)","rgb(238,177,173)","rgb(235,201,197)","rgb(230,188,185)","rgb(228,171,175)","rgb(213,154,156)"],backgroundName:["NP B12.1","NP B12.2","NP B12.3","NP B12.4","NP B12.5","NP B12.6","NP B13.1","NP B13.2","NP B13.3","NP B13.4","NP B13.5","NP B13.6","NP B14.1","NP B14.2","NP B14.3","NP B14.4","NP B14.5","NP B14.6","NP B15.1","NP B15.2","NP B15.3","NP B15.4","NP B15.5","NP B15.6","NP C13.1","NP C13.2","NP C14.1","NP C14.2","NP C14.3","NP C14.4"],          //cutout: '75%',
            cutout: '60%',
                datalabels: {
                    labels: {
                      title: null
                    }
                 }
},
{
    data: [
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
    ],
backgroundColor:["rgb(241,204,205)","rgb(235,194,200)","rgb(224,173,178)","rgb(220,151,160)","rgb(237,207,211)","rgb(228,185,194)","rgb(220,171,182)","rgb(209,179,203)","rgb(219,186,178)","rgb(207,164,157)","rgb(216,186,183)","rgb(201,165,163)","rgb(217,193,202)"],backgroundName:["NP C15.1","NP C15.2","NP C15.3","NP C15.4","NP C16.1","NP C16.2","NP C16.3","NP C18.2","NP D10.1","NP D10.2","NP D11.1","NP D11.2","NP D12.1"],          //cutout: '70%',
            cutout: '60%',
                datalabels: {
                    labels: {
                      title: null
                    }
                 }
},

        ]
    };


const config32 = {
        type: 'doughnut',
        data: data32,
        options: {
            plugins: {
                tooltip: {
                    callbacks: {
                    label: function(tooltipItem, data) {
                        //debugger;
                        //return data['datasets'][0]['data'][tooltipItem['index']];
                        return tooltipItem.dataset.backgroundName[tooltipItem.dataIndex];
                    }


                    },
                enabled: false,
                position: 'nearest',
                external: externalTooltipHandler,
                //events: ["click","mouseout"]

            }

            }
        }
                     };

var myChart32 = new Chart(ctx32, config32);

    var ctx33= document.getElementById('myChart33').getContext('2d');
const data33 = {
    datasets: [
{
    data: [
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
    ],
backgroundColor:["#905c83","#9e3f53","#da5c8b","#731c3f","#8b649b","#a72a74","#51253e","#994883","#a68796","#d4377a","#856b92","#6d6980"],backgroundName:["RAL 4001 Red lilac","RAL 4002 Red violet","RAL 4003 Heather violet","RAL 4004 Claret violet","RAL 4005 Blue lilac","RAL 4006 Traffic purple","RAL 4007 Purple violet","RAL 4008 Signal violet","RAL 4009 Pastel violet","RAL 4010 Telemagenta","RAL 4011 Pearl violet","RAL 4012 Pearl blackberry"],          //cutout: '80%',
            cutout: '60%',
                datalabels: {
                    labels: {
                      title: null
                    }
                 }
},

        ]
    };


const config33 = {
        type: 'doughnut',
        data: data33,
        options: {
            plugins: {
                tooltip: {
                    callbacks: {
                    label: function(tooltipItem, data) {
                        //debugger;
                        //return data['datasets'][0]['data'][tooltipItem['index']];
                        return tooltipItem.dataset.backgroundName[tooltipItem.dataIndex];
                    }


                    },
                enabled: false,
                position: 'nearest',
                external: externalTooltipHandler,
                //events: ["click","mouseout"]

            }

            }
        }
                     };

var myChart33 = new Chart(ctx33, config33);

    var ctx34= document.getElementById('myChart34').getContext('2d');
const data34 = {
    datasets: [
        {
            data: [
                100
                ,
                100
                ,
                100
                ,
                100
                ,
                100
                ,
                100
                ,
                100
                ,
                100
                ,
                100
                ,
                100
                ,
                100
                ,
                100
            ],
    backgroundColor:["#905c83","#9e3f53","#da5c8b","#731c3f","#8b649b","#a72a74","#51253e","#994883","#a68796","#d4377a","#856b92","#6d6980"],backgroundName:["RAL 4001 Red lilac","RAL 4002 Red violet","RAL 4003 Heather violet","RAL 4004 Claret violet","RAL 4005 Blue lilac","RAL 4006 Traffic purple","RAL 4007 Purple violet","RAL 4008 Signal violet","RAL 4009 Pastel violet","RAL 4010 Telemagenta","RAL 4011 Pearl violet","RAL 4012 Pearl blackberry"],          //cutout: '80%',
                    cutout: '60%',
                        datalabels: {
                            labels: {
                              title: null
                            }
                         }
        },
    
                ]
    };


const config34 = {
        type: 'doughnut',
        data: data34,
        options: {
            plugins: {
                tooltip: {
                    callbacks: {
                    label: function(tooltipItem, data) {
                        //debugger;
                        //return data['datasets'][0]['data'][tooltipItem['index']];
                        return tooltipItem.dataset.backgroundName[tooltipItem.dataIndex];
                    }


                    },
                enabled: false,
                position: 'nearest',
                external: externalTooltipHandler,
                //events: ["click","mouseout"]

            }

            }
        }
                     };

var myChart34 = new Chart(ctx34, config34);

    var ctx35= document.getElementById('myChart35').getContext('2d');
const data35 = {
    datasets: [
{
    data: [
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
    ],
backgroundColor:["#8b7448","#a56c37","#835444","#885834","#985239","#784e36","#75532e","#5c3b28","#713c38","#4b392b","#633a34","#513329"],backgroundName:["RAL 8008 Green brown","RAL 8001 Green brown","RAL 8002 Green brown","RAL 8003 Green brown","RAL 8004 Green brown","RAL 8007 Green brown","RAL 8008 Green brown","RAL 8011 Green brown","RAL 8012 Green brown","RAL 8014 Green brown","RAL 8015 Green brown","RAL 8016 Green brown"],          //cutout: '80%',
            cutout: '60%',
                datalabels: {
                    labels: {
                      title: null
                    }
                 }
},
{
    data: [
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
    ],
backgroundColor:["#4c3732","#413c39","#282423","#a75d2e","#7a563e","#7a5d4d","#534032","#85412a"],backgroundName:["Ral 8017 Chocolate brown","Ral 8019 Grey brown","Ral 8022 Black brown","Ral 8023 Orange brown","Ral 8024 Beige brown","Ral 8025 Pale brown","Ral 8028 Terra brown","Ral 8029 Pearl copper"],          //cutout: '75%',
            cutout: '60%',
                datalabels: {
                    labels: {
                      title: null
                    }
                 }
},

        ]
    };


const config35 = {
        type: 'doughnut',
        data: data35,
        options: {
            plugins: {
                tooltip: {
                    callbacks: {
                    label: function(tooltipItem, data) {
                        //debugger;
                        //return data['datasets'][0]['data'][tooltipItem['index']];
                        return tooltipItem.dataset.backgroundName[tooltipItem.dataIndex];
                    }


                    },
                enabled: false,
                position: 'nearest',
                external: externalTooltipHandler,
                //events: ["click","mouseout"]

            }

            }
        }
                     };

var myChart35 = new Chart(ctx35, config35);

    var ctx36= document.getElementById('myChart36').getContext('2d');
const data36 = {
    datasets: [
{
    data: [
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
        ,
        100
    ],
backgroundColor:["#efecdd","#dddfd2","#f2f3ee","#2e3235","#0d0d0f","#a4a8a7","#8f908b","#f8f6ea","#292d30","#f8f5f0","#292d30","#cfd4cd","#9c9c9c","#888c8f"],backgroundName:["Ral 9001 Cream","Ral 9002 Grey white","Ral 9003 Signal white","Ral 9004 Signal black","Ral 9005 Jet black","Ral 9006 White aluminium","Ral 9007 Grey aluminium","Ral 9010 Pure white","Ral 9011 Graphite black","Ral 9016 Traffic white","Ral 9017 Traffic black","Ral 9018 Papyrus","Ral 9022 Pearl light grey","Ral 9023 Pearl dark grey"],          //cutout: '80%',
            cutout: '60%',
                datalabels: {
                    labels: {
                      title: null
                    }
                 }
},


        ]
    };


const config36 = {
        type: 'doughnut',
        data: data36,
        options: {
            plugins: {
                tooltip: {
                    callbacks: {
                    label: function(tooltipItem, data) {
                        //debugger;
                        //return data['datasets'][0]['data'][tooltipItem['index']];
                        return tooltipItem.dataset.backgroundName[tooltipItem.dataIndex];
                    }


                    },
                enabled: false,
                position: 'nearest',
                external: externalTooltipHandler,
                //events: ["click","mouseout"]

            }

            }
        }
                     };

var myChart36 = new Chart(ctx36, config36);

let mobile_grey_obj = {
'backgroundColor':["#808a94","#909ba1","#82806b","#7c7a6e","#9ca0a3","#9ca0a3","#757263","#756645","#5c635b","#585d57","#585d60","#5b6063","#58564a","#57585d","#3a3f43","#2e3235","#4c4d47","#828479","#494a4f","#494a4f","#959188","#606a74","#bbb9aa","#81897a","#929374","#cbd0ca","#989795","#7e7f81","#b3b8b1","#6e6a61","#9ea3a7","#909598","#4e5452","#bfbcb3","#919699","#d0d0d0","#898077"],
'backgroundName':["RAL 7000 Squirrel grey","RAL 7001 Silver grey","RAL 7002 Olive grey","RAL 7003 Moss grey","RAL 7004 Signal grey","RAL 7005 Mouse grey","RAL 7006 Beige grey","RAL 7008 Khaki grey","RAL 7009 Green grey","RAL 7010 Tarpaulin grey","RAL 7011 Iron grey","RAL 7012 Basalt grey","RAL 7013 Brown grey","RAL 7015 State grey","RAL 7016 Anthracite grey","RAL 7021 Black grey","RAL 7022 Umbra grey","RAL 7023 Concrete grey","RAL 7024 Graphite grey","RAL 7026 Granite grey","RAL 7030 Stone grey","RAL 7031 Blue grey","RAL 7032 Pebble grey","RAL 7033 Cement grey","RAL 7034 Yellow grey","RAL 7035 Light grey","RAL 7036 Platnium grey","RAL 7037 Dusty grey","RAL 7038 Agtate grey","RAL 7039 Quartz grey","RAL 7040 Window grey","RAL 7042 Traffic grey A","RAL 7043 Traffic grey B","RAL 7044 Silk grey","RAL 7045 Telegrey 1","RAL 7046 Telegrey 2","RAL 7047 Telegrey 4","RAL 7048 Pearl mouse grey"]
}


for([i,x] of Object.entries(mobile_grey_obj.backgroundName)){
document.querySelector('.mobile-grey').insertAdjacentHTML(`beforeend`,`
<div class="color-wrap">
    <span class="color-circle2 toFillWithColor">
        ${x}
    </span>
</div>
`)
}

document.querySelector('.mobile-grey').querySelectorAll('.toFillWithColor').forEach((e,i)=>{
e.style.backgroundColor = mobile_grey_obj.backgroundColor[i]
})

let mobile_red_obj = {
backgroundColor:["#b72c29","#ac272e","#ae2930","#972633","#7b262e","#68222a","#47272c","#7b3a36","#8a2d2e","#d08b72","#a53933","#db7679","#e7a3aa","#b74239","#df5861","#dd4654","#d02227","#de6f5b","#ed1e24","#ed2124","#c12645","#d83337","#b7383f","#7f1927","#bb443e"],backgroundName:["RAL 3000 Flame red","RAL 3001 Signal red","RAL 3002 Carmine red","RAL 3003 Ruby red","RAL 3004 Purple red","RAL 3005 Wine red","RAL 3007 Black red","RAL 3009 Oxide red","RAL 3011 Brown red","RAL 3012 Beige red","RAL 3013 Tomato red","RAL 3014 Antique pink","RAL 3015 Light pink","RAL 3016 Coral red","RAL 3017 Rose","RAL 3018 Strawberry red","RAL 3020 Traffic red","RAL 3022 Salmon red","RAL 3024 Luminous red","RAL 3026 Luminous bright red","RAL 3027 Raspberry red","RAL 3028 Pure red","RAL 3031 Orient red","RAL 3032 Pearl ruby red","RAL 3033 Pearl pink"],          //cutout: '80%',
}


for([i,x] of Object.entries(mobile_red_obj.backgroundName)){
document.querySelector('.mobile-red').insertAdjacentHTML(`beforeend`,`
<div class="color-wrap">
    <span class="color-circle2 toFillWithColor">
        ${x}
    </span>
</div>
`)
}

document.querySelector('.mobile-red').querySelectorAll('.toFillWithColor').forEach((e,i)=>{
e.style.backgroundColor = mobile_red_obj.backgroundColor[i]
})

let mobile_yellow_obj = {
backgroundColor:["#faa21f","#8c714a","#8f8371","#f0aa59","#faa831","#e0b227","#fbab1b","#9c9567","#ebe713","#ba9c50","#efc71c","#efc519","#9c9567","#a6957b","#f4de45","rgb(240,224,132)","rgb(237,219,107)","rgb(238,215,83)","rgb(230,209,52)","rgb(245,232,188)","rgb(247,231,172)","rgb(249,225,142)","rgb(246,219,108)","rgb(242,211,80)","rgb(246,209,52)","rgb(233,213,162)","rgb(231,203,137)","rgb(223,185,102)","rgb(204,159,61)","rgb(240,226,181)","rgb(232,211,141)","rgb(219,195,98)","rgb(198,173,88)","rgb(190,158,75)","rgb(171,146,84)","rgb(241,214,164)","rgb(230,176,0)","rgb(203,154,45)","rgb(241,168,18)","rgb(213,150,43)","rgb(183,132,56)","rgb(222,180,30)","rgb(194,156,49)"],
backgroundName:["RAL 1037 Sun Yellow","RAL 1036 Pearl gold","RAL 1035 Pearl beige","RAL 1034 Pastel yellow","RAL 1033 Dahlia yellow","RAL 1032 Broom yellow","RAL 1028 Melon yellow","RAL 1027 Curry","RAL 1026 Luminous yellow","RAL 1024 Ochre yellow","RAL 1023 Traffic yellow","RAL 1021 Rape yellow","RAL 1020 Olive yellow","RAL 1019 Grey beige","RAL 1018 Zinc yellow","RAL 1017 Saffron yellow","RAL 1016 Sulphur yellow","RAL 1015 Light ivory","RAL 1014 ivory","RAL 1013 Oyster White","RAL 1012 Lemon yellow","RAL 1011 Brown beige","RAL 1007 Daffodil yellow","RAL 1006 Maize yellow","RAL 1005 Honey yellow","RAL 1004 Golden yellow","RAL 1003 Signal yellow","RAL 1002 Sand yellow","RAL 1001 Beige","RAL 1000 Green beige"],
}


for([i,x] of Object.entries(mobile_yellow_obj.backgroundName).reverse()){
document.querySelector('.mobile-yellow').insertAdjacentHTML(`beforeend`,`
<div class="color-wrap">
    <span class="color-circle2 toFillWithColor">
        ${x}
    </span>
</div>
`)
}

document.querySelector('.mobile-yellow').querySelectorAll('.toFillWithColor').forEach((e,i)=>{
e.style.backgroundColor = mobile_yellow_obj.backgroundColor.reverse()[i]
})

let mobile_green_obj = {
backgroundColor:["#347765","#197340","#29633a","#4e5840","#104347","#104236","#3e433c","#283524","#363932","#243a2e","#3f763c","#67835b","#333f3f","#7a7b5b","#464438","#3d423c","#016b55","#3f8843","#30a348","#b6dbaf","#384635","#87a37b","#403d34","#018754","#55743b","#015e53","#82c0bd","#2c5543","#007447","#0d865b","#498c85","#82b2b6","#015030","#025f4c","#008f47","#2ab34b"]
,backgroundName:["RAL 6000 Patina green","RAL 6001 Emerald green","RAL 6002 Leaf green","RAL 6003 Olive green","RAL 6004 Blue green","RAL 6005 Moss green","RAL 6006 Grey olive","RAL 6007 Bottle green","RAL 6008 Brown green","RAL 6009 Fir green","RAL 6010 Grass green","RAL 6011 Reseda olive","RAL 6012 Black green","RAL 6013 Reed green","RAL 6014 Yellow olive","RAL 6015 Black green","RAL 6016 Turquoise green","RAL 6017 May green","RAL 6018 Yellow green","RAL 6019 Pastel green","RAL 6020 Chrome green","RAL 6021 Pale green","RAL 6022 Olive drab","RAL 6024 Traffic green","RAL 6025 Fern green","RAL 6026 Opal green","RAL 6027 Light green","RAL 6028 Pine green","RAL 6029 Mint green","RAL 6032 Signal green","RAL 6033 Mint turquoise","RAL 6034 Pastel turquoise green","RAL 6035 Pearl green","RAL 6036 Pearl opal green","RAL 6037 Pure green","RAL 6038 Luminous green"],          //cutout: '80%',
}


for([i,x] of Object.entries(mobile_green_obj.backgroundName)){
document.querySelector('.mobile-green').insertAdjacentHTML(`beforeend`,`
<div class="color-wrap">
    <span class="color-circle2 toFillWithColor">
        ${x}
    </span>
</div>
`)
}

document.querySelector('.mobile-green').querySelectorAll('.toFillWithColor').forEach((e,i)=>{
e.style.backgroundColor = mobile_green_obj.backgroundColor[i]
})

let mobile_orange_obj = {
backgroundColor:["#e57a25","#c8512a","#d13e2a","#f5843c","#f15d24","#ee2d24","#f8991d","#f47639","#ec5a24","#dd6734","#f47b2d","#e26b54","#9f492d"],backgroundName:["Ral 2000 Yellow orange","Ral 2001 Red orange","Ral 2002 Vermilion","Ral 2003 Pastel orange","Ral 2004 Pure orange","Ral 2005 Luminous orange","Ral 2007 Luminous b't orange","Ral 2009 Traffic orange","Ral 2010 Signal orange","Ral 2011 Deep orange","Ral 2012 Salmon orange","Ral 2013 Pearl orange"]
}


for([i,x] of Object.entries(mobile_orange_obj.backgroundName)){
document.querySelector('.mobile-orange').insertAdjacentHTML(`beforeend`,`
<div class="color-wrap">
    <span class="color-circle2 toFillWithColor">
        ${x}
    </span>
</div>
`)
}

document.querySelector('.mobile-orange').querySelectorAll('.toFillWithColor').forEach((e,i)=>{
e.style.backgroundColor = mobile_orange_obj.backgroundColor[i]
})

let mobile_violet_obj = {
backgroundColor:["#905c83","#9e3f53","#da5c8b","#731c3f","#8b649b","#a72a74","#51253e","#994883","#a68796","#d4377a","#856b92","#6d6980"],backgroundName:["RAL 4001 Red lilac","RAL 4002 Red violet","RAL 4003 Heather violet","RAL 4004 Claret violet","RAL 4005 Blue lilac","RAL 4006 Traffic purple","RAL 4007 Purple violet","RAL 4008 Signal violet","RAL 4009 Pastel violet","RAL 4010 Telemagenta","RAL 4011 Pearl violet","RAL 4012 Pearl blackberry"]
}


for([i,x] of Object.entries(mobile_violet_obj.backgroundName)){
document.querySelector('.mobile-violet').insertAdjacentHTML(`beforeend`,`
<div class="color-wrap">
    <span class="color-circle2 toFillWithColor">
        ${x}
    </span>
</div>
`)
}

document.querySelector('.mobile-violet').querySelectorAll('.toFillWithColor').forEach((e,i)=>{
e.style.backgroundColor = mobile_violet_obj.backgroundColor[i]
})

let mobile_brown_obj = {
backgroundColor:["#8b7448","#a56c37","#835444","#885834","#985239","#784e36","#75532e","#5c3b28","#713c38","#4b392b","#633a34","#513329","#4c3732","#413c39","#282423","#a75d2e","#7a563e","#7a5d4d","#534032","#85412a"],
backgroundName:["RAL 8008 Green brown","RAL 8001 Green brown","RAL 8002 Green brown","RAL 8003 Green brown","RAL 8004 Green brown","RAL 8007 Green brown","RAL 8008 Green brown","RAL 8011 Green brown","RAL 8012 Green brown","RAL 8014 Green brown","RAL 8015 Green brown","RAL 8016 Green brown","Ral 8017 Chocolate brown","Ral 8019 Grey brown","Ral 8022 Black brown","Ral 8023 Orange brown","Ral 8024 Beige brown","Ral 8025 Pale brown","Ral 8028 Terra brown","Ral 8029 Pearl copper"],          //cutout: '80%',
}

for([i,x] of Object.entries(mobile_brown_obj.backgroundName)){
document.querySelector('.mobile-brown').insertAdjacentHTML(`beforeend`,`
<div class="color-wrap">
    <span class="color-circle2 toFillWithColor">
        ${x}
    </span>
</div>
`)
}

document.querySelector('.mobile-brown').querySelectorAll('.toFillWithColor').forEach((e,i)=>{
e.style.backgroundColor = mobile_brown_obj.backgroundColor[i]
})

let mobile_white_obj = {
backgroundColor:["#efecdd","#dddfd2","#f2f3ee","#2e3235","#0d0d0f","#a4a8a7","#8f908b","#f8f6ea","#292d30","#f8f5f0","#292d30","#cfd4cd","#9c9c9c","#888c8f"],backgroundName:["Ral 9001 Cream","Ral 9002 Grey white","Ral 9003 Signal white","Ral 9004 Signal black","Ral 9005 Jet black","Ral 9006 White aluminium","Ral 9007 Grey aluminium","Ral 9010 Pure white","Ral 9011 Graphite black","Ral 9016 Traffic white","Ral 9017 Traffic black","Ral 9018 Papyrus","Ral 9022 Pearl light grey","Ral 9023 Pearl dark grey"]
}


for([i,x] of Object.entries(mobile_white_obj.backgroundName)){
document.querySelector('.mobile-white').insertAdjacentHTML(`beforeend`,`
<div class="color-wrap">
    <span class="color-circle2 toFillWithColor">
        ${x}
    </span>
</div>
`)
}

document.querySelector('.mobile-white').querySelectorAll('.toFillWithColor').forEach((e,i)=>{
e.style.backgroundColor = mobile_white_obj.backgroundColor[i]
})

let mobile_blue_obj = {
backgroundColor:["#394d6e","#1f4864","#2f2e7c","#293857","#1d1f2c","#164988","#3f698f","#323c48","#2e597b","#17467e","#242c3f","#3580b9","#222b52","#6e7e98","#2975b3","#0f518d","#228990","#0d4250","#0d757e","#2e2b5a","#4e678f","#6893b5","#225b6f","#162c53"]
,backgroundName:["Ral 5000 Violet blue","Ral 5001 Green blue","Ral 5002 Ultramarine blue","Ral 5003 Sapphire blue","Ral 5004 Black blue","Ral 5005 Signal blue","Ral 5007 Brilliant blue","Ral 5008 Grey blue","Ral 5009 Azure blue","Ral 5010 Gentian blue","Ral 5011 Steel blue","RAL 5012 Light blue","RAL 5013 Cobalt blue","RAL 5014 Piegeon blue","RAL 5015 Sky blue","RAL 5017 Traffic blue","RAL 5018 Turquoise blue","RAL 5019 Capri blue","RAL 5020 Ocean blue","RAL 5021 Water blue","RAL 5022 Night blue","RAL 5023 Distant blue","RAL 5024 Pastel blue","RAL 5025 Pearl gentian blue","RAL 5026 Pearl night blue"],          //cutout: '80%',
}


for([i,x] of Object.entries(mobile_blue_obj.backgroundName)){
document.querySelector('.mobile-blue').insertAdjacentHTML(`beforeend`,`
<div class="color-wrap">
    <span class="color-circle2 toFillWithColor">
        ${x}
    </span>
</div>
`)
}

document.querySelector('.mobile-blue').querySelectorAll('.toFillWithColor').forEach((e,i)=>{
e.style.backgroundColor = mobile_blue_obj.backgroundColor[i]
})


document.querySelectorAll('.nav-link.list-icon.color-nav-link').forEach(elm=>{
elm.addEventListener('click',function(){
    document.querySelectorAll('.nav-link.list-icon.color-nav-link').forEach(elm=>{
        this.classList.remove('active')
    })
    document.querySelector('.garage-map-wrap').querySelectorAll('.tab-pane').forEach(e=>{
        this.classList.add('active')
        if(e.getAttribute('aria-labelledby')==elm.getAttribute('data-bs-target')){
            e.classList.remove('hidden')
            e.classList.add('active')
            e.classList.add('show')
        }
        else{
            e.classList.add('hidden')
            e.classList.remove('active')
            e.classList.remove('show') 
        }
    })
})
})
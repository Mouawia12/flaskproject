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
backgroundColor:["rgb(174,95,84)","rgb(184,91,81)","rgb(202,131,133)","rgb(181,111,116)","rgb(191,59,56)","rgb(178,63,60)","rgb(157,62,59)","rgb(134,62,56)","rgb(117,60,58)","rgb(106,58,56)","rgb(164,57,63)","rgb(156,46,54)","rgb(139,53,58)","rgb(125,55,58)","rgb(117,58,60)","rgb(118,66,69)","rgb(173,62,85)","rgb(158,61,78)","rgb(144,63,77)","rgb(116,60,71)","rgb(121,60,69)","rgb(107,57,63)","rgb(96,59,64)"],backgroundName:["NP C12.6","NP C13.6","NP C14.5","NP C14.6","NP E6.1","NP E6.2","NP E6.3","NP E6.4","NP E6.5","NP E6.6","NP E7.1","NP E7.2","NP E7.3","NP E7.4","NP E7.5","NP E7.6","NP E8.1","NP E8.2","NP E8.3","NP E8.4","NP E8.5","NP E8.6","NP F3.3"],          //cutout: '80%',
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
backgroundColor:["rgb(229,237,219)","rgb(223,236,213)","rgb(215,234,209)","rgb(208,237,206)","rgb(231,229,202)","rgb(229,227,196)","rgb(224,224,191)","rgb(209,213,174)","rgb(226,234,220)","rgb(221,230,216)","rgb(211,225,209)","rgb(198,213,195)","rgb(219,228,218)","rgb(212,224,215)","rgb(201,215,207)","rgb(190,209,200)","rgb(215,206,177)","rgb(204,194,164)","rgb(235,222,185)","rgb(230,214,172)","rgb(192,233,216)","rgb(207,237,213)","rgb(185,233,195)","rgb(150,222,170)","rgb(131,201,158)","rgb(113,200,152)","rgb(84,177,132)","rgb(204,232,202)","rgb(183,230,183)","rgb(169,219,168)"],backgroundName:["NP A1.3","NP A1.4","NP A1.5","NP A1.6","NP A2.3","NP A2.4","NP A2.5","NP A2.6","NP A27.3","NP A27.4","NP A27.5","NP A27.6","NP A28.3","NP A28.4","NP A28.5","NP A28.6","NP A35.5","NP A35.6","NP A36.5","NP A36.6","NP B27.1","NP B28.1","NP B28.2","NP B28.3","NP B28.4","NP B28.5","NP B28.6","NP B29.1","NP B29.2","NP B29.3"],          //cutout: '80%',
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
backgroundColor:["rgb(155,222,152)","rgb(130,212,133)","rgb(123,202,129)","rgb(223,237,202)","rgb(203,234,181)","rgb(194,232,169)","rgb(179,225,145)","rgb(161,217,117)","rgb(148,195,94)","rgb(226,237,194)","rgb(213,235,176)","rgb(190,219,145)","rgb(177,210,127)","rgb(168,205,110)","rgb(146,179,65)","rgb(223,233,155)","rgb(213,219,139)","rgb(209,217,118)","rgb(192,196,81)","rgb(176,181,58)","rgb(236,231,157)","rgb(232,234,155)","rgb(233,223,111)","rgb(229,217,86)","rgb(217,203,31)","rgb(201,223,206)","rgb(183,214,190)","rgb(164,208,177)","rgb(140,203,166)","rgb(115,177,143)"],backgroundName:["NP B29.4","NP B29.5","NP B29.6","NP B30.1","NP B30.2","NP B30.3","NP B30.4","NP B30.5","NP B30.6","NP B31.1","NP B31.2","NP B31.3","NP B31.4","NP B31.5","NP B31.6","NP B32.2","NP B32.3","NP B32.4","NP B32.5","NP B32.6","NP B33.2","NP B33.3","NP B33.4","NP B33.5","NP B33.6","NP C29.1","NP C29.2","NP C29.3","NP C29.4","NP C29.5"],          //cutout: '75%',
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
backgroundColor:["rgb(95,153,120)","rgb(214,229,208)","rgb(200,221,188)","rgb(182,205,156)","rgb(175,205,142)","rgb(149,178,120)","rgb(128,153,102)","rgb(214,218,173)","rgb(216,226,176)","rgb(202,209,148)","rgb(196,204,127)","rgb(171,177,109)","rgb(153,155,95)","rgb(220,216,167)","rgb(217,212,145)","rgb(213,206,120)","rgb(188,179,103)","rgb(164,155,93)","rgb(162,150,72)","rgb(164,143,106)","rgb(109,147,139)","rgb(93,127,121)","rgb(76,107,101)","rgb(183,206,188)","rgb(161,191,170)","rgb(135,164,145)","rgb(116,144,127)","rgb(97,125,108)","rgb(79,105,90)","rgb(200,211,189)"],backgroundName:["NP C29.6","NP C30.1","NP C30.2","NP C30.3","NP C30.4","NP C30.5","NP C30.6","NP C31.1","NP C31.2","NP C31.3","NP C31.4","NP C31.5","NP C31.6","NP C32.1","NP C32.2","NP C32.3","NP C32.4","NP C32.5","NP C32.6","NP D1.4","NP D19.4","NP D19.5","NP D19.6","NP D20.1","NP D20.2","NP D20.3","NP D20.4","NP D20.5","NP D20.6","NP D21.1"],          //cutout: '70%',
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
backgroundColor:["rgb(176,190,158)","rgb(153,167,136)","rgb(132,145,118)","rgb(115,128,103)","rgb(95,106,85)","rgb(212,213,185)","rgb(184,186,147)","rgb(168,171,133)","rgb(144,148,114)","rgb(123,125,96)","rgb(107,109,84)","rgb(202,196,162)","rgb(180,166,119)","rgb(150,142,99)","rgb(131,127,97)","rgb(112,108,81)","rgb(204,190,146)","rgb(182,167,127)","rgb(159,146,111)","rgb(139,125,94)","rgb(119,106,80)","rgb(176,136,56)","rgb(156,123,58)","rgb(51,163,112)","rgb(0,147,97)","rgb(13,131,86)","rgb(38,115,81)","rgb(49,103,76)","rgb(42,92,70)","rgb(125,159,83)"],backgroundName:["NP D21.2","NP D21.3","NP D21.4","NP D21.5","NP D21.6","NP D22.1","NP D22.2","NP D22.3","NP D22.4","NP D22.5","NP D22.6","NP D23.2","NP D23.3","NP D23.4","NP D23.5","NP D23.6","NP D24.2","NP D24.3","NP D24.4","NP D24.5","NP D24.6","NP E1.3","NP E1.4","NP E18.1","NP E18.2","NP E18.3","NP E18.4","NP E18.5","NP E18.6","NP E19.1"],          //cutout: '65%',
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
        ],
backgroundColor:["rgb(114,150,62)","rgb(107,134,67)","rgb(94,120,70)","rgb(89,109,69)","rgb(77,99,60)","rgb(157,162,73)","rgb(152,153,52)","rgb(137,138,57)","rgb(123,126,64)","rgb(108,110,67)","rgb(98,96,57)","rgb(178,167,64)","rgb(174,161,46)","rgb(157,145,57)","rgb(138,127,62)","rgb(119,109,61)","rgb(108,100,57)","rgb(170,139,53)","rgb(148,124,58)","rgb(129,107,60)","rgb(118,103,63)"],backgroundName:["NP E19.2","NP E19.3","NP E19.4","NP E19.5","NP E19.6","NP E20.1","NP E20.2","NP E20.3","NP E20.4","NP E20.5","NP E20.6","NP E21.1","NP E21.2","NP E21.3","NP E21.4","NP E21.5","NP E21.6","NP E22.3","NP E22.4","NP E22.5","NP E22.6"],          //cutout: '60%',
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
backgroundColor:["rgb(234,186,175)","rgb(239,199,192)","rgb(240,223,204)","rgb(244,222,199)","rgb(246,223,198)","rgb(240,218,190)","rgb(240,211,176)","rgb(249,224,187)","rgb(248,217,172)","rgb(243,214,171)","rgb(235,206,167)","rgb(244,225,212)","rgb(245,219,204)","rgb(243,209,192)","rgb(238,195,183)","rgb(236,185,170)","rgb(248,204,195)","rgb(248,184,176)","rgb(246,168,158)","rgb(240,145,139)","rgb(235,128,122)","rgb(226,104,100)","rgb(245,202,199)","rgb(245,185,184)","rgb(242,165,166)","rgb(233,144,146)","rgb(227,123,128)","rgb(223,105,115)","rgb(255,197,111)","rgb(255,185,83)"],backgroundName:["NP A10.6","NP A12.6","NP A37.4","NP A37.5","NP A37.6","NP A38.5","NP A38.6","NP A39.3","NP A39.4","NP A39.5","NP A39.6","NP A9.2","NP A9.3","NP A9.4","NP A9.5","NP A9.6","NP B10.1","NP B10.2","NP B10.3","NP B10.4","NP B10.5","NP B10.6","NP B11.1","NP B11.2","NP B11.3","NP B11.4","NP B11.5","NP B11.6","NP B2.5","NP B2.6"],          //cutout: '80%',
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
backgroundColor:["rgb(254,218,167)","rgb(251,217,165)","rgb(255,205,136)","rgb(255,196,124)","rgb(255,190,110)","rgb(255,180,90)","rgb(254,214,170)","rgb(254,199,145)","rgb(255,193,134)","rgb(255,184,116)","rgb(255,177,108)","rgb(252,138,27)","rgb(252,217,185)","rgb(255,210,173)","rgb(255,192,147)","rgb(255,180,126)","rgb(249,138,59)","rgb(247,206,178)","rgb(252,191,155)","rgb(255,189,153)","rgb(253,177,134)","rgb(251,158,110)","rgb(243,133,79)","rgb(253,205,179)","rgb(251,185,154)","rgb(243,178,145)","rgb(251,171,136)","rgb(248,146,107)","rgb(241,126,83)","rgb(245,200,181)"],backgroundName:["NP B3.1","NP B3.2","NP B3.3","NP B3.4","NP B3.5","NP B3.6","NP B4.1","NP B4.2","NP B4.3","NP B4.4","NP B4.5","NP B4.6","NP B5.1","NP B5.2","NP B5.3","NP B5.4","NP B5.6","NP B6.1","NP B6.2","NP B6.3","NP B6.4","NP B6.5","NP B6.6","NP B7.1","NP B7.2","NP B7.3","NP B7.4","NP B7.5","NP B7.6","NP B8.1"],          //cutout: '75%',
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
backgroundColor:["rgb(249,184,159)","rgb(250,167,143)","rgb(247,144,117)","rgb(241,132,107)","rgb(238,120,90)","rgb(251,205,192)","rgb(252,183,166)","rgb(250,166,151)","rgb(247,147,132)","rgb(243,128,118)","rgb(234,110,91)","rgb(242,203,175)","rgb(240,193,164)","rgb(243,179,144)","rgb(231,160,115)","rgb(206,134,95)","rgb(239,202,178)","rgb(239,190,165)","rgb(239,176,147)","rgb(221,148,114)","rgb(209,126,93)","rgb(243,198,181)","rgb(232,189,175)","rgb(231,169,154)","rgb(212,135,121)","rgb(205,118,104)","rgb(231,156,148)","rgb(220,128,121)","rgb(200,114,108)","rgb(245,211,153)"],backgroundName:["NP B8.2","NP B8.3","NP B8.4","NP B8.5","NP B8.6","NP B9.1","NP B9.2","NP B9.3","NP B9.4","NP B9.5","NP B9.6","NP C10.1","NP C10.2","NP C10.3","NP C10.4","NP C10.5","NP C11.1","NP C11.2","NP C11.3","NP C11.4","NP C11.5","NP C12.1","NP C12.2","NP C12.3","NP C12.4","NP C12.5","NP C13.3","NP C13.4","NP C13.5","NP C2.1"],          //cutout: '70%',
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
backgroundColor:["rgb(238,201,135)","rgb(231,180,102)","rgb(218,160,70)","rgb(210,156,66)","rgb(237,203,163)","rgb(242,195,140)","rgb(231,176,106)","rgb(217,155,86)","rgb(215,146,68)","rgb(233,194,131)","rgb(220,169,99)","rgb(236,204,160)","rgb(229,191,135)","rgb(222,179,122)","rgb(237,203,160)","rgb(226,186,135)","rgb(240,200,158)","rgb(233,190,148)","rgb(228,185,144)","rgb(215,163,118)","rgb(210,156,109)","rgb(241,200,163)","rgb(234,177,129)","rgb(218,157,105)","rgb(216,145,86)","rgb(215,136,72)","rgb(242,207,173)","rgb(239,194,158)","rgb(240,184,139)","rgb(230,165,118)"],backgroundName:["NP C2.2","NP C2.3","NP C2.4","NP C2.5","NP C3.1","NP C3.2","NP C3.3","NP C3.4","NP C3.5","NP C4.2","NP C4.3","NP C5.1","NP C5.2","NP C5.3","NP C6.1","NP C6.2","NP C7.1","NP C7.2","NP C7.3","NP C7.4","NP C7.5","NP C8.1","NP C8.2","NP C8.3","NP C8.4","NP C8.5","NP C9.1","NP C9.2","NP C9.3","NP C9.4"],          //cutout: '65%',
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
        ],
backgroundColor:["rgb(215,144,97)","rgb(226,186,138)","rgb(225,188,164)","rgb(211,168,142)","rgb(222,186,170)","rgb(210,168,152)","rgb(232,133,36)","rgb(213,127,56)","rgb(187,116,59)","rgb(226,109,47)","rgb(206,106,59)","rgb(179,100,62)","rgb(213,90,59)","rgb(191,87,64)","rgb(168,85,64)","rgb(253,167,107)"],backgroundName:["NP C9.5","NP D5.2","NP D8.1","NP D8.2","NP D9.1","NP D9.2","NP E3.1","NP E3.2","NP E3.3","NP E4.1","NP E4.2","NP E4.3","NP E5.1","NP E5.2","NP E5.3","NP B5.5"],          //cutout: '60%',
                cutout: '60%',
                    datalabels: {
                        labels: {
                          title: null
                        }
                     }
    },

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
            100
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
backgroundColor:["rgb(243,237,190)","rgb(247,235,151)","rgb(243,234,205)","rgb(243,234,201)","rgb(244,233,195)","rgb(245,233,191)","rgb(244,225,169)","rgb(239,217,184)","rgb(241,217,180)","rgb(241,219,183)","rgb(244,232,208)","rgb(246,229,198)","rgb(247,225,190)","rgb(248,219,174)","rgb(245,209,150)","rgb(245,232,208)","rgb(247,227,196)","rgb(247,223,183)","rgb(251,220,173)","rgb(255,212,145)","rgb(250,232,188)","rgb(247,227,174)","rgb(250,222,150)","rgb(251,218,131)","rgb(250,208,108)","rgb(246,197,78)","rgb(255,207,127)","rgb(241,236,183)","rgb(243,232,178)","rgb(241,228,158)"],backgroundName:["NP A3.5","NP A3.6","NP A4.2","NP A4.3","NP A4.4","NP A4.5","NP A4.6","NP A43.4","NP A6.5","NP A6.6","NP A7.2","NP A7.3","NP A7.4","NP A7.5","NP A7.6","NP A8.2","NP A8.3","NP A8.4","NP A8.5","NP A8.6","NP B1.1","NP B1.2","NP B1.3","NP B1.4","NP B1.5","NP B1.6","NP B2.4","NP B33.1","NP B34.1","NP B34.2"],          //cutout: '80%',
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
        ],
backgroundColor:["rgb(240,224,132)","rgb(237,219,107)","rgb(238,215,83)","rgb(230,209,52)","rgb(245,232,188)","rgb(247,231,172)","rgb(249,225,142)","rgb(246,219,108)","rgb(242,211,80)","rgb(246,209,52)","rgb(233,213,162)","rgb(231,203,137)","rgb(223,185,102)","rgb(204,159,61)","rgb(240,226,181)","rgb(232,211,141)","rgb(219,195,98)","rgb(198,173,88)","rgb(190,158,75)","rgb(171,146,84)","rgb(241,214,164)","rgb(230,176,0)","rgb(203,154,45)","rgb(241,168,18)","rgb(213,150,43)","rgb(183,132,56)","rgb(222,180,30)","rgb(194,156,49)"],backgroundName:["NP B34.3","NP B34.4","NP B34.5","NP B34.6","NP B35.1","NP B35.2","NP B35.3","NP B35.4","NP B35.5","NP B35.6","NP C1.1","NP C1.2","NP C1.3","NP C1.5","NP C33.1","NP C33.2","NP C33.3","NP C33.4","NP C33.5","NP C33.6","NP C4.1","NP E1.1","NP E1.2","NP E2.1","NP E2.2","NP E2.3","NP E22.1","NP E22.2"],          //cutout: '75%',
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
backgroundColor:["rgb(221,226,221)","rgb(215,222,217)","rgb(207,216,212)","rgb(198,207,206)","rgb(186,195,197)","rgb(223,222,218)","rgb(215,214,209)","rgb(212,211,207)","rgb(201,200,195)","rgb(188,188,184)","rgb(221,218,210)","rgb(216,211,202)","rgb(208,205,198)","rgb(202,197,186)","rgb(203,197,180)","rgb(180,179,176)","rgb(169,168,164)","rgb(159,158,156)","rgb(148,147,145)","rgb(140,140,139)","rgb(130,130,128)","rgb(160,165,164)","rgb(143,146,147)","rgb(125,129,130)","rgb(106,109,110)","rgb(87,90,91)","rgb(68,70,71)","rgb(161,165,162)","rgb(143,147,144)","rgb(125,129,126)"],backgroundName:["NP A29.2","NP A29.3","NP A29.4","NP A29.5","NP A29.6","NP A30.2","NP A30.3","NP A30.4","NP A30.5","NP A30.6","NP A31.3","NP A31.4","NP A31.5","NP A31.6","NP A32.6","NP G1.1","NP G1.2","NP G1.3","NP G1.4","NP G1.5","NP G1.6","NP G2.1","NP G2.2","NP G2.3","NP G2.4","NP G2.5","NP G2.6","NP G3.1","NP G3.2","NP G3.3"],          //cutout: '80%',
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
        ],
backgroundColor:["rgb(107,111,109)","rgb(88,91,88)","rgb(65,69,66)","rgb(169,166,158)","rgb(149,147,139)","rgb(131,128,122)","rgb(113,111,106)","rgb(95,92,87)","rgb(73,70,66)","rgb(167,164,162)","rgb(149,145,144)","rgb(131,127,126)","rgb(113,108,107)","rgb(95,90,89)","rgb(72,66,65)","rgb(112,111,110)","rgb(103,103,101)","rgb(94,94,93)","rgb(82,81,79)","rgb(72,71,70)","rgb(59,59,58)"],backgroundName:["NP G3.4","NP G3.5","NP G3.6","NP G4.1","NP G4.2","NP G4.3","NP G4.4","NP G4.5","NP G4.6","NP G5.1","NP G5.2","NP G5.3","NP G5.4","NP G5.5","NP G5.6","NP G6.1","NP G6.2","NP G6.3","NP G6.4","NP G6.5","NP G6.6"],          //cutout: '75%',
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
            100
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
backgroundColor:["rgb(209,220,229)","rgb(200,214,228)","rgb(179,196,216)","rgb(208,224,229)","rgb(197,218,228)","rgb(188,212,226)","rgb(172,195,214)","rgb(208,228,226)","rgb(183,209,227)","rgb(171,204,227)","rgb(151,189,220)","rgb(132,170,209)","rgb(97,144,196)","rgb(76,118,170)","rgb(175,213,229)","rgb(164,207,228)","rgb(150,199,223)","rgb(131,184,216)","rgb(106,161,197)","rgb(77,135,174)","rgb(189,224,230)","rgb(161,214,228)","rgb(147,206,220)","rgb(119,190,212)","rgb(81,180,209)","rgb(46,138,171)","rgb(73,188,204)","rgb(0,165,181)","rgb(189,203,221)","rgb(117,142,183)"],backgroundName:["NP A20.4","NP A20.5","NP A20.6","NP A21.3","NP A21.4","NP A21.5","NP A21.6","NP A23.3","NP B20.1","NP B20.2","NP B20.3","NP B20.4","NP B20.5","NP B20.6","NP B21.1","NP B21.2","NP B21.3","NP B21.4","NP B21.5","NP B21.6","NP B23.1","NP B23.2","NP B23.3","NP B23.4","NP B23.5","NP B23.6","NP B24.5","NP B24.6","NP C21.1","NP C21.5"],          //cutout: '80%',
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
backgroundColor:["rgb(187,206,220)","rgb(163,191,215)","rgb(141,175,208)","rgb(133,167,206)","rgb(118,151,190)","rgb(99,128,169)","rgb(191,217,224)","rgb(176,206,220)","rgb(156,195,217)","rgb(123,175,208)","rgb(112,162,195)","rgb(87,141,174)","rgb(191,218,224)","rgb(165,208,221)","rgb(154,196,209)","rgb(199,224,222)","rgb(181,217,220)","rgb(160,202,207)","rgb(135,188,195)","rgb(183,195,210)","rgb(145,155,174)","rgb(182,199,211)","rgb(159,180,198)","rgb(139,157,177)","rgb(117,136,156)","rgb(99,117,138)","rgb(77,94,116)","rgb(176,202,208)","rgb(154,188,199)","rgb(132,160,172)"],backgroundName:["NP C22.1","NP C22.2","NP C22.3","NP C22.4","NP C22.5","NP C22.6","NP C23.1","NP C23.2","NP C23.3","NP C23.4","NP C23.5","NP C23.6","NP C24.1","NP C24.2","NP C24.3","NP C25.1","NP C25.2","NP C25.3","NP C25.4","NP D14.1","NP D14.3","NP D15.1","NP D15.2","NP D15.3","NP D15.4","NP D15.5","NP D15.6","NP D16.1","NP D16.2","NP D16.3"],          //cutout: '75%',
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
backgroundColor:["rgb(110,140,154)","rgb(93,121,135)","rgb(74,101,113)","rgb(68,133,192)","rgb(51,112,168)","rgb(38,107,170)","rgb(33,99,158)","rgb(26,90,143)","rgb(31,77,120)","rgb(34,138,190)","rgb(0,114,161)","rgb(0,107,154)","rgb(0,102,146)","rgb(0,88,124)","rgb(25,80,108)","rgb(0,142,177)","rgb(0,126,159)","rgb(0,111,139)","rgb(0,109,138)","rgb(0,98,121)","rgb(28,89,108)","rgb(61,71,103)","rgb(56,77,108)","rgb(54,84,106)","rgb(52,88,105)","rgb(63,70,92)","rgb(57,72,93)","rgb(54,72,88)","rgb(50,74,86)","rgb(153,213,222)"],backgroundName:["NP D16.4","NP D16.5","NP D16.6","NP E13.1","NP E13.2","NP E13.3","NP E13.4","NP E13.5","NP E13.6","NP E14.1","NP E14.2","NP E14.3","NP E14.4","NP E14.5","NP E14.6","NP E15.1","NP E15.2","NP E15.3","NP E15.4","NP E15.5","NP E15.6","NP F5.3","NP F5.4","NP F5.5","NP F5.6","NP F6.3","NP F6.4","NP F6.5","NP F6.6","NP B24.2"],          //cutout: '70%',
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
        ],
backgroundColor:["rgb(141,201,211)","rgb(112,195,209)","rgb(182,223,226)"],backgroundName:["NP B24.3","NP B24.4","NP B24.1"],          //cutout: '65%',
                cutout: '60%',
                    datalabels: {
                        labels: {
                          title: null
                        }
                     }
    },

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
backgroundColor:["rgb(227,210,222)","rgb(224,204,220)","rgb(215,196,220)","rgb(227,213,224)","rgb(220,202,222)","rgb(211,187,217)","rgb(229,220,225)","rgb(225,215,225)","rgb(223,211,224)","rgb(216,202,221)","rgb(209,193,220)","rgb(228,223,228)","rgb(224,218,226)","rgb(218,211,226)","rgb(215,207,225)","rgb(206,198,216)","rgb(223,212,206)","rgb(219,211,207)","rgb(215,204,203)","rgb(218,202,196)","rgb(212,196,189)","rgb(221,199,220)","rgb(216,190,218)","rgb(199,166,203)","rgb(182,137,186)","rgb(170,124,175)","rgb(169,114,162)","rgb(207,192,221)","rgb(190,169,206)","rgb(187,165,202)"],backgroundName:["NP A15.4","NP A15.5","NP A15.6","NP A16.4","NP A16.5","NP A16.6","NP A17.2","NP A17.3","NP A17.4","NP A17.5","NP A17.6","NP A18.2","NP A18.3","NP A18.4","NP A18.5","NP A18.6","NP A34.4","NP A34.5","NP A34.6","NP A42.4","NP A42.5","NP B16.1","NP B16.2","NP B16.3","NP B16.4","NP B16.5","NP B16.6","NP B17.1","NP B17.2","NP B17.3"],          //cutout: '80%',
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
backgroundColor:["rgb(174,145,190)","rgb(154,122,175)","rgb(134,100,153)","rgb(190,123,136)","rgb(170,107,116)","rgb(202,149,165)","rgb(194,132,153)","rgb(169,107,125)","rgb(222,191,202)","rgb(216,182,193)","rgb(219,178,195)","rgb(197,154,174)","rgb(187,131,158)","rgb(166,117,137)","rgb(213,196,210)","rgb(195,164,192)","rgb(189,158,188)","rgb(177,137,174)","rgb(155,113,150)","rgb(200,182,209)","rgb(174,148,188)","rgb(167,141,184)","rgb(147,119,159)","rgb(189,186,214)","rgb(198,171,182)","rgb(168,145,157)","rgb(152,127,139)","rgb(133,107,120)","rgb(111,84,96)","rgb(195,191,209)"],backgroundName:["NP B17.4","NP B17.5","NP B17.6","NP C15.5","NP C15.6","NP C16.4","NP C16.5","NP C16.6","NP C17.1","NP C17.2","NP C17.3","NP C17.4","NP C17.5","NP C17.6","NP C18.1","NP C18.3","NP C18.4","NP C18.5","NP C18.6","NP C19.2","NP C19.4","NP C19.5","NP C19.6","NP C20.2","NP D12.2","NP D12.3","NP D12.4","NP D12.5","NP D12.6","NP D13.1"],          //cutout: '75%',
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
        ],
backgroundColor:["rgb(183,173,193)","rgb(164,154,173)","rgb(144,133,152)","rgb(121,111,131)","rgb(101,88,106)","rgb(157,122,177)","rgb(134,99,153)","rgb(129,88,143)","rgb(122,87,131)","rgb(110,72,119)","rgb(96,68,104)","rgb(136,129,187)","rgb(114,105,163)","rgb(88,78,134)","rgb(83,79,130)","rgb(80,74,116)","rgb(74,68,103)","rgb(175,88,135)","rgb(153,72,119)","rgb(143,69,107)","rgb(124,71,100)","rgb(123,63,93)","rgb(109,62,85)","rgb(100,61,73)","rgb(97,62,79)","rgb(86,62,74)","rgb(87,68,93)","rgb(78,65,83)"],backgroundName:["NP D13.2","NP D13.3","NP D13.4","NP D13.5","NP D13.6","NP E10.1","NP E10.2","NP E10.3","NP E10.4","NP E10.5","NP E10.6","NP E11.1","NP E11.2","NP E11.3","NP E11.4","NP E11.5","NP E11.6","NP E9.1","NP E9.2","NP E9.3","NP E9.4","NP E9.5","NP E9.6","NP F3.4","NP F3.5","NP F4.5","NP F5.1","NP F6.1"],          //cutout: '70%',
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
backgroundColor:["rgb(217,220,227)","rgb(207,214,227)","rgb(201,210,227)","rgb(187,197,224)","rgb(212,206,220)","rgb(193,187,213)","rgb(179,172,204)","rgb(169,162,201)","rgb(147,141,187)","rgb(123,118,159)","rgb(191,203,223)","rgb(176,189,217)","rgb(159,180,222)","rgb(132,152,202)","rgb(105,127,185)","rgb(93,113,168)","rgb(206,197,214)","rgb(180,163,198)","rgb(199,201,220)","rgb(166,165,205)","rgb(151,148,191)","rgb(133,128,171)","rgb(129,122,167)","rgb(173,191,220)","rgb(153,174,212)","rgb(135,154,198)","rgb(111,131,175)","rgb(166,177,197)","rgb(123,134,155)","rgb(107,115,137)"],backgroundName:["NP A19.3","NP A19.4","NP A19.5","NP A19.6","NP B18.1","NP B18.2","NP B18.3","NP B18.4","NP B18.5","NP B18.6","NP B19.1","NP B19.2","NP B19.3","NP B19.4","NP B19.5","NP B19.6","NP C19.1","NP C19.3","NP C20.1","NP C20.3","NP C20.4","NP C20.5","NP C20.6","NP C21.2","NP C21.3","NP C21.4","NP C21.6","NP D14.2","NP D14.4","NP D14.5"],          //cutout: '80%',
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
backgroundColor:["rgb(84,92,114)","rgb(100,123,189)","rgb(79,101,163)","rgb(71,94,159)","rgb(69,87,140)","rgb(66,79,122)","rgb(54,68,110)","rgb(90,65,85)","rgb(80,61,76)","rgb(75,71,101)","rgb(68,64,85)"],backgroundName:["NP D14.6","NP E12.1","NP E12.2","NP E12.3","NP E12.4","NP E12.5","NP E12.6","NP F3.6","NP F4.6","NP F5.2","NP F6.2"],          //cutout: '75%',
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
backgroundColor:["rgb(231,206,195)","rgb(217,187,175)","rgb(219,209,195)","rgb(209,198,184)","rgb(204,193,178)","rgb(238,218,196)","rgb(227,203,182)","rgb(219,196,172)","rgb(211,184,161)","rgb(225,209,203)","rgb(212,190,183)","rgb(202,180,173)","rgb(233,214,184)","rgb(235,212,181)","rgb(225,202,176)","rgb(220,201,171)","rgb(205,168,84)","rgb(177,140,70)","rgb(182,110,75)","rgb(183,106,78)","rgb(188,139,73)","rgb(188,134,71)","rgb(206,149,77)","rgb(190,135,63)","rgb(182,130,66)","rgb(203,158,97)","rgb(197,147,86)","rgb(167,121,75)","rgb(208,163,110)","rgb(204,157,103)"],backgroundName:["NP A11.5","NP A11.6","NP A33.4","NP A33.5","NP A33.6","NP A40.3","NP A40.4","NP A40.5","NP A40.6","NP A41.3","NP A41.6","NP A42.6","NP A43.3","NP A43.5","NP A43.6","NP A5.6","NP C1.4","NP C1.6","NP C10.6","NP C11.6","NP C2.6","NP C3.6","NP C4.4","NP C4.5","NP C4.6","NP C5.4","NP C5.5","NP C5.6","NP C6.3","NP C6.4"],          //cutout: '80%',
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
backgroundColor:["rgb(191,145,96)","rgb(190,138,88)","rgb(195,136,87)","rgb(189,124,74)","rgb(189,121,76)","rgb(214,199,157)","rgb(206,186,143)","rgb(185,165,125)","rgb(148,130,104)","rgb(139,121,97)","rgb(186,149,141)","rgb(162,125,120)","rgb(138,103,99)","rgb(118,86,82)","rgb(179,145,144)","rgb(159,122,122)","rgb(138,104,105)","rgb(117,83,84)","rgb(223,201,163)","rgb(210,181,136)","rgb(185,152,103)","rgb(168,137,100)","rgb(162,135,97)","rgb(145,121,91)","rgb(215,205,174)","rgb(217,205,164)","rgb(229,208,177)","rgb(216,187,146)","rgb(190,160,123)","rgb(173,141,104)"],backgroundName:["NP C6.5","NP C6.6","NP C7.6","NP C8.6","NP C9.6","NP D1.1","NP D1.2","NP D1.3","NP D1.5","NP D1.6","NP D10.3","NP D10.4","NP D10.5","NP D10.6","NP D11.3","NP D11.4","NP D11.5","NP D11.6","NP D2.1","NP D2.2","NP D2.3","NP D2.4","NP D2.5","NP D2.6","NP D23.1","NP D24.1","NP D3.1","NP D3.2","NP D3.3","NP D3.4"],          //cutout: '75%',
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
backgroundColor:["rgb(165,128,86)","rgb(146,107,66)","rgb(233,210,176)","rgb(224,194,153)","rgb(211,179,138)","rgb(182,147,108)","rgb(150,120,90)","rgb(138,106,70)","rgb(231,203,166)","rgb(213,171,121)","rgb(190,148,102)","rgb(168,129,88)","rgb(154,111,69)","rgb(226,195,161)","rgb(215,177,142)","rgb(192,155,122)","rgb(171,138,109)","rgb(147,115,89)","rgb(123,91,68)","rgb(211,191,172)","rgb(201,176,158)","rgb(184,158,138)","rgb(163,135,118)","rgb(145,114,92)","rgb(126,99,75)","rgb(194,151,127)","rgb(170,130,109)","rgb(148,113,95)","rgb(128,95,79)","rgb(191,149,134)"],backgroundName:["NP D3.5","NP D3.6","NP D4.1","NP D4.2","NP D4.3","NP D4.4","NP D4.5","NP D4.6","NP D5.1","NP D5.3","NP D5.4","NP D5.5","NP D5.6","NP D6.1","NP D6.2","NP D6.3","NP D6.4","NP D6.5","NP D6.6","NP D7.1","NP D7.2","NP D7.3","NP D7.4","NP D7.5","NP D7.6","NP D8.3","NP D8.4","NP D8.5","NP D8.6","NP D9.3"],          //cutout: '70%',
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
backgroundColor:["rgb(166,127,115)","rgb(145,105,93)","rgb(125,91,80)","rgb(144,109,52)","rgb(136,106,60)","rgb(161,116,57)","rgb(138,102,57)","rgb(135,102,62)","rgb(164,106,61)","rgb(147,98,63)","rgb(132,96,65)","rgb(159,94,63)","rgb(141,86,61)","rgb(135,88,68)","rgb(151,81,65)","rgb(135,78,64)","rgb(125,77,64)","rgb(137,91,66)","rgb(122,89,71)","rgb(95,69,61)","rgb(101,80,70)","rgb(93,80,72)","rgb(84,69,65)","rgb(123,90,62)","rgb(125,88,62)","rgb(124,83,60)","rgb(124,81,62)","rgb(117,75,60)","rgb(115,74,63)","rgb(105,82,62)"],backgroundName:["NP D9.4","NP D9.5","NP D9.6","NP E1.5","NP E1.6","NP E2.4","NP E2.5","NP E2.6","NP E3.4","NP E3.5","NP E3.6","NP E4.4","NP E4.5","NP E4.6","NP E5.4","NP E5.5","NP E5.6","NP F0.1","NP F0.2","NP F0.3","NP F0.4","NP F0.5","NP F0.6","NP F1.1","NP F1.2","NP F1.3","NP F1.4","NP F1.5","NP F1.6","NP F2.1"],          //cutout: '65%',
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
        ],
backgroundColor:["rgb(105,79,62)","rgb(108,78,61)","rgb(106,75,61)","rgb(105,73,62)","rgb(101,70,62)","rgb(109,67,64)","rgb(103,64,65)","rgb(92,65,61)","rgb(90,62,62)","rgb(86,61,64)","rgb(87,61,69)","rgb(226,186,138)"],backgroundName:["NP F2.2","NP F2.3","NP F2.4","NP F2.5","NP F2.6","NP F3.1","NP F3.2","NP F4.1","NP F4.2","NP F4.3","NP F4.4","NP D5.2"],          //cutout: '60%',
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
backgroundColor:["rgb(231,236,221)","rgb(239,228,217)","rgb(236,223,211)","rgb(242,233,225)","rgb(243,230,223)","rgb(238,228,225)","rgb(238,230,226)","rgb(235,230,228)","rgb(239,234,229)","rgb(236,232,229)","rgb(231,231,228)","rgb(226,227,229)","rgb(237,234,215)","rgb(235,233,213)","rgb(231,234,229)","rgb(226,230,229)","rgb(219,225,229)","rgb(224,231,228)","rgb(217,228,229)","rgb(227,235,228)","rgb(215,232,228)","rgb(220,230,227)","rgb(220,232,227)","rgb(220,231,223)","rgb(218,233,227)","rgb(231,237,226)","rgb(226,237,226)","rgb(229,232,220)","rgb(224,235,224)","rgb(237,237,226)"],backgroundName:["NP A1.2","NP A11.1","NP A11.2","NP A12.1","NP A12.2","NP A13.1","NP A14.1","NP A15.1","NP A17.1","NP A18.1","NP A19.1","NP A19.2","NP A2.1","NP A2.2","NP A20.1","NP A20.2","NP A20.3","NP A21.1","NP A21.2","NP A22.1","NP A22.2","NP A23.1","NP A23.2","NP A24.1","NP A24.2","NP A25.1","NP A25.2","NP A26.1","NP A26.2","NP A27.1"],          //cutout: '80%',
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
backgroundColor:["rgb(233,236,224)","rgb(233,235,225)","rgb(230,233,223)","rgb(228,231,223)","rgb(240,238,216)","rgb(241,238,210)","rgb(241,237,206)","rgb(241,237,202)","rgb(239,236,229)","rgb(235,233,222)","rgb(228,224,216)","rgb(233,231,224)","rgb(229,226,214)","rgb(227,223,210)","rgb(223,219,208)","rgb(217,210,190)","rgb(240,236,225)","rgb(232,225,213)","rgb(225,218,205)","rgb(238,234,226)","rgb(237,232,226)","rgb(230,224,219)","rgb(240,238,224)","rgb(237,232,216)","rgb(232,227,206)","rgb(228,222,199)","rgb(237,227,199)","rgb(239,229,199)","rgb(238,227,196)","rgb(235,221,186)"],backgroundName:["NP A27.2","NP A28.1","NP A28.2","NP A29.1","NP A3.1","NP A3.2","NP A3.3","NP A3.4","NP A30.1","NP A31.1","NP A31.2","NP A32.1","NP A32.2","NP A32.3","NP A32.4","NP A32.5","NP A33.1","NP A33.2","NP A33.3","NP A34.1","NP A34.2","NP A34.3","NP A35.1","NP A35.2","NP A35.3","NP A35.4","NP A36.1","NP A36.2","NP A36.3","NP A36.4"],          //cutout: '75%',
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
backgroundColor:["rgb(243,231,213)","rgb(242,229,211)","rgb(239,225,207)","rgb(242,231,210)","rgb(242,227,203)","rgb(241,224,199)","rgb(239,222,197)","rgb(241,228,203)","rgb(242,225,195)","rgb(241,236,215)","rgb(243,234,222)","rgb(240,226,209)","rgb(236,228,220)","rgb(231,220,213)","rgb(238,225,205)","rgb(231,217,195)","rgb(243,239,227)","rgb(241,236,222)","rgb(239,231,215)","rgb(238,230,212)","rgb(236,224,201)","rgb(240,233,219)","rgb(245,233,212)","rgb(245,236,211)","rgb(246,230,197)","rgb(242,238,225)","rgb(237,231,217)","rgb(240,229,220)","rgb(233,213,162)","rgb(235,222,185)"],backgroundName:["NP A37.1","NP A37.2","NP A37.3","NP A38.1","NP A38.2","NP A38.3","NP A38.4","NP A39.1","NP A39.2","NP A4.1","NP A40.1","NP A40.2","NP A42.1","NP A42.2","NP A43.1","NP A43.2","NP A5.1","NP A5.2","NP A5.3","NP A5.4","NP A5.5","NP A6.1","NP A6.2","NP A6.3","NP A6.4","NP A7.1","NP A8.1","NP A9.1","NP C1.1","NP A36.5"],          //cutout: '70%',
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

document.querySelectorAll('.nav-link.list-icon.color-nav-link').forEach(elm=>{
    elm.addEventListener('click',function(){
        document.querySelectorAll('.nav-link.list-icon.color-nav-link').forEach(elm=>{
            elm.classList.remove('active')
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



/*************accordions ** start***************/
var addiActionP = document.querySelectorAll('.tasks p.additional');
var addiActionD = document.querySelectorAll('.tasks div.additional');
var addiActionS = document.querySelectorAll('.tasks span.additional');
var addiActionSvg = document.querySelectorAll('.tasks #buttonAddi svg');

var stanActionP = document.querySelectorAll('.tasks p.standard');
var stanActionD = document.querySelectorAll('.tasks div.standard');
var stanActionS = document.querySelectorAll('.tasks span.standard');
var stanActionSvg = document.querySelectorAll('.tasks #buttonStan svg');

function displayNone(element) {
  if (element.style.display === "none") {
    element.style.display = "";
  } else {
    element.style.display = "none";
  } 
}

function buttonAddi(obj) {
  addiActionSvg.forEach(displayNone)
  addiActionP.forEach(displayNone)
  addiActionD.forEach(displayNone)
  addiActionS.forEach(displayNone)
}

function buttonStan(obj) {
  stanActionSvg.forEach(displayNone)
  stanActionD.forEach(displayNone)
  stanActionP.forEach(displayNone)
  stanActionS.forEach(displayNone)
}
/*************accordions ** end***************/



/*************calendar ** start***************/
var months1 = ["January","February","March","April","May","June","July","August","September","October","November","December"];
var months2 = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
var kalen = document.getElementById('calendar');
var lastDay = 31;
var numberOfDays = 35;
var labels = Array(numberOfDays).fill(0)

function numberOfWeeks(m,r) {
  var firstDay = new Date(r, m, 1);
  var lastDay = new Date(r, m + 1, 0);
  var startDate = new Date(r, 0, 1);

  var days1 = Math.floor((firstDay - startDate) / (24 * 60 * 60 * 1000));
  var days2 = Math.floor((lastDay - startDate) / (24 * 60 * 60 * 1000));
         
  var weekNumber1 = Math.ceil(days1 / 7);
  var weekNumber2 = Math.ceil(days2 / 7);
  //console.log('liczba tygodni: ' + (weekNumber2-weekNumber1))
  return (weekNumber2-weekNumber1)
}

function removeP(p) {
  p.remove();
}

function fillCalendar(currentTime) {
 
  var monthNumber = currentTime.getMonth()
  var yearNumber = currentTime.getFullYear()
  var weeksCount = numberOfWeeks(monthNumber,yearNumber);
  var weeksInTable = kalen.querySelector('tbody').querySelectorAll('tr').length

  if (weeksCount == 4) {
    numberOfDays = 35;
    if (weeksInTable >5 ) {
      kalen.querySelector('tbody').removeChild(kalen.querySelector('tbody').lastElementChild)
    }
  } else if (weeksCount == 5 ) {
    numberOfDays = 42;
    if (weeksInTable == 5) {
    var newLine = document.createElement("tr");
    newLine.setAttribute("style", "height: 58px;");
    newLine.innerHTML = `<td class="position-relative"></td>
                            <td class="position-relative"></td>
                            <td class="position-relative"></td>
                            <td class="position-relative"></td>
                            <td class="position-relative"></td>
                            <td class="position-relative"></td>
                            <td class="position-relative"></td>` 
    kalen.querySelector('tbody').appendChild(newLine)
    }
  }

  var first = new Date(yearNumber, monthNumber, 1)
  var whereFirst = first.getDay()
  
  if (whereFirst == 0) {
    whereFirst = 7
  }

  var last = new Date(yearNumber, monthNumber + 1, 0);
  lastDay = last.getDate()
  var dayNumber = 1;
  var valueNumber = 1;
  var oldData = kalen.children[1].querySelectorAll('p');
  
  if (oldData.length > 0 ) {
    oldData.forEach(removeP)
  }

  var day2= new Date(yearNumber, monthNumber, -whereFirst+2)
  var day22 = day2.getDate();

  for (var g = 1; g <= numberOfDays/7; g++) {
    var line = kalen.querySelectorAll('tr')[g+1]
    var mon = 0;
    var d3 = 1;
    
    for (var h=0; h<7; h++){
      if (g==1){
        if (h<(whereFirst-1)){
          valueNumber = day22;
          mon = 0;
          day22++
        } else  {
          valueNumber = dayNumber;
          dayNumber++;
          mon = 1;
        } 
      } else if (dayNumber <= lastDay) {
        valueNumber = dayNumber;
        dayNumber++;
        mon = 1;
      } else {
        valueNumber = d3;
        d3++;
        mon = 0;
      }
      labels[(g-1)*7 + h]=valueNumber;

      var input = document.createElement("p");
      input.classList.add("position-absolute", "top-0", "end-0");
      input.innerHTML =  valueNumber 
      line.querySelectorAll('td')[h].appendChild(input)

      if (mon == 1){
        line.querySelectorAll('td')[h].setAttribute('style','background-color: white;')
      } else {
        line.querySelectorAll('td')[h].setAttribute('style','background-color: #eee;')
      }
    }
  }
}

function changeMonth(obj) {
  var dateSelected = obj.value
  var nowaData = new Date(dateSelected.substring(0,4), dateSelected.substring(4,7), 1)
  fillCalendar(nowaData);
}
/*************calendar ** end***************/






/*************calculating reach ** start***************/
var reg = ''
var mid = ''
var sup = ''
var war = [0,0,0]
var adstock = [0.5, 0.3, 0.2];
var data = [[],[],[]] //Array(lastDay).fill(0)

var dayNumber = 1;
var dataAds = [[],[],[]] 
var iii = 0
var kkk = 0;

var reachTot = []
var reachReg = []
var reachMid = []
var reachSup = []
var reachRegAndMid = []
var reachMidAdd = []
var reachSupAdd = []
var reachOnlyMid = []
var reachOnlySup = []
var reachPerCent = []

//counting max reach
let max= a=> a.reduce((m,x)=> m>x ? m:x);
let sum= a=> a.reduce((m,x)=> m + x, 0);
var maxToTable = 1;
var maxToChart = 1;


function powerCheck(obj) {
  reg = obj.classList.contains('reg');
  mid = obj.classList.contains('mid');
  sup = obj.classList.contains('sup');
  data[0][(iii-2)*7+kkk] += reg;
  data[1][(iii-2)*7+kkk] += mid;
  data[2][(iii-2)*7+kkk] += sup;
  }


function collectData() {
  data = [Array(numberOfDays).fill(0),Array(numberOfDays).fill(0),Array(numberOfDays).fill(0)]
  dataAds = [Array(numberOfDays).fill(0),Array(numberOfDays).fill(0),Array(numberOfDays).fill(0)] 

  //collecting data
  for (iii = 2; iii <= (numberOfDays/7)+1 ; iii++) {
    for (kkk = 0; kkk <7; kkk++) {

        var points = kalen.querySelectorAll('tr')[iii].querySelectorAll('td')[kkk].querySelectorAll('span')
        var numPoints = points.length

        if (numPoints > 0){
          points.forEach(powerCheck)
        }
    }
  }

  //counting adstock
  for (var d = 0; d < numberOfDays; d++){
    (d == 0) ? dataAds[0][d] += data[0][d] : dataAds[0][d] += (data[0][d] + adstock[0]* (dataAds[0][d-1])) ;
    (d == 0) ? dataAds[1][d] += data[1][d] : dataAds[1][d] += (data[1][d] + adstock[1]* (dataAds[1][d-1])) ;
    (d == 0) ? dataAds[2][d] += data[2][d] : dataAds[2][d] += (data[2][d] + adstock[2]* (dataAds[2][d-1])) ;
  }

  //rounding
  for (var d = 0; d < numberOfDays; d++){
    dataAds[0][d] = Math.round((dataAds[0][d] + Number.EPSILON) * 100 )/ 100;
    dataAds[1][d] = Math.round((dataAds[1][d] + Number.EPSILON) * 100 )/ 100;
    dataAds[2][d] = Math.round((dataAds[2][d] + Number.EPSILON) * 100 )/ 100;
  }

  var coefReg = 0.3;
  var coefMid = 0.45;
  var coefSup = 0.6;

  //counting reach
  for (var r = 0; r < numberOfDays; r++){

    //total reach
    reachTot[r] = (dataAds[0][r]*coefReg + dataAds[1][r]*coefMid + dataAds[2][r]*coefSup)/(1.5 + dataAds[0][r] + dataAds[1][r] + dataAds[2][r])

    
    //reach reg + mid    
    reachRegAndMid[r] = (dataAds[0][r]*coefReg + dataAds[1][r]*coefMid )/(1.5 + dataAds[0][r] + dataAds[1][r] )

    //separate reach
    reachReg[r] = (dataAds[0][r]*coefReg )/(1.5 + dataAds[0][r] )
    reachMid[r] = (dataAds[1][r]*coefMid )/(1.5 + dataAds[1][r] )
    reachSup[r] = (dataAds[2][r]*coefSup )/(1.5 + dataAds[2][r] )
    
    //added reach
    reachMidAdd[r] = reachRegAndMid[r] - reachReg[r]
    reachSupAdd[r] = reachTot[r] - reachRegAndMid[r]

    //lost reach
    reachOnlyMid[r] = reachMid[r] - reachMidAdd[r]
    reachOnlySup[r] = reachSup[r] - reachSupAdd[r]
    
  }

  //counting max reach
  maxToTable = max(reachTot);
  maxToChart = max(reachTot) + 0.05 - max(reachTot)%0.05;

  //per cent to color table with blue
  /*reachPerCent = [...reachTot]
  if (maxToTable != 0) {
    reachPerCent.forEach(function (el,i) {
      reachPerCent[i] = el/maxToTable;
    })
  }*/
  
  //heightOfRowsTable();
  //colorTable(reachPerCent);

}





function heightOfRowsTable() {
  var rows = kalen.querySelector('tbody').querySelectorAll('tr');
  var rowsHeight = 58;
  
  rows.forEach(element => {
    element.setAttribute('style','height: 58px'); 
  })
  
  rows.forEach(element => {
    if (element.offsetHeight > rowsHeight) {
      rowsHeight = element.offsetHeight; 
    }
  })

  rows.forEach(element => {
    element.setAttribute('style','height: ' + rowsHeight + 'px'); 
  })

};


var proc = 1;
var secondColorVal = 'white';
var secondColor = 'white';
var firstColor = '#1982c4'; //'#0dcaf0' //'rgb(91, 192, 235)'

function colorTable() {
  collectData();
  heightOfRowsTable();

  reachPerCent = [...reachTot]
  if (maxToTable != 0) {
    reachPerCent.forEach(function (el,i) {
      reachPerCent[i] = el/maxToTable;
    })
  }
  


  var numRows = kalen.querySelector('tbody').querySelectorAll('tr').length

  for (var a = 0 ; a < numRows; a++) {
    var colorRow = kalen.querySelector('tbody').querySelectorAll('tr')[a];

    for (var b = 0 ; b < 7; b++) {
      proc = reachPerCent[a*7+b]

      secondColorVal = colorRow.querySelectorAll('td')[b].getAttribute('style')
      if (secondColorVal.includes('white')) {
        secondColor = 'white';
      } else {
        secondColor = '#eee'
      }
       
      if (proc < 0.5) {
        colorRow.querySelectorAll('td')[b]
          .setAttribute('style','background: linear-gradient(to bottom, ' + secondColor + ' ' + 100*(1-proc) +'%,' + firstColor + ' ' + 100*proc + '%')
      } else {
        colorRow.querySelectorAll('td')[b]
          .setAttribute('style','background: linear-gradient(to top, ' + firstColor +' ' + 100*proc +  '%,'+ secondColor +' ' + 100*(1-proc) +'%')
      }

    }
  }

  ['sum','div','regular','average','super'].forEach(deleteDetailedCharts)

}
/*************calculating reach ** end***************/










/*************adstock chart in info modal ** start***************/
function chartForInfo1() {

  var ctx1 = document.getElementById('chart-comparison').getContext('2d');

  var dataLi = []
  var dataLines = [[0,0.3,0.15,0.08,0.04,0.02,0.01,0],
                 [0,0.45,0.14,0.04,0.01,0,0,0],
                 [0,0.6,0.12,0.02,0,0,0,0]]

  legenda = ['regular','middle','super']
  var colors = ['#8ac926','#ffca3a','#ff595e'];

  for (var s=0; s < dataLines.length; s++) {
    dataLi.push({
      label: legenda[s], 
      data: dataLines[s],
      fill: false,
      borderColor: colors[s], 
      tension: 0.3
    })
  }

  const data = {
    labels: ["1", "2", "3", "4", "5", "6", "7", "8"],
    datasets: dataLi
  }

  //config
  const config = {
    type: 'line',
    data,

    options: {
      elements: {
                point:{
                    radius: 0
                }
            },
      responsive:  true,

      legend: {
        position: 'right', 
        reverse: true,
        onClick: (e) => e.stopPropagation(),
        boxWidth: 50 
              },

      title: {
                display: true,
                //text: tytul
            },

      scales: {
        grid: [{
          borderWidth: 0.2,
          display: false
        }],

        xAxes: [{
          gridLines: {
            color: 'rgba(128,128,128, 0.2)',
            lineWidth: 0.5
          }
        }],

        yAxes: [{
                display: true,
                ticks: {
                    beginAtZero: true,
                    //max: 1.1
                },
                //stacked: true,
                gridLines: {
                  color: 'rgba(128,128,128, 0.2)',
                  lineWidth: 0.5
                }
            }],              
    }
  }
  };

  var myLineChart = new Chart(ctx1,
    config);

}
/*************adstock chart in info modal ** end***************/




/*************adstock chart in info modal ** start***************/
function chartForInfo2() {

  var ctx2 = document.getElementById('chart-overtime').getContext('2d');

  var dataLi = []
  var dataLines = [[1,0.45,0.20,0.09,0.04,0.02,0.01,0]]

  legenda = ['reach']
  var colors = ['#1982c4'];

  for (var s=0; s < dataLines.length; s++) {
    dataLi.push({
      label: legenda[s], 
      data: dataLines[s],
      backgroundColor: colors[s],
      lineTension: 0,
      barPercentage: 1.25,
    })
  }

  const data = {
    labels: ["1", "2", "3", "4", "5", "6", "7", "8"],
    datasets: dataLi
  }

  //config
  const config = {
    type: 'bar',
    data,

    options: {
      elements: {
                point:{
                    radius: 0
                }
            },
      responsive:  true,

      legend: {
        position: 'right', 
      //  reverse: true,
        onClick: (e) => e.stopPropagation(),
        boxWidth: 50 
              },

      title: {
                display: true,
                //text: tytul
            },

      scales: {
        grid: [{
          borderWidth: 0.2,
          display: false
        }],

        xAxes: [{
          gridLines: {
            color: 'rgba(128,128,128, 0.2)',
            lineWidth: 0.5
          }
        }],

        yAxes: [{
                display: true,
                ticks: {
                    beginAtZero: true,
                    stepSize: 0.2
                    //max: 1.1
                },
                //stacked: true,
                gridLines: {
                  color: 'rgba(128,128,128, 0.2)',
                  lineWidth: 0.5
                }
            }],              
    }
  }
  };

  var myLineChart = new Chart(ctx2,
    config);

}
/*************adstock chart in info modal ** end***************/


function addDetailedCharts(id, data) {
  var  place = document.getElementById('chart' + id);
  place.innerHTML = `<canvas id="` + id  + `" style="background: white; width:1200px; height:250px;"></canvas> `
  additionalChart(id, data)
}

function deleteDetailedCharts(id) {
  console.log('delete: ', id)
  var delChart = document.getElementById(id);
  if (delChart) {
    delChart.remove()
  }
}

function summaryChart() {
  document.getElementById('additionalCharts').setAttribute('style','display:')
  colorTable()
  
  if (maxToTable > 0) {
    addDetailedCharts('sum', [reachTot])
  } else {
    deleteDetailedCharts('sum')
  }

  ['div','regular','average','super'].forEach(deleteDetailedCharts)

}

function extraCharts() {
  document.getElementById('additionalCharts').setAttribute('style','display:')
  colorTable()

  var sumreg = sum(reachReg);
  var summid = sum(reachMid);
  var sumsup = sum(reachSup);
  var numTypes = [(sumreg > 0) ? 1 : 0 , (summid > 0) ? 1 : 0, (sumsup > 0) ? 1 : 0];

  if (maxToTable > 0) {
    addDetailedCharts('sum', [reachTot])
  }
  if (sum(numTypes) == 1) {  
    deleteDetailedCharts('div')
    addDetailedCh(numTypes)
  }
  if (sum(numTypes) > 1) {
    addDetailedCharts('div', [reachReg, reachMidAdd, reachSupAdd])
    addDetailedCh(numTypes)
  }

}


function addDetailedCh(numTypes) {
  if (numTypes[0]){
    addDetailedCharts('regular', [reachReg])
  } else {
    deleteDetailedCharts('regular')
  } 

  if (numTypes[1]) {
    addDetailedCharts('average', [reachMidAdd,reachOnlyMid])
  } else {
    deleteDetailedCharts('average')
  }
  
  if (numTypes[2]){
    addDetailedCharts('super', [reachSupAdd,reachOnlySup])
  } else {
    deleteDetailedCharts('super');
  }
}



/*************additional charts ** start***************/
function additionalChart(id, chartData) {

  console.log("funkcja wykres dane id " +id);
  var ctx = document.getElementById(id).getContext('2d');
  
  var daneLiniowe = []
  var chartTitle = []
  var kolor = ['rgba(105, 0, 132, .2)', ]
  var legenda = []


  if (id == 'sum' ) {
    kolor = ['#1982c4']
    legenda = ['sum     ']
    chartTitle = ['total reach']
  } else if (id == 'div')  {
    kolor = ['#8ac926','#ffca3a','#ff595e']
    legenda = ['reg     ', 'mid     ', 'sup     ']
    chartTitle = ['total reach divided by groups']

    //correction for 2 groups
    for (var s=2;s>=0;s--) {
      if (!sum(chartData[s])) {
        kolor.splice(s,1)
        legenda.splice(s,1)
        chartData.splice(s,1)
      } 
    }
    
  } else if (id == 'regular') {
     kolor = ['#8ac926']
     legenda = ['reg     ']
     chartTitle = ['reach of regular posts']
  } else if (id == 'average') {
     kolor = ['#ffca3a','rgb(200,200,200)']
     legenda = ['avg   ', 'avg lost']
     chartTitle = ['reach of average promo posts and lost/cannibalized reach']

     if (!sum(chartData[1])) {
      kolor.splice(1,1)
      legenda.splice(1,1)
      chartData.splice(1,1)
      chartTitle = ['reach of average promo posts']
    } 

  } else if (id == 'super') {
     kolor = ['#ff595e','rgb(200,200,200)']
     legenda = ['sup   ', 'sup lost']
     chartTitle = ['reach of superpromo posts and lost/cannibalized reach']

     if (!sum(chartData[1])) {
      kolor.splice(1,1)
      legenda.splice(1,1)
      chartData.splice(1,1)
      chartTitle = ['reach of superpromo posts']
    } 

  }

  for (var s=0; s < chartData.length; s++) {
    daneLiniowe.push({
      label: legenda[s], //"zasięg",
      data: chartData[s],
      backgroundColor: kolor[s],
      //borderColor: ['rgba(200, 99, 132, .7)',  ],
      //borderWidth: 2,
      lineTension: 0,
      barPercentage: 1.25,
    })
  }



  //setup
      const data = {
        labels: labels,
        datasets: daneLiniowe
      }

  //config
      const config = {
        type: 'bar',
        data,

        options: {
          responsive: true,
          legend: {
            position: 'right', // place legend on the right side of chart
            reverse: true,
            onClick: (e) => e.stopPropagation(),
            boxWidth: 50 
                  },
          title: {
                    display: true,
                    text: chartTitle,
                    align: 'end',
                },

          scales: {
            grid: [{
              borderWidth: 0.1,
              display: false
            }],

            xAxes: [{
              stacked: true, // this should be set to make the bars stacked
              //barPercentage: 1.25,
              //maxBarThickness: 100,
              gridLines: {
                color: 'rgba(128,128,128, 0.2)',
                lineWidth: 0.5
              }
           }],
            yAxes: [{
                    display: true,
                    ticks: {
                        beginAtZero: true,
                      
                        max: maxToChart
                    },
                    stacked: true,
                    gridLines: {
                      color: 'rgba(128,128,128, 0.2)',
                      lineWidth: 0.5
                    }
                }],
                plugins: {
                  legend: {
                    display: false
                  }
                },
       
        }
      }
      };

  //init block
  var myLineChart = new Chart(ctx,
    config);

}
/*************additional charts ** end***************/










/*************for action settings ** start***************/

function addingToTableWithSettings(element) {
  var power = 1;
  if (element.classList.contains('reg')) {
    power = 0;
  } else if (element.classList.contains('sup')) {
    power = 2;
  }

  var touchKl = element.cloneNode(true);
  var touchKla = touchKl.classList;
  touchKla.remove('reg','mid','sup', 'btn','btn-light','btn-outline-dark','btn-sm','text-nowrap','overflow-hidden','additional','standard');

  var ikon = element.querySelector('svg').cloneNode(true);
  var newLine = document.createElement('tr')
  newLine.innerHTML = `<td scope="row" class="` + touchKla + `">` + ikon.outerHTML + element.innerText + `</td>
                       <td><input class="range-slider__range1 slider"  type="range" value="` + power + `" min="0" max="2" step="1"></td>
                       <td><input class="range-slider__range2 slider"  type="range" value="1" min="0" max="2" step="1" disabled></td>`
  actionTable.querySelector('tbody').appendChild(newLine)

}

function listOfActions() {
  var list1 = document.querySelectorAll('.tasks span.standard');
  var list2 = document.querySelectorAll('.tasks span.additional');
  var actionTable = document.getElementById('actionTable');
  
  actionTable.querySelector('tbody').textContent = ''
  
  list1.forEach(addingToTableWithSettings);
  list2.forEach(addingToTableWithSettings);
}


function saveChanges() {
  var listTouch = document.getElementById('actionTable').querySelector('tbody').querySelectorAll('tr');

  listTouch.forEach(elem => {

      var className = elem.querySelectorAll('td')[0].classList.value
      var classVal = elem.querySelectorAll('td')[1].querySelector('input').value
      var types = ['reg','mid','sup']

      if (!document.querySelector('.tasks').querySelector('.' + className).classList.contains(types[classVal])) {

        var elemMod = document.querySelector('.tasks').querySelector('.' + className)
        elemMod.classList.remove('reg')
        elemMod.classList.remove('mid')
        elemMod.classList.remove('sup')
        elemMod.classList.add(types[classVal])

        var elemKal = document.querySelector('#calendar').querySelectorAll('.' + className)
        elemKal.forEach(element => {
          element.classList.remove('reg')
          element.classList.remove('mid')
          element.classList.remove('sup')
          element.classList.add(types[classVal])
        })
      }

  })

}

/*************for action settings ** end***************/


















/*************for mobile ** start***************/

var counter = 0

function adjustmentForMobile() {
  if (counter == 0) {
    document.getElementById('onmobile').classList.add('show');
    document.getElementById('onmobile').setAttribute('style',"display: block");
    counter++;

    document.querySelectorAll('.btn-sm').forEach(b => {
      b.setAttribute('style','padding:0;')
    })

    myModal.hide()
    //hide menu
    document.querySelector('.navbar').setAttribute('style','display: none')
    document.querySelector('.tasks').parentElement.parentElement.setAttribute('style','display: none')


    var igpost = document.querySelector('.IGpost')
    var igpost2 = igpost.cloneNode(true)
    var igpost3 = igpost.cloneNode(true)

    var igreel = document.querySelector('.IGreels')
    var igreel2 = igreel.cloneNode(true)
    var igreel3 = igreel.cloneNode(true)

    var ttpost = document.querySelector('.TTpost')
    var ttpost2 = ttpost.cloneNode(true)
    var ttpost3 = ttpost.cloneNode(true)

    var ytvideo = document.querySelector('.YTvideo')
    var ytvideo2 = ytvideo.cloneNode(true)
    var ytvideo3 = ytvideo.cloneNode(true)

    kalen.querySelectorAll('tr')[3].querySelectorAll('td')[0].appendChild(igpost2)
    kalen.querySelectorAll('tr')[3].querySelectorAll('td')[3].appendChild(igpost3)

    kalen.querySelectorAll('tr')[2].querySelectorAll('td')[4].appendChild(igreel2)
    kalen.querySelectorAll('tr')[4].querySelectorAll('td')[4].appendChild(igreel3)

    kalen.querySelectorAll('tr')[4].querySelectorAll('td')[1].appendChild(ytvideo2)
    kalen.querySelectorAll('tr')[6].querySelectorAll('td')[1].appendChild(ytvideo3)

    kalen.querySelectorAll('tr')[3].querySelectorAll('td')[5].appendChild(ttpost2)
    kalen.querySelectorAll('tr')[6].querySelectorAll('td')[5].appendChild(ttpost3)

    document.getElementById('buttonForMobile').querySelector('button').setAttribute('style','background-color: var(--mypurple)')
    document.getElementById('buttonForDesktop').querySelector('button').setAttribute('style','display: none')

  }
}

function closeInfo() {
  document.getElementById('onmobile').classList.remove('show');
  document.getElementById('onmobile').setAttribute('style',"");
}

/*function isMob() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

if (isMob()) {
  adjustmentForMobile();
}*/

document.addEventListener('touchstart', function(e) { //'touchmove'
  adjustmentForMobile();
  e.preventDefault(); 
  e.stopPropagation();
}, 
//{ passive:false }
);








var myModal = new bootstrap.Modal(document.getElementById('miniTut'), {
  keyboard: false
})


myModal.toggle()







//'use strict';

document.addEventListener('DOMContentLoaded', function() {
  
  //month for selection
  var currentTime = new Date();
  var currentMonth = currentTime.getMonth()
  var currentYear = currentTime.getFullYear()
  fillCalendar(currentTime);

  var pastTime = new Date(currentYear, currentMonth-1,1)
  var pastMonth = pastTime.getMonth()
  var pastYear = pastTime.getFullYear()

  var nextTime = new Date(currentYear, currentMonth+1,1)
  var nextMonth = nextTime.getMonth()
  var nextYear = nextTime.getFullYear()

  var nextNextTime = new Date(currentYear, currentMonth+2,1)
  var nextNextMonth = nextNextTime.getMonth()
  var nextNextYear = nextNextTime.getFullYear()

  
  //list of months for selection
  document.querySelector('select').childNodes[1].innerHTML = months1[pastMonth] + ' ' + pastYear
  document.querySelector('select').childNodes[1].value = String(pastYear) + String(pastMonth)
  document.querySelector('select').childNodes[3].innerHTML = months1[currentMonth] + ' ' + currentYear
  document.querySelector('select').childNodes[3].value = String(currentYear) + String(currentMonth)
  document.querySelector('select').childNodes[5].innerHTML = months1[nextMonth] + ' ' + nextYear
  document.querySelector('select').childNodes[5].value = String(nextYear) + String(nextMonth)
  document.querySelector('select').childNodes[7].innerHTML = months1[nextNextMonth] + ' ' + nextNextYear
  document.querySelector('select').childNodes[7].value = String(nextNextYear) + String(nextNextMonth)


  //adding class to the calendar
  var idid = 0
  var numDaysInCalendar = document.getElementById('calendar').children[1].querySelectorAll('td')
  function addingID(square) {
    square.classList.add('position-relative')
    square.id = 'zone' + idid;
    idid++
  }
  numDaysInCalendar.forEach(addingID)


  //adding chart for info section
  chartForInfo1()
  chartForInfo2();

  
 /******************DRAGULA********************************** */
  dragula([document.querySelector(".tasks"), 
  document.getElementById("zone0"),document.getElementById("zone1"),document.getElementById("zone2"),    
  document.getElementById("zone3"),document.getElementById("zone4"),document.getElementById("zone5"),
  document.getElementById("zone6"),document.getElementById("zone7"),document.getElementById("zone8"),
  document.getElementById("zone9"),
  document.getElementById("zone10"),document.getElementById("zone11"),document.getElementById("zone12"),
  document.getElementById("zone13"),document.getElementById("zone14"),document.getElementById("zone15"),
  document.getElementById("zone16"),document.getElementById("zone17"),document.getElementById("zone18"),
  document.getElementById("zone19"),
  document.getElementById("zone20"),document.getElementById("zone21"),document.getElementById("zone22"),
  document.getElementById("zone23"),document.getElementById("zone24"),document.getElementById("zone25"),
  document.getElementById("zone26"),document.getElementById("zone27"),document.getElementById("zone28"),
  document.getElementById("zone29"),
  document.getElementById("zone30"),document.getElementById("zone31"),document.getElementById("zone32"),
  document.getElementById("zone33"),document.getElementById("zone34"),document.getElementById("zone35"),
  document.getElementById("zone36"),document.getElementById("zone37"),document.getElementById("zone38"),
  document.getElementById("zone39"),
  document.getElementById("zone40"),document.getElementById("zone41") , ] ,
  {
    invalid: function (el, handle) {
    return el.classList.contains('donotdrag'); // don't prevent any drags from initiating by default
  },
    copy: function (el, source) {
      el.classList.remove('accordion-collapse');
      return source === document.querySelector(".tasks")
      },
    accepts: function (el, target) {
      return target !== document.querySelector(".tasks") && !el.classList.contains('donotdrag')
      },
    removeOnSpill: true
    },
  );







});

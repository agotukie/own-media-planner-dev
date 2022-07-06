function buttonAddi(obj) {
  //console.log(obj)
  var addiActionP = document.querySelectorAll('.tasks p.additional');
  var addiActionD = document.querySelectorAll('.tasks div.additional');
  var addiActionS = document.querySelectorAll('.tasks span.additional');
  var addiActionSvg = document.querySelectorAll('.tasks #buttonAddi svg');

  addiActionSvg.forEach(element => {
    if (element.style.display === "none") {
      element.style.display = "";
    } else {
      element.style.display = "none";
    } }
  )

  addiActionP.forEach(element => {
    if (element.style.display === "none") {
      element.style.display = "";
    } else {
      element.style.display = "none";
    } }
  )

  addiActionD.forEach(element => {
    if (element.style.display === "none") {
      element.style.display = "";
    } else {
      element.style.display = "none";
    } }
  )

  addiActionS.forEach(element => {
    if (element.style.display === "none") {
      element.style.display = "";
    } else {
      element.style.display = "none";
    } }
  )

}


function buttonStan(obj) {
  //console.log(obj)
  var stanActionP = document.querySelectorAll('.tasks p.standard');
  var stanActionD = document.querySelectorAll('.tasks div.standard');
  var stanActionS = document.querySelectorAll('.tasks span.standard');
  var stanActionSvg = document.querySelectorAll('.tasks #buttonStan svg');

  stanActionSvg.forEach(element => {
    if (element.style.display === "none") {
      element.style.display = "";
    } else {
      element.style.display = "none";
    } }
  )

  stanActionD.forEach(element => {
    if (element.style.display === "none") {
      element.style.display = "";
    } else {
      element.style.display = "none";
    } }
  )

  stanActionP.forEach(element => {
    if (element.style.display === "none") {
      element.style.display = "";
    } else {
      element.style.display = "none";
    } }
  )

  stanActionS.forEach(element => {
    if (element.style.display === "none") {
      element.style.display = "";
    } else {
      element.style.display = "none";
    } }
  )

}

var months1 = ["January","February","March","April","May","June","July","August","September","October","November","December"];
var months2 = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];

var ostatniDzien = 31;
var kalen = document.getElementById('kalendarz');




function liczbaTygodni(m,r) {
  //currentDate = new Date();
    var pierwszyDzien = new Date(r, m, 1);
    var ostatniDzien = new Date(r, m + 1, 0);
    var startDate = new Date(r, 0, 1);

    var days1 = Math.floor((pierwszyDzien - startDate) / (24 * 60 * 60 * 1000));
    var days2 = Math.floor((ostatniDzien - startDate) / (24 * 60 * 60 * 1000));
         
    var weekNumber1 = Math.ceil(days1 / 7);
    var weekNumber2 = Math.ceil(days2 / 7);
    //console.log('liczba tygodni: ' + (weekNumber2-weekNumber1))
    return (weekNumber2-weekNumber1)
}

var liczbaDni = 35;
var labels = Array(liczbaDni).fill(0)

function fillCalendar(currentTime) {
 
  var dzienTyg = currentTime.getDay()
  var miesiac = currentTime.getMonth()
  var rok = currentTime.getFullYear()

  var noTyg = liczbaTygodni(miesiac,rok);
  var tygodnieWtabeli = kalen.querySelector('tbody').querySelectorAll('tr').length

  if (noTyg == 4) {
    liczbaDni = 35;
    if (tygodnieWtabeli >5 ) {
      kalen.querySelector('tbody').removeChild(kalen.querySelector('tbody').lastElementChild)
    }
  } else if (noTyg == 5 ) {
    liczbaDni = 42;
    if (tygodnieWtabeli == 5) {
    
    var nowyWiersz = document.createElement("tr");

    nowyWiersz.setAttribute("style", "height: 58px;");
    nowyWiersz.innerHTML = `<td class="position-relative"></td>
                            <td class="position-relative"></td>
                            <td class="position-relative"></td>
                            <td class="position-relative"></td>
                            <td class="position-relative"></td>
                            <td class="position-relative"></td>
                            <td class="position-relative"></td>` 
    kalen.querySelector('tbody').appendChild(nowyWiersz)
    }

  }

  

  var pierwszy = new Date(rok, miesiac, 1)
  var gdziePierwszy = pierwszy.getDay() //dzien tygodnia pierwszy

  if (gdziePierwszy == 0) {
    gdziePierwszy = 7
  }


  var ostatni = new Date(rok, miesiac + 1, 0);
  ostatniDzien = ostatni.getDate()
  //console.log('gdzie pierwszy: ' + gdziePierwszy + ', ostatni dzien: ' + ostatniDzien)

  
  var dzien = 1;
  var wartosc = 1;

  document.getElementById('month').innerText = months1[miesiac]


 //usunąc p jeżeli są
  function usun(co) {
    co.remove();
  }

  var poprzednieDane = kalen.children[1].querySelectorAll('p');
  if (poprzednieDane.length > 0 ) {
    poprzednieDane.forEach(usun)
  }


  var dzien2= new Date(rok, miesiac, -gdziePierwszy+2)
  var dzien22 = dzien2.getDate();

  for (var g = 1; g <= liczbaDni/7; g++) {
    var wiersz = kalen.querySelectorAll('tr')[g+1]
    var mies = 0;
    var d3 = 1;
    
    for (var h=0; h<7; h++){
      if (g==1){
        if (h<(gdziePierwszy-1)){
          wartosc = dzien22;
          mies = 0;
          dzien22++
        } else  {
          wartosc = dzien;
          dzien++;
          mies = 1;
        } 
      } else if (dzien <= ostatniDzien) {
        wartosc = dzien;
        dzien++;
        mies = 1;
      } else {
        wartosc = d3;
        d3++;
        mies = 0;
      }
      labels[(g-1)*7 + h]=wartosc;

      var input = document.createElement("p");
      input.classList.add("position-absolute", "top-0", "end-0");
      input.innerHTML =  wartosc 
      wiersz.querySelectorAll('td')[h].appendChild(input)

      if (mies == 1){
        wiersz.querySelectorAll('td')[h].setAttribute('style','background-color: white;')
      } else {
        wiersz.querySelectorAll('td')[h].setAttribute('style','background-color: transparent;')
      }
    }

  }

}





function changeMonth(obj) {
  //console.log(obj.value)
  var nowyMiesiac = parseInt(obj.value);
  //console.log('nowymiesiac: ', nowyMiesiac)
  var nowaData = new Date(2022, nowyMiesiac, 1)
  fillCalendar(nowaData);
}



var reg = ''
var mid = ''
var sup = ''
var war = [0,0,0]
var adstock = [0.5, 0.3, 0.2];
var zmienne = [[],[],[]] //Array(ostatniDzien).fill(0)
//var zmienne = [Array(ostatniDzien-1).fill(0),Array(ostatniDzien-1).fill(0),Array(ostatniDzien-1).fill(0)] 
var dzien = 1;
var zmienneAds = [[],[],[]] 
var iii = 0
var kkk = 0;

var zasiegTot = []
var zasiegReg = []
var zasiegMid = []
var zasiegSup = []

var zasięgRegIMid = []
var zasiegMidAdd = []
var zasiegSupAdd = []

var zasiegTylkoMid = []
var zasiegTylkoSup = []
var reachPerCent = []

var maxToTable = 1;
var maxToChart = 1;


function powerCheck(obj) {
  reg = obj.classList.contains('reg');
  mid = obj.classList.contains('mid');
  sup = obj.classList.contains('sup');
  zmienne[0][(iii-2)*7+kkk] += reg;
  zmienne[1][(iii-2)*7+kkk] += mid;
  zmienne[2][(iii-2)*7+kkk] += sup;
  }


function collectData() {
  zmienne = [Array(liczbaDni).fill(0),Array(liczbaDni).fill(0),Array(liczbaDni).fill(0)]
  zmienneAds = [Array(liczbaDni).fill(0),Array(liczbaDni).fill(0),Array(liczbaDni).fill(0)] 

//collecting data
  for (iii = 2; iii <= (liczbaDni/7)+1 ; iii++) {
    for (kkk = 0; kkk <7; kkk++) {

        var akcje = kalen.querySelectorAll('tr')[iii].querySelectorAll('td')[kkk].querySelectorAll('span')
        var ileAkcji = akcje.length

        if (ileAkcji > 0){
          //console.log(iii, kkk)
          akcje.forEach(powerCheck)
        }
    }
  }

  //counting adstock
  for (var d = 0; d < liczbaDni; d++){
    (d == 0) ? zmienneAds[0][d] += zmienne[0][d] : zmienneAds[0][d] += (zmienne[0][d] + adstock[0]* (zmienneAds[0][d-1])) ;
    (d == 0) ? zmienneAds[1][d] += zmienne[1][d] : zmienneAds[1][d] += (zmienne[1][d] + adstock[1]* (zmienneAds[1][d-1])) ;
    (d == 0) ? zmienneAds[2][d] += zmienne[2][d] : zmienneAds[2][d] += (zmienne[2][d] + adstock[2]* (zmienneAds[2][d-1])) ;
  }

  //rounding
  for (var d = 0; d < liczbaDni; d++){
    zmienneAds[0][d] = Math.round((zmienneAds[0][d] + Number.EPSILON) * 100 )/ 100;
    zmienneAds[1][d] = Math.round((zmienneAds[1][d] + Number.EPSILON) * 100 )/ 100;
    zmienneAds[2][d] = Math.round((zmienneAds[2][d] + Number.EPSILON) * 100 )/ 100;
  }

  var coefReg = 0.3;
  var coefMid = 0.45;
  var coefSup = 0.6;




  //counting reach
  for (wiersz = 0; wiersz < liczbaDni; wiersz++){

    //całkowity zasięg
    zasiegTot[wiersz] = (zmienneAds[0][wiersz]*coefReg + zmienneAds[1][wiersz]*coefMid + zmienneAds[2][wiersz]*coefSup)/(1.5 + zmienneAds[0][wiersz] + zmienneAds[1][wiersz] + zmienneAds[2][wiersz])

    //zasięg reg + mid    
    zasięgRegIMid[wiersz] = (zmienneAds[0][wiersz]*coefReg + zmienneAds[1][wiersz]*coefMid )/(1.5 + zmienneAds[0][wiersz] + zmienneAds[1][wiersz] )

    //pojedyncze zasięgi
    zasiegReg[wiersz] = (zmienneAds[0][wiersz]*coefReg )/(1.5 + zmienneAds[0][wiersz] )
    zasiegMid[wiersz] = (zmienneAds[1][wiersz]*coefMid )/(1.5 + zmienneAds[1][wiersz] )
    zasiegSup[wiersz] = (zmienneAds[2][wiersz]*coefSup )/(1.5 + zmienneAds[2][wiersz] )
    
    //zasięg dodany przez medium
    zasiegMidAdd[wiersz] = zasięgRegIMid[wiersz] - zasiegReg[wiersz]
    zasiegSupAdd[wiersz] = zasiegTot[wiersz] - zasięgRegIMid[wiersz]

    //utracony
    zasiegTylkoMid[wiersz] = zasiegMid[wiersz] - zasiegMidAdd[wiersz]
    zasiegTylkoSup[wiersz] = zasiegSup[wiersz] - zasiegSupAdd[wiersz]
    
  }


  let max= a=> a.reduce((m,x)=> m>x ? m:x);
  maxToTable = max(zasiegTot);
  maxToChart = max(zasiegTot) + 0.05 - max(zasiegTot)%0.05;

  reachPerCent = [...zasiegTot]
  if (maxToTable != 0) {
    reachPerCent.forEach(function (el,i) {
      reachPerCent[i] = el/maxToTable;
    })
  }
  



  colorTable(reachPerCent);


}

var proc = 1;
var secondColorVal = 'white';
var secondColor = 'white';
var firstColor = '#1982c4'; //'#0dcaf0' //'rgb(91, 192, 235)'


function colorTable(rpc) {

  //kalen
  //kal.querySelector('tbody').querySelectorAll('tr')[3].querySelectorAll('td')[2].setAttribute('style','background: linear-gradient(to top,  rgb(91, 192, 235) 70%, white 30%')

  var numRows = kalen.querySelector('tbody').querySelectorAll('tr').length

  for (var a = 0 ; a < numRows; a++) {
    var colorRow = kalen.querySelector('tbody').querySelectorAll('tr')[a];

    for (var b = 0 ; b < 7; b++) {
      proc = rpc[a*7+b]

      secondColorVal = colorRow.querySelectorAll('td')[b].getAttribute('style')
      if (secondColorVal.includes('white')) {
        secondColor = 'white';
      } else {
        secondColor = 'transparent'
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




}









/*dodawanie usuwanie wykresów*/
function wykresMiejsce(rodzaj, dane) {//var  miejsce = document.querySelector(".chart-container");
  var  miejsce = document.querySelector("#" + rodzaj);
  var id = "lineChart" + rodzaj;
  var daneDoWykresu = dane;


  if (miejsce.childElementCount == 0){
    miejsce.innerHTML = `<canvas id="` + id  + `" style="width:1200px; height:250px;"></canvas> `
    wykresDane(id, daneDoWykresu)   
  } else {

    var wykres = document.createElement("canvas");
    wykres.setAttribute("id", id);

    let myPromise = new Promise(function () {
    miejsce.removeChild(miejsce.firstElementChild);
    });
      
    myPromise.then(miejsce.innerHTML = `<canvas id="` + id  + `" style="width:1200px; height:250px;"></canvas> `
        ).then(sprawdzenie()).then(wykresDane(id, daneDoWykresu))

    function sprawdzenie() {
      if (document.querySelector("#" + rodzaj).childElementCount > 1)
      {document.querySelector("#" + rodzaj).removeChild(document.querySelector("#" + rodzaj).lastElementChild);}
      }
  }


}













/* wykres aktwyności i adstoków */
function wykresDane2() {


  var ctx2 = document.getElementById('chart-comparison').getContext('2d');


  var daneLi = []
  var dataLines = [[0,0.3,0.15,0.08,0.04,0.02,0.01,0],
                 [0,0.45,0.14,0.04,0.01,0,0,0],
                 [0,0.6,0.12,0.02,0,0,0,0]]

  legenda = ['reg','mid','sup']
  var kolory = ['rgba(155, 197, 61)','rgba(255,140,0)','rgb(76, 0, 255)'];
  for (var s=0; s < dataLines.length; s++) {
    daneLi.push({
      label: legenda[s], //"zasięg",
      data: dataLines[s],
      fill: false,
      borderColor: kolory[s], //'rgb(75, 192, 192)',
      tension: 0.3
    })
  }
      const data = {
        labels: ["1", "2", "3", "4", "5", "6", "7", "8"],
        datasets: daneLi
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
          //maintainAspectRatio: false,
          legend: {
            position: 'right', // place legend on the right side of chart
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

  //init block
  var myLineChart = new Chart(ctx2,
    config);

}




function dodanieDoTabeli(element) {
  var power = 1;
  if (element.classList.contains('reg')) {
    power = 0;
  } else if (element.classList.contains('sup')) {
    power = 2;
  }

  var touchKl = element.cloneNode(true);
  var touchKla = touchKl.classList;

  touchKla.remove('reg','mid','sup', 'btn','btn-light','btn-outline-dark','btn-sm','text-nowrap','overflow-hidden','additional','standard');
  //console.log('klasa: ' + touchKla)

  var ikon = element.querySelector('svg').cloneNode(true);

  var newLine = document.createElement('tr')
  newLine.innerHTML = `<td scope="row" class="` + touchKla + `">` + ikon.outerHTML + element.innerText + `</td>
                       <td><input class="range-slider__range1 slider"  type="range" value="` + power + `" min="0" max="2" step="1"></td>
                       <td><input class="range-slider__range2 slider"  type="range" value="1" min="0" max="2" step="1"></td>`
  actionTable.querySelector('tbody').appendChild(newLine)

}

// get list of actions
function listOfActions() {
  var list1 = document.querySelectorAll('.tasks span.standard');
  var list2 = document.querySelectorAll('.tasks span.additional');
  var actionTable = document.getElementById('actionTable');
  
  actionTable.querySelector('tbody').textContent = ''

  list1.forEach(dodanieDoTabeli);
  list2.forEach(dodanieDoTabeli);
}


function saveChanges() {

  var listTouch = document.getElementById('actionTable').querySelector('tbody').querySelectorAll('tr');

  listTouch.forEach(elem => {

      var className = elem.querySelectorAll('td')[0].classList.value
      var classVal = elem.querySelectorAll('td')[1].querySelector('input').value
      var types = ['reg','mid','sup']

      //console.log(className, classVal, types[classVal])

      if (!document.querySelector('.tasks').querySelector('.' + className).classList.contains(types[classVal])) {

        var elemMod = document.querySelector('.tasks').querySelector('.' + className)
        elemMod.classList.remove('reg')
        elemMod.classList.remove('mid')
        elemMod.classList.remove('sup')
        elemMod.classList.add(types[classVal])

        var elemKal = document.querySelector('#kalendarz').querySelectorAll('.' + className)
        elemKal.forEach(element => {
          element.classList.remove('reg')
          element.classList.remove('mid')
          element.classList.remove('sup')
          element.classList.add(types[classVal])
        })
      }

  })

}































//'use strict';

document.addEventListener('DOMContentLoaded', function() {


  var currentTime = new Date();
  var miesiac = currentTime.getMonth()
  fillCalendar(currentTime);
  wykresDane2();

  //wybór miesiąca
  document.querySelector('select').childNodes[1].innerHTML = months1[miesiac-1] + ' 2022'
  document.querySelector('select').childNodes[3].innerHTML = months1[miesiac] + ' 2022'
  document.querySelector('select').childNodes[5].innerHTML = months1[miesiac+1] + ' 2022'
  document.querySelector('select').childNodes[7].innerHTML = months1[miesiac+2] + ' 2022'


  var idid = 0
// dodanie id
  //var dniWKalendarzu = document.querySelector('table').children[1].querySelectorAll('td')
  var dniWKalendarzu = document.getElementById('kalendarz').children[1].querySelectorAll('td')
  function dodanieID(kwadracik) {
    kwadracik.classList.add('position-relative')
    kwadracik.id = 'zone' + idid;
    idid++
  }
  dniWKalendarzu.forEach(dodanieID)





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
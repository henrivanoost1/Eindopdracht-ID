var temp = document.querySelector('.temp');
var desc = document.querySelector('.desc');

const thermo= function thermometer(goalAmount, progressAmount, animate) {
  "use strict";
  let $thermo = $("#thermometer"),
      $progress = $(".progress", $thermo),
      $goal = $(".goal", $thermo),
      percentageAmount;

  goalAmount = 80,
  progressAmount = progressAmount || parseFloat($progress.text());
  
  if (progressAmount>=0){
    progressAmount=progressAmount+30;
  }
  else if(progressAmount<0){
    progressAmount=30+progressAmount
  }
  percentageAmount = Math.min(Math.round(progressAmount / goalAmount * 1000) / 10, 100); //make sure we have 1 decimal point

  $goal.find(".amount").text();
  $progress.find(".amount").text();

  $progress.find(".amount").hide();
  if (animate !== false) {
      $progress.animate({
          "height": percentageAmount + "%"
      }, 1200, function () {
          $(this).find(".amount").fadeIn(200);
      });
  } else {
      $progress.css({
          "height": percentageAmount + "%"
      });
      $progress.find(".amount").fadeIn(200);
  }
}

let tempValue;

//nieuwe api= https://api.openweathermap.org/data/2.5/onecall?lat=50.9195&lon=3.4486&exclude=current&appid=8f75b63f8f0ecae4cff5946fa4e452bd

const fetchData = function() {
  fetch('https://api.openweathermap.org/data/2.5/onecall?lat=50.9195&lon=3.4486&exclude=current&lang=nl&units=metric&appid=8f75b63f8f0ecae4cff5946fa4e452bd')
  
  .then(response => response.json())
  .then(data => {
    console.log(data)
    tempValue = Math.round(data['hourly'][0]['temp']);
    let descValue = data['hourly'][0]['weather'][0]['description'];
    let icon= data['hourly'][0]['weather'][0]['icon'];
    let iconurl="img/svg/" + icon + ".svg";
    let feeling=Math.round(data['hourly'][0]['feels_like']);
    let humidity=Math.round(data['hourly'][0]['humidity']);
    let pressure=Math.round(data['hourly'][0]['pressure']);
    let wind_speed=Math.round(((data['hourly'][0]['wind_speed'])*3600)/1000);

    
    console.log(icon)
    console.log(tempValue)
    console.log(descValue)
  
    document.querySelector(".js-temp").innerHTML=tempValue+"°C";
    document.querySelector(".js-temptext").innerHTML="Temperatuur: "+tempValue+"°C";
    document.querySelector(".js-desc").innerHTML=descValue;
    document.querySelector(".js-feels").innerHTML="Gevoelstemperatuur: "+feeling+"°C";
    document.querySelector(".js-humidity").innerHTML="Luchtvochtigheid: "+humidity+"%";
    document.querySelector(".js-pressure").innerHTML="Luchtdruk: "+pressure+"hPa";
    document.querySelector(".js-wind-speed").innerHTML="Windsnelheid: "+wind_speed+"km/h";

    $('#wicon').attr('src', iconurl);
    thermo();

  
  })
  .catch(err => alert("Er is iets fout gelopen."));
  };
  
  const datefix=function(){
    var dt= new Date();
    document.querySelector(".datetime").innerHTML=dt.toLocaleDateString();
  }


 const enableEventListeners= function(){
  let fahrenheit= document.querySelector(".btnChangeTemp");
  fahrenheit.addEventListener("click", change)
 }

 function changetoFahrenheit(){

    TemperatuurHuidig= Math.round((tempValue*1.8)+32);
  
    document.querySelector(".js-top").innerHTML="122°F";
    document.querySelector(".js-middel").innerHTML="0°F";
    document.querySelector(".js-bottom").innerHTML="-86°F";
    document.querySelector(".js-temp").innerHTML=TemperatuurHuidig+"°F";
    document.querySelector(".js-temptext").innerHTML=TemperatuurHuidig+"°F";

 }

 function changetoCelsius(){

    document.querySelector(".js-top").innerHTML="50°C";
    document.querySelector(".js-middel").innerHTML="0°C";
    document.querySelector(".js-bottom").innerHTML="-30°C";
    document.querySelector(".js-temp").innerHTML=tempValue+"°C";
    document.querySelector(".js-temptext").innerHTML=tempValue+"°C";

 }

document.addEventListener('DOMContentLoaded', function() {
  console.info('JS loaded');
  datefix();
  
  fetchData();
  enableEventListeners();
  
  

  thermo();
  
});

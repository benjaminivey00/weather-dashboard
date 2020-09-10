var button = document.querySelector('.button')
var inputValue = document.querySelector('.inputValue')
var name = document.querySelector('.name')
var windSpeed = document.querySelector('.wind')
var temp = document.querySelector('.temp')
var humid = document.querySelector('.humidity')



const APIkey = '&appid=d7165ec74f3a581aa62dd4486c6f30fb';
// const queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + APIkey

let city = $('.inputValue').val();

$(".button").on('click', function(){

city = $('.inputValue').val();

const queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + APIkey

$.ajax({
url: queryURL,
method: "GET"
})
.then(function (response){

console.log(response)

$('.name').text("City:" + response.name);
$('.humidity').text("Humidity:" + response.main.humidity)
$('.wind').text("Wind Speed:" + response.wind.speed)
// $("#imgIcon").attr({"src": "http://openweathermap.org/img/w/" + current_data.weather[0].icon + ".png",
//   "height" : "100px", "width":"100px"});

var tempF = (response.main.temp - 273.15) * 1.80 + 32;
$(".temp").text("Temperature (F) " + tempF.toFixed(2));


getCurrentForcast(response)
makeList()
})
})

function makeList() {
    let listItem = $("<li>").addClass("list-group-item").text(city);
    $(".list").append(listItem);
  }




function getCurrentForcast() {

   const queryurl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + APIkey
    $.ajax({
        url: queryurl,
        method: "GET",
        
    }).then(function(response){
        let day_number = 0; 
        
        //iterate through the 40 weather data sets
        for(let i=0; i< response.list.length; i++){
            
            //split function to isolate the time from the time/data aspect of weather data, and only select weather reports for 3pm
            if(response.list[i].dt_txt.split(" ")[1] == "15:00:00")
            {
                //if time of report is 3pm, populate text areas accordingly
                let day = response.list[i].dt_txt.split("-")[2].split(" ")[0];
                let month = response.list[i].dt_txt.split("-")[1];
                let year = response.list[i].dt_txt.split("-")[0];
                $("#" + day_number + "date").text(month + "/" + day + "/" + year); 
                let temp = Math.round(((response.list[i].main.temp - 273.15) *9/5+32));
                $("#" + day_number + "five_day_temp").text("Temp: " + temp + String.fromCharCode(176)+"F");
                $("#" + day_number + "five_day_humidity").text("Humidity: " + response.list[i].main.humidity);
                $("#" + day_number + "five_day_icon").attr("src", "http://openweathermap.org/img/w/" + response.list[i].weather[0].icon + ".png");
                console.log(response.list[i].dt_txt.split("-"));
                console.log(day_number);
                console.log(response.list[i].main.temp);
                day_number++; 
                        }   
        }
    });

  

    
    // $.ajax({
    //     url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city + APIkey,
    //     method: "GET"
    //   }).then(function(response){
    //     console.log(response)


    //   })
}
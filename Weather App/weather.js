//weather updater
function updateWeather() {

    //Making the api call
    const request = new XMLHttpRequest();
    const key = '60074bfa23342a1d7b17dfd7a4711d69'; //API Key
    const cities = 'group?id=6453366,2643743,764679'; //left-right ID for OSLO, LONDON, MINSK

    const url = 'http://api.openweathermap.org/data/2.5/' + cities+'&weather?id=524901&APPID=' + key + '&units=metric';

     //making the api call, GETing the information
    request.open('GET', url);

    //gather weather information
    request.onload = function() {
        var data = JSON.parse(this.response);

        //loops through the 3 destinations
        for(i = 0; i<3; i++) {

            //pulling content out and replaces the visual content of weather boxes
            document.getElementById('city' +i).innerHTML = data.list[i].name;
            document.getElementById('temp' +i).innerHTML = Math.round(data.list[i].main.temp) + '&deg;';
            document.getElementById('wind' +i).innerHTML = data.list[i].wind.speed + 'ms, ' + Math.round(data.list[i].wind.deg) + '\xB0';
            document.getElementById('weatherStatus' +i).innerHTML = data.list[i].weather['0'].description;
            document.getElementById('cloud' +i).innerHTML = data.list[i].clouds.all + '%';

            //content in bottombox
            document.getElementById('highTemp' +i).innerHTML = '<i class="fas fa-caret-up"></i> '+ Math.round(data.list[i].main.temp_max) + '&deg; Max temp';
            document.getElementById('lowTemp' +i).innerHTML = '<i class="fas fa-caret-down"></i> '+ Math.round(data.list[i].main.temp_min) + '&deg; Min temp';
            document.getElementById('pressure' +i).innerHTML = '<i class="fas fa-tachometer-alt"></i> '+ data.list[i].main.pressure + ' Pressure';
            document.getElementById('humidity' +i).innerHTML = '<i class="fas fa-tint"></i> '+ data.list[i].main.humidity + ' Humidity';


            //a switch desides what icon to use for weather description
            switch(data.list[i].weather['0'].description) {
                case 'clear sky':
                    if(moment().hour() < 20 && moment().hour() > 6) {
                        icon = 'fa-sun';
                    } else {
                        icon = 'fa-moon';
                    }
                    break;
                case 'few clouds':
                    icon = 'fa-cloud-sun';
                    break;
                case 'scattered clouds':
                case 'overcast clouds':
                    icon = 'fa-cloud';
                    break;
                case 'broken clouds':
                    icon = 'fa-smog';
                    break;
                case 'shower rain':
                case 'light intensity drizzle':
                case 'drizzle':
                case 'heavy intensity drizzle':
                case 'light intensity drizzle rain':
                case 'drizzle rain':
                case 'heavy intensity drizzle rain':
                case 'shower rain and drizzle':
                case 'heavy shower rain and drizzle':
                case 'shower drizzle':
                    icon = 'fa-cloud-showers-heavy';
                    break;
                case 'rain':
                case 'light rain':
                case 'moderate rain':
                case 'heavy intensity rain':
                case 'very heavy rain':
                case 'extreme rain':
                case 'freezing rain':
                case 'light intensity shower rain':
                case 'shower rain':
                case 'heavy intensity shower rain':
                case 'ragged shower rain':
                    icon = 'fa-cloud-sun-rain';
                    break;
                case 'thunderstorm':
                case 'thunderstorm with light rain':
                case 'thunderstorm with rain':
                case 'thunderstorm with heavy rain':
                case 'light thunderstorm':
                case 'heavy thunderstorm':
                case 'ragged thunderstorm':
                case 'thunderstorm with light drizzle':
                case 'thunderstorm with drizzle':
                case 'thunderstorm with heavy drizzle':
                    icon = 'fa-bolt';
                    break;
                case 'snow':
                case 'light snow':
                case 'heavy snow':
                case 'sleet':
                case 'shower sleet':
                case 'light rain and snow':
                case 'rain and snow':
                case 'light shower snow':
                case 'shower snow':
                case 'heavy shower snow':
                    icon = 'fa-snowflake';
                    break;
                case 'mist':
                case 'smoke':
                case 'sand, dust whirls':
                case 'fog':
                case 'sand':
                case 'volcanic ash	':
                case 'squalls':
                case 'tornado':
                    icon = 'fa-water';
            }

            //adds the icon
            document.getElementById('weatherIcon' +i).classList.add(icon);
            
            //get the time, and use format hh:mm:ss
            var time = moment().format('HH:mm');

            //creates a list with clock and icons
            var listItem = document.createElement('li');
            var content = document.createTextNode(' ' + Math.round(data.list[i].main.temp) + '\xB0' + ' ' + data.list[i].weather['0'].description + ' - ' + time);
            
            listItem.appendChild(content);
            listItem.classList.add('fas', icon);
        
            //adds content to the list
            var historyArea = document.getElementById('historyArea'+ i);
            historyArea.insertBefore(listItem, historyArea.childNodes[0]);

            //short code to remove old history when not needed
            if(historyArea.getElementsByTagName('li').length > 4 ) {
                historyArea.removeChild(historyArea.lastChild);
            }
        }
    }
    request.send();
}

//updating weather view
setInterval(function() {
    updateWeather();
}, 60000); 

//clock for referance
setInterval(function() {
    var time = moment().format('HH:mm:ss');
    document.getElementById('timerClock').innerHTML = time;
}, 1000);
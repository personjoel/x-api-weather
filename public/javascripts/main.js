var citiesUsed = new Array();
document.querySelector("form").addEventListener("submit", e => {
    e.preventDefault();
    let cityValue = document.getElementById("textcity").value;
    var unitValue;
    var unit;
    var newCity=true;

    if (document.getElementById("celsius").checked) {
        unitValue = "metric";
        unit = "°C"
    }
    else if (document.getElementById("fahrenheit").checked) {
        unitValue = "imperial";
        unit = "°F"
    }

    citiesUsed.forEach((city) => {
        if(city == cityValue) {
            console.log("City already used");
            document.getElementById("errmsg").innerHTML ="This city already exist";
            newCity = false;
        }
    }
    );
    if (newCity) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=4d8fb5b93d4af21d66a2948710284366&units=${unitValue}`)
        .then(response => response.json())
        .then(data => {
            const { main, name, sys, weather } = data;
            
            const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${
                weather[0]["icon"]
              }.svg`;

            //console.log(name);

            const li = document.createElement("li");
            li.classList.add("city");

            const markup = `
                <div>
                    <h2>
                        <span>${name}</span>
                        <sup>${sys.country}</sup>
                    </h2>
                    <div class="city">${main.temp}<sup>${unit}</sup></div>
                    <br>
                    <img src="${icon}">
                    <hr>
                </div>
            `;

            li.innerHTML = markup;
            document.getElementById("cities").appendChild(li);
        })
        .then(() => {
            document.getElementById("errmsg").innerHTML ="";
            citiesUsed.push(cityValue);
        })
        .catch(() => {
            document.getElementById("errmsg").innerHTML ="The city does not exist, please insert another city";
        });
    }

});
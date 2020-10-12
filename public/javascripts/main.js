document.querySelector("form").addEventListener("submit", e => {
    e.preventDefault();
    let cityValue = document.getElementById("textcity").value;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=4d8fb5b93d4af21d66a2948710284366&units=metric`)
        .then(response => response.json())
        .then(data => {
            const { main, name, sys, weather } = data;
            
            //console.log(name);

            const li = document.createElement("li");
            li.classList.add("city");

            const markup = `
                <div>
                    <h2>
                        <span>${name}</span>
                        <sup>${sys.country}</sup>
                    </h2>
                    <div>${main.temp}<sup>°C</sup></div>
                </div>
            `;

            li.innerHTML = markup;
            document.getElementById("cities").appendChild(li);
        })
        .catch(() => {
            console.log("Something went wrong");
        });
});
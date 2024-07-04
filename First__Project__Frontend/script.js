document.addEventListener("DOMContentLoaded", function() {
    const fetchDataBtn = document.getElementById('fetchDataBtn');
    const mapElement = document.getElementById('map');
    const weatherDataElement = document.getElementById('weatherData');

    fetchDataBtn.addEventListener('click', function() {
        // Fetch geolocation
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async function(position) {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                // Display map
                displayMap(latitude, longitude);

                // Fetch weather data
                const apiKey = 'your_openweathermap_api_key';
                const weatherData = await fetchWeatherData(latitude, longitude, apiKey);

                // Display weather data
                displayWeatherData(weatherData);
            }, function(error) {
                console.error('Error getting geolocation:', error);
            });
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    });

    async function fetchWeatherData(latitude, longitude, apiKey) {
        const apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly,daily&units=metric&appid=${apiKey}`;
        
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Weather data not available.');
            }
            const weatherData = await response.json();
            return weatherData;
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    }

    function displayMap(latitude, longitude) {
        mapElement.innerHTML = `<iframe
            width="100%"
            height="100%"
            frameborder="0" style="border:0"
            src="https://www.google.com/maps/embed/v1/view?key=YOUR_API_KEY&center=${latitude},${longitude}&zoom=15" allowfullscreen>
        </iframe>`;
    }

    function displayWeatherData(weatherData) {
        const { current } = weatherData;
        const { temp, humidity, weather } = current;

        weatherDataElement.innerHTML = `
            <h2>Current Weather</h2>
            <p><strong>Temperature:</strong> ${temp} &#8451;</p>
            <p><strong>Humidity:</strong> ${humidity} %</p>
            <p><strong>Weather:</strong> ${weather[0].description}</p>
        `;
    }
});

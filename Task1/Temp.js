const tempInput = document.getElementById('tempInput');
        const fromUnit = document.getElementById('fromUnit');
        const celsiusResult = document.getElementById('celsiusResult');
        const fahrenheitResult = document.getElementById('fahrenheitResult');
        const kelvinResult = document.getElementById('kelvinResult');

        // Conversion functions
        function celsiusToFahrenheit(celsius) {
            return (celsius * 9/5) + 32;
        }

        function celsiusToKelvin(celsius) {
            return celsius + 273.15;
        }

        function fahrenheitToCelsius(fahrenheit) {
            return (fahrenheit - 32) * 5/9;
        }

        function fahrenheitToKelvin(fahrenheit) {
            return celsiusToKelvin(fahrenheitToCelsius(fahrenheit));
        }

        function kelvinToCelsius(kelvin) {
            return kelvin - 273.15;
        }

        function kelvinToFahrenheit(kelvin) {
            return celsiusToFahrenheit(kelvinToCelsius(kelvin));
        }

        function formatResult(value) {
            if (isNaN(value) || value === null || value === undefined) {
                return '--';
            }
            return Math.round(value * 100) / 100; // Round to 2 decimal places
        }

        function convertTemperature() {
            const inputValue = parseFloat(tempInput.value);
            const unit = fromUnit.value;

            if (isNaN(inputValue) || tempInput.value.trim() === '') {
                celsiusResult.textContent = '--°C';
                fahrenheitResult.textContent = '--°F';
                kelvinResult.textContent = '--K';
                return;
            }

            let celsius, fahrenheit, kelvin;

            switch(unit) {
                case 'celsius':
                    celsius = inputValue;
                    fahrenheit = celsiusToFahrenheit(celsius);
                    kelvin = celsiusToKelvin(celsius);
                    break;
                case 'fahrenheit':
                    fahrenheit = inputValue;
                    celsius = fahrenheitToCelsius(fahrenheit);
                    kelvin = fahrenheitToKelvin(fahrenheit);
                    break;
                case 'kelvin':
                    kelvin = inputValue;
                    celsius = kelvinToCelsius(kelvin);
                    fahrenheit = kelvinToFahrenheit(kelvin);
                    break;
                default:
                    return;
            }

            // Validate Kelvin (cannot be negative)
            if (unit === 'kelvin' && inputValue < 0) {
                celsiusResult.textContent = 'Invalid';
                fahrenheitResult.textContent = 'Invalid';
                kelvinResult.textContent = 'Invalid';
                return;
            }

            // Check for absolute zero violations
            if (celsius < -273.15) {
                celsiusResult.textContent = 'Below Absolute Zero';
                fahrenheitResult.textContent = 'Below Absolute Zero';
                kelvinResult.textContent = 'Below Absolute Zero';
                return;
            }

            celsiusResult.textContent = `${formatResult(celsius)}°C`;
            fahrenheitResult.textContent = `${formatResult(fahrenheit)}°F`;
            kelvinResult.textContent = `${formatResult(kelvin)}K`;
        }

        function clearAll() {
            tempInput.value = '';
            celsiusResult.textContent = '--°C';
            fahrenheitResult.textContent = '--°F';
            kelvinResult.textContent = '--K';
            tempInput.focus();
        }

        // Event listeners
        tempInput.addEventListener('input', convertTemperature);
        fromUnit.addEventListener('change', convertTemperature);

        // Allow Enter key to focus on input
        tempInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                convertTemperature();
            }
        });

        // Focus on input when page loads
        window.addEventListener('load', function() {
            tempInput.focus();
        });
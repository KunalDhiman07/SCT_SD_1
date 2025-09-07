        let secretNumber;
        let attempts;
        let gameOver;
        let guesses;

        function initializeGame() {
            secretNumber = Math.floor(Math.random() * 100) + 1;
            attempts = 0;
            gameOver = false;
            guesses = [];
            
            document.getElementById('attempts').textContent = '0';
            document.getElementById('feedback').textContent = 'Make your first guess!';
            document.getElementById('feedback').className = 'feedback default';
            document.getElementById('guessInput').value = '';
            document.getElementById('guessInput').disabled = false;
            document.getElementById('submitGuess').disabled = false;
            document.getElementById('newGameBtn').style.display = 'none';
            document.getElementById('guessHistory').style.display = 'none';
            document.getElementById('guessList').innerHTML = '';
            
            // Focus on input for better user experience
            document.getElementById('guessInput').focus();
        }

        function makeGuess() {
            if (gameOver) return;

            const guessInput = document.getElementById('guessInput');
            const guess = parseInt(guessInput.value);
            const feedback = document.getElementById('feedback');

            // Validate input
            if (isNaN(guess) || guess < 1 || guess > 100) {
                feedback.textContent = 'Please enter a number between 1 and 100!';
                feedback.className = 'feedback default';
                return;
            }

            attempts++;
            guesses.push(guess);
            document.getElementById('attempts').textContent = attempts;

            // Update guess history
            updateGuessHistory();

            // Compare guess with secret number
            if (guess === secretNumber) {
                feedback.textContent = `🎉 Congratulations! You guessed it in ${attempts} attempts!`;
                feedback.className = 'feedback correct';
                endGame();
            } else if (guess > secretNumber) {
                feedback.textContent = `📉 Too high! Try a lower number.`;
                feedback.className = 'feedback too-high';
            } else {
                feedback.textContent = `📈 Too low! Try a higher number.`;
                feedback.className = 'feedback too-low';
            }

            // Clear input for next guess
            guessInput.value = '';
            guessInput.focus();
        }

        function updateGuessHistory() {
            const historyDiv = document.getElementById('guessHistory');
            const guessList = document.getElementById('guessList');
            
            if (guesses.length > 0) {
                historyDiv.style.display = 'block';
                guessList.innerHTML = guesses.map(g => `<span class="guess-item">${g}</span>`).join('');
            }
        }

        function endGame() {
            gameOver = true;
            document.getElementById('guessInput').disabled = true;
            document.getElementById('submitGuess').disabled = true;
            document.getElementById('newGameBtn').style.display = 'inline-block';
        }

        function startNewGame() {
            initializeGame();
        }

        // Allow Enter key to submit guess
        document.getElementById('guessInput').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                makeGuess();
            }
        });

        // Initialize the game when page loads
        window.onload = function() {
            initializeGame();
        };
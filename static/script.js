const numberBtn = document.getElementById('numberBtn');
const problemDisplay = document.getElementById('problemDisplay');
const answerBtn = document.getElementById('answerBtn');
const answerDisplay = document.getElementById('answerDisplay');
const celebration = document.getElementById('celebration');

// Store current problem numbers
let currentN1 = null;
let currentN2 = null;

// Event listeners
numberBtn.addEventListener('click', fetchProblem);
answerBtn.addEventListener('click', fetchAnswer);

// Function to fetch multiplication problem from the backend
async function fetchProblem() {
    try {
        // Disable button while loading
        numberBtn.disabled = true;
        numberBtn.textContent = 'Loading... ⏳';

        // Fetch from the /numbers endpoint
        const response = await fetch('/numbers');
        const data = await response.json();

        // Display the multiplication problem with animation
        displayProblem(data.n1, data.n2);

        // Create celebration confetti
        createConfetti();

        // Re-enable button
        numberBtn.disabled = false;
        numberBtn.textContent = 'New Problem! 🎲';

    } catch (error) {
        console.error('Error fetching problem:', error);
        problemDisplay.innerHTML = '<p class="waiting-text" style="color: #e74c3c;">Oops! Try again 🤔</p>';
        numberBtn.disabled = false;
        numberBtn.textContent = 'New Problem! 🎲';
    }
}

// Function to display the multiplication problem
function displayProblem(n1, n2) {
    // Store the numbers for later use
    currentN1 = n1;
    currentN2 = n2;
    
    problemDisplay.innerHTML = `<div class="problem-box">${n1} × ${n2} = ?</div>`;
    
    // Show the answer button and clear any previous answer
    answerBtn.style.display = 'inline-block';
    answerDisplay.innerHTML = '';
}

// Function to create confetti animation
function createConfetti() {
    const colors = ['#f093fb', '#f5576c', '#4facfe', '#00f2fe', '#ffb236', '#7c3aed'];
    
    // Create multiple confetti pieces
    for (let i = 0; i < 30; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        
        // Random color
        const color = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.backgroundColor = color;
        
        // Random position
        confetti.style.left = Math.random() * 100 + '%';
        
        // Random delay for staggered effect
        confetti.style.animation = `confettiFall ${1.5 + Math.random() * 1.5}s linear ${Math.random() * 0.3}s forwards`;
        
        // Random rotation
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        
        celebration.appendChild(confetti);
        
        // Remove confetti element after animation
        setTimeout(() => confetti.remove(), 2500);
    }
}

// Function to fetch the product from the backend
async function fetchAnswer() {
    try {
        // Disable button while loading
        answerBtn.disabled = true;
        answerBtn.textContent = 'Loading... ⏳';

        // Fetch from the /product endpoint with the current numbers
        const response = await fetch(`/product?n1=${currentN1}&n2=${currentN2}`);
        const product = await response.json();

        // Display the answer
        displayAnswer(product);

        // Create celebration confetti
        createConfetti();

        // Re-enable button
        answerBtn.disabled = false;
        answerBtn.textContent = 'Show Answer! 👀';

    } catch (error) {
        console.error('Error fetching answer:', error);
        answerDisplay.innerHTML = '<p class="waiting-text" style="color: #e74c3c;">Oops! Try again 🤔</p>';
        answerBtn.disabled = false;
        answerBtn.textContent = 'Show Answer! 👀';
    }
}

// Function to display the answer
function displayAnswer(product) {
    answerDisplay.innerHTML = `<div class="answer-box">= ${product}</div>`;
}

// Optional: Fetch a number when page loads
window.addEventListener('DOMContentLoaded', () => {
    // You can remove this line if you prefer users to click the button first
    // fetchNumber();
});

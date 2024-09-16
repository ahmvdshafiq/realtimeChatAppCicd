const socket = io();

// Listen for form submission and send message
const chatForm = document.getElementById('chat-form');
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const message = document.getElementById('message').value;
    socket.emit('message', message);

    // Display user's message
    displayMessage(message, 'user');

    document.getElementById('message').value = '';
});

// Listen for incoming messages
socket.on('message', (msg) => {
    displayMessage(msg, 'other');
});

// Function to display messages in the chat box
function displayMessage(msg, type) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', type);
    messageElement.textContent = msg;

    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;  // Scroll to bottom
}

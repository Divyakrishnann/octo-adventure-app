
const socket = io('http://localhost:8000');

// Get DOM elements in respective Js variables
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp')
const messageContainer = document.querySelector(".container");
var audio = new Audio('ting.mp3'); 

// Audio that will play on receiving messages

// Function which will append event info to the contaner
const append = (message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position =='left'){ 
        audio.play();
    }
}
form.addEventListener('submit',(e)=>{
    // it prevent reload of th page
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`,'right');
    socket.emit('send',message);
    // to empty the message after execution
    messageInput.value = ''
})


// Ask new user for his/her name and let the server know
const name = prompt("Enter your name to join");
socket.emit('new-user-joined', name);

// If a new user joins, receive his/her name from the server
socket.on('user-joined', name =>{
    append(`${name} joined the chat`,'right');
})

socket.on('receive', data =>{
    append(`${data.name}:${data.message}`,'left');
})
socket.on('left', name =>{
   append(`${name} left the chat`,'right');
}) 

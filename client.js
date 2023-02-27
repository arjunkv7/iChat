const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container');

let name = window.prompt('Hii') 
console.log('hiii')

form.addEventListener("submit", e => {
    e.preventDefault();
    const message = messageInput.value;
    socket.emit("send", message);
    append(message,"right")
    messageInput.value = "";
})

let append = (name,position) => {
    let messageElement = document.createElement('div');
    messageElement.innerText = name;
    messageElement.classList.add(position,"message");
    messageContainer.append(messageElement)
    
}
socket.emit("room", () => {
    console.log("hii new room")
});
socket.emit("new-user-joined", name);

socket.on('user-joined', message => {
    console.log('joined')
    append(`${message} joined the chat`, "left")
    console.log(message)
});

socket.on("emit", message => {
    append(`Hi this message is from room`)
})

socket.on('receive', data => {
    console.log("log")
    append(data.message, "left")
});

socket.on('disconnected', data => {
    console.log("log")
    append(`${data} left the chat`, "left")
});
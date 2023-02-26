const io = require("socket.io")(8000, {
    cors: {
        origin: 'http://127.0.0.1:5500',
        methods: ['GET', 'POST'],
       
    }
})

const users = {};

io.on("connection", socket => {
    socket.on("new-user-joined", name => {
        users[socket.id] = name;
        
        console.log(`New user ${name } joined`);
        console.log(users);
        socket.broadcast.emit('user-joined', name);
    });

    socket.on('send', message => {
        console.log(message);
        socket.broadcast.emit("receive", { message: message, user: users[socket.id] })
    });

    socket.on("disconnect", message =>{
        socket.broadcast.emit("disconnected", users[socket.id]);
        delete users[socket.id]
    });
});

io.on("disconnect", socket =>{
    console.log("disconnected")
})



console.log(users);


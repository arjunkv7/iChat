const io = require("socket.io")(8000, {
    cors: {
        origin: 'http://127.0.0.1:5500',
        methods: ['GET', 'POST'],
       
    }
})

const users = {};

io.on("connection", socket => {
    //rooms
    socket.on("new-user-joined", name => {
        users[socket.id] = name;
        socket.join("room", () => {
            console.log("client joined in the new room");
        });
    
        console.log(`New user ${name } joined`);
        console.log(users);
        socket.broadcast.emit('user-joined', name);
    });

    socket.on('send', message => {
        console.log(message);
        socket.to('room').emit("emit");
        socket.broadcast.emit("receive", { message: message, user: users[socket.id] })
    });

    socket.on("disconnect", message =>{
        socket.broadcast.emit("disconnected", users[socket.id]);
        delete users[socket.id]
    });
});





console.log(users);


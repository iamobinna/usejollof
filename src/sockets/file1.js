//delivery boys are managed here

const jwt = require('jsonwebtoken');
const driverModel = require('../model/deliveryBoyModel');

exports = module.exports = function(io, boys){
    io.use((socket, next) => {
        if(socket.handshake.query && socket.handshake.query.token){
            jwt.verify(socket.handshake.query.token, process.env.TOKEN_SECRET, function(err, decoded) {
                if (err) return next(new Error('Authentication error'));
                socket.decoded = decoded;
                next();
            });
            console.log('authneticated');
        }else{
            next(new Error('Authentication error'));
        }
    });
    io.on('connection', function (socket) {
        //functions after authentification
        socket.on('serverSaveDriver', async function (data) {
            const find = await driverModel.findById(data.userID);
            if(find.online === true){
                socket.emit('already-online');
            }else{
                const updated = await driverModel.findByIdAndUpdate(data.userID, {online: true}, {new: true});
                boys[socket.id] = {userID: data.userID, location: data.location, socket: socket.id}
                // console.log('boys', boys);
            }
        });

        socket.on('serverUpdateDriver', (data) => {
            if(boys[socket.id] !== undefined){
                // console.log(data);
                boys[socket.id] = {...boys[socket.id], location: data};
                console.log('location updated');
            }
        });

        socket.on('disconnect',async () => {
            if(boys[socket.id] !== undefined){
                try {
                    const updated = await driverModel.findByIdAndUpdate(boys[socket.id].userID, {online: false}, {new: true});
                } catch (error) {
                    console.log('error');
                }
                delete boys[socket.id];
            }
        });

        socket.on('ongoing order', () => {
            if(boys[socket.id] !== undefined){
                boys[socket.id].available = false;
            }
        });
        
        socket.on('available', () => {
            if(boys[socket.id] !== undefined){
                boys[socket.id].available = true;
            }
        })
    });
  }
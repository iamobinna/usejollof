const jwt = require('jsonwebtoken');
const driverModel = require('../model/deliveryBoyModel');

let boys = {};

const toSearchNearestDeliveryBoy = (customerLocation) => {

    const lat1 = customerLocation.lat;
    const lon1 = customerLocation.lng;

    let nearest = {user: Object.values(boys)[0], distance: 0};
    for(const boy in boys){
        const lat2 = boy.location.lat;
        const lon2 = boy.location.lng;

        var R = 6371; // km

        var x1 = lat2 - lat1;
        var dLat = toRad(x1);
        var x2 = lon2 - lon1;
        var dLon = toRad(x2)
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;

        if(isMiles) d /= 1.60934;
        if(nearest.distance < d){
            nearest = {user: boy, distance: d};
        }
    }

    return nearest;
}

exports = module.exports = function(io){
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
    }).on('connection', function (socket) {
        //functions after authentification
        console.log('request made');
        socket.on('serverSaveDriver', async function (data) {
          try {
              await  driverModel.findByIdAndUpdate(data.userID, {online: true});
          } catch (error) {
              console.log('error');
          }
          boys[socket.id] = {userID: data.userID, location: data.location};

        socket.on('serverUpdateDriver', (data) => {
            console.log(data);
            boys[socket.id] = {...boys[socket.id], location: data};
        });

        socket.on('disconnect', async () => {
            try {
                await driverModel.findByIdAndUpdate(boys[socket.id].userID, {online: false});
            } catch (error) {
                console.log('error');
            }
            delete boys[socket.id];
        })

      });
    });
  }
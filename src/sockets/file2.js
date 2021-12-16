//orders are accepted here
const orderModel = require('../model/orderModel');
const driverModel = require('../model/deliveryBoyModel');
const accountModel = require('../model/accountModel');
const distance = require("google-distance-matrix");
const walletModel = require("../model/walletModel");

const completeOrder = async (req) => {
    return new Promise((resolve, reject) => {
        try {
            distance.key('AIzaSyDkRLCwQGddlob-7UtKolyn_Hu32ZTtw_k');
            const latLng1 = req.originLocation, latLng2 = req.vendorLocation, latLng3 = req.userLocation;
            if(latLng1 && latLng2 && latLng3){
                const origins = [`${latLng1.lat}, ${latLng1.lng}`];
                const destinations = [`${latLng2.lat}, ${latLng2.lng}`, `${latLng3.lat}, ${latLng3.lng}`];
                console.log('Waiting for distance matrix');
                distance.matrix(origins, destinations, (err, distances) => {
                    console.log('distances', distances);
                    const costPerKiloMeter = 90; //value in cents
                    let totalCost = 0;
                    if(!err && distances?.rows[0]?.elements?.length > 0 ) {
                        //cost calculation
                        for (let i = 0; i < distances.rows[0].elements.length; i++) {
                            const route = distances.rows[0].elements[i];
                            let d = route.distance.value; //value is in meters
                            d /= 1000; //distance converted to kilometers
                            const cost = d * costPerKiloMeter;
                            totalCost += cost;
                        }
                        resolve({paid: totalCost, unit: 'cents'});
                    }else{
                        console.log(err);
                        reject(err);
                    }
                })
            }else{
                console.log('Data incomplete');
                reject('Data incomplete');
            }
        }catch (e) {
            console.log(e);
            reject(e);
        }
    });
}

exports = module.exports = function(io, boys){
    io.sockets.on('connection', function (socket) {
        socket.on('order-completed', async function (data){
            console.log('data', data);
            console.log('Completing order');
            let error = false;
            let res = null;
            if(boys[socket.id] !== null) {
                let response = null;
                try {
                    response = await completeOrder(data);
                }catch (e){
                    console.log(e);
                }
                if(response){
                    console.log('got response from distance matrix');
                    res = response;
                    try {
                        console.log('updaing order');
                        const update = await orderModel.findByIdAndUpdate(data.orderID, {completed: true, delivering: false}, {new: true});
                        if(!update){ error = true}
                        else{
                            console.log('finding driver');
                            const driver = await driverModel.findById(boys[socket.id].userID);
                            if(driver){
                                console.log('finding partner');
                                const partne = await accountModel.findOne({email: driver.partner});
                                if(partne){
                                    console.log('updating wallet');
                                    const wallet = await walletModel.findOneAndUpdate({userID: partne._id}, {$inc: {amount: response.paid}}, {new: true});
                                    if(!wallet){error = true}
                                }else{error = true}
                            }else{error = true}
                        }

                    }catch (e) {
                        error = true;
                    }
                }else{
                    error = true;
                }
            }
            if(error){
                //there was error
                console.log('There was error');
                socket.emit('order-completed-response', {status: 400});
            }else{
                //order is completed
                boys[socket.id].available = true;
                console.log('Order completed now sending');
                socket.emit('order-completed-response', {status: 200, orderID: data.orderID, data: res });
            }
        });
    });
}
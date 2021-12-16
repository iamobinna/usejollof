const express = require('express');
const app = express();
const server = require('http').createServer(app);
const auth = require('./src/authentication');
const io = require('socket.io')(server, {
    cors: {
        origin: '*'
    }
});
let boys = {};
const file1 = require('./src/sockets/file1')(io, boys);
const file2 = require('./src/sockets/file2')(io, boys);
const orderModel = require('./src/model/orderModel');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const accountRouter = require('./src/router/accountRouter.js');
const requestRouter = require('./src/router/requestRouter.js');
const vendorRouter = require('./src/router/vendorRouter.js');
const categoryRouter = require('./src/router/categoryRouter.js');
const foodRouter = require('./src/router/foodRouter.js');
const orderRouter = require('./src/router/orderRouter.js');
const locationRouter = require('./src/router/locationRouter.js');
const vehicleRouter = require('./src/router/vehicleRouter.js');
const deliveryBoyRouter = require('./src/router/deliveryBoyRouter.js');
const walletRouter = require('./src/router/walletRouter.js');
const adminWalletRouter = require('./src/router/adminWalletRouter.js');
const mongoose = require('mongoose');
const {toSearchNearestDeliveryBoy} = require('./src/sockets/deliveryAssigner');
const DeliveryRouter = express.Router();
DeliveryRouter.post('/', auth ,async (req, res) => {
    const orderID = req.header('order-id');
    const vendorLocation =  req.body.vendorLatLng;
    try {
        const boy_id = toSearchNearestDeliveryBoy(boys, vendorLocation, io, orderID);
        
        console.log('number of boys', Object.keys(boys).length);
        if(boy_id !== null && boy_id !== undefined){
            //found
            const updated = await orderModel.findByIdAndUpdate(orderID, {assignedTo: boy_id});
            res.status(200).send('assigned');
        }else{
            console.log('error in else');
            res.status(400).send('error');
        }
    } catch (error) {
        console.log(error);
        res.status(400).send('error');
    }
});

///SOCKET IS CONNECTING MULTIPLE TIMES

dotenv.config();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

//ROUTES-

app.use('/account', accountRouter);
app.use('/request', requestRouter);
app.use('/vendor', vendorRouter);
app.use('/order', orderRouter);
app.use('/category', categoryRouter);
app.use('/food', foodRouter);
app.use('/location', locationRouter);
app.use('/vehicle', vehicleRouter);
app.use('/wallet', walletRouter);
app.use('/admin-wallet', adminWalletRouter);
app.use('/deliveryboy', deliveryBoyRouter);
app.use('/assign',DeliveryRouter );

//-ROUTES

const PORT = process.env.PORT || 5000;
const CONNECTION_URL = process.env.MONGO_DB_URI;

//DELIVERY BOYS ARE SAVED CORRECTLY NOW ADD REQUEST


app.use('/mobile',express.static(path.join(__dirname ,'/pwa/build')));
app.use(express.static(path.join(__dirname ,'/client/build')));


app.get('mobile/*', (req, res) => {
    res.sendFile(path.join(__dirname + '/pwa/build/index.html'))
});

 app.get('*', (req, res) => {
     res.sendFile(path.join(__dirname + '/client/build/index.html'))
 });
 
 mongoose.connect(CONNECTION_URL)
 .then(() => server.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
 .catch((error) => console.log(`${error} did not connect`));
function toRad(Value) {
    return Value * Math.PI / 180;
}

function getDistance(lat1, lat2, lon1, lon2){
    var R = 6371; // km
    console.log('lat1', lat1);
    console.log('lat2', lat2);
    console.log('lon1', lon1);
    console.log('lon2', lon2);
    
    var x1 = lat2 - lat1;
    var dLat = toRad(x1);
    var x2 = lon2 - lon1;
    var dLon = toRad(x2);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    console.log('distance', d);
    return d;
}

function toSearchNearestDeliveryBoy(boys, vendorLocation, io, orderID) {
    const lat1 = vendorLocation.lat;
    const lon1 = vendorLocation.lng;

    const user = Object.values(boys)[0];
    console.log('initial user', user);
    let distance = 0;
    if(user !== undefined && user !== null)
        distance = getDistance(lat1, user.location.lat, lon1, user.location.lng);
    
    let nearest = { user, distance};
    if(nearest !== undefined && nearest !== null){
        for (const boy in boys) {
            if(boys[boy].available !== undefined && boys[boy].available === false){
                continue;
            }
            console.log('boy', boys[boy]);
            const lat2 = boys[boy]?.location?.lat && boys[boy].location.lat;
            const lon2 = boys[boy]?.location?.lng && boys[boy].location.lng;
            if(lat2 === null || lon2 === null){
                continue;
            }

            var d = getDistance(lat1, lat2, lon1, lon2);
            if (nearest.distance < d) {
                continue;
            }else{
                nearest = { user: boys[boy], distance: d };
            }
        }
    }

    if(nearest !== undefined && nearest !== null){
        io.to(nearest.user.socket).emit('get-delivery', {orderID});
        return nearest.user.userID;
    }else{
        return null;
    }
}

module.exports = {toSearchNearestDeliveryBoy}
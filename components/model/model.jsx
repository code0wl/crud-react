export default {
    fetchModel: window.fetchModel,
    loadApp: window.loadApp
}

window.fetchModel = () => {

    var myHeaders = new Headers();

    var config = {
        method: 'GET',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default'
    };

    return fetch('/addresses', config).then(function (response) {
        return response.json();
    });
};

window.loadApp = (data) => {

    window.addressModel = data;

    return {
        users: window.addressModel,
        markers: [{
            position: window.addressModel.reduce((acc, value, i) => {
                let gPos = new google.maps.LatLng(value.position.lat, value.position.lon);
                acc.push(gPos);
                return acc;
            }, [])
        }]
    }
}

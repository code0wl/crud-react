export default window.fetchModel = function() {

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
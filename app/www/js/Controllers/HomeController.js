app.controller('HomeController', function($cordovaGeolocation, $ionicPlatform) {

    // http://www.html5-css3.fr/html5/tutoriel-api-google-maps-geolocalisation-html5

    $ionicPlatform.ready(function() {
        var watchId, map, marker, newPosition;

        $cordovaGeolocation.getCurrentPosition({enableHighAccuracy: true}).then(function(position) {
            currentPosition = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

            map = new google.maps.Map(document.getElementById('map'), {
                zoom: 15,
                center: currentPosition,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                disableDefaultUI: true
            });

            marker = new google.maps.Marker({
                position: currentPosition,
                map: map,
                animation: google.maps.Animation.DROP,
                optimized: false,
                icon: {
                    url: 'img/rider.svg',
                    scaledSize: new google.maps.Size(22, 22)
                }
            });
        }, function(error) {
            console.warn('ERROR(' + error.code + '): ' + error.message);
        });


        watchId = $cordovaGeolocation.watchPosition({enableHighAccuracy: true}).then(null, function(error) {
            console.warn('ERROR(' + error.code + '): ' + error.message);
        }, function(position) {
            newPosition = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

            marker.setPosition(newPosition);
            // Refocus
            // map.panTo(newPosition);

            // Petit poucet
            /*var marker = new google.maps.Marker({
                position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
                map: map
            });*/
            // if tarfet found
            // navigator.geolocation.clearWatch(watchId);
        });
    });
});
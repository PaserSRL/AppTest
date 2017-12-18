// Initialize app
var myApp = new Framework7();


// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

var current_page;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true
});

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    current_page = mainView.activePage.name;
});

myApp.onPageInit('*', function () {
    current_page = mainView.activePage.name;
    console.log(current_page);
});

myApp.onPageAfterBack('*', function(page) {
    current_page = mainView.activePage.name;
    console.log(current_page);
});

myApp.onPageAfterAnimation('streaming', function () {
    current_page = mainView.activePage.name;
    console.log(current_page);

    var videoUrl = 'http://d2qguwbxlx1sbt.cloudfront.net/TextInMotion-Sample-576p.mp4';

    window.plugins.streamingMedia.playVideo(videoUrl);
});


// REGOLA DI GESTIONE DEL TASTO BACK
$$(document).on('backbutton', function(e) {
    if(current_page != 'index')
    {
        mainView.router.back();
        return false;
    }
    else
    {
        navigator.app.exitApp();
        return true;
    }
});


//ottengo la posizione
$$(".get-location").on('click', function(e) {


    var onSuccess = function(position) {
        alert('Latitude: '          + position.coords.latitude          + '\n' +
            'Longitude: '         + position.coords.longitude         + '\n' +
            'Altitude: '          + position.coords.altitude          + '\n' +
            'Accuracy: '          + position.coords.accuracy          + '\n' +
            'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
            'Heading: '           + position.coords.heading           + '\n' +
            'Speed: '             + position.coords.speed             + '\n' +
            'Timestamp: '         + position.timestamp                + '\n');
    };

    // onError Callback receives a PositionError object
    //
    function onError(error) {
        alert('code: '    + error.code    + '\n' +
            'message: ' + error.message + '\n');
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
});

$$(".scan-qrcode").on('click', function(e) {
    cordova.plugins.barcodeScanner.scan(
        function (result) {
            alert("We got a barcode\n" +
                "Result: " + result.text + "\n" +
                "Format: " + result.format + "\n" +
                "Cancelled: " + result.cancelled);
        },
        function (error) {
            alert("Scanning failed: " + error);
        },
        {
            preferFrontCamera : false, // iOS and Android
            showFlipCameraButton : true, // iOS and Android
            showTorchButton : true, // iOS and Android
            torchOn: false, // Android, launch with the torch switched on (if available)
            saveHistory: true, // Android, save scan history (default false)
            prompt : "Place a barcode inside the scan area", // Android
            resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
            formats : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
            orientation : "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
            disableAnimations : true, // iOS
            disableSuccessBeep: false // iOS and Android
        }
    );
});



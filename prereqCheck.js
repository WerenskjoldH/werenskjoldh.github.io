window.onload = function() {

    var prereqElm = document.getElementById("prereq")

    // Disable Alerts
    window.alert = function ( text ) {
        return true;
    };

    function hasCamera() {
        var cameraFound = false

        navigator.mediaDevices.getUserMedia({ video: true })
        .then(function (stream) {
            cameraFound = true
        })
        .catch(function (err0r) {
            cameraFound = false
        });
        
        return cameraFound
    }

    function checkSupportedBrowser() {

        function isSupportedBrowser() {
            var isWebRTCSupported = navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia ||
            navigator.msGetUserMedia;

            if (window.navigator.userAgent.indexOf("Edge") > -1) {
                return false;
            }

            if (isWebRTCSupported) {
                return true;
            }
            else {
                return false;
            }
        }

        if(!isSupportedBrowser() || !hasCamera())
            prereqElm.style.backgroundColor = "rgb(228, 0, 0)"
        else
            prereqElm.remove();

    }

    PermissionStatus.onchange = function() {
        checkSupportedBrowser()
    }

    checkSupportedBrowser()
}
var prereqElm = document.getElementById("prereq")

// Disable Alerts
window.alert = function ( text ) {
    return true;
  };

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

    function hasCamera() {
        var cameraFound = false

        var constraints = {video: true}
        navigator.mediaDevices.getUserMedia(constraints)
        .then(function(stream) {
            cameraFound = true
        })
        .catch(function(err) {
            cameraFound = false
        });

        return cameraFound
    }

    if(!isSupportedBrowser() || !hasCamera())
        prereqElm.style.backgroundColor = "rgb(228, 0, 0)"
    else
        prereqElm.remove();

  }

checkSupportedBrowser()
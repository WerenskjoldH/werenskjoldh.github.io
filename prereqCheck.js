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

        navigator.mediaDevices.enumerateDevices().then(devices => {
            devices.forEach(device => {
                if(device.kind === "videoinput") {
                    cameraFound = true
                }
            })
        })

        return cameraFound
    }

    if(!isSupportedBrowser() || !hasCamera())
        prereqElm.style.backgroundColor = "rgb(228, 0, 0)"
    else
        prereqElm.remove();

  }

  checkSupportedBrowser()
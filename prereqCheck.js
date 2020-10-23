/**
 * This script checks the system against various pre-requirements
 *  If all pre-reqs are met then the user is sent to the loading screen then the web app
 *
 * @summary Check if system requirements are met before running the web app
 * @author Hunter W
 *
 * Created at     : 2020-10-20 11:57:25 
 * Last modified  : 2020-10-23 15:10:03
 */


// ************************************************
/// Global Variables
// ************************************************

var prereqElm 
var loadingScreenElm

// This will dictate when the loading screen ends, the total value is set in scanner.js
var totalNFTTags = 0 // DO NOT EDIT THIS
var loadedNFTTags = 0


// ************************************************
/// Prereq Checking
// ************************************************

window.addEventListener('load', () => {
    // Disable Alerts
    window.alert = function ( text ) {
        return true;
    };

    prereqElm = document.getElementById("prereq")
    loadingScreenElm = document.getElementById("loading-screen")

    // This will remove event handlers, essentially halting the loading process at the current place
    // NOTE: These are the pre-reqs that need to be met before asking for camera permissions
    function RemoveListeners()
    {
        document.getElementById("allowance-screen").classList.add("invisible")
        window.removeEventListener('camera-init', CameraSuccess)
        window.removeEventListener('camera-error', CameraFailed)
    }

    // If the user opened the page in-app this will be called
    function OpenedInApp()
    {
        RemoveListeners()

        // Depending on the platform (ios vs android) we need to adjust content 
        if(navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i)) {
            document.getElementById("another-browser-a").remove()
            document.getElementById("inapp-text-area").style.top = "50%"
            document.getElementById("launch-text").innerHTML = "Launch In SAFARI"
            document.getElementById("different-browser-text").innerText = "Press the ... on the top right"
            document.getElementById("inapp-screen").classList.remove("invisible")
        } else {
            document.getElementById("another-browser-a").href = "intent://www.hunter-scs.com/#Intent;scheme=https;action=android.intent.action.VIEW;end;"
        }

        document.getElementById("inapp-screen").classList.remove("invisible")
    }

    // If the user opened the page on desktop this will be called
    function OpenedInDesktop()
    {
        RemoveListeners()

        document.getElementById("desktop-screen").classList.remove("invisible")
    }

    const inapp = new InApp(navigator.userAgent || navigator.vendor || navigator.opera)

    // Disable Alerts
    window.alert = function ( text ) {
        return true;
    };

    // Check if browser is in-app or desktop and prevent further progress if so
    if(inapp.isInApp)
    {
        OpenedInApp()
        return
    }
    else if(inapp.isDesktop)
    {
        OpenedInDesktop()
        return
    }    

    // Success

    // Set the loading screen text
    document.getElementById("loading-text").innerHTML = "0/" + totalNFTTags
    // This prevents video loading until we have finished loading all NFT data
    watchingVideo = true
})

/// Prereq Event Handlers

// If camera permissions were given this will be called
function CameraSuccess(data) {
    console.log("Camera Accessed")

    document.getElementById("allowance-screen").classList.add("invisible")
    prereqElm.classList.add("invisible")
}

// If camera permissions were denied this will be called
function CameraFailed(error) {
    console.error("Camera Unaccessible")

    document.getElementById("allowance-screen").classList.add("invisible")
    document.getElementById("unaccessible-media-screen").classList.remove("invisible")
}

// This function is run when an NFT finishes loading
function FinishedLoading(e) {
    loadedNFTTags += 1

    // Update loading text
    document.getElementById("loading-text").innerHTML = loadedNFTTags + "/" + totalNFTTags

    if(loadedNFTTags >= totalNFTTags) {
        watchingVideo = false
        loadingScreenElm.classList.add("invisible")
    }
}

// Event Binds
window.addEventListener('camera-init', CameraSuccess)
window.addEventListener('camera-error', CameraFailed);

window.addEventListener('arjs-nft-loaded', FinishedLoading)


// ************************************************
/// UX Changes
// ************************************************

// Prevents images from being right clicked
window.addEventListener('load', () => {
    $("img").on("contextmenu", function() {
        return false
    })
})
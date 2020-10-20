/**
 * This code is run when the web page is loaded and checks the system against various pre-requirements
 *  If all pre-reqs are met then the user is sent to the loading screen then the web app
 *
 * @summary Check if system requirements are met before running the web app
 * @author Hunter W
 *
 * Created at     : 2020-10-20 11:57:25 
 * Last modified  : 2020-10-20 18:19:03
 */

// ************************************************
// https://github.com/f2etw/detect-inapp
// Used with recognition of MIT License
// ************************************************

const BROWSER = {
    messenger: /\bFB[\w_]+\/(Messenger|MESSENGER)/,
    facebook: /\bFB[\w_]+\//,
    twitter: /\bTwitter/i,
    line: /\bLine\//i,
    wechat: /\bMicroMessenger\//i,
    puffin: /\bPuffin/i,
    miui: /\bMiuiBrowser\//i,
    instagram: /\bInstagram/i,
    chrome: /\bCrMo\b|CriOS|Android.*Chrome\/[.0-9]* (Mobile)?/,
    safari: /Version.*Mobile.*Safari|Safari.*Mobile|MobileSafari/,
    ie: /IEMobile|MSIEMobile/,
    firefox: /fennec|firefox.*maemo|(Mobile|Tablet).*Firefox|Firefox.*Mobile|FxiOS/,
};
class InApp {
    constructor(useragent) {
        this.ua = '';
        this.ua = useragent;
    }
    get browser() {
        return findKey(BROWSER, regex => regex.test(this.ua)) || 'other';
    }
    get isMobile() {
        return /(iPad|iPhone|Android|Mobile)/i.test(this.ua) || false;
    }
    get isDesktop() {
        return !this.isMobile;
    }
    get isInApp() {
        const rules = [
            'WebView',
            '(iPhone|iPod|iPad)(?!.*Safari\/)',
            'Android.*(wv|\.0\.0\.0)',
        ];
        const regex = new RegExp(`(${rules.join('|')})`, 'ig');
        return Boolean(this.ua.match(regex));
    }
    // Modified - Hunter W. 
    get isIOS() {
        return navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i)
    }
}

// ************************************************

var prereqElm 

var loadingScreenElm

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
    console.log("Correct OS & Browser")
})

// Event Handlers

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

function FinishedLoading(e) {
    console.log("Finished Loading")
    loadingScreenElm.classList.add("invisible")
}

// Event Binds
window.addEventListener('camera-init', CameraSuccess)

window.addEventListener('camera-error', CameraFailed);

window.addEventListener('arjs-nft-loaded', FinishedLoading)


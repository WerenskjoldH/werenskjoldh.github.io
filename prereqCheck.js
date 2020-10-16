// ************************************************
// https://github.com/f2etw/detect-inapp
// Used with recognition of MIT License

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
}

// ************************************************

var prereqElm 

var loadingScreenElm

window.onload = function() {
    prereqElm = document.getElementById("prereq")

    loadingScreenElm = document.getElementById("loading-screen")

    function OpenedInApp()
    {
        RemoveListeners()

        if(navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i)) {
            document.getElementById("another-browser-a").href = "safari://www.hunter-scs.com/"
        } else {
            document.getElementById("another-browser-a").href = "intent://www.hunter-scs.com/#Intent;scheme=https;action=android.intent.action.VIEW;end;"
        }

        document.getElementById("inapp-screen").classList.remove("invisible")
    }

    function OpenedInDesktop()
    {
        RemoveListeners()

        document.getElementById("desktop-screen").classList.remove("invisible")
    }

    function RemoveListeners()
    {
        document.getElementById("allowance-screen").classList.add("invisible")
        window.removeEventListener('camera-init', CameraSuccess)
        window.removeEventListener('camera-error', CameraFailed)
    }

    const inapp = new InApp(navigator.userAgent || navigator.vendor || navigator.opera)

    // Disable Alerts
    window.alert = function ( text ) {
        return true;
    };

    // Support checks

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
}

function CameraSuccess(data) {
    document.getElementById("allowance-screen").classList.add("invisible")
    prereqElm.remove()
}

function CameraFailed(error) {
    document.getElementById("allowance-screen").classList.add("invisible")
    document.getElementById("unaccessible-media-screen").classList.remove("invisible")
}

window.addEventListener('camera-init', CameraSuccess)

window.addEventListener('camera-error', CameraFailed);

function FinishedLoading(e) {
    console.log("Finished Loading")
    loadingScreenElm.classList.add("invisible")
}

window.addEventListener('arjs-nft-loaded', FinishedLoading)


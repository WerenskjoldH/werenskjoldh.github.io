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

window.onload = function() {
    var prereqElm = document.getElementById("prereq")
    var prereqError = document.getElementById("warningText")

    localStorage.clear()

    function checkUserMedia() {
        navigator.mediaDevices.getUserMedia({video: true}).then(function(stream) {
            return true
        }).catch(function(err) {
            return false
        })

        return false
    }

    function OpenedInApp()
    {
        // Adjust to "Open In Another App" content
        prereqError.innerHTML = "Running InApp"
    }

    function OpenedInDesktop()
    {
        // Adjust to "Open On Mobile Device" content
        prereqError.innerHTML = "Running Desktop"
    }

    function FailedToGetUserMedia()
    {
        prereqError.innerHTML = "Unable to get user media"
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

    if(!checkUserMedia())
    {
        FailedToGetUserMedia()
        return
    }

    // Success!!

    prereqElm.remove()
}
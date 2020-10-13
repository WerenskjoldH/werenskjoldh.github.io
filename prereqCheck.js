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

    const inapp = new InApp(navigator.userAgent || navigator.vendor || navigator.opera)

    // Disable Alerts
    window.alert = function ( text ) {
        return true;
    };

    if(inapp.isInApp)
    {
        prereqError.innerHTML = "Running InApp"
    }
    else if(inapp.isDesktop)
    {
        prereqError.innerHTML = "Running Desktop"
    }
    else
    {
        prereqError.remove()
    }
}
const InApp = require("./inapp");

window.onload = function() {

    var prereqElm = document.getElementById("prereq")
    var prereqError = document.getElementById("warningText")

    // Disable Alerts
    window.alert = function ( text ) {
        return true;
    };

    if(InApp.isInApp())
    {
        prereqError.innerHTML = "Running InApp"
    }
    else if(InApp.inDesktop())
    {
        prereqError.innerHTML = "Running Desktop"
    }
    else
    {
        prereqError.innerHTML = "Pass"
        prereqElm.style.backgroundColor = "rgb(43, 255, 0)"
    }
}
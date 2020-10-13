var prereqElm = document.getElementById("prereq")

window.onerror = function(msg, url, lineNo, columnNo, error) {
    if(error == "Webcam Error")
    {
        alert("Uh-oh")
    }
}
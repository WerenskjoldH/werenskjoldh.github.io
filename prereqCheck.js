var prereqElm = document.getElementById("prereq")

navigator.mediaDevices.getUserMedia({video: true}).then(function(mediaStream) {
    alert("Access allowed")
    prereqElm.remove();
}).catch(e => {
    alert("error")
})
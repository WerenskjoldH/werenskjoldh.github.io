var prereqElm = document.getElementById("prereq")

function hasPrereqs() {

    navigator.getMedia = ( navigator.getUserMedia || // use the proper vendor prefix
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia);

    navigator.getMedia({video: true}, function() {
        // webcam
        return true
    }, function() {
        // no webcam
        return false
    })

    return false
}

navigator.mediaDevices.ondevicechange = function(e) {
    hasPassed = hasPrereqs()

    if(hasPassed)
    {
        alert("Prereqs enabled")
        prereqElm.remove();
    }
}

checkPrereqs()
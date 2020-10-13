var prereqElm = document.getElementById("prereq")

function hasPrereqs() {
    failedCheck = false

    navigator.mediaDevices.enumerateDevices().then(devices => {
        devices.forEach(d => {
            if(d.label == "")
            {
                failedCheck = true;
            }
        })
    })

    return !failedCheck
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
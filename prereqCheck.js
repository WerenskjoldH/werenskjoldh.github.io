var prereqElm = document.getElementById("prereq")

function checkPrereqs() {
    failedCheck = false

    navigator.mediaDevices.enumerateDevices().then(devices => {
        devices.forEach(d => {
            if(d.label == "")
            {
                alert("Device unsupported");
                failedCheck = true;
            }
        })
    })

    if(!failedCheck)
    {
        prereqElm.style.display = "none"
    }
    else{
        const newElm = document.createTextNode("Error")
        prereqElm.appendChild(newElm)
    }
}

checkPrereqs()
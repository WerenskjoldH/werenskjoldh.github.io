/**
 * This script handles events and modifications in relation to the main ar.js web app
 *  For instance, modifications to the video screen button layout, image scan events, etc.
 *
 * @summary Handle code related to the main scanner web app
 * @author Hunter W
 *
 * Created at     : 2020-10-20 11:55:34 
 * Last modified  : 2020-10-23 15:09:50
 */

 
// ************************************************
/// Global Variables
// ************************************************

// This gate keeps the camera from attempting to open multiple videos or open another video while already watching one
var watchingVideo = false


// ************************************************
/// Video Screen Methods
// ************************************************

// This opens the video screen overlay when called
function OpenVideoScreen(filePath)
{
  if(watchingVideo)
    return

  watchingVideo = true

  document.getElementById("video-wrap").classList.remove("closed")
  document.getElementById("vs-video-source").src = filePath
  document.getElementById("vs-video").load()
}

// Bound to vs-close-button img element's onclick call 
function CloseVideoScreen() {
  watchingVideo = false

  var videoElm = document.getElementById("vs-video")

  videoElm.pause()
  videoElm.currentTime = 0
  document.getElementById("video-wrap").classList.add("closed")
}


// ************************************************
/// Image Event Binding
// ************************************************

function registerNFTFoundEvent(nftID, eventName, video) {
  // For each bound event, we increment the total NFT tags so loading is properly handled & displayed
  totalNFTTags += 1
  
  document.getElementById(nftID).setAttribute(eventName)

  AFRAME.registerComponent(eventName, {
    init: function () {
        var marker = this.el
        marker.addEventListener('markerFound', function () {
          OpenVideoScreen(video)
        })
    }
  })
}

// Bind NFT element's found event to related videos 
window.addEventListener('load', () => {
  registerNFTFoundEvent('frogstory-img', 'frogstoryevents', "Content/storyOne.mp4")
  registerNFTFoundEvent('kimino-img', 'kiminoevents', "Content/storyTwo.mp4")
})


// ************************************************
/// Platform Based Changes
// ************************************************

function IOSShiftCloseButton() {
  // If the user is on iOS we need to shift the video close button to avoid overlap with the fullscreen control element
  if(navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i)) {
    document.getElementById("vs-close-button").style.left = "50%"
  }
}
window.addEventListener('load', IOSShiftCloseButton)
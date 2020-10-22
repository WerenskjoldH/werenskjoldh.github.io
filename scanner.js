/**
 * This script handles events and modifications in relation to the main ar.js web app
 *  For instance, modifications to the video screen button layout, image scan events, etc.
 *
 * @summary Handle code related to the main scanner web app
 * @author Hunter W
 *
 * Created at     : 2020-10-20 11:55:34 
 * Last modified  : 2020-10-22 18:58:24
 */

// This gate keeps the camera from attempting to open multiple videos or open another video while already watching one
var watchingVideo = false

// This opens the video screen overlay
function OpenVideoScreen(filePath)
{
  if(watchingVideo)
    return

  watchingVideo = true

  document.getElementById("video-wrap").classList.remove("closed")
  document.getElementById("vs-video-source").src = filePath
  document.getElementById("vs-video").load()
}

// This is attached directly to the vs-close-button img element's onclick call index.html 
function CloseVideoScreen() {
  watchingVideo = false

  var videoElm = document.getElementById("vs-video")

  videoElm.pause()
  videoElm.currentTime = 0
  document.getElementById("video-wrap").classList.add("closed")
}

// ************************************************
/// Image Event Triggers
// ************************************************

AFRAME.registerComponent('frogstoryevents', {
  init: function () {
      var marker = this.el
      marker.addEventListener('markerFound', function () {
        OpenVideoScreen("Content/storyOne.mp4")
      })
  }
})

AFRAME.registerComponent('kiminoevents', {
  init: function () {
      var marker = this.el
      marker.addEventListener('markerFound', function () {
        OpenVideoScreen("Content/storyTwo.mp4")
      })
  }
})

// ************************************************

function IOSShiftCloseButton() {
  // If the user is on iOS we need to shift the video close button to avoid overlap with the fullscreen control element
  if(navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i)) {
    document.getElementById("vs-close-button").style.left = "50%"
  }
}

window.addEventListener('load', IOSShiftCloseButton)

// Prevent "right clicking" of images
$(document).ready(() => {
  $("img").on("contextmenu", function() {
    return false
  })
})
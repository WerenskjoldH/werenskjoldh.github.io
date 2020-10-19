AFRAME.registerComponent('frogstoryevents', {
    init: function () {
        var marker = this.el;

        marker.addEventListener('markerFound', function () {
            // var newWin = window.open()

            // newWin.location = "https://www.hunter-scs.com/video.html"

            document.getElementById("video-screen").classList.remove("closed")
        });
    }
  });
  
  AFRAME.registerComponent('kanjievents', {
    init: function () {
      var marker = this.el;

      marker.addEventListener('markerFound', function () {
          var markerId = marker.id;
          
          window.open("https://www.youtube.com/", "_blank")
      });
    }
  });

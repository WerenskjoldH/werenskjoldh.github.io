AFRAME.registerComponent('frogstoryevents', {
    init: function () {
        var marker = this.el;

        marker.addEventListener('markerFound', function () {
            document.getElementById("video-wrap").classList.remove("closed")
            document.getElementById("vs-video-source").src = "Content/storyEX.mp4"
            document.getElementById("vs-video").load()
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

function CloseVideoScreen() {
  document.getElementById("video-wrap").classList.add("closed")
}

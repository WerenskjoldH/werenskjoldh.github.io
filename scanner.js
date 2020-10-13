AFRAME.registerComponent('frogstoryevents', {
    init: function () {
        var marker = this.el;

        marker.addEventListener('markerFound', function () {
            var markerId = marker.id;
            
            window.open("https://werenskjoldh.github.io/video.html", "_blank")
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
// Größe der Thumbnails ändern
function resizeThumb(e, b) {
			var c = document.getElementById(e),
				d = c.getElementsByTagName("img");
			for (var a = 0; a < d.length; a++) {
				d[a].src = d[a].src.replace(/\/s72\-c/, "/s" + b + "");
				d[a].width = b;
				d[a].height = b
			}
		}
resizeThumb("PopularPosts1", 320);
resizeThumb("PostWrap1", 320);

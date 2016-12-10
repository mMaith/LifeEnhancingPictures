// hamburger.js
// Hamburgermenü
jQuery(document).ready(function($) {
	$(".button-menu-mobile").click(function(){
		$("ul.nav-menu").slideToggle();
	});
});

// refill-search.js
// dieses script füllt das Suchfeld wieder mit dem Wert, wenn man gesucht hat
if(window.location.pathname.includes("search")) {
			allParameterString = window.location.search.substring(1);
			parameterArray = allParameterString.split("&");

			for (i=0; i< parameterArray.length; i++) {
				parameter = parameterArray[i].split("=");
				if (parameter[0] == "q") {
					value = parameter[1];
					if(value) {
						document.getElementById("s").value = value.split("+").join(" ");
						break;
					}
				}
			}
}

// resize-thumbnails.js
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

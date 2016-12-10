// dieses script füllt das Suchfeld wieder mit dem Wert, wenn man gesucht hat
if(window.location.pathname.includes("search")) {
			allParameterString = window.location.search.substring(1);
			parameterArray = allParameterString.split("&");

			for (i=0; i< parameterArray.length; i++) {
				parameter = parameterArray[i].split("=");
				if (parameter[0] == "q") {
					document.getElementById("s").value = parameter[1];
					break;
				}
			}
}

//next post navigation links
// Dieses Script sorgt dafür, dass die Navigationslinks in einem Post zum Nächsten oder Vorherigen durch die jeweiligen Titel ersetzt werden.
				var urlToNavTitle={};
				function getTitlesForNav(json){
					for(var i=0;i<json.feed.entry.length;i++){
						var entry=json.feed.entry[i];
						var href="";
						for(var k=0;k<entry.link.length;k++){
							if(entry.link[k].rel=='alternate'){
								href=entry.link[k].href;break
							}
						}
						if(href!="")urlToNavTitle[href]=entry.title.$t
					}
				}
				document.write('<script type="text/javascript" src="https://'+window.location.hostname+'/feeds/posts/summary?redirect=false&max-results=500&alt=json-in-script&callback=getTitlesForNav"></'+'script>');
				function urlToPseudoTitle(href){
					var title=href.match(/\/([^\/_]+)(_.*)?\.html/);
					if(title){title=title[1].replace(/-/g," ");
						title=title[0].toUpperCase()+title.slice(1);
						if(title.length>200)title=title.replace(/ [^ ]+$/,"...")
					}
					return title}
				$(window).load(function(){
					window.setTimeout(function(){
						var href=$("a.blog-pager-newer-link").attr("href");
						if(href){
							var title=urlToNavTitle[href];
							if(!title)title=urlToPseudoTitle(href);
							if(title)$("a.blog-pager-newer-link").html("" + title)}href=$("a.blog-pager-older-link").attr("href");
							if(href){
								var title=urlToNavTitle[href];
								if(!title)title=urlToPseudoTitle(href);
								if(title)$("a.blog-pager-older-link").html(title + "")
							}
						},500)
					});

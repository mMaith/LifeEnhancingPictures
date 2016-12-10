// Script für die Richtung des Hovers über die Bilder
      /**
				* jquery.hoverdir.js v1.1.0
				* http://www.codrops.com
				*
				* Licensed under the MIT license.
				* http://www.opensource.org/licenses/mit-license.php
				* 
				* Copyright 2012, Codrops
				* http://www.codrops.com
				*/
				
				(function($, window, undefined) {
				    'use strict';
				    $.HoverDir = function(options, element) {
				        this.$el = $(element);
				        this._init(options);
				    };
				    $.HoverDir.defaults = {
				        speed: 300,
				        easing: 'ease',
				        hoverDelay: 0,
				        inverse: false
				    };
				    $.HoverDir.prototype = {
				        _init: function(options) {
				            this.options = $.extend(true, {}, $.HoverDir.defaults, options);
				            this.transitionProp = 'all ' + this.options.speed + 'ms ' + this.options.easing;
				            this.support = true; /* Modernizr.csstransitions; */
				            this._loadEvents();
				        },
				        _loadEvents: function() {
				            var self = this;
				            this.$el.on('mouseenter.hoverdir, mouseleave.hoverdir', function(event) {
				                var $el = $(this),
				                    $hoverElem = $el.find('.overlay'),
				                    direction = self._getDir($el, {
				                        x: event.pageX,
				                        y: event.pageY
				                    }),
				                    styleCSS = self._getStyle(direction);
				                if (event.type === 'mouseenter') {
				                    $hoverElem.hide().css(styleCSS.from);
				                    clearTimeout(self.tmhover);
				                    self.tmhover = setTimeout(function() {
				                        $hoverElem.show(0, function() {
				                            var $el = $(this);
				                            if (self.support) {
				                                $el.css('transition', self.transitionProp);
				                            }
				                            self._applyAnimation($el, styleCSS.to, self.options.speed);
				                        });
				                    }, self.options.hoverDelay);
				                } else {
				                    if (self.support) {
				                        $hoverElem.css('transition', self.transitionProp);
				                    }
				                    clearTimeout(self.tmhover);
				                    self._applyAnimation($hoverElem, styleCSS.from, self.options.speed);
				                }
				            });
				        },
				        _getDir: function($el, coordinates) {
				            var w = $el.width(),
				                h = $el.height(),
				                x = (coordinates.x - $el.offset().left - (w / 2)) * (w > h ? (h / w) : 1),
				                y = (coordinates.y - $el.offset().top - (h / 2)) * (h > w ? (w / h) : 1),
				                direction = Math.round((((Math.atan2(y, x) * (180 / Math.PI)) + 180) / 90) + 3) % 4;
				            return direction;
				        },
				        _getStyle: function(direction) {
				            var fromStyle, toStyle, slideFromTop = {
				                    left: '0px',
				                    top: '-100%'
				                },
				                slideFromBottom = {
				                    left: '0px',
				                    top: '100%'
				                },
				                slideFromLeft = {
				                    left: '-100%',
				                    top: '0px'
				                },
				                slideFromRight = {
				                    left: '100%',
				                    top: '0px'
				                },
				                slideTop = {
				                    top: '0px'
				                },
				                slideLeft = {
				                    left: '0px'
				                };
				            switch (direction) {
				                case 0:
				                    fromStyle = !this.options.inverse ? slideFromTop : slideFromBottom;
				                    toStyle = slideTop;
				                    break;
				                case 1:
				                    fromStyle = !this.options.inverse ? slideFromRight : slideFromLeft;
				                    toStyle = slideLeft;
				                    break;
				                case 2:
				                    fromStyle = !this.options.inverse ? slideFromBottom : slideFromTop;
				                    toStyle = slideTop;
				                    break;
				                case 3:
				                    fromStyle = !this.options.inverse ? slideFromLeft : slideFromRight;
				                    toStyle = slideLeft;
				                    break;
				            };
				            return {
				                from: fromStyle,
				                to: toStyle
				            };
				        },
				        _applyAnimation: function(el, styleCSS, speed) {
				            $.fn.applyStyle = this.support ? $.fn.css : $.fn.animate;
				            el.stop().applyStyle(styleCSS, $.extend(true, [], {
				                duration: speed + 'ms'
				            }));
				        },
				    };
				    var logError = function(message) {
				        if (window.console) {
				            window.console.error(message);
				        }
				    };
				    $.fn.hoverdir = function(options) {
				        var instance = $.data(this, 'hoverdir');
				        if (typeof options === 'string') {
				            var args = Array.prototype.slice.call(arguments, 1);
				            this.each(function() {
				                if (!instance) {
				                    logError("cannot call methods on hoverdir prior to initialization; " + "attempted to call method '" + options + "'");
				                    return;
				                }
				                if (!$.isFunction(instance[options]) || options.charAt(0) === "_") {
				                    logError("no such method '" + options + "' for hoverdir instance");
				                    return;
				                }
				                instance[options].apply(instance, args);
				            });
				        } else {
				            this.each(function() {
				                if (instance) {
				                    instance._init();
				                } else {
				                    instance = $.data(this, 'hoverdir', new $.HoverDir(options, this));
				                }
				            });
				        }
				        return instance;
				    };
				})(jQuery, window);

				jQuery(document).ready(function() {
				    $(' .featured-area ').each(function() {
				        $(this).hoverdir();
				    });


				});
        
        
        
        
   // Script für Nummerierung der Seiten-Links
        var perPage=10;
				var numPages=2;
				var firstText ='Erster';
				var lastText ='Letzter';
				var prevText ='Frühere Posts';
				var nextText ='Weitere Posts';
				var urlactivepage=location.href;
				var home_page="/";

				if (typeof firstText == "undefined") firstText = "First";
				if (typeof lastText == "undefined") lastText = "Last";
				var noPage;
				var currentPage;
				var currentPageNo;
				var postLabel;
				pagecurrentg();

				function looppagecurrentg(pageInfo) {
					var html = '';
					pageNumber = parseInt(numPages / 2);
					if (pageNumber == numPages - pageNumber) {
						numPages = pageNumber * 2 + 1
					}
					pageStart = currentPageNo - pageNumber;
					if (pageStart < 1) pageStart = 1;
					lastPageNo = parseInt(pageInfo / perPage) + 1;
					if (lastPageNo - 1 == pageInfo / perPage) lastPageNo = lastPageNo - 1;
					pageEnd = pageStart + numPages - 1;
					if (pageEnd > lastPageNo) pageEnd = lastPageNo;
					/* Seite x von y derzeit nicht verwendet. 
						html += "<span class='pageOfPage'>Page " + currentPageNo + ' of ' + lastPageNo + "</span>";
					*/
					var prevNumber = parseInt(currentPageNo) - 1;
					/*
						Erste Seite nicht anzeigen, da Seite 1 immer angezeigt wird
						if (currentPageNo > 1) {
							if (currentPage == "page") {
								html += '<span class="firstpage"><a href="' + home_page + '">' + firstText + '</a></span>'
							} else {
								html += '<span class="firstpage"><a href="/search/label/' + postLabel + '?&max-results=' + perPage + '">' + firstText + '</a></span>'
							}
						}
					*/
					if (currentPageNo > 1) {
						if (currentPageNo == 2) {
							if (currentPage == "page") {
								html += '<span class="newerPage"><a href="' + home_page + '">' + prevText + '</a></span>'
							} else {
								html += '<span class="newerPage"><a href="/search/label/' + postLabel + '?&max-results=' + perPage + '">' + prevText + '</a></span>'
							}
						} else {
							if (currentPage == "page") {
								html += '<span class="newerPage"><a href="#" onclick="redirectpage(' + prevNumber + ');return false">' + prevText + '</a></span>'
							} else {
								html += '<span class="newerPage"><a href="#" onclick="redirectlabel(' + prevNumber + ');return false">' + prevText + '</a></span>'
							}
						}
					}
					if (pageStart > 1) {
						if (currentPage == "page") {
							html += '<span class=""><a href="' + home_page + '">1</a></span>'
						} else {
							html += '<span class=""><a href="/search/label/' + postLabel + '?&max-results=' + perPage + '">1</a></span>'
						}
					}
					if (pageStart > 2) {
						html += '<span class="skippedPage"><p>...</p></span>'
					}
					for (var jj = pageStart; jj <= pageEnd; jj++) {
						if (currentPageNo == jj) {
							html += '<span class="currentPage"><p>' + jj + '</p></span>'
						} else if (jj == 1) {
							if (currentPage == "page") {
								html += '<span class=""><a href="' + home_page + '">1</a></span>'
							} else {
								html += '<span class=""><a href="/search/label/' + postLabel + '?&max-results=' + perPage + '">1</a></span>'
							}
						} else {
							if (currentPage == "page") {
								html += '<span class=""><a href="#" onclick="redirectpage(' + jj + ');return false">' + jj + '</a></span>'
							} else {
								html += '<span class=""><a href="#" onclick="redirectlabel(' + jj + ');return false">' + jj + '</a></span>'
							}
						}
					}
					if (pageEnd < lastPageNo - 1) {
						html += '<span class="skippedPage"><p>...</p></span>'
					}
					if (pageEnd < lastPageNo) {
						if (currentPage == "page") {
							html += '<span class=""><a href="#" onclick="redirectpage(' + lastPageNo + ');return false">' + lastPageNo + '</a></span>'
						} else {
							html += '<span class=""><a href="#" onclick="redirectlabel(' + lastPageNo + ');return false">' + lastPageNo + '</a></span>'
						}
					}
					var nextnumber = parseInt(currentPageNo) + 1;
					if (currentPageNo < lastPageNo ) {
						if (currentPage == "page") {
							html += '<span class="olderPage"><a href="#" onclick="redirectpage(' + nextnumber + ');return false">' + nextText + '</a></span>'
						} else {
							html += '<span class="olderPage"><a href="#" onclick="redirectlabel(' + nextnumber + ');return false">' + nextText + '</a></span>'
						}
					}
					/*
						Letzte Seite nicht anzeigen, da sie immer mit Nummer angezeigt wird
						if (currentPageNo < lastPageNo) {
							if (currentPage == "page") {
								html += '<span class="lastpage"><a href="#" onclick="redirectpage(' + lastPageNo + ');return false">' + lastText + '</a></span>'
							} else {
								html += '<span class="lastpage"><a href="#" onclick="redirectlabel(' + lastPageNo + ');return false">' + lastText + '</a></span>'
							}
						}
					*/
					
					var pageArea = document.getElementsByName("pageArea");
					var blogPager = document.getElementById("blog-pager-content");
					for (var p = 0; p < pageArea.length; p++) {
						pageArea[p].innerHTML = html
					}
					if (pageArea && pageArea.length > 0) {
						html = ''
					}
					if (blogPager) {
						blogPager.innerHTML = html
					}
				}

				function totalcountdata(root) {
					var feed = root.feed;
					var totaldata = parseInt(feed.openSearch$totalResults.$t, 10);
					looppagecurrentg(totaldata)
				}

				function pagecurrentg() {
					var thisUrl = urlactivepage;
					if (thisUrl.indexOf("/search/label/") != -1) {
						if (thisUrl.indexOf("?updated-max") != -1) {
							postLabel = thisUrl.substring(thisUrl.indexOf("/search/label/") + 14, thisUrl.indexOf("?updated-max"))
						} else {
							postLabel = thisUrl.substring(thisUrl.indexOf("/search/label/") + 14, thisUrl.indexOf("?&max"))
						}
					}
					if (thisUrl.indexOf("?q=") == -1 && thisUrl.indexOf(".html") == -1) {
						if (thisUrl.indexOf("/search/label/") == -1) {
							currentPage = "page";
							if (urlactivepage.indexOf("#PageNo=") != -1) {
								currentPageNo = urlactivepage.substring(urlactivepage.indexOf("#PageNo=") + 8, urlactivepage.length)
							} else {
								currentPageNo = 1
							}
							document.write("<script src=\"" + home_page + "feeds/posts/summary?max-results=1&alt=json-in-script&callback=totalcountdata\"><\/script>")
						} else {
							currentPage = "label";
							if (thisUrl.indexOf("&max-results=") == -1) {
								perPage = 20
							}
							if (urlactivepage.indexOf("#PageNo=") != -1) {
								currentPageNo = urlactivepage.substring(urlactivepage.indexOf("#PageNo=") + 8, urlactivepage.length)
							} else {
								currentPageNo = 1
							}
							document.write('<script src="' + home_page + 'feeds/posts/summary/-/' + postLabel + '?alt=json-in-script&callback=totalcountdata&max-results=1" ><\/script>')
						}
					}
				}

				function redirectpage(numberpage) {
					jsonstart = (numberpage - 1) * perPage;
					noPage = numberpage;
					var nameBody = document.getElementsByTagName('head')[0];
					var newInclude = document.createElement('script');
					newInclude.type = 'text/javascript';
					newInclude.setAttribute("src", home_page + "feeds/posts/summary?start-index=" + jsonstart + "&max-results=1&alt=json-in-script&callback=finddatepost");
					nameBody.appendChild(newInclude)
				}

				function redirectlabel(numberpage) {
					jsonstart = (numberpage - 1) * perPage;
					noPage = numberpage;
					var nameBody = document.getElementsByTagName('head')[0];
					var newInclude = document.createElement('script');
					newInclude.type = 'text/javascript';
					newInclude.setAttribute("src", home_page + "feeds/posts/summary/-/" + postLabel + "?start-index=" + jsonstart + "&max-results=1&alt=json-in-script&callback=finddatepost");
					nameBody.appendChild(newInclude)
				}

				function finddatepost(root) {
					post = root.feed.entry[0];
					var timestamp1 = post.published.$t.substring(0, 19) + post.published.$t.substring(23, 29);
					var timestamp = encodeURIComponent(timestamp1);
					if (currentPage == "page") {
						var pAddress = "/search?updated-max=" + timestamp + "&max-results=" + perPage + "#PageNo=" + noPage
					} else {
						var pAddress = "/search/label/" + postLabel + "?updated-max=" + timestamp + "&max-results=" + perPage + "#PageNo=" + noPage
					}
					location.href = pAddress
				}

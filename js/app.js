var __DEBUG__ = false;
/* _nicedate.js */
_.mixin({niceDate:function(e,t){var n,a,T,E,A,D,r,i,N,O,M;return A=1e3,T=60*A,a=60*T,n=24*a,D=7*n,E=31*n,r=365*n,O={en:{AGO:" ago",AFTER:" after",SECOND:" second",MINUTE:" minute",HOUR:" hour",DAY:" day",WEEK:" week",MONTH:" month",YEAR:" year",PLURAL:"s"},ja:{AGO:"前",AFTER:"後",SECOND:"秒",MINUTE:"分",HOUR:"時間",DAY:"日",WEEK:"週",MONTH:"月",YEAR:"年"}},i={en:{HOUR_MINUTE:"%_:%_",MONTH_DATE:"%_.%_",YEAR_MONTH_DATE:"%_.%_.%_"},ja:{HOUR_MINUTE:"%_:%_",MONTH_DATE:["%_",O.ja.MONTH,"%_",O.ja.DAY].join(""),YEAR_MONTH_DATE:["%_",O.ja.YEAR,"%_",O.ja.MONTH,"%_",O.ja.DAY].join("")}},M=function(e,t,n){return e=Math.floor(e),n.PLURAL&&e>1?e+t+n.PLURAL:e+t},N=function(){var e,t,n,a,_;for(e=arguments[0],n=2<=arguments.length?__slice.call(arguments,1):[],a=0,_=n.length;_>a;a++)t=n[a],e=e.replace("%_",t);return e},function(e,E){var D,m,d,o;return(_.isString(e)||_.isNumber(e))&&(newDate=new Date(e),isNaN(newDate)&&(ymd=e.match(/^(\d+)-(\d+)-(\d+)T(\d+):(\d+):(\d+)/),newDate=ymd?new Date(ymd[1]+"/"+ymd[2]+"/"+ymd[3]+" "+ymd[4]+":"+ymd[5]+":"+ymd[6]):e),e=newDate),_.isDate(e)?(o=(new Date).getTime(),E=_.isString(E)&&O[E]?E:"ja",t=O[E],d=i[E],m=o-e.getTime(),D=m>0?t.AGO:t.AFTER,m=Math.abs(m),T>m?""+M(m/A,t.SECOND,t)+D:a>m?""+M(m/T,t.MINUTE,t)+D:n>m?""+M(m/a,t.HOUR,t)+D:3*n>m?""+M(m/n,t.DAY,t)+D:r>m?""+N(d.MONTH_DATE,e.getMonth()+1,e.getDate()):""+N(d.MONTH_DATE,e.getMonth()+1,e.getDate())):void 0}}()});
/* activity-indicator.js */
!function(t){function e(e,n){var a=document.createElementNS("http://www.w3.org/2000/svg",e||"svg");return n&&t.each(n,function(t,e){a.setAttributeNS(null,t,e)}),t(a)}t.fn.activity=function(e){return this.each(function(){var i=t(this),o=i.data("activity");if(o&&(clearInterval(o.data("interval")),o.remove(),i.removeData("activity")),e!==!1){e=t.extend({color:i.css("color")},t.fn.activity.defaults,e),o=n(i,e).css("position","absolute").prependTo(e.outside?"body":i);var r=i.outerHeight()-o.height(),s=i.outerWidth()-o.width(),d={top:"top"==e.valign?e.padding:"bottom"==e.valign?r-e.padding:Math.floor(r/2),left:"left"==e.align?e.padding:"right"==e.align?s-e.padding:Math.floor(s/2)},c=i.offset();e.outside?o.css({top:c.top+"px",left:c.left+"px"}):(d.top-=o.offset().top-c.top,d.left-=o.offset().left-c.left),o.css({marginTop:d.top+"px",marginLeft:d.left+"px"}),a(o,e.segments,Math.round(10/e.speed)/10),i.data("activity",o)}}),this},t.fn.activity.defaults={segments:12,space:3,length:7,width:4,speed:1.2,align:"center",valign:"center",padding:4},t.fn.activity.getOpacity=function(t,e){var n=t.steps||t.segments-1,a=void 0!==t.opacity?t.opacity:1/n;return 1-Math.min(e,n)*(1-a)/n};var n=function(){return t("<div>").addClass("busy")},a=function(){};if(document.createElementNS&&document.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect)if(n=function(n,a){for(var i=2*a.width+a.space,o=i+a.length+Math.ceil(a.width/2)+1,r=e().width(2*o).height(2*o),s=e("g",{"stroke-width":a.width,"stroke-linecap":"round",stroke:a.color}).appendTo(e("g",{transform:"translate("+o+","+o+")"}).appendTo(r)),d=0;d<a.segments;d++)s.append(e("line",{x1:0,y1:i,x2:0,y2:i+a.length,transform:"rotate("+360/a.segments*d+", 0, 0)",opacity:t.fn.activity.getOpacity(a,d)}));return t("<div>").append(r).width(2*o).height(2*o)},void 0!==document.createElement("div").style.WebkitAnimationName){var i={};a=function(t,e,n){if(!i[e]){for(var a="spin"+e,o="@-webkit-keyframes "+a+" {",r=0;e>r;r++){var s=Math.round(1e5/e*r)/1e3,d=Math.round(1e5/e*(r+1)-1)/1e3,c="% { -webkit-transform:rotate("+Math.round(360/e*r)+"deg); }\n";o+=s+c+d+c}o+="100% { -webkit-transform:rotate(100deg); }\n}",document.styleSheets[0].insertRule(o),i[e]=a}t.css("-webkit-animation",i[e]+" "+n+"s linear infinite")}}else a=function(t,e,n){var a=0,i=t.find("g g").get(0);t.data("interval",setInterval(function(){i.setAttributeNS(null,"transform","rotate("+ ++a%e*(360/e)+")")},1e3*n/e))};else{var o=t("<shape>").css("behavior","url(#default#VML)");if(t("body").append(o),o.get(0).adj){var r=document.createStyleSheet();t.each(["group","shape","stroke"],function(){r.addRule(this,"behavior:url(#default#VML);")}),n=function(e,n){for(var a=2*n.width+n.space,i=a+n.length+Math.ceil(n.width/2)+1,o=2*i,r=-Math.ceil(o/2),s=t("<group>",{coordsize:o+" "+o,coordorigin:r+" "+r}).css({top:r,left:r,width:o,height:o}),d=0;d<n.segments;d++)s.append(t("<shape>",{path:"m "+a+",0  l "+(a+n.length)+",0"}).css({width:o,height:o,rotation:360/n.segments*d+"deg"}).append(t("<stroke>",{color:n.color,weight:n.width+"px",endcap:"round",opacity:t.fn.activity.getOpacity(n,d)})));return t("<group>",{coordsize:o+" "+o}).css({width:o,height:o,overflow:"hidden"}).append(s)},a=function(t,e,n){var a=0,i=t.get(0);t.data("interval",setInterval(function(){i.style.rotation=++a%e*(360/e)},1e3*n/e))}}t(o).remove()}}(jQuery);
/* jquery.powertip.js */
!function(t){"function"==typeof define&&define.amd?define(["jquery"],t):t(jQuery)}(function(t){function e(){var e=this;e.top="auto",e.left="auto",e.right="auto",e.bottom="auto",e.set=function(n,o){t.isNumeric(o)&&(e[n]=Math.round(o))}}function n(t,e,n){function o(o,i){r(),t.data(g)||(o?(i&&t.data(v,!0),n.showTip(t)):(k.tipOpenImminent=!0,l=setTimeout(function(){l=null,a()},e.intentPollInterval)))}function i(o){r(),k.tipOpenImminent=!1,t.data(g)&&(t.data(v,!1),o?n.hideTip(t):(k.delayInProgress=!0,l=setTimeout(function(){l=null,n.hideTip(t),k.delayInProgress=!1},e.closeDelay)))}function a(){var i=Math.abs(k.previousX-k.currentX),a=Math.abs(k.previousY-k.currentY),r=i+a;r<e.intentSensitivity?n.showTip(t):(k.previousX=k.currentX,k.previousY=k.currentY,o())}function r(){l=clearTimeout(l),k.delayInProgress=!1}function s(){n.resetPosition(t)}var l=null;this.show=o,this.hide=i,this.cancel=r,this.resetPosition=s}function o(){function t(t,i,r,s,l){var c,p=i.split("-")[0],u=new e;switch(c=a(t)?o(t,p):n(t,p),i){case"n":u.set("left",c.left-r/2),u.set("bottom",k.windowHeight-c.top+l);break;case"e":u.set("left",c.left+l),u.set("top",c.top-s/2);break;case"s":u.set("left",c.left-r/2),u.set("top",c.top+l);break;case"w":u.set("top",c.top-s/2),u.set("right",k.windowWidth-c.left+l);break;case"nw":u.set("bottom",k.windowHeight-c.top+l),u.set("right",k.windowWidth-c.left-20);break;case"nw-alt":u.set("left",c.left),u.set("bottom",k.windowHeight-c.top+l);break;case"ne":u.set("left",c.left-20),u.set("bottom",k.windowHeight-c.top+l);break;case"ne-alt":u.set("bottom",k.windowHeight-c.top+l),u.set("right",k.windowWidth-c.left);break;case"sw":u.set("top",c.top+l),u.set("right",k.windowWidth-c.left-20);break;case"sw-alt":u.set("left",c.left),u.set("top",c.top+l);break;case"se":u.set("left",c.left-20),u.set("top",c.top+l);break;case"se-alt":u.set("top",c.top+l),u.set("right",k.windowWidth-c.left)}return u}function n(t,e){var n,o,i=t.offset(),a=t.outerWidth(),r=t.outerHeight();switch(e){case"n":n=i.left+a/2,o=i.top;break;case"e":n=i.left+a,o=i.top+r/2;break;case"s":n=i.left+a/2,o=i.top+r;break;case"w":n=i.left,o=i.top+r/2;break;case"nw":n=i.left,o=i.top;break;case"ne":n=i.left+a,o=i.top;break;case"sw":n=i.left,o=i.top+r;break;case"se":n=i.left+a,o=i.top+r}return{top:o,left:n}}function o(t,e){function n(){h.push(c.matrixTransform(u))}var o,i,a,r,s=t.closest("svg")[0],l=t[0],c=s.createSVGPoint(),p=l.getBBox(),u=l.getScreenCTM(),d=p.width/2,f=p.height/2,h=[],w=["nw","n","ne","e","se","s","sw","w"];if(c.x=p.x,c.y=p.y,n(),c.x+=d,n(),c.x+=d,n(),c.y+=f,n(),c.y+=f,n(),c.x-=d,n(),c.x-=d,n(),c.y-=f,n(),h[0].y!==h[1].y||h[0].x!==h[7].x)for(i=Math.atan2(u.b,u.a)*M,a=Math.ceil((i%360-22.5)/45),1>a&&(a+=8);a--;)w.push(w.shift());for(r=0;r<h.length;r++)if(w[r]===e){o=h[r];break}return{top:o.y+k.scrollTop,left:o.x+k.scrollLeft}}this.compute=t}function i(n){function i(t){t.data(g,!0),M.queue(function(e){a(t),e()})}function a(t){var e;if(t.data(g)){if(k.isTipOpen)return k.isClosing||r(k.activeHover),M.delay(100).queue(function(e){a(t),e()}),void 0;t.trigger("powerTipPreRender"),e=c(t),e&&(M.empty().append(e),t.trigger("powerTipRender"),k.activeHover=t,k.isTipOpen=!0,M.data(T,n.mouseOnToPopup),n.followMouse?s():(y(t),k.isFixedTipOpen=!0),M.fadeIn(n.fadeInTime,function(){k.desyncTimeout||(k.desyncTimeout=setInterval(H,500)),t.trigger("powerTipOpen")}))}}function r(t){k.isClosing=!0,k.activeHover=null,k.isTipOpen=!1,k.desyncTimeout=clearInterval(k.desyncTimeout),t.data(g,!1),t.data(v,!1),M.fadeOut(n.fadeOutTime,function(){var o=new e;k.isClosing=!1,k.isFixedTipOpen=!1,M.removeClass(),o.set("top",k.currentY+n.offset),o.set("left",k.currentX+n.offset),M.css(o),t.trigger("powerTipClose")})}function s(){if(!k.isFixedTipOpen&&(k.isTipOpen||k.tipOpenImminent&&M.data(m))){var t,o,i=M.outerWidth(),a=M.outerHeight(),r=new e;r.set("top",k.currentY+n.offset),r.set("left",k.currentX+n.offset),t=p(r,i,a),t!==A.none&&(o=u(t),1===o?t===A.right?r.set("left",k.windowWidth-i):t===A.bottom&&r.set("top",k.scrollTop+k.windowHeight-a):(r.set("left",k.currentX-i-n.offset),r.set("top",k.currentY-a-n.offset))),M.css(r)}}function y(e){var o,i;n.smartPlacement?(o=t.fn.powerTip.smartPlacementLists[n.placement],t.each(o,function(t,n){var o=p(b(e,n),M.outerWidth(),M.outerHeight());return i=n,o===A.none?!1:void 0})):(b(e,n.placement),i=n.placement),M.addClass(i)}function b(t,o){var i,a,r=0,s=new e;s.set("top",0),s.set("left",0),M.css(s);do i=M.outerWidth(),a=M.outerHeight(),s=O.compute(t,o,i,a,n.offset),M.css(s);while(++r<=5&&(i!==M.outerWidth()||a!==M.outerHeight()));return s}function H(){var t=!1;!k.isTipOpen||k.isClosing||k.delayInProgress||(k.activeHover.data(g)===!1||k.activeHover.is(":disabled")?t=!0:l(k.activeHover)||k.activeHover.is(":focus")||k.activeHover.data(v)||(M.data(T)?l(M)||(t=!0):t=!0),t&&r(k.activeHover))}var O=new o,M=t("#"+n.popupId);0===M.length&&(M=t("<div/>",{id:n.popupId}),0===h.length&&(h=t("body")),h.append(M)),n.followMouse&&(M.data(m)||(d.on("mousemove",s),f.on("scroll",s),M.data(m,!0))),n.mouseOnToPopup&&M.on({mouseenter:function(){M.data(T)&&k.activeHover&&k.activeHover.data(w).cancel()},mouseleave:function(){k.activeHover&&k.activeHover.data(w).hide()}}),this.showTip=i,this.hideTip=r,this.resetPosition=y}function a(t){return window.SVGElement&&t[0]instanceof SVGElement}function r(){k.mouseTrackingActive||(k.mouseTrackingActive=!0,t(function(){k.scrollLeft=f.scrollLeft(),k.scrollTop=f.scrollTop(),k.windowWidth=f.width(),k.windowHeight=f.height()}),d.on("mousemove",s),f.on({resize:function(){k.windowWidth=f.width(),k.windowHeight=f.height()},scroll:function(){var t=f.scrollLeft(),e=f.scrollTop();t!==k.scrollLeft&&(k.currentX+=t-k.scrollLeft,k.scrollLeft=t),e!==k.scrollTop&&(k.currentY+=e-k.scrollTop,k.scrollTop=e)}}))}function s(t){k.currentX=t.pageX,k.currentY=t.pageY}function l(t){var e=t.offset(),n=t[0].getBoundingClientRect(),o=n.right-n.left,i=n.bottom-n.top;return k.currentX>=e.left&&k.currentX<=e.left+o&&k.currentY>=e.top&&k.currentY<=e.top+i}function c(e){var n,o,i=e.data(b),a=e.data(H),r=e.data(O);return i?(t.isFunction(i)&&(i=i.call(e[0])),o=i):a?(t.isFunction(a)&&(a=a.call(e[0])),a.length>0&&(o=a.clone(!0,!0))):r&&(n=t("#"+r),n.length>0&&(o=n.html())),o}function p(t,e,n){var o=k.scrollTop,i=k.scrollLeft,a=o+k.windowHeight,r=i+k.windowWidth,s=A.none;return(t.top<o||Math.abs(t.bottom-k.windowHeight)-n<o)&&(s|=A.top),(t.top+n>a||Math.abs(t.bottom-k.windowHeight)>a)&&(s|=A.bottom),(t.left<i||t.right+e>r)&&(s|=A.left),(t.left+e>r||t.right<i)&&(s|=A.right),s}function u(t){for(var e=0;t;)t&=t-1,e++;return e}var d=t(document),f=t(window),h=t("body"),w="displayController",g="hasActiveHover",v="forcedOpen",m="hasMouseMove",T="mouseOnToPopup",y="originalTitle",b="powertip",H="powertipjq",O="powertiptarget",M=180/Math.PI,k={isTipOpen:!1,isFixedTipOpen:!1,isClosing:!1,tipOpenImminent:!1,activeHover:null,currentX:0,currentY:0,previousX:0,previousY:0,desyncTimeout:null,mouseTrackingActive:!1,delayInProgress:!1,windowWidth:0,windowHeight:0,scrollTop:0,scrollLeft:0},A={none:0,top:1,bottom:2,left:4,right:8};t.fn.powerTip=function(e,o){if(!this.length)return this;if("string"===t.type(e)&&t.powerTip[e])return t.powerTip[e].call(this,this,o);var a=t.extend({},t.fn.powerTip.defaults,e),s=new i(a);return r(),this.each(function(){var e,o=t(this),i=o.data(b),r=o.data(H),l=o.data(O);o.data(w)&&t.powerTip.destroy(o),e=o.attr("title"),i||l||r||!e||(o.data(b,e),o.data(y,e),o.removeAttr("title")),o.data(w,new n(o,a,s))}),a.manual||this.on({"mouseenter.powertip":function(e){t.powerTip.show(this,e)},"mouseleave.powertip":function(){t.powerTip.hide(this)},"focus.powertip":function(){t.powerTip.show(this)},"blur.powertip":function(){t.powerTip.hide(this,!0)},"keydown.powertip":function(e){27===e.keyCode&&t.powerTip.hide(this,!0)}}),this},t.fn.powerTip.defaults={fadeInTime:200,fadeOutTime:100,followMouse:!1,popupId:"powerTip",intentSensitivity:7,intentPollInterval:100,closeDelay:100,placement:"n",smartPlacement:!1,offset:10,mouseOnToPopup:!1,manual:!1},t.fn.powerTip.smartPlacementLists={n:["n","ne","nw","s"],e:["e","ne","se","w","nw","sw","n","s","e"],s:["s","se","sw","n"],w:["w","nw","sw","e","ne","se","n","s","w"],nw:["nw","w","sw","n","s","se","nw"],ne:["ne","e","se","n","s","sw","ne"],sw:["sw","w","nw","s","n","ne","sw"],se:["se","e","ne","s","n","nw","se"],"nw-alt":["nw-alt","n","ne-alt","sw-alt","s","se-alt","w","e"],"ne-alt":["ne-alt","n","nw-alt","se-alt","s","sw-alt","e","w"],"sw-alt":["sw-alt","s","se-alt","nw-alt","n","ne-alt","w","e"],"se-alt":["se-alt","s","sw-alt","ne-alt","n","nw-alt","e","w"]},t.powerTip={show:function(e,n){return n?(s(n),k.previousX=n.pageX,k.previousY=n.pageY,t(e).data(w).show()):t(e).first().data(w).show(!0,!0),e},reposition:function(e){return t(e).first().data(w).resetPosition(),e},hide:function(e,n){return e?t(e).first().data(w).hide(n):k.activeHover&&k.activeHover.data(w).hide(!0),e},destroy:function(e){return t(e).off(".powertip").each(function(){var e=t(this),n=[y,w,g,v];e.data(y)&&(e.attr("title",e.data(y)),n.push(b)),e.removeData(n)}),e}},t.powerTip.showTip=t.powerTip.show,t.powerTip.closeTip=t.powerTip.hide});
/* base-view.coffee */
!function(){var t,e,n=function(t,e){return function(){return t.apply(e,arguments)}},i={}.hasOwnProperty,o=function(t,e){function n(){this.constructor=t}for(var o in e)i.call(e,o)&&(t[o]=e[o]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t};t=function(t){function i(){return this.elem2model=n(this.elem2model,this),this.link2elem=n(this.link2elem,this),this.cid2elem=n(this.cid2elem,this),this.mouseOut=n(this.mouseOut,this),this.mouseIn=n(this.mouseIn,this),this.getItem=n(this.getItem,this),this.initialize=n(this.initialize,this),this.clear=n(this.clear,this),e=i.__super__.constructor.apply(this,arguments)}return o(i,t),i.prototype.clear=function(){return this.$listContent.empty(),this.collection.reset()},i.prototype.initialize=function(){return _.bindAll(this),this.tmpl=_.template($("#view-entry").html()),this.$loading=this.$el.find(".loading"),this.$listContent=this.$el.find(".list-content")},i.prototype.getItem=function(t){var e;for(e=$(t.target);!e.hasClass("list-item");)e=e.parent();return e},i.prototype.mouseIn=function(t){var e;return e=this.getItem(t),e.find(".list-item .pure-button").stop().hide(),e.find(".pure-button").fadeIn("fast")},i.prototype.mouseOut=function(t){var e;return e=this.getItem(t),e.find(".pure-button").stop().hide()},i.prototype.cid2elem=function(t){return this.$el.find(".list-item").filter(function(){return $(this).data("cid")===t})},i.prototype.link2elem=function(t){return this.$el.find(".list-item").filter(function(){return $(this).find("h3 a").attr("href")===t})},i.prototype.elem2model=function(t){return this.collection.get(this.getItem(t).data("cid"))},i}(Backbone.View),this.BaseView=t}.call(this);
/* comment-list.coffee */
!function(){var t,e,n,i,o,r,s={}.hasOwnProperty,a=function(t,e){function n(){this.constructor=t}for(var i in e)s.call(e,i)&&(t[i]=e[i]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t},l=function(t,e){return function(){return t.apply(e,arguments)}};t=function(t){function e(){return i=e.__super__.constructor.apply(this,arguments)}return a(e,t),e.prototype.defaults={user:null,tags:null,timestamp:null,comment:null},e}(Backbone.Model),e=function(e){function n(){return this.parse=l(this.parse,this),o=n.__super__.constructor.apply(this,arguments)}return a(n,e),n.prototype.model=t,n.prototype.url="http://b.hatena.ne.jp/entry/jsonlite/",n.prototype.parse=function(t){var e;if(null!=t)return this.eid=t.eid,this.entryTitle=t.title,this.entryUrl=t.entry_url,function(){var n,i,o,r;for(o=t.bookmarks,r=[],n=0,i=o.length;i>n;n++)e=o[n],e.comment.length>0&&r.push(e);return r}().reverse()},n}(Backbone.Collection),n=function(t){function n(){return this.render=l(this.render,this),this.showError=l(this.showError,this),this.show=l(this.show,this),this.initialize=l(this.initialize,this),r=n.__super__.constructor.apply(this,arguments)}return a(n,t),n.prototype.el="#comment-list",n.prototype.initialize=function(t){return n.__super__.initialize.call(this,t),this.tmpl=_.template($("#view-comment").html()),this.collection=new e,this.collection.bind("add",this.render)},n.prototype.show=function(t,e){var n=this;return this.clear(),this.$loading.activity({color:"#000"}),this.collection.past=t.get("past"),this.collection.fetch({data:{url:t.get("link")},dataType:"jsonp"}).done(function(t){var i,o;return null==t?n.showError({message:"はてなブックマークAPIエラー"}):0===n.collection.length?n.showError({message:"コメントが1件も登録されていません"}):(o=Math.min(n.collection.length-1,n.collection.past),i=n.$listContent.find(".list-item").eq(o).offset().top-n.$listContent.offset().top,n.$listContent.scrollTop(i),null!=e&&e(n.collection.length)),n.$el.find(".list-control .entry").attr("href",n.collection.entryUrl).text(n.collection.entryTitle),n.$loading.activity(!1)})},n.prototype.showError=function(t){return this.$listContent.html(_.template($("#view-error").html(),t))},n.prototype.render=function(t){var e,n,i;return i=t.get("timestamp"),t.set("comment",t.get("comment").replace(/(http[s]?\:\/\/[\w\+\$\;\?\.\%\,\!\#\~\*\/\:\@\&\\\=\_\-]+)/gi,'<a href="$1" target="_blank">$1</a>')),n={eid:this.collection.eid,userIndex:t.get("user").substr(0,2),relTimestamp:_.niceDate(i),model:t.attributes,date:i.split(/\s/)[0].replace(/\D/g,""),itemClass:this.$listContent.find(".list-item").length>=this.collection.past?"new":""},e=$($.parseHTML(this.tmpl(n))).appendTo(this.$listContent),e.data("cid",t.cid),this},n}(BaseView),this.CommentItem=t,this.CommentList=e,this.CommentView=n}.call(this);
/* entry-list.coffee */
!function(){var t,e,n,i,o,r,s={}.hasOwnProperty,a=function(t,e){function n(){this.constructor=t}for(var i in e)s.call(e,i)&&(t[i]=e[i]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t},l=function(t,e){return function(){return t.apply(e,arguments)}};t=function(t){function e(){return i=e.__super__.constructor.apply(this,arguments)}return a(e,t),e.prototype.defaults={view:"entry",title:null,link:null,description:null,date:null,subject:null,bookmarkcount:0,category:null,favicon:null,host:null},e}(Backbone.Model),e=function(e){function n(){return o=n.__super__.constructor.apply(this,arguments)}return a(n,e),n.prototype.model=t,n}(Backbone.Collection),n=function(n){function i(){return this.showEntry=l(this.showEntry,this),this.addWatch=l(this.addWatch,this),this.openEntry=l(this.openEntry,this),this.changeCategory=l(this.changeCategory,this),this.showError=l(this.showError,this),this.render=l(this.render,this),this.update=l(this.update,this),this.initialize=l(this.initialize,this),r=i.__super__.constructor.apply(this,arguments)}return a(i,n),i.prototype.el="#entry-list",i.prototype.events={"mouseenter .list-item":"mouseIn","mouseleave .list-item":"mouseOut","click .list-control a":"changeCategory","click h3 a":"openEntry","click .add-watch":"addWatch"},i.prototype.initialize=function(t){var n=this;return i.__super__.initialize.call(this,t),this.categoryList={"世の中":"social","政治と経済":"economics","暮らし":"life","学び":"knowledge","テクノロジー":"it","エンタメ":"entertainment","アニメとゲーム":"game","おもしろ":"fun","カテゴリー不明":"unknown"},this.collection=new e,this.collection.bind("add",this.render),this.noCache=!1,setInterval(function(){return n.update()},6e5),this.update()},i.prototype.update=function(e){var n,i,o,r,s=this;return null==e&&(e=location.hash),e=e?e.substr(1):"all",this.$el.find(".list-control a").removeClass("current"),this.$el.find(".list-control a[href=#"+e+"]").addClass("current"),this.clear(),this.$loading.activity({color:"#000"}),n=new Date,i=_.sprintf("%04d%02d%02d%02d%02d",n.getFullYear(),n.getMonth()+1,n.getDate(),n.getHours(),Math.floor(n.getMinutes()/5)),this.noCache&&(i+=Math.floor(100*Math.random())),r="http://b.hatena.ne.jp/hotentry",r+="all"===e?"?"+i+"&mode=rss":"/"+e+".rss?"+i,o=new google.feeds.Feed(r),o.setNumEntries(50),o.setResultFormat(google.feeds.Feed.XML_FORMAT),o.load(function(e){var n,i,o,r,a,l,c,u,p,h,d,f;if(s.noCache=!1,e.error)s.showError(e.error);else for(l=$(e.xmlDocument).find("item"),o="dc\\:",u="hatena\\:",p=d=0,f=l.length;f>d;p=++d)c=l[p],n=$(c),0===p&&(i=n.find(""+u+"bookmarkcount").text(),0===(null!=i?i:"").length&&(o="",u="")),a=n.find("link").text(),r=n.find(""+o+"subject").text(),0===(null!=r?r:"").length&&(r="カテゴリー不明"),h=new t({title:n.find("title").text(),link:a,description:n.find("description").text(),date:_.niceDate(n.find(""+o+"date").text()),subject:r,bookmarkcount:n.find(""+u+"bookmarkcount").text(),category:s.categoryList[r],favicon:a.replace(/^(\w+:\/\/[^\/]+)\/.*$/,"$1/favicon.ico"),host:a.replace(/^\w+:\/\/([^\/]+)\/.*$/,"$1")}),s.collection.add(h);return s.$loading.activity(!1)})},i.prototype.render=function(t){var e;return e=$($.parseHTML(this.tmpl(t.attributes))),e.data("cid",t.cid),watchView.link2elem(t.get("link")).length>0&&e.hide(),e.appendTo(this.$listContent),e.find("h3 a").powerTip({placement:"e",smartPlacement:!0}),this},i.prototype.showError=function(t){return this.$listContent.html(_.template($("#view-error").html(),t)),this.noCache=!0},i.prototype.changeCategory=function(t){return $(t.target).hasClass("current")?!1:(this.update($(t.target).attr("href")),!0)},i.prototype.openEntry=function(t){var e;return this.$el.find(".list-item").removeClass("selected"),e=this.getItem(t),e.addClass("selected"),!0},i.prototype.addWatch=function(t){var e,n;return n=this.elem2model(t),e=this.cid2elem(n.cid),e.fadeOut("fast",function(){return watchView.addWatch(n)})},i.prototype.showEntry=function(t){var e;return e=this.link2elem(t),e.fadeIn("fast")},i}(BaseView),this.EntryItem=t,this.EntryList=e,this.EntryView=n}.call(this);
/* jquery.popn-socialbutton-custom.coffee */
!function(){!function(t){"use strict";var e;return e=t,e.fn.popnSocialButton=function(t,n){var o,i,r,s,a,l,c,u,p,h=this;for(null==n&&(n={}),o=e.extend({},{url:location.href,text:e("title").html(),imgDir:"./img",buttonSpace:24,countPosition:{top:32,right:-12},countColor:{text:"#ffffff",bg:"#cc0000",textHover:"#ffffff",bgHover:"#ff6666",border:"#ffffff"},countSize:10},n),o.urlOrg=o.url,o.url=encodeURIComponent(o.url),o.text=encodeURIComponent(o.text),i=44,s=4,l={twitter:{img:"twitter_2x.png",alt:"Twitter Share Button",shareUrl:"https://twitter.com/share?url="+o.url+"&text="+o.text,commentUrl:"https://twitter.com/search/?q="+o.url,countUrl:"http://urls.api.twitter.com/1/urls/count.json?url="+o.url,jsonpFunc:function(t,e){var n;return e(null!=(n=t.count)?n:0)}},facebook:{img:"facebook_2x.png",alt:"Facebook Share Button",shareUrl:"http://www.facebook.com/sharer.php?u="+o.url+"&t="+o.text,countUrl:"https://graph.facebook.com/"+o.url,jsonpFunc:function(t,n){var i,r;return null!=t.shares?n(t.shares):(i=null!=(r=t.likes)?r:0,e.ajax({url:"https://graph.facebook.com/fql?q="+encodeURIComponent("SELECT total_count FROM link_stat WHERE url='"+o.url+"'"),dataType:"jsonp"}).done(function(t){var e,o,r;return e=null!=(o=null!=(r=t.data[0])?r.total_count:void 0)?o:0,n(i+e)}))}},hatebu:{img:"hatena_bookmark_2x.png",alt:"Hatena Bookmark Share Button",shareUrl:"http://b.hatena.ne.jp/add?mode=confirm&url="+o.url+"&title="+o.text+"&mode=confirm",commentUrl:"http://b.hatena.ne.jp/entry/"+o.urlOrg,countUrl:"http://api.b.st-hatena.com/entry.count?url="+o.url,jsonpFunc:function(t,e){return e(null!=t?t:0)}},github:{img:"github_alt@2x.png",alt:"GitHub Repository",shareUrl:"https://github.com/"+o.githubRepo,commentUrl:"https://github.com/"+o.githubRepo+"/stargazers",countUrl:"https://api.github.com/repos/"+o.githubRepo,jsonpFunc:function(t,e){var n;return e(null!=(n=t.data.watchers)?n:0)}}},c=function(t,n,r){var a,l,c,u,p;return p=e("<div/>").attr({"class":"popn-socialbutton-wrap "+t}).css({"float":"left",position:"relative",width:i,height:i,marginTop:s}),r>0&&p.css({marginLeft:o.buttonSpace}),u=e("<a/>").attr({href:n.shareUrl,"class":"popn-socialbutton-share",target:"_blank"}).css({outline:"none",display:"block",width:"100%",height:"100%"}),c=e("<img/>").attr({src:""+o.imgDir+"/"+n.img,alt:n.alt}).css({border:"none"}),l=n.commentUrl?"a":"span",a=e("<"+l+"/>").attr({"class":"popn-socialbutton-count"}),"a"===l?a.attr({href:n.commentUrl,target:"_blank"}):a.css({cursor:"default"}),a.css(e.extend({},{display:"none",position:"absolute",color:o.countColor.text,backgroundColor:o.countColor.bg,border:"solid 2px "+o.countColor.border,fontSize:o.countSize,textDecoration:"none",outline:"none",fontWeight:"bold",padding:"0 4px",borderRadius:6,boxShadow:"0 1px 2px rgba(0, 0, 0, 0.8)",zIndex:1},o.countPosition)),p.append(u.append(c)).append(a),e(h).append(p),e.ajax({url:n.countUrl,dataType:"jsonp"}).done(function(t){return n.jsonpFunc(t,function(t){return a.show().text(t)})})},r=u=0,p=t.length;p>u;r=++u)a=t[r],null!=l[a]&&c(a,l[a],r);return e(this).height(i+s),e(this).find(".popn-socialbutton-share").click(function(){var t,e;return e=screen.height/2-180,t=screen.width/2-240,window.open(this.href,"","width=520, height=400, top="+e+", left="+t),!1}),e(this).find("a.popn-socialbutton-count").mouseenter(function(){return e(this).css({color:o.countColor.textHover,backgroundColor:o.countColor.bgHover})}).mouseleave(function(){return e(this).css({color:o.countColor.text,backgroundColor:o.countColor.bg})}),e(this).find(".popn-socialbutton-wrap").mouseenter(function(){return e(this).stop().animate({marginTop:0},100,"swing")}).mouseleave(function(){return e(this).stop().animate({marginTop:4},100,"swing")})}}(jQuery)}.call(this);
/* main.coffee */
!function(){$(function(){var t,e,n,o;return window.onerror=function(t,e,n){return $("#error .message").text(t),$("#error .at").text("at '"+e+"': "+n),$("#error").slideDown(300),$(window).scrollTop(0)},$("#error .close").click(function(){return $("#error").slideUp()}),__DEBUG__||$("#social-buttons").popnSocialButton(["twitter","facebook","hatebu","github"],{githubRepo:"ktty1220/bucome-watcher"}),n=$(".list-header").get(0),e=$(".list-control").get(0),t=$("#footer").get(0),o=function(){var o;return o=n.offsetHeight,o+=e.offsetHeight,o+=t.offsetHeight,$(".list-content").height($(window).height()-o)},$(window).bind("resize",o),o(),window.watchView=new WatchView,window.entryView=new EntryView,window.commentView=new CommentView})}.call(this);
/* watch-list.coffee */
!function(){var t,e,n,o,i,r,s=function(t,e){return function(){return t.apply(e,arguments)}},a={}.hasOwnProperty,l=function(t,e){function n(){this.constructor=t}for(var o in e)a.call(e,o)&&(t[o]=e[o]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t};t=function(t){function e(){return this.parse=s(this.parse,this),this.update=s(this.update,this),this.initialize=s(this.initialize,this),o=e.__super__.constructor.apply(this,arguments)}return l(e,t),e.prototype.url="http://b.hatena.ne.jp/entry/jsonlite/",e.prototype.initialize=function(){var t=this;return this.timer=setInterval(function(){return t.update()},18e4)},e.prototype.update=function(){var t=this;return $.ajax({url:this.url,data:{url:this.get("link")},dataType:"jsonp"}).done(function(e){var n,o,i;return o=function(){var t,o,i,r;for(i=e.bookmarks,r=[],t=0,o=i.length;o>t;t++)n=i[t],n.comment.length>0&&r.push(n);return r}().length,i=o-t.get("past"),t.set({newComment:i,bookmarkcount:e.count})})},e.prototype.parse=function(t){return null==t?(alert("エントリー情報を取得できませんでした"),void 0):{view:"watch",title:t.title,link:t.url,description:"※URLを指定して追加したエントリーは本文を取得できません",subject:"URL直接指定",date:"不明",bookmarkcount:t.count,favicon:t.url.replace(/^(\w+:\/\/[^\/]+)\/.*$/,"$1/favicon.ico"),host:t.url.replace(/^\w+:\/\/([^\/]+)\/.*$/,"$1"),newComment:0,past:0}},e}(EntryItem),e=function(e){function n(){return i=n.__super__.constructor.apply(this,arguments)}return l(n,e),n.prototype.model=t,n}(EntryList),n=function(n){function o(){return this.showComment=s(this.showComment,this),this.removeItem=s(this.removeItem,this),this.clear=s(this.clear,this),this.render=s(this.render,this),this.update=s(this.update,this),this.addWatch=s(this.addWatch,this),this.addUrl=s(this.addUrl,this),this.saveCollection=s(this.saveCollection,this),this.loadCollection=s(this.loadCollection,this),this.initialize=s(this.initialize,this),r=o.__super__.constructor.apply(this,arguments)}return l(o,n),o.prototype.el="#watch-list",o.prototype.saveKey="watchList",o.prototype.events={"mouseenter .list-item":"mouseIn","mouseleave .list-item":"mouseOut","click .add-url":"addUrl","click .clear":"clear","click .remove":"removeItem","click .comment":"showComment"},o.prototype.initialize=function(t){return o.__super__.initialize.call(this,t),this.collection=new e,this.collection.bind("add",this.render),this.collection.bind("change",this.update),this.init=!0,this.loadCollection(),this.init=!1},o.prototype.loadCollection=function(){var t,e,n,o,i,r;if("undefined"!=typeof localStorage&&null!==localStorage&&(e=localStorage.getItem(this.saveKey),null!=e)){for(n=JSON.parse(e),r=[],o=0,i=n.length;i>o;o++)t=n[o],r.push(this.addWatch(t));return r}},o.prototype.saveCollection=function(){var t,e,n,o,i;if("undefined"!=typeof localStorage&&null!==localStorage&&!this.init){for(e=[],i=this.collection.models,n=0,o=i.length;o>n;n++)t=i[n],e.push({attributes:t.attributes});return localStorage.setItem(this.saveKey,JSON.stringify(e))}},o.prototype.addUrl=function(){var e,n,o,i=this;return n=_.trim(null!=(o=prompt("URLを入力してください。"))?o:""),n.length>0?(e=new t,e.fetch({data:{url:n},dataType:"jsonp"}).done(function(t){return null!=t?i.addWatch(e):void 0})):void 0},o.prototype.addWatch=function(e){var n,o,i,r;n=new t,r=e.attributes;for(o in r)i=r[o],n.set(o,i);return n.set("view","watch"),null==e.attributes.newComment&&n.set("newComment",0),null==e.attributes.past&&n.set("past",0),this.collection.add(n),this.saveCollection(),n.update()},o.prototype.update=function(t){var e,n;return n=this.cid2elem(t.cid),e=t.get("newComment"),n.find(".bookmarkcount .count").text(t.get("bookmarkcount")),e>0&&(n.find(".new-comment").text(e),n.find(".new-comment").show()),this.saveCollection()},o.prototype.render=function(t){var e;return e=$($.parseHTML(this.tmpl(t.attributes))).appendTo(this.$listContent),e.data("cid",t.cid),e.find("h3 a").powerTip({placement:"e",smartPlacement:!0}),this},o.prototype.clear=function(){var t=this;return this.$el.find(".list-item").each(function(e,n){return t.removeItem({target:n})}),localStorage.clear()},o.prototype.removeItem=function(t){var e,n,o,i=this;return o=this.getItem(t),e=o.data("cid"),n=this.collection.get(e),clearInterval(n.timer),this.collection.remove(e),o.fadeOut("fast",function(){return entryView.showEntry(o.find("h3 a").attr("href")),o.remove(),i.saveCollection()})},o.prototype.showComment=function(t){var e,n=this;return e=this.elem2model(t),commentView.show(e,function(o){var i;return null==o&&(o=0),e.set({past:o},{silent:!0}),n.$el.find(".list-item").removeClass("selected"),i=n.getItem(t),i.addClass("selected"),i.find(".new-comment").hide(),n.saveCollection()})},o}(BaseView),this.WatchItem=t,this.WatchList=e,this.WatchView=n}.call(this);
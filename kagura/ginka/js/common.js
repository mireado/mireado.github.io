/*--------------------------------------------------------------------------*
//コンセプト
 *--------------------------------------------------------------------------*/
$(function(){
		setTimeout(function(){
		$('.card03 > .inner').css({
			'transform':'rotateY(180deg)',
			'-webkit-transform':'rotateY(180deg)'
		});
	},1200);
			
});
$(function(){
		setTimeout(function(){
		$('.card02 > .inner').css({
			'transform':'rotateY(180deg)',
			'-webkit-transform':'rotateY(180deg)'
		});
	},1000);
			
});

$(function(){
		setTimeout(function(){
		$('.card01 > .inner').css({
			'transform':'rotateY(180deg)',
			'-webkit-transform':'rotateY(180deg)'
		});
	},800);
			
});
/*--------------------------------------------------------------------------*
//キャラクターのフェード切替
 *--------------------------------------------------------------------------*/
$(function(){
// 設定
var $width =900; // 横幅
var $height =1500; // 高さ
var $interval = 4000; // 切り替わりの間隔（ミリ秒）
var $fade_speed = 2000; // フェード処理の早さ（ミリ秒）
$("#slide ul li").css({"position":"relative","overflow":"hidden","width":$width,"height":$height});
$("#slide ul li").hide().css({"position":"absolute","top":0,"left":0});
$("#slide ul li:first").addClass("active").show();
setInterval(function(){
var $active = $("#slide ul li.active");
var $next = $active.next("li").length?$active.next("li"):$("#slide ul li:first");
$active.fadeOut($fade_speed).removeClass("active");
$next.fadeIn($fade_speed).addClass("active");
},$interval);
});



$(function() {
	var $nav = $('.rollover');
	$nav.hover(
		function(){
			$(this).fadeTo(200,0.7);
		},
		function () {
			$(this).fadeTo(200,1);
		}
	);
});
/*--------------------------------------------------------------------------*
 *  
 *  footerFixed.js
 *  
 *  MIT-style license. 
 *  
 *  2007 Kazuma Nishihata [to-R]
 *  http://blog.webcreativepark.net
 *  
 *--------------------------------------------------------------------------*/
/*-
new function(){
	
	var footerId = "footer";
	//メイン
	function footerFixed(){
		//ドキュメントの高さ
		var dh = document.getElementsByTagName("body")[0].clientHeight;
		//フッターのtopからの位置
		document.getElementById(footerId).style.top = "0px";
		var ft = document.getElementById(footerId).offsetTop;
		//フッターの高さ
		var fh = document.getElementById(footerId).offsetHeight;
		//ウィンドウの高さ
		if (window.innerHeight){
			var wh = window.innerHeight;
		}else if(document.documentElement && document.documentElement.clientHeight != 0){
			var wh = document.documentElement.clientHeight;
		}
		if(ft+fh<wh){
			document.getElementById(footerId).style.position = "relative";
			document.getElementById(footerId).style.top = (wh-fh-ft-1)+"px";
		}
	}
	
	//文字サイズ
	function checkFontSize(func){
	
		//判定要素の追加	
		var e = document.createElement("div");
		var s = document.createTextNode("S");
		e.appendChild(s);
		e.style.visibility="hidden"
		e.style.position="absolute"
		e.style.top="0"
		document.body.appendChild(e);
		var defHeight = e.offsetHeight;
		
		//判定関数
		function checkBoxSize(){
			if(defHeight != e.offsetHeight){
				func();
				defHeight= e.offsetHeight;
			}
		}
		setInterval(checkBoxSize,1000)
	}
	
	//イベントリスナー
	function addEvent(elm,listener,fn){
		try{
			elm.addEventListener(listener,fn,false);
		}catch(e){
			elm.attachEvent("on"+listener,fn);
		}
	}

	addEvent(window,"load",footerFixed);
	addEvent(window,"load",function(){
		checkFontSize(footerFixed);
	});
	addEvent(window,"resize",footerFixed);
	
}
/*	
//-----------------------------------------------------------------------------
//クロスオーバー
//------------------------------------------------------------------------------
/*
CrossFadeRollOver Plugin v1.3.3

The MIT License

Copyright (c) 2013 ks-product.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

(function($){
	
	$.fn.CrossFadeRollOver = function(options){		
			
		var defaults = {
			type : "img",
			opacity : 0.8,
			duration : { on:500, off:500 },
			suffix : { on:"_on", off:"_off" },
			direction : "vertical",
			fadeTarget : null,
			activeClassName : "active"
		};
		
		if(options){
			if(options.suffix && !(options.suffix.on !== undefined && options.suffix.off !== undefined )){
				console.error("エラー：jQueryCrossFadeRollOver：suffixを指定する場合はon、off両方を入力する必要があります。または適切な値が入力されていません。");
				return false;
			}
			
			if(options.duration && !(!isNaN(options.duration.on) && !isNaN(options.duration.off))){
				console.error("エラー：jQueryCrossFadeRollOver：durationを指定する場合はon、off両方を入力する必要があります。または適切な値が入力されていません。");
				return false;
			}	
		}
		
		var setting = $.extend( defaults, options );

		$(window).bind("unload",function(){});
		
		$(this).each(function(i){

			var type = setting.type;
			var opacity = setting.opacity;
			var onDuration = setting.duration.on;
			var offDuration = setting.duration.off;
			var fadeTarget = setting.fadeTarget;
			var direction = setting.direction;
			var activeClassName = setting.activeClassName;
			var offSuffix = setting.suffix.off;
			var onSuffix = setting.suffix.on;

			var $fadeTarget;
			
			
			if(fadeTarget){
				if($(fadeTarget, this).length){
					$fadeTarget = $(fadeTarget, this);
				}else{
					console.error("エラー：jQueryCrossFadeRollOver：指定されたfadeTargetの値が無効な為、一部の処理がキャンセルされました")	;
					return false;
				}
			}else{
				$fadeTarget = $(this);
			}
			
			if($fadeTarget.is("img")){
				$fadeTarget = $fadeTarget.parent();
			}
			



			/*if($fadeTarget.data("isRunningCrossFadeRollOver") == "true"){

				return;
			}*/
			
			
			if(!$("img",$fadeTarget).length && (!options || !options.type)){
				type = "css";
			}
				
			if(type == "img" || type == "css"){
				
				var self = ($(this).is("img")) ? $fadeTarget : $(this);
				
				init(self, $fadeTarget);
				var obj = createHoverImages(self, $fadeTarget);
				setData();
				setHoverAction(self, obj.$normal, obj.$hover);
				
			}else if(type == "fade"){
				
				init(this, $fadeTarget);
				setData();
				setFadeHoverAction(this);
				
			}
			
			function setData(){
				if(!$fadeTarget.data("display")){
					/* 初回実行時はdataにデフォルトデータを記憶 */
					$fadeTarget.data({
						"display":$fadeTarget.css("display"),
						"background-image":$(".cfro-normal",$fadeTarget).css("background-image"),
						"position":$fadeTarget.css("position")
					});
				}
			}
			
			
			function init(that, $fadeTarget){
				
				$fadeTarget.css({
					"display":$fadeTarget.data("display"),
					"background-image":$fadeTarget.data("background-image"),
					"position":$fadeTarget.data("position")
				});
				
				$(".cfro-normal", $fadeTarget).remove();
				$(".cfro-hover", $fadeTarget).remove();
				
				$(that).unbind(
					{"mouseenter":crossFadeOverIE},
					{"mouseenter":crossFadeOver},
					{"mouseenter":fadeOverIE},
					{"mouseenter":fadeOver},
					{"mouseleave":crossFadeOutIE},
					{"mouseleave":crossFadeOut},
					{"mouseleave":fadeOutIE},
					{"mouseleave":fadeOut}
				);
				
			}
			
			
			function createHoverImages(that,$fadeTarget){
				
				var left;
				var top;
				var w;
				var h;
				var cssPosition;
				var hoverCSSBackgroundPosition;
				var cssBackgroundRepeat;
				var offCSSBackgroundImage;
				var onCSSBackgroundImage;
				var cssDisplay;
				
				$fadeTarget.data("isRunningCrossFadeRollOver","true");
				cssPosition = (!$fadeTarget.css("position") || $fadeTarget.css("position")=="static") ? "relative" : $fadeTarget.css("position");
				cssDisplay = (!$fadeTarget.css("display") || $fadeTarget.css("display")=="inline") ? "inline-block" : $fadeTarget.css("display");
				
				$fadeTarget.css({"display": cssDisplay});	

				if(type == "css"){
					
					w = $fadeTarget.width();
					h = $fadeTarget.height();
					
					offCSSBackgroundImage = $fadeTarget.css("background-image");
					onCSSBackgroundImage = $fadeTarget.css("background-image");
					cssBackgroundRepeat = $fadeTarget.css("background-repeat");
							
					if($fadeTarget.css("background-position") !== undefined){
						left = $fadeTarget.css("background-position").split(" ")[0].replace(/px|%/,"");
						top = $fadeTarget.css("background-position").split(" ")[1].replace(/px|%/,"");
					}else{
						left = $fadeTarget.css("backgroundPositionX").replace(/px|%/,"");
						top = $fadeTarget.css("backgroundPositionY").replace(/px|%/,"");
					}
					
					if(left == "left") left = 0;
					if(top == "top") top = 0;
										
					hoverCSSBackgroundPosition = (direction == "vertical") ? (left)+"px "+(top-h)+"px" : (left-w)+"px "+top+"px";
				
				}else if(type == "img"){

					var $img = $("img", $fadeTarget);
					
					if(!$img.width())	{
						$__img = $('<img src="'+$img.attr("src")+'">');
						$__img.bind("load",function(){
							$normal.width(this.width).height(this.height);
							$hover.width(this.width).height(this.height);
						});	
					}
					
					w = $img.width();
					h = $img.height();

					offCSSBackgroundImage = "url(" + $img.attr("src") + ")";
					onCSSBackgroundImage = "url(" + $img.attr("src").replace(new RegExp("(.*)"+offSuffix+"\\."),"$1"+onSuffix+".") + ")";
					cssBackgroundRepeat = "no-repeat";
					$('<img src="+("src").replace(offSuffix,onSuffix)+">'); //preload
					
					left = 0;
					top = 0;
					
					hoverCSSBackgroundPosition = "0 0";
					
				}
				
				$fadeTarget.empty().width(w).height(h).css("overflow","hidden").append('<div class="cfro-normal"></div><div class="cfro-hover"></div>');
				
				if(type == "img"){
					$fadeTarget.append($img.hide());
				}
				
				
				
				var $normal = $(".cfro-normal",$fadeTarget)
					.fadeTo(0,1)
					.width(w)
					.height(h)
					.css({
						"margin":"0",
						"padding":"0",
						"background-image":offCSSBackgroundImage,
						"background-repeat":cssBackgroundRepeat,
						"background-position":left+"px "+top+"px",
						"position":"relative",
						"left":"0px",
						"top":"0px"
					});
					
				var $hover = $(".cfro-hover",$fadeTarget)
					.fadeTo(0,0)
					.width(w)
					.height(h)
					.css({
						"margin":"0",
						"padding":"0",
						"background-image":onCSSBackgroundImage,
						"background-repeat":cssBackgroundRepeat,
						"background-position":hoverCSSBackgroundPosition,
						"position":"absolute",
						"left":"0px",
						"top":"0px"
					});
				
				
				$fadeTarget.css({"background-image":"none","position":cssPosition});
								
				
				
				return {$normal:$normal,$hover:$hover};
			}
			
			function setHoverAction(that, $normal, $hover){
				var imgURL;
				var imgType;
				
				imgURL = $normal.css("background-image");
				var result;
				if( result = imgURL.match(/.*\.(...)/)){
					imgType = result[1].toLowerCase();
				}
				
				if(getIEVersion() >= 9 || imgType != "png"){
					$(that).bind("mouseenter",{that:that, $normal:$normal, $hover:$hover},crossFadeOver);
					$(that).bind("mouseleave",{that:that, $normal:$normal, $hover:$hover},crossFadeOut);
					
				}else{
					$(that).bind("mouseenter",{that:that, $normal:$normal, $hover:$hover},crossFadeOverIE);
					$(that).bind("mouseleave",{that:that, $normal:$normal, $hover:$hover},crossFadeOutIE);
					
				}
			}
			
			function setFadeHoverAction(that){
				var imgURL;
				var imgType;
				
				$fadeTarget.data("isRunningCrossFadeRollOver","true");
				
				cssDisplay = (!$fadeTarget.css("display") || $fadeTarget.css("display")=="inline") ? "inline-block" : $fadeTarget.css("display");
				
				if(fadeTarget){
					$fadeTarget.empty();
				}else{
					var $img = ($("img",$fadeTarget).length) ? $("img",$fadeTarget) : null;

					if($img){
						$fadeTarget.empty().append($img);	
						var result;
						if( result = $img.attr("src").match(/.*\.(...)/)){
							imgType = result[1].toLowerCase();
						}
					}
				}
				
				if(!imgType){
					var result;
					if( result = $fadeTarget.css("background-image").match(/.*\.(...)/)){
						imgType =  result[1].toLowerCase();
					}
				}
				
				if($(that).is("img")){
					that = $(that).parent()[0];
				}
					
				$fadeTarget.css({"overflow":"hidden", "display":cssDisplay});
				
				if(getIEVersion() >= 9 || imgType != "png"){
					$(that).bind("mouseenter",{that:that},fadeOver);
					$(that).bind("mouseleave",{that:that},fadeOut);
				
				}else{
					$(that).bind("mouseenter",{that:that},fadeOverIE);
					$(that).bind("mouseleave",{that:that},fadeOutIE);
					
				}
				
			}
			
			function crossFadeOver(e){
				var that = e.data.that;
				var $normal = e.data.$normal;
				var $hover = e.data.$hover;

				if(!$(that).hasClass(activeClassName)){
					$normal.stop(true,false).delay(onDuration / 2).fadeTo(onDuration,0);
					$hover.stop(true,false).fadeTo(onDuration,1);
				}
			}
			function crossFadeOut(e){
				var that = e.data.that;
				var $normal = e.data.$normal;
				var $hover = e.data.$hover;
				
				if(!$(that).hasClass(activeClassName)){
					$normal.stop(true,false).fadeTo(offDuration / 2 ,1);
					$hover.stop(true,false).delay(offDuration / 8).fadeTo(offDuration,0);
				}
			}
			function crossFadeOverIE(e){
				var that = e.data.that;
				var $normal = e.data.$normal;
				var $hover = e.data.$hover;
				
				if(!$(that).hasClass(activeClassName)){
					$normal.stop(true,false).fadeTo(0,0);
					$hover.stop(true,false).fadeTo(0,1);
				}
			}
			function crossFadeOutIE(e){ 
				var that = e.data.that;
				var $normal = e.data.$normal;
				var $hover = e.data.$hover;
			
				if(!$(that).hasClass(activeClassName)){
					$normal.stop(true,false).fadeTo(0 ,1);
					$hover.stop(true,false).fadeTo(0,0);
				}
			}
			function fadeOver(e){ var that = e.data.that; $fadeTarget.stop(true,false).fadeTo(onDuration,opacity);	}
			function fadeOut(e){ var that = e.data.that; $fadeTarget.stop(true,false).fadeTo(offDuration,1); }
			function fadeOverIE(e){ var that = e.data.that; $fadeTarget.stop(true,false).fadeTo(0,opacity);	}
			function fadeOutIE(e){ var that = e.data.that; $fadeTarget.stop(true,false).fadeTo(0,1);	}
			
			function getIEVersion(){
				var MSIE = "MSIE ";
				var UA = navigator.userAgent;
				
				if(UA.indexOf(MSIE) == -1) return 9999;
				
				var startPos = UA.indexOf(MSIE) + MSIE.length;
				var endPos = UA.indexOf(";",startPos);
				var version = Number(UA.slice(startPos,endPos));
				
				return version;
			}
			
		});
			
			
	}
	
})(jQuery);	

$(function(){
	$(".crossover").CrossFadeRollOver({suffix:{off:"_off",on:"_on"}});
	
});



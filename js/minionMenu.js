/*
 *  MIT License
 * 
 * 	Copyright (c) 2014 Pascal Fautrero pascal.fautrero@ac-versailles.fr
 *  JQuery plugin 
 * 
 *	Permission is hereby granted, free of charge, to any person
 *	obtaining a copy of this software and associated documentation
 *	files (the "Software"), to deal in the Software without
 *	restriction, including without limitation the rights to use,
 *	copy, modify, merge, publish, distribute, sublicense, and/or sell
 *	copies of the Software, and to permit persons to whom the
 *	Software is furnished to do so, subject to the following
 *	conditions:
 *	The above copyright notice and this permission notice shall be
 *	included in all copies or substantial portions of the Software.
 *	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 *	EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 *	OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 *	NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 *	HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 *	WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 *	FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 *	OTHER DEALINGS IN THE SOFTWARE.
 */


/* How to use ?
 * 
 * 1. 5 images needed. Default : 
 *  img/state1.jpg
 *  img/state2.jpg
 *  img/state3.jpg
 *  img/state4.jpg
 *  img/state5.jpg
 * 
 * 2. Create your menu like this :
 *  <div class="myMenu">
 *   <ul class="list">
 *     <li>
 *       <a class="menutitle" href="#">TITLE</a>
 *       <ul class="submenu">
 *         <li>ELEMENT</li>
 *       </ul>
 *     </li>
 *   </ul> 
 *  </div>
 * 
 * 3. Instantiate your menu :
 *   $(".myMenu").minionMenu();
 */

(function ( $ ) {
	$.fn.minionMenu = function(options) {
		
		var settings = $.extend({
			delay: 5,
			step: 20,
			prefix: "state",
			imgFolder: 'img',
			rates: [0.30, 0.40, 0.60, 0.80]
		}, options );
		
		
		var changeHeight = function(element, value_to_add) {
			
			var currentHeight = element.parent().children(".submenu").height();
			var maxHeight = element.parent().children(".submenu").css("max-height").substring(0,element.parent().children(".submenu").css("max-height").length -2);
			maxHeight = parseInt(maxHeight) + value_to_add;
			if (maxHeight < 0) maxHeight = 0; 
			element.parent().children(".submenu").css({"max-height": maxHeight + "px"});
			var newHeight = element.parent().children(".submenu").height();
			var spriteHeight = $(".menu").height() - $(".list").height();
			$(".sprite").height(spriteHeight);
			if (spriteHeight < spriteOriginalHeight * settings.rates[0]) {
				$(".sprite").attr({"src" : settings.imgFolder + "/" + settings.prefix + "5.jpg"});
			}
			else if (spriteHeight < spriteOriginalHeight * settings.rates[1]) {
				$(".sprite").attr({"src" : settings.imgFolder + "/" + settings.prefix + "4.jpg"});
			}
			else if (spriteHeight < spriteOriginalHeight * settings.rates[2]) {
				$(".sprite").attr({"src" : settings.imgFolder + "/" + settings.prefix + "3.jpg"});
			}
			else if (spriteHeight < spriteOriginalHeight * settings.rates[3]) {
				$(".sprite").attr({"src" : settings.imgFolder + "/" + settings.prefix + "2.jpg"});
			}
			else if (spriteHeight < spriteOriginalHeight) {
				$(".sprite").attr({"src" : settings.imgFolder + "/" + settings.prefix + "1.jpg"});
			}

			if (newHeight != currentHeight) {
				setTimeout(changeHeight, settings.delay, element, value_to_add);
			}
			else {
				element.parent().children(".submenu").css({"max-height":element.parent().children(".submenu").height() + "px"});
			}
			
		};
		this.find(".menutitle").on("click tap", function(){
			if ($(this).parent().children(".submenu").css("max-height") == "0px") {
				setTimeout(changeHeight, 0, $(this), settings.step);
				$(this).removeClass("menutitle_down").addClass("menutitle_up");
				
			}
			else {
				$(this).parent().children(".submenu").css({"max-height":$(this).parent().children(".submenu").height() + "px"});
				setTimeout(changeHeight, 0, $(this), (-1) * settings.step);			      
				$(this).removeClass("menutitle_up").addClass("menutitle_down");
			}
		});		

		this.find(".menutitle").on("mouseover",function(){
			if ($(this).parent().children(".submenu").css("max-height") == "0px") {
				$(this).removeClass("menutitle_up").addClass("menutitle_down");
			}
			else {
				$(this).removeClass("menutitle_down").addClass("menutitle_up");
			}
		});

		this.find(".menutitle").on("mouseleave",function(){
			$(this).removeClass("menutitle_down").removeClass("menutitle_up");
		});


		this.find(".submenu").css({"max-height":"0px"});
		var spriteOriginalHeight = this.height() - this.children(".list").height();
		var sprite = document.createElement("img");
		sprite.setAttribute("src",settings.imgFolder + "/" + settings.prefix +'1.jpg');
		sprite.setAttribute("class",'sprite');
		this.append(sprite);
		this.children(".sprite").height(spriteOriginalHeight);		
	};		
}( jQuery ));

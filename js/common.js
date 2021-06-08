/*
 * fil.min.js – FIL (The Front-end Interactive Libraries)
 * Copyright (c) 2012, Danny Garcia. All rights reserved.
 * Code licensed under the MIT License
 * https://github.com/dannygarcia/fil/
 */
 //var fil=fil||{};(function(e){"use strict";var t=function(){var e,t={context:"2d",container:document.body,width:"auto",height:"auto",resize:!1,ratio:!1},n=null,r=null,i=1;return{width:null,height:null,init:function(e){return typeof e!="undefined"&&this.options(e),typeof window.devicePixelRatio!="undefined"&&t.ratio&&(i=window.devicePixelRatio),n=t.container.appendChild(document.createElement("canvas")),r=this.context(t.context),this.resize(null,t.width,t.height),t.resize&&window.addEventListener("resize",this.resize,!1),this},options:function(e){if(typeof e=="undefined")e=t;else for(var n in t)t.hasOwnProperty(n)&&typeof e[n]!="undefined"&&(t[n]=e[n]);return e},context:function(e){return typeof e=="undefined"?r:(r=n.getContext(e),r)},resize:function(e,s,o){if(typeof s=="undefined"||s==="auto")s=t.container.offsetWidth;if(typeof o=="undefined"||o==="auto")o=t.container.offsetHeight;s*=i,o*=i,this.width=r.canvas.width=s,this.height=r.canvas.height=o,n.style.width=s/i,n.style.height=o/i},clear:function(){r.clearRect(0,0,this.width,this.height)},destroy:function(){t.resize&&window.removeEventListener("resize",this.resize,!1),n&&t.container.removeChild(n),t={context:"2d",container:document.body,width:"auto",height:"auto",resize:!1},n=null,r=null,i=1}}};e.Canvas=t,typeof this.define=="function"&&this.define.amd&&this.define("Canvas",[],function(){return e.Canvas})}).call(this,function(){return this.fil=this.fil||{},this.fil}.call(this)),function(e){"use strict";var t=function(){return{active:!1,request:null,frame:0,step:function(e){},start:function(){if(!this.active){var e=this,t=function(){e.request=window.requestAnimationFrame(t),e.step(e.frame),e.frame++};typeof window.requestAnimationFrame=="undefined"&&(window.requestAnimationFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(e){window.setTimeout(e,1e3/60)}}()),typeof window.cancelAnimationFrame=="undefined"&&(window.cancelAnimationFrame=function(){return window.cancelAnimationFrame||window.webkitCancelAnimationFrame||window.mozCancelAnimationFrame||window.oCancelAnimationFrame||window.msCancelAnimationFrame}()),t(),this.active=!0}},stop:function(){this.active&&window.cancelAnimationFrame(this.request)}}};e.Frame=t,typeof this.define=="function"&&this.define.amd&&this.define("Frame",[],function(){return e.Frame})}.call(this,function(){return this.fil=this.fil||{},this.fil}.call(this)),function(e){"use strict";var t=function(){var e={element:document.body,preventDefault:!1,ratio:!1,forceTouch:!1,type:"object"},t=1,n=!1,r=!1,i=function(e,t){var n,r,i;return typeof t=="string"&&(n=e[t],t=e,e=n),typeof e!="function"?undefined:(r=Array.prototype.slice.call(arguments,2),i=function(){return e.apply(t,r.concat(Array.prototype.slice.call(arguments)))},i.guid=e.guid=e.guid||i.guid,i)};return{inputs:[],average:{},init:function(n){return typeof n!="undefined"&&this.options(n),typeof window.devicePixelRatio!="undefined"&&e.ratio&&(t=window.devicePixelRatio),r=e.forceTouch||this.supportsTouch(),this.bindAllInputs(),this},options:function(t){if(typeof t=="undefined")return e;for(var n in e)e.hasOwnProperty(n)&&typeof t[n]!="undefined"&&(e[n]=t[n])},setCoordinates:function(n){e.preventDefault&&n.preventDefault();var i=[],s=e.type==="object"?{x:0,y:0}:[0,0];if(r)for(var o=0;o<n.touches.length;o++)i[o]=e.type==="object"?{x:n.touches[o].pageX*t,y:n.touches[o].pageY*t}:[n.touches[o].pageX*t,n.touches[o].pageY*t],e.type==="object"?(s.x+=i[o].x,s.y+=i[o].y):(s[0]+=i[o][0],s[1]+=i[o][1]);else i[0]=e.type==="object"?{x:n.pageX*t,y:n.pageY*t}:[n.pageX*t,n.pageY*t],s=i[0];this.inputs=i,this.average=e.type==="object"?{x:Math.ceil(s.x/i.length),y:Math.ceil(s.y/i.length)}:[Math.ceil(s[0]/i.length),Math.ceil(s[1]/i.length)]},bindAllInputs:function(){n=!0,this.bindTapStart(),this.bindTapMove(),this.bindTapEnd()},unbindAllInputs:function(){n&&(this.unbindTapStart(),this.unbindTapMove(),this.unbindTapEnd()),n=!1},bindTapStart:function(){var t=this.getEventType("start");e.element.addEventListener(t,i(this.tapStart,this),!1)},tapStart:function(e){this.setCoordinates(e,"start"),this.ontapstart(this.average,this.inputs)},ontapstart:function(e,t){},unbindTapStart:function(){var t=this.getEventType("start");e.element.removeEventListener(t,i(this.tapStart,this),!1)},bindTapMove:function(){var t=this.getEventType("move");e.element.addEventListener(t,i(this.tapMove,this),!1)},tapMove:function(e){this.setCoordinates(e,"move"),this.ontapmove(this.average,this.inputs)},ontapmove:function(e,t){},unbindTapMove:function(){var t=this.getEventType("move");e.element.removeEventListener(t,i(this.tapMove,this),!1)},bindTapEnd:function(){var t=this.getEventType("end");e.element.addEventListener(t,i(this.tapEnd,this),!1)},tapEnd:function(e){this.setCoordinates(e,"end"),this.ontapend(this.average,this.inputs)},ontapend:function(e,t){},unbindTapEnd:function(){var t=this.getEventType("end");e.element.removeEventListener(t,i(this.tapEnd,this),!1)},getEventType:function(e){var t=r?"touch":"mouse";return e==="start"&&!r?e="down":e==="end"&&!r&&(e="up"),t+e},supportsTouch:function(){return"ontouchstart"in window||window.DocumentTouch&&document instanceof window.DocumentTouch},destroy:function(){this.unbindAllInputs()}}};e.Input=t,typeof this.define=="function"&&this.define.amd&&this.define("Input",[],function(){return e.Input})}.call(this,function(){return this.fil=this.fil||{},this.fil}.call(this)),function(e){"use strict";var t=function(){return{ctx:null,context:function(e){if(typeof e=="undefined"){if(this.ctx===null)throw"You must provide a [ctx] to draw on. Try setting it with context(ctx)";return this.ctx}return this.ctx=e,this.ctx},fill:function(e){var t=this.context();t.fillStyle=e},stroke:function(e,t){var n=this.context();e&&(n.strokeStyle=e),t&&(n.lineWidth=t)},line:function(e,t,n){n=n||"object";var r=this.context();r.beginPath(),n==="array"?(r.moveTo(e[0],e[1]),r.lineTo(t[0],t[1])):(r.moveTo(e.x,e.y),r.lineTo(t.x,t.y)),r.stroke()},circle:function(e,t,n){n=n||"object";var r=this.context();r.beginPath(),n==="array"?r.arc(e[0],e[1],t,0,Math.PI*2,!0):r.arc(e.x,e.y,t,0,Math.PI*2,!0),r.closePath(),r.fill()}}};e.Pen=t,typeof this.define=="function"&&this.define.amd&&this.define("Pen",[],function(){return e.Pen})}.call(this,function(){return this.fil=this.fil||{},this.fil}.call(this)),function(e){"use strict";var t=function(){var e=this;return this._contains=function(t,n){return!!~(""+t).indexOf(n)},this._prefixed=function(e,t){var n="Webkit Moz O ms".split(" "),r=e.charAt(0).toUpperCase()+e.slice(1),i=(e+" "+n.join(r+" ")+r).split(" "),s,o;for(s in i){o=i[s];if(!this._contains(o,"-")&&t[o]!==undefined)return o}return!1},{transform:function(t,n){typeof t=="undefined"&&(t=this.el),this.el=t;var r,i="";if(n instanceof Array)for(var s=0;s<n.length;s++)i+=n[s].property+"("+n[s].value+") ";else for(r in n)i+=r+"("+n[r]+") ";t.style[e._prefixed("transform",t.style)]=i},transformOrigin:function(t,n,r){typeof t=="undefined"&&(t=this.el),this.el=t,t.style[e._prefixed("transformOrigin",t.style)]=n+" "+r}}};e.Transformer=t,typeof this.define=="function"&&this.define.amd&&this.define("Transformer",[],function(){return e.Transformer})}.call(this,function(){return this.fil=this.fil||{},this.fil}.call(this));

var rellax = new Rellax('.rellax', {
	center: true
});
if(screen.width < 576 && jQuery('.rellax').length !=0) {
	rellax.destroy();
}

(function(jQuery) {
	jQuery('.fancy-play').fancybox({
	  youtube : {
	    controls : 0,
	    showinfo : 0
	  },
	  vimeo : {
	    color : 'fff',
	    autoplay: 1,
	    autopause: 0,
	    //controls : 0,
	  }
	});
})(jQuery.noConflict());

(function(jQuery) {
	jQuery('body').on('click', '.plugins>li>a', function(event){
		event.preventDefault();
		jQuery('.plugins>li>a.active').removeClass('active');
		jQuery(this).addClass('active');
	});
	jQuery('body').on('click', '.plugins>li>a.active', function(event){
		event.preventDefault();
		jQuery(this).removeClass('active');
	});
	jQuery('body').on('click', '.plugins .close', function(event){
		event.preventDefault();
		jQuery('.plugins>li>a.active').removeClass('active');
	});
})(jQuery.noConflict());


(function(jQuery) {
  jQuery('.accordion .ac-t').click(function(event) {
    event.preventDefault();
    if(jQuery(this).parent().hasClass('active')){
    	jQuery(this).parent().removeClass('active');
    }else{
    	jQuery(this).parent().addClass('active');
    }
  });
})(jQuery.noConflict());

(function(jQuery) {
	jQuery('body').on('click', '.audio-player .control', function(e){
		e.preventDefault();
		if(jQuery(this).parent().parent().find('audio').length){
			console.log('curent_audio');
		}else{
			jQuery('#audio').remove();
			jQuery('.wave-holder').remove();
			jQuery('#range').remove();
			jQuery('.control.play').removeClass('play');

			console.log('not_curent_audio');

			audio_src = jQuery(this).parent().parent().attr('data-src');
			jQuery(this).parent().parent().append('<audio id="audio" controls> <source src="'+audio_src+'" type="audio/mpeg"> </audio>');
			jQuery(this).parent().find('.progress').append('<div class="wave-holder"><div class="wave"></div></div><input id="range" type="range" min="0" max="100" name="" value="0">');

		}
		audio = document.getElementById('audio');
		if(jQuery(this).hasClass('play')){
			audio.pause();
			jQuery(this).toggleClass('play');
			jQuery('#element2').parent().addClass('element-holder');
		}else{
			audio.play();
			jQuery(this).toggleClass('play');
			jQuery('#element2').parent().removeClass('element-holder');
		}
		console.log(audio.currentTime);
		console.log(audio.duration);

		jQuery('body').on('change', '#range', function(){
			console.log(jQuery(this).val());
			audio = document.getElementById('audio');
			percent = audio.duration/100;
			audio.currentTime = jQuery(this).val()*percent;
			jQuery('.wave-holder').css('width', jQuery(this).val()+'%');
		})
		audio.ontimeupdate = function() {timeupdate()};
		function timeupdate() {
		    console.log(audio.currentTime);
		    jQuery('.wave-holder').css('width', audio.currentTime/audio.duration*100+'%');
		}

	})
	
})(jQuery.noConflict());


(function(jQuery) {

	if(screen.width > 992 && jQuery('.section-flow-top').length !=0) { 
		var waypoint_1 = new Waypoint({
		  element: jQuery('.section-flow-top'),
		  handler: function(direction) {
		    if(direction=='up'){
		    	jQuery('.fix1').removeClass('fixed');
		    }
		    if(direction=='down'){
		    	jQuery( ".fix1" ).each(function() {
				  width = jQuery(this).parent().width();
				  jQuery('.fix1').width(width);
				  jQuery('.fix1').addClass('fixed');
				});
		    }
		  },
		  offset: '0%'
		})
		var waypoint_2 = new Waypoint({
		  element: jQuery('.section-flow-bottom'),
		  handler: function(direction) {
		    if(direction=='up'){
		    	jQuery('.fix1').addClass('fixed');
			    jQuery('.fix1').removeClass('absolute');
		    }
		    if(direction=='down'){
		    	jQuery('.fix1').removeClass('fixed');
			    jQuery('.fix1').addClass('absolute');
		    }
		  },
		  offset: '100%'
		})
		var waypoint_3 = new Waypoint({
		  element: jQuery('.section-success-top'),
		  handler: function(direction) {
		    if(direction=='up'){
		    	jQuery('.fix2').removeClass('fixed');
		    }
		    if(direction=='down'){
		    	jQuery( ".fix2" ).each(function() {
				  width = jQuery(this).parent().width();
				  jQuery('.fix2').width(width);
				  jQuery('.fix2').addClass('fixed');
				});
		    }
		  },
		  offset: '0%'
		})
		var waypoint_4 = new Waypoint({
		  element: jQuery('.section-success-bottom'),
		  handler: function(direction) {
		    if(direction=='up'){
		    	jQuery('.fix2').addClass('fixed');
			    jQuery('.fix2').removeClass('absolute');
		    }
		    if(direction=='down'){
		    	jQuery('.fix2').removeClass('fixed');
			    jQuery('.fix2').addClass('absolute');
		    }
		  },
		  offset: '100%'
		})

	}
	if(jQuery('.simpletext-section--waipoint').length !=0) { 
		var waypoint_fix_buy = new Waypoint({
		  element: jQuery('.simpletext-section--waipoint'),
		  handler: function(direction) {
		    //console.log('Section-bottom in direction '+direction);
		    if(direction=='up'){
		    	//console.log('up');
		    	jQuery('.fixed-buy').removeClass('open');
		    }
		    if(direction=='down'){
		    	//console.log('down');
		    	jQuery('.fixed-buy').addClass('open');
		    }
		  },
		  offset: '100%'
		})
	}
	if(jQuery('.bottom-section--waipoint').length !=0) { 
		var waypoint_fix_buy1 = new Waypoint({
		  element: jQuery('.bottom-section--waipoint'),
		  handler: function(direction) {
		    console.log('Section-bottom in direction '+direction);
		    if(direction=='up'){
		    	console.log('up');
		    	jQuery('.fixed-buy').addClass('open');
		    }
		    if(direction=='down'){
		    	console.log('down');
		    	jQuery('.fixed-buy').removeClass('open');
		    }
		  },
		  offset: '100%'
		})
	}
	if(jQuery('.white--waipoint').length !=0) { 
		jQuery('.white--waipoint').each(function(index) {
			var inview = new Waypoint.Inview({
			  element: jQuery(this)[0],
			  enter: function(direction) {
			    //console.log('Enter triggered with direction ' + direction)
			    if(direction=='up'){
			    	jQuery('.main-header').addClass('black');
			    	jQuery(this.element).addClass('inview');

			    }else{
			    	jQuery(this.element).addClass('inview');
			    }
			  },
			  entered: function(direction) {
			    //console.log('Entered triggered with direction ' + direction)
			    if(direction=='up'){
			    	if(!jQuery(this.element).siblings().hasClass('inview')){
			    		jQuery('.main-header').removeClass('black');
			    	}
			    }else{}
			  },
			  exit: function(direction) {
			    //console.log('Exit triggered with direction ' + direction)
			    if(direction=='up'){}else{
			    	jQuery('.main-header').addClass('black');
			    }
			  },
			  exited: function(direction) {
			    //console.log('Exited triggered with direction ' + direction)
			     if(direction=='up'){
			     	jQuery(this.element).removeClass('inview');
			    }else{
			    	jQuery('.main-header').removeClass('black');
			    	jQuery(this.element).removeClass('inview');
			    }
			  },
			  offset: '100%'
			});
		});
	}


	if(jQuery('.section-flow .text-item').length !=0) { 

		jQuery('.section-flow .text-item').each(function(index) {

			var waypoint_fix_buy = new Waypoint({
			  element: jQuery(this)[0],
			  handler: function(direction) {
			    //console.log('Section-bottom in direction '+direction);
			    if(direction=='up'){
			    	//console.log('up');
			    	jQuery(this.element).removeClass('open');
			    	jQuery('.element-holder').removeClass('animate'+index);
			    }
			    if(direction=='down'){
			    	//console.log('down');
			    	jQuery(this.element).addClass('open');
			    	jQuery('.element-holder').addClass('animate'+index);
			    }
			  },
			  offset: '50%'
			})
		});
		jQuery('.section-flow .text-item').on('change', function(){
			console.log('123');
		});
	}
})(jQuery.noConflict());



/*
(function(jQuery) {

if(jQuery('#canvas').length !=0) { 
	var cvs = new fil.Canvas(),
	    pen = new fil.Pen(),
	    frame = new fil.Frame(),
	    el = document.getElementById('canvas'); // The <canvas> element container.

	// Canvas requires initialization, but all settings are optional.
	cvs.init({
	  container : el,
	  ratio : false
	});

	// Set some constant values.
	var ctx = cvs.context(),
	    WIDTH = cvs.width,
	    HEIGHT = cvs.height;

	// Pen does not require initialization, but it does require a canvas context.
	pen.context(ctx);
	pen.fill("rgba(0,255,255,0.00)");

	var Loader = function () {
	  return {
	    position : [ WIDTH / 2, HEIGHT / 2 ],
	    size : 0,
	    dots : 100,
	    update : function () {
	      
	      this.size = 0.25 * ((HEIGHT + WIDTH) - Math.abs(HEIGHT - WIDTH));
	      this.size -= 0; // padding
	      
	    },
	    renderCircle : function (pos, size, color) {
	      ctx.save();
	      ctx.beginPath();
	      if (color) {
	        ctx.fillStyle = color;
	      }
	      ctx.arc(pos[0], pos[1], size, 0, Math.PI * 2, true);
	      ctx.closePath();
	      ctx.fill();
	      ctx.restore();
	    },
	    render : function (f) {
	      
	      this.renderCircle(this.position, this.size);

	      var slice = 2 * Math.PI / this.dots,
	          angle = 0,
	          pos = [];

	      for (var i = 0; i < this.dots; i++) {
	        
	        // Rotate angle
	        angle = slice * i + (f * 0.001);
	        
	        // Position math.
	        pos = [this.position[0] + (Math.sin(f * 0.00005 * i) * this.size) * Math.cos(angle),
	              this.position[1] + (Math.sin(f * 0.0005 * i) * this.size) * Math.sin(angle)];
	        
	        // Actually renders the dot.
	        this.renderCircle(pos, 1, "rgba(0,255,255,1)");
	      }

	      slice = angle = pos = null;
	      
	    }
	  }
	};

	var loader = new Loader();

	loader.update();

	frame.start();
	frame.step = function (f) { 
	  ctx.save();
	  ctx.fillStyle = "#0e0e0e";
	  ctx.fillRect(0,0,WIDTH,HEIGHT);
	  ctx.restore();
	  loader.render(f);
	}
}
})(jQuery.noConflict());
(function(jQuery) {
if(jQuery('#canvas').length !=0) { 
	var cvs = new fil.Canvas(),
	    pen = new fil.Pen(),
	    frame = new fil.Frame(),
	    el = document.getElementById('canvas2'); // The <canvas> element container.

	// Canvas requires initialization, but all settings are optional.
	cvs.init({
	  container : el,
	  ratio : false
	});

	// Set some constant values.
	var ctx = cvs.context(),
	    WIDTH = cvs.width,
	    HEIGHT = cvs.height;

	// Pen does not require initialization, but it does require a canvas context.
	pen.context(ctx);
	pen.fill("rgba(0,255,255,0.00)");

	var Loader = function () {
	  return {
	    position : [ WIDTH / 2, HEIGHT / 2 ],
	    size : 0,
	    dots : 20,
	    update : function () {
	      
	      this.size = 0.25 * ((HEIGHT + WIDTH) - Math.abs(HEIGHT - WIDTH));
	      this.size -= 0; // padding
	      
	    },
	    renderCircle : function (pos, size, color) {
	      ctx.save();
	      ctx.beginPath();
	      if (color) {
	        ctx.fillStyle = color;
	      }
	      ctx.arc(pos[0], pos[1], size, 0, Math.PI * 2, true);
	      ctx.closePath();
	      ctx.fill();
	      ctx.restore();
	    },
	    render : function (f) {
	      
	      this.renderCircle(this.position, this.size);

	      var slice = 2 * Math.PI / this.dots,
	          angle = 0,
	          pos = [];

	      for (var i = 0; i < this.dots; i++) {
	        
	        // Rotate angle
	        angle = slice * i + (f * 0.001);
	        
	        // Position math.
	        pos = [this.position[0] + (Math.sin(f * 0.00005 * i) * this.size) * Math.cos(angle),
	              this.position[1] + (Math.sin(f * 0.0005 * i) * this.size) * Math.sin(angle)];
	        
	        // Actually renders the dot.
	        this.renderCircle(pos, 1, "rgba(0,255,255,1)");
	      }

	      slice = angle = pos = null;
	      
	    }
	  }
	};

	var loader = new Loader();

	loader.update();

	frame.start();
	frame.step = function (f) { 
	  ctx.save();
	  ctx.fillStyle = "transparent";
	  ctx.fillRect(0,0,WIDTH,HEIGHT);
	  ctx.restore();
	  loader.render(f);
	}
}
})(jQuery.noConflict());

*/

(function(jQuery) {
	jQuery('body').on('click','.mobile-nav-trigger',function(event) {
		event.preventDefault();
		jQuery(this).toggleClass('active');
		jQuery('.main-nav').toggleClass('active');
	});
	jQuery('body').on('click','.header-center.active a',function(event) {
		event.preventDefault();
		jQuery('.mobile-nav-trigger').toggleClass('active');
		jQuery('.main-nav').toggleClass('active');
		//console.log('click');
	});
})(jQuery.noConflict());

function open_popup(popup_class){
	jQuery('body').css('overflow', 'hidden');
	console.log('click'+popup_class)
	jQuery('.'+popup_class).slideDown('fast').addClass('opened');
	//bLazy.load(jQuery('.'+popup_class+' img'), true);
	setTimeout(function(){
		jQuery('.'+popup_class).find('.popup-content').css({opacity: 1});
	}, 200);
}
(function(jQuery) {
	jQuery('body').on('click', '.popup-trigger', function(event){
		event.preventDefault();
		popup_class = jQuery(this).attr('popup');
		open_popup(popup_class);
	});
	jQuery('body').on('click', '.close-popup', function(event){
		event.preventDefault();
		jQuery('body').css('overflow', 'visible');
		jQuery('.popup.opened').find('.popup-content').css({opacity: 0});
		jQuery('.popup.opened').slideUp('fast').removeClass('opened');
	});
})(jQuery.noConflict());


(function(jQuery) {
	jQuery('body').on('click', '.cart', function(event){
		event.preventDefault();
		if(jQuery(this).hasClass('active')){
			jQuery('body').css('overflow', 'visible');
			jQuery('.fix-cart-holder').hide('fast');
			jQuery(this).removeClass('active');
		}else{
			jQuery('body').css('overflow', 'hidden');
			jQuery('.fix-cart-holder').show('fast');
			jQuery(this).addClass('active');
		}
	});
})(jQuery.noConflict());







(function(jQuery) {
/*
if(jQuery('#who_anim_1').length !=0) { 
	var animData = {
	  container: who_anim_1, 
	  renderer: 'svg',
	  loop: true,
	  autoplay: true,
	  speed: 1,
	  path: 'data_4.json' 
	};
	anim_who1 = bodymovin.loadAnimation(animData);
	jQuery(document).ready(function() {
		anim_who1.setSpeed(1.2);
	});
};

if(jQuery('#who_anim_2').length !=0) { 
	var animData = {
	  container: who_anim_2, 
	  renderer: 'svg',
	  loop: true,
	  autoplay: true,
	  speed: 0.5,
	  path: 'data_4.json' 
	};
	anim_who2 = bodymovin.loadAnimation(animData);
	jQuery(document).ready(function() {
		anim_who2.setSpeed(1.2);
	});
};

if(jQuery('#who_anim_3').length !=0) { 
	var animData = {
	  container: who_anim_3, 
	  renderer: 'svg',
	  loop: true,
	  autoplay: true,
	  speed: 0.2,
	  path: 'data_4.json' 
	};
	anim_who3 = bodymovin.loadAnimation(animData);
	jQuery(document).ready(function() {
		anim_who3.setSpeed(1.2);
	});
};

if(jQuery('#element').length !=0) { 
	var animData = {
	  container: element, 
	  renderer: 'svg',
	  loop: true,
	  autoplay: true,
	  speed: 1,
	  path: 'data_4.json' 
	};
	anim = bodymovin.loadAnimation(animData);

	jQuery(document).ready(function() {
		anim.setSpeed(1);
	});
};

if(jQuery('#element2').length !=0) { 
	var animData = {
	  container: element2, 
	  renderer: 'svg',
	  loop: true,
	  autoplay: true,
	  speed: 1,
	  path: 'data_4.json' 
	};
	anim = bodymovin.loadAnimation(animData);
	jQuery(document).ready(function() {
		anim.setSpeed(1);
	});
};


if(jQuery('#loop').length !=0) { 
	var animData = {
	  container: loop, 
	  renderer: 'svg',
	  loop: true,
	  autoplay: true,
	  speed: 1,
	  path: 'icon_loop.json' 
	};
	anim1 = bodymovin.loadAnimation(animData);
	jQuery(document).ready(function() {
		anim1.setSpeed(0.4);
	});
};


if(jQuery('#wave').length !=0) { 
	var animData = {
	  container: wave, 
	  renderer: 'svg',
	  loop: true,
	  autoplay: true,
	  speed: 1,
	  path: 'icon_wave.json' 
	};
	anim2 = bodymovin.loadAnimation(animData);
	jQuery(document).ready(function() {
		anim2.setSpeed(1);
	});
};
*/

var anim_param = {
    anim: [
        { anim_id: "#who_anim_1", 	anim_url: "data_4.json", 	anim_speed: 1.2},
        { anim_id: "#who_anim_2", 	anim_url: "data_4.json", 	anim_speed: 1.2},
        { anim_id: "#who_anim_3",	anim_url: "data_4.json", 	anim_speed: 1.2},
        { anim_id: "#element", 		anim_url: "data_4.json", 	anim_speed: 1},
        { anim_id: "#element2",		anim_url: "data_4.json", 	anim_speed: 1},
        { anim_id: "#loop",			anim_url: "icon_loop.json", anim_speed: 0.4},
        { anim_id: "#wave",			anim_url: "icon_wave.json", anim_speed: 1},
        { anim_id: "#icon_3",		anim_url: "icon_3.json", 	anim_speed: 1},
        { anim_id: "#icon_4",		anim_url: "icon_4.json", 	anim_speed: 1},
    ]
};

for(var i=0; i < anim_param.anim.length; i++){
    animation_start(anim_param.anim[i].anim_id, anim_param.anim[i].anim_url, anim_param.anim[i].anim_speed);
    //console.log(anim_param.anim[i].anim_id, anim_param.anim[i].anim_url, anim_param.anim[i].anim_speed);
}

function animation_start(anim_id, anim_url, anim_speed){
	if(jQuery(anim_id).length !=0) {
	//console.log(anim_id, anim_url, anim_speed); 
		var animData = {
		  container: jQuery(anim_id)[0], 
		  renderer: 'svg',
		  loop: true,
		  autoplay: true,
		  speed: 1,
		  path: anim_url 
		};
		anim = bodymovin.loadAnimation(animData);
		
			anim.setSpeed(anim_speed);
		
	};
}


//console.log(anim.getDuration());

})(jQuery.noConflict());
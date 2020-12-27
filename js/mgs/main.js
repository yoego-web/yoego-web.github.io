
var app = {
	init: function(){
		this.setClass();
		$(window).scroll(this.addCallbacks);

		$('.wrap-picture-readmore').on('click', function(){
			$(this).parent().toggleClass('wrap-picture--select');
		});

		new ActiveMenuMobile('.switch-menu-mobile','body','open-nav-mobile');

		$('.flip').on('click', function(e){ $(this).toggleClass('flip-turned'); });
		// activar el mousemove 
		var hl = new ShowPositionScreen('#header','.leaf');
		app.utils.lineLimitX = hl.lineLimitX;
		// leaf move
		for (var i=0,l=$('.leaf').length;i<l;i++) {
			app.utils['leaf'+i] = new Leaf('.leaf:eq('+i+')');
		};
	},
	setClass: function(){
		new SetClass('.wrapper-content-header','charged',1500);
		new SetClass('footer','charged',3500);
	},
	addCallbacks: function(){
		new Parallax('.title-logo', 8, 30);
		new Parallax('.wrapper-leaf:eq(0)', 10, 10);
		new Parallax('.wrapper-leaf:eq(1)', 8, 28);
		new Parallax('.wrapper-leaf:eq(2)', 9, 46);
		new Parallax('.wrapper-leaf:eq(3)', 10, 58);
		new Sticky('#nav','header','is-sticky');
		if(Services.getScroll() > ($('#gallery').offset().top) - 300){
			$('#gallery').addClass('page-item--select');
		}
		if(Services.getScroll() > ($('#periscope').offset().top) - 300){
			$('#periscope').addClass('page-item--select');
		}
		if(Services.getScroll() > ($('#episodes').offset().top) - 300){
			$('#episodes').addClass('page-item--select');
		}
		if(Services.getScroll() > ($('#gallery3d').offset().top) - 300){
			$('#gallery3d').addClass('page-item--select');
		} 

		$('.periscope-data').text( 
			Services.fixNum(Services.getScroll() - $('#periscope').offset().top, 2) +'%' 
		);
	},
	utils: {}
};

var Services = (function(){
	var wnd = $(window);
	var module = {};
	module.getScroll = function(){
		return wnd.scrollTop();
	};

	module.fixNum = function(n, fixed){
		return Math.abs(n).toFixed(fixed);
	};

	return{
		getScroll: module.getScroll,
		fixNum: module.fixNum
	}
})();

var Parallax = function(ele, velocity, topLimit){
	this.ele = $(ele);
	this.scroll = Services.getScroll;
	this.velocity = velocity;
	//este dato hara que nuestro eleemento tenga un limite
	//es la altura inicial de nuestro elemento "top"
	this.topLimit = topLimit; 
	this.constructor();
};

Parallax.prototype = {
	init: function(){
		this.setVelocity();
	},
	setVelocity: function(){ 
		this.ele.css({'top': this.topLimit + (this.scroll() / this.velocity)+'%'});
	},
	constructor: function(){ this.init(); }
};

var SetClass = function(ele, clas, delay){
	this.ele = ele;
	this.clas = clas;
	this.delay = delay || undefined;
	this.constructor();
};

SetClass.prototype = {
	init: function(){
		this.setClass();
	},
	setClass: function(){
		var _this = this;
		if(_this.delay != undefined){
			setTimeout(function(){ 
				$(_this.ele).addClass(_this.clas);
			}, _this.delay);
		}else{ $(_this.ele).addClass(_this.clas); }
	},
	constructor: function(){ this.init(); }
};

var Sticky = function(ele, eleHeight, cls){
	this.ele = $(ele);
	this.eleHeight = $(eleHeight).height();
	this.cls = cls;
	this.constructor();
};

//sticky nav
Sticky.prototype = {
	init: function(){
		this.setBehaviour();
	},
	setBehaviour: function(){
		if(Services.getScroll() > this.eleHeight){
			!this.ele.hasClass(this.cls) ? this.ele.addClass(this.cls) : null;
		}else { 
			this.ele.removeClass(this.cls);
		}
	},
	constructor: function(){ this.init(); }
};

//active Nav-Mobile
var ActiveMenuMobile = function(ele, targetElement, cls){
	this.ele = $(ele);
	this.target = $(targetElement);
	this.cls = cls;
	this.constructor();
};

ActiveMenuMobile.prototype = {
	init: function(){
		this.activeMenu();
	},
	activeMenu: function(){
		var _this = this;
		this.ele.on('click', function(e){
			_this.target.toggleClass(_this.cls);
		});
	},
	constructor: function(){ this.init(); }
};

//Move Leaf Mover Hoja
var ShowPositionScreen = function(ele, eleListener){
	this.ele = $(ele);
	this.eleListener = $(eleListener);
	this.lineLimitX = null;
	this.constructor();
};

ShowPositionScreen.prototype = {
	init: function(){
		this.setLineLimit();
		this.setMousemove();
		this.setCustomEvent();
		this.setResize();
	},
	setLineLimit: function(){
		this.lineLimitX = Math.round(this.ele.width()/2);
	},
	setMousemove: function(){
		var _this = this;
		this.ele.on('mousemove', function(e){
			// "limitKIneX" linea q esta ubicada en el centro del screbb
			// e.pageX > _this.lineLimitX ? console.log('mayor') : console.log('menor');
			$(this).trigger('moveheader',{lx: e.pageX});
		});
	},
	setCustomEvent: function(){
		var _this = this;
		this.ele.on('moveheader', function(e, data){ 
			_this.eleListener.trigger('movemouse',{lx:data.lx});
		});
	},
	setResize: function(){ 
		var _this = this;
		Response.resize(function(){ _this.setLineLimit(); });
	},
	constructor: function(){ this.init(); }
};

var Leaf = function(ele){
	this.ele = $(ele);
	this.offset = {top:this.ele.offset().top, left:this.ele.offset().left};
	this.constructor();
};

Leaf.prototype = {
	init: function(){
		this.setPosScreen();
		this.listenMove();
	},
	setPosScreen: function(left, top){
		left = left || this.offset.left;
		top =  top || this.offset.top;
		this.ele.css({top: top, left:left});
	},
	listenMove: function(){
		var _this = this;
		this.ele.on('movemouse', function(e, data){
			app.utils.lineLimitX > data.lx ? 
				_this.ele.css('left', ++_this.offset.left) : _this.ele.css('left', --_this.offset.left);
		});
	},
	constructor: function(){ this.init(); }
};

(function(R, $){
	$(document).ready( app.init() );
})(Response, jQuery);
/*
	@mainWrap : element, elemento contenedor del intro
	@layers : element, elementos que seran las capas de nuestra animacion
	@layLoading : element, elemento q contenedor de nuestro 'loading...'
	@objSlider : obj, objeto plugin del Slider
	@loadingTime : number, tiempo q durara nuestro 
*/

function Intro(mainWrap, layers, layLoading, objSlider, loadingTime){
	this.mainWrap = $(mainWrap);
	this.layers = $('#intro-wrapper '+layers);
	this.layLoading = $(layLoading);
	this.lengthtLayers = this.layers.length;;
	this.time = 1500;
	this.loadingTime = loadingTime ? loadingTime : 5000;
	this.objSlider = {obj: objSlider};
	this.constructor();
};

Intro.prototype = {
	init: function(){ 
		this.setEventIntro();
		this.setDestroy();
		this.setLoading();
	},
	setIntro: function(num){ 
		var self = this;
		setTimeout(function(){
			if(self.lengthtLayers > num){ 
				self.layers.eq(num).addClass('is-show');
				self.showLegends(num);
				if((self.lengthtLayers - 1) == num) {
					// self.layers.eq(num).addClass('last-layer');
					// una vez finalizado el intro finalizamos la intro
					self.mainWrap.trigger('finish');
				}
				self.setIntro(++num); 
			}
		}, self.time);
	},
	setEventIntro: function(){
		var self = this;
		this.mainWrap.on('runintro', function(event){
			self.setIntro(0);
		});
	},
	setLoading: function(){
		var self = this;
		setTimeout(function(){
			self.layLoading.addClass('is-removed');
			self.mainWrap.trigger('runintro');
			new self.objSlider.obj('.swiper-container'); 
		}, self.loadingTime);
	},
	setDestroy: function(){
		var self = this;
		this.mainWrap.on('finish', function(event){
			setTimeout(function(){
				self.mainWrap.addClass('is-removed');
			}, 1500);
			setTimeout(function(){
				self.mainWrap.remove();
			}, 3000);
		});
	},
	showLegends: function(nro){ 
		3 == nro ? 
			this.layers.eq(this.lengthtLayers - 1).addClass('is-show last-layer') : null;
	},
	constructor: function(){
		this.init();
	}
};

/* SLIDER */
function Slider(ele, optionsCustom){
	this.ele = ele;
	this.swiper = null;
	this.options = null;
	this.optionsCustom = optionsCustom;
	this.defaults = {
		speed: 1000,
		autoplay: {
	        delay: 4000,
	        disableOnInteraction: false
	    },
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev'
      	}
	}
	this.constructor();
};

Slider.prototype = {
	init: function(){
		this.swiper = new Swiper(this.ele, this[this.setOptions()]);
	},
	setOptions: function(){
		this.optionsCustom != null ? 
			this.options = $.extend(this.defaults, this.optionsCustom) : null;
		return this.options != null ? 'options' : 'defaults';
	},
	constructor: function(){ this.init(); }
};

// BTN MENU NAV
function Menu_mobile(btnTgl, btnSubLinks){
	this.btnTgl = btnTgl;
	this.btnSubLinks = btnSubLinks;

	this.constructor();
};

Menu_mobile.prototype = {
	init: function(){
		this.setBtnTglBehavior();
		this.setBtnSubLinksClick();
	},
	setBtnTglBehavior(){
		this.btnTgl.on('click', function(){
			$('body').toggleClass('is--show-menu');
		});
	},
	setBtnSubLinksClick: function(){
		var self = this;
		this.btnSubLinks.on('click', function(){
			$(this).next('.nav-mobile__sub-links').toggleClass('is--show');
		});
	},
	constructor: function(){
		this.init();
	}
};

// Stylo a search worpress
function Search_WP_custom(wrapper){
	this.wrapper = $(wrapper);
	this.targetEleAddBtn = this.wrapper.find('form > label');
	this.tmpBtnSearch = '<button type="submit" class="btn btn-success btn-large">'+
							'<i class="icon-search"></i>'+
						'</button>';
	this.constructor();
};

Search_WP_custom.prototype = {
	init: function(){
		this.addBtnSearch();
	},
	addBtnSearch: function(){
		this.targetEleAddBtn.append(this.tmpBtnSearch);
	},
	constructor: function(){ this.init(); }
};

$(function(){

	var WDW_STORAGE = {
		'openWdwMenu': null,
		'leftLastPos': null,
		'submenuIsHover': false
	};

	/* ## INTRO ## */
	var intro = new Intro('#intro-wrapper', '.intro-layer', '#intro-loading', Slider, 2000);

	/* ## NAVIGATOR FIXED ## */
	$(window).scroll(function(){
		var wdwTop = $(this).scrollTop();
		var topEl = $('#presentation').offset().top;
		var nav = $('.navigator');

		if(wdwTop >= topEl){
			 !nav.hasClass('is--fixed') ? nav.addClass('is--fixed') : null;
		}else{
			$('.navigator').removeClass('is--fixed');
		}
	});

	/* ## IMAGES RESPONSIVE ## */
	/*
		metodo que recupera el nro (data-hgt 'height') dicho nro dara 
		un alto a nuestra elemento el cual son contenedores de imagen
	*/
	function setHeightDinamicImages(){
		$('.image-wrapper').each(function(i){
			var wdtEl = $(this).width();
			var hgtEl = parseInt($(this).data('hgt'));
			$(this).height( getHeight(wdtEl, hgtEl) );
		});

		function getHeight(wdt, hgt){
			return Math.round((wdt * hgt) / 100);
		}
	};

	setHeightDinamicImages();	

	// abrir sub menus
	$('[data-open-wdw]').hover(
		function(){
			var targetEle = $(this).data('wdw-target');
			var targetLeft = $(this).offset().left - Math.round($(this).width()/2);
			WDW_STORAGE.openWdwMenu = targetEle;
			WDW_STORAGE.leftLastPos = targetLeft;

			$('[data-wdw="'+targetEle+'"]').css('left',targetLeft).addClass('is--open');
		}, function(){
			setTimeout(function(){  
				!WDW_STORAGE.submenuIsHover ? $('body').trigger('closesubmenus') : null;
			}, 250);
		}
	);

	$('.navigator__sub-links').hover(
		function(event) {
			WDW_STORAGE.submenuIsHover = true;
			$('[data-wdw="'+WDW_STORAGE.openWdwMenu+'"]')
				.css('left',WDW_STORAGE.leftLastPos).addClass('is--open');
		},
		function(){
			WDW_STORAGE.submenuIsHover = false;
			$('body').trigger('closesubmenus');
		}
	);

	$('body').on('closesubmenus', function(){
 
		var menuTarget = WDW_STORAGE.openWdwMenu != null ? 
			$('[data-wdw="'+WDW_STORAGE.openWdwMenu+'"]') : null;

		if(menuTarget != null){
			menuTarget.hasClass('is--open') ? (function() { 
				menuTarget.removeClass('is--open');
				WDW_STORAGE.openWdwMenu = null;
			})() : null;
		}
	});
	
	$('body').click(function(event) {
		$(this).trigger('closesubmenus');
	});

	// TOP SCROLL
	$('[data-topscroll]').on('click', function(event) {
		event.preventDefault();
		event.stopPropagation();
		var topscroll = $($(this).data('topscroll')).offset().top;
		// Si estuviera "menu mobile" abierto lo cerramos
		$('body').hasClass('is--show-menu') ? $('body').toggleClass('is--show-menu') : null;
		$('html, body').animate({
            scrollTop: topscroll
        }, 1000);
		return false;
	});

	// MENU MOBILE
	var menuMobile = new Menu_mobile($('[data-toggle-btn-nav]'), $('[data-menu-sublink]') );

	// Dar estylos a nuestro buscador wordpress
	var customFormSearch = new Search_WP_custom('.nav-mobile');

});
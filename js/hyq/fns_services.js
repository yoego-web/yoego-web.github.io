
function Accordion(ele, item, itemLink){
	this.ele = $(ele);
	this.item = item;
	this.itemLink = $(ele+' '+itemLink);
	this.constructor();
};

Accordion.prototype = {
	init: function(){
		this.setEvents();
	},
	setEvents: function(){
		var self = this;
		this.itemLink.on('click', function(e){ 
			var parent = $(this).parent(self.item);
			var parentAccordion = parent.data('accordion-parent');
			self.closeOpenLinks(parentAccordion, parent);
		});
	},
	closeOpenLinks: function(accordionParent, eleItem){
		$('[data-accordion-id="'+accordionParent+'"] '+this.item).each(function(index, el) {
			$(this).removeClass('is--active');
		}).promise().done(function(){
			eleItem.addClass('is--active');
		});
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

	/* ## NAVIGATOR FIXED ## */
	$(window).scroll(function(){
		var wdwTop = $(this).scrollTop();
		var topEl = $('#page-content-generic').offset().top;
		var nav = $('.navigator');

		if(wdwTop >= topEl){
			 !nav.hasClass('is--fixed') ? nav.addClass('is--fixed') : null;
		}else{
			$('.navigator').removeClass('is--fixed');
		}
	});

	/*## ACCORDION ##*/
	var accordions = new Accordion('[data-hq-accordion]', '.hq-accordion__item', '.hq-accordion__link');

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

		$('img[data-img-hgt]').each(function(index, el) {
			var wdtParent = $(this).parent().width();
			var hgtData = parseInt($(this).data('img-hgt'));
			$(this).height( getHeight(wdtParent, hgtData) );
		});

		function getHeight(wdt, hgt){
			return Math.round((wdt * hgt) / 100);
		};

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

	// cierra sub menus 
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
		// $(window).scrollTop(topscroll);
		$('html, body').animate({
            scrollTop: topscroll
        }, 1000);
		return false;
	});

	// set height "services types"
	function setHeight(){
		$('.services-types__content').each(function(index, el) {
			var l = $(this).find('p').size();
			var firstP = $(this).find('p').eq(0);
			l > 1 ? $(this).css('max-height', firstP.height()) : $(this).parent().addClass('no--buttons');
		});
	};

	setHeight();

	// "click" LEER MAS
	$('.services-types').on('click', function(e){ 
		$(e.target).hasClass('btn-link') ? $(this).toggleClass('is--show') : null;
	});

	// MENU MOBILE
	var menuMobile = new Menu_mobile($('[data-toggle-btn-nav]'), $('[data-menu-sublink]') );

	// Dar estylos a nuestro buscador wordpress
	var customFormSearch = new Search_WP_custom('.nav-mobile');

});
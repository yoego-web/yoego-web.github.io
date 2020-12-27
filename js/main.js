localStorage.setItem('currentItem', null);

$(function(){

	if( $('.lazy').length ){
		$('.lazy').Lazy({
			afterLoad: function(ele){
				watchResizeBackColor();
			}
		});
	}

	var dataWebs = [
		{
			"name": "Metal Gear Solid",
			"webtype": "Fan Page",
			"thematic": "Videojuegos PS3",
			"cms": "WordPress",
			"front": ["HTML5", "CSS3", "Jvascript"],
			"frameworks": ["jQuery","Bootstrap","SliderJS"],
			"desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
		},
		{
			"name": "Pagina Adaptada a Movil",
			"webtype": "Tecnologias Web",
			"thematic": "Paginas Web Responsive",
			"cms": "WordPress",
			"front": ["HTML5", "CSS3", "Jvascript"],
			"frameworks": ["jQuery","Bootstrap","SdrJS"],
			"desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
		},
		{
			"name": "Diseño de Interiores y Reformas",
			"webtype": "Web Empresa",
			"thematic": "Empresas construcción y reformas",
			"cms": "WordPress",
			"front": ["HTML5", "CSS3", "Jvascript"],
			"frameworks": ["jQuery","Bootstrap","SdrJS"],
			"desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
		},
		{
			"name": "Inmo Levante",
			"webtype": "Web Empresa",
			"thematic": "Empresas Inmobiliaria",
			"cms": "Code Igniter",
			"front": ["HTML5", "CSS3", "Jvascript","PHP","Api Slim"],
			"frameworks": ["jQuery","Bootstrap","SdrJS"],
			"desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
		}
	];

	var colorsContent = [
		'rgba(87,133,156,0.3)', 'rgba(255,200,49,0.3)',
		'rgba(0,164,128,0.3)', 'rgba(199,77,143,0.3)',
		'rgba(147,118,82,0.3)', 'transparent'
	];

	colorsHead = [
		'rgba(30,61,90,0.5)', 'rgba(255,178,19,0.5)',
		'rgba(0,145,110,0.5)', 'rgba(155,36,81,0.5)',
		'rgba(106,75,44,0.5)', 'transparent'
	];
	
	function interval(time) {
		var i = 0;
		setInterval( function(){
			i > colorsHead.length ? i=0 : null;
			$('.c-header-main').css('background-color', colorsHead[i]);
			$('.c-container-color').css('background-color', colorsContent[i]);
			$('.c-pop-up__body').css('border-color', colorsContent[i]);
			i++;
		}, time);
	};

	setTimeout(interval(8000), 10000);

	function getTotalHeight(){
		var headerH = $('.c-header-main').height(),
		galleryC = $('#gallery-container').height(),
		galleryC2 = $('.c-gallery-container').eq(1).height();
		return headerH + galleryC + galleryC2;
	};

	function watchResizeBackColor() {
		$('.c-container-color').height( Response.viewportH() );
		Response.resize(function() {
			$('.c-container-color').height( Response.viewportH() );
		});
	};

	watchResizeBackColor();

	// Tabs Characters Horizontal
	function tabsContentHorizontal(){
		$('[data-tabh-target]').on('click', function(event){
			var target = $(this).data('tabh-target');
			$('[data-tabh-target]').removeClass('item-active');
			$(this).addClass('item-active');
			$('[data-tabh-content]').removeClass('content-active');
			$('[data-tabh-content="'+target+'"]').addClass('content-active');
		});
	};

	tabsContentHorizontal();

	// Galeria Thumb - description dinamic 
	function getContentWebs(){
		var overlay = $('.c-panel-gallery-dinamic__overlay');
		$('[data-toggle-gallery-overlay]').on('click', function(event){
			var idx = $(this).data('info-idx') != undefined ? $(this).data('info-idx') : null;
			overlay.toggleClass('is--show');
			idx != null ? 
				fillContentInfo( dataWebs[idx], $('.c-panel-gallery-dinamic__overlay__description__item') ) : null;
		});

		function fillContentInfo(obj, eleToFill){
			var i=0;
			for (v in obj) {
				eleToFill.eq(i).find('p').empty().append( detectArray(obj[v]) );
				i++;
			}
		};

		function detectArray(val){
			var html = Array.isArray(val) ? val.toString() : val;
			return html;
		};
	};

	getContentWebs();

	// Open Menu Nav
	$('[data-btn-menu-nav]').on('click', function(event){
		event.preventDefault();
		$('body').toggleClass('open-menu-nav');
		return false;
	});

	// Activar POP UP y con sistema de Info en cada clik por pagina
	INFO_PAGE_ADM_POPUP = {
		col_pages: null,
		obj_info_item: {
			"name": null,
			"webtype": null,
			"cms": null,
			"thematic": null,
			"tech": null,
			"frameworks": null,
			"image": null,
			"url": null
		},
		btnEle: $('[data-popup-info-page]'),
		init: function(){
			var self = this;
			this.col_pages == null ? $.getJSON('js/data-pages.json', function(data){
				self.col_pages = data.pages;
				self.setShowPopup();
			}) : null;
		},
		setShowPopup: function(){
			var self = this;
			this.btnEle.on('click', function(e){
				e.preventDefault();
				var idx = $(this).data('popup-info-page');
				idx == 'close' ? 
					$('body').removeClass('is--pop-up-show') : self.poblateInfoItem( idx );
				return false;
			});
		},
		poblateInfoItem: function(idx){
			var objItem = this.col_pages[idx];
			$.each(objItem, function(idx, val){ 
				switch(idx) { 
					case 'url': 
						$("[data-page-val='"+ idx +"']").attr('href', val);	
						break;
					case 'image':
						$("[data-page-val='"+ idx +"']").attr('src', val);
						break;
					default :
						$("[data-page-val='"+ idx +"']").text( val );
						break;
				};
			});
			$('body').toggleClass('is--pop-up-show');
		}
	};

	INFO_PAGE_ADM_POPUP.init();

});


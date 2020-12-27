
require.config({
	baseUrl : 'js',
	paths : {
		jquery       : 'mgs/jquery',
		particlesJS  : 'libs/particle.min', 
		response     : 'libs/response',
		text         : 'libs/require/text'
	},
	shim : {
		jquery   : { exports:'$'} ,
		response : {
			deps : ['jquery'],
			exports : 'Response'
		},
		particlesJS : {exports:'particlesJS'}
	},
	text: {
		useXhr: function(url, protocol, hostname, port){
			return true;
		}
	}
});

require([
	'jquery', 'response', 'libs/particle-config',
	// MODULES - CLASES
	'libs/modules/info-skills.module', 'libs/modules/title-dinamic.module', 'libs/modules/slider-page.module',
	'libs/modules/links-buttons.module', 'libs/modules/info-subskills.module', 'libs/modules/rwd-responsive-animate.module',
	'libs/modules/ux-layer.module', 'libs/modules/tab-comp.module', 'libs/modules/change-input-3d-rotate.module',
	'libs/modules/manipulate-layer.module', 'libs/modules/btn-choices.module', 'libs/modules/picture-media.module',
	'libs/modules/btn-scrolltop.module', 'libs/modules/menu-auto-position.module', 'libs/modules/resize-watch.module',
	'libs/modules/code-writter-simulate.module', 'libs/modules/admin-animation.module',
	// TEMPLATES
	'text!tmps/content-bio.html', 'text!tmps/content-contact.html', 'text!tmps/content-developer.html',
	'text!tmps/content-portrait-code-simulate.html', 'text!tmps/content-portrait.html', 
	'text!tmps/content-ui.html', 'text!tmps/content-ux.html', 'text!tmps/layer-loading.html'
], function(
	$, Response, particleObj,
	// MODULES
	InfoSkills, TitleDinamic, SliderPages,
	LinkBtns, InfoSubSkills, RWDanimate,
	UxLayer, TabComponent, ChangeRotateRange,
	ManipulateLayers, BtnChoices, PictureMedia,
	BtnScrolltop, MenuTabletPosition, ResizeWatch,
	CodeWritter, AdminAni,
	// TEMPLATES
	tmp_bio, tmp_contact, tmp_developer, 
	tmp_portrait_code_simulate, tmp_portrait, tmp_ui, tmp_ux, tmp_layer_loading
){
	// Poblar Contenidos
	$('#layer-presentation-contenedor').html( tmp_layer_loading );
	// content portrait
	$('#id_portrait-wrapper').html( tmp_portrait );
	// content bio
	$('#id_content-home').html( tmp_bio );
	// content developer
	$('#id_content-developer').html( tmp_developer );
	// content ux
	$('#id_content-files').html( tmp_ux );
	// content ui
	$('#id_content-ui').html( tmp_ui );
	// content bio
	$('#id_content-gallery').html( tmp_contact );
	$('#id_layer-simulate-code').html( tmp_portrait_code_simulate );

	$(function(){

		particleObj.init('particles-js');
		
		// INFO SKILLS DEVELOPER
		var skillsObj = new InfoSkills(
			'[data-dev-skills]',
			'.list-skills__wrap-item__graphic__percentage', 
			'#id-content-developer'
		);

		// TITULO DINAMICO (titulo animado al cambiar de pagina)
		var titleDinamic = new TitleDinamic(
			'#id-comp-title-dinamic',
			'.content-wrapper__wrap-title-change__title__icon',
			'.content-wrapper__wrap-title-change__title__txt',
			'.content-wrapper__wrap-title-change__title__layer',
			skillsObj
		);

		// SLIDER PAGES navegacion a modo de slider
		var sliderPages = new SliderPages('.content-wrapper__body__wrapper-layer', 5);

		// BOTONES DE NAVEGACIÓN 
		var linkBtns = new LinkBtns(
			'[data-linkbtn]',
			'.main-header__tooltip',
			titleDinamic,
			sliderPages
		);

		// INFO SUBSKILLS
		var infoSubSkills = new InfoSubSkills(
			'[data-subskills]',
			'.content-developer__body__wrapper-content__divider__subskills',
			'.content-developer__body__wrapper-content__divider__subskills__wrap',
			'[data-btn-backsubskills]'
		);

		// ELEMENT ANIMATE RWD (responsive design)
		var rwdAnimate = new RWDanimate(
			'.content-home__body__devices__rwd',
			'.title-rwd',
			4000
		);

		// UX LAYER
		var uxLayer = new UxLayer('.ux-layer__btn-more', '.ux-layer');

		// TAB COMPONENT
		var tabs = new TabComponent('.c-tab__tab-btn', '.c-tab__content', '.c-tab__tab');

		// CUBO CHANGE ROTATE
		var newChangeRotate = new ChangeRotateRange(
			'.wrapper-change-range',
		  	'input[type="range"]',
		  	'#change_rotate'
		);

		// MANIPULAR CAPAS
		var select = new ManipulateLayers(
			'.btnchoices[data-target="cube_layers"]',
			'select[name="layer"]', 
			'select[name="transform"]'
		);

		// BTN CHOICES
		var btn = new BtnChoices(
			'#trigger_play_origin',
			'#cube_play_origin',
			'perspective-origin',
			'origin'
		);

		// C PICTURE MEDIA
		var picMedia = new PictureMedia(
			'[data-picture-media-btn]',
			'c-picture-media--show-info',
			'is--turned'
		);

		// BTN NAVMOBILE
		$('[data-btn-navmobile]').on('click', function(e){
			e.preventDefault();
			$('.c-nav-mobile').toggleClass('is-show');
			return false;
		});

		// BTN-SCROLLTOP
		var btnScroll = new BtnScrolltop('[data-btn-scrolltop]', skillsObj);

		// MENU TABLET posicionarlo
		var menuTabletPos = new MenuTabletPosition('.main-header-tablet', '.content-wrapper');

		// RESIZE WATCH
		var resizeWatch = new ResizeWatch({
			'menuTablet': menuTabletPos,
			'sliderPages': sliderPages,
			'infoSkills': skillsObj
		}, Response);

		// SIMULAR - WRITER CODE	
		var codeWritter;

		var adminAni = new AdminAni({});

		adminAni.fadeContentLoading( function(AniTool) {
			var picture = $('.portrait-wrapper__back-animate__base__picture'),
				endAnimation = new AniTool().getAniEndSupport();
			picture.addClass('is--start');
			picture.one(endAnimation, function(){
				codeWritter = new CodeWritter(
					'.c-code-layer',
					'.c-code-layer__line',
					'is--show',
					'.portrait-wrapper__back-animate__base__picture'
				);
			});
		});

	});

});
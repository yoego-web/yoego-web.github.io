//  MAIN JS
$(function(){ 

	var swipeEle = new ElementSwipe(
		'.wrapper-back-animate',
		'.wrapper-back-animate__wrapper-layer',
		'.wrapper-back-animate__layer',
		5
	);

	// INFO SKILLS DEVELOPER
	var skillsObj = new InfoSkills(
		'[data-dev-skills]',
		'.list-skills__wrap-item__graphic__percentage', 
		Skills, '#id-content-developer'
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
		'[data-btn-backsubskills]',
		Skills
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

	adminAni.fadeContentLoading(function(){
		var picture = $('.portrait-wrapper__back-animate__base__picture'),
			animateJS = new AniTool().getAniEndSupport();
		picture.addClass('is--start');
		picture.one(animateJS, function(){
			codeWritter = new CodeWritter(
				'.c-code-layer',
				'.c-code-layer__line',
				'is--show',
				'.portrait-wrapper__back-animate__base__picture'
			);
		});
	});

});


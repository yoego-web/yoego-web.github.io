define([
	'libs/modules/utils.module'
], function( Utils ){

	// Administrador de Animacion
	function AdminAni(objs){
		this.objs = objs;
		this.constructor();
	};

	AdminAni.prototype = {
		init: function(){
			$('.portrait-wrapper__back-animate').addClass('is--black');
		},
		setDelayFn: function(fn, time){
			setTimeout(fn, time);
		},
		fadeContentLoading: function(fn){
			var contentLoading = $('#layer-presentation-contenedor'),
				picture = $('.layer-presentation__picture'),
				self = this,
				endAnimation = new Utils.AniTool().getAniEndSupport();
			picture.addClass('is--start');
			picture.one(endAnimation, function(){
				contentLoading.addClass('is--fade');
			});
			contentLoading.one(endAnimation, function(){
				contentLoading.css('display','none');
				self.showMainContent( fn );
			});
		},
		showMainContent: function(fn){
			var mainWrap = $('#main-wrapper');
				mainWrap.addClass('is--start');
				endAnimation = new Utils.AniTool().getAniEndSupport();
				$('.portrait-wrapper__back-animate').addClass('is--black');
			mainWrap.one(endAnimation, fn(Utils.AniTool) );
		},
		constructor: function(){ /*this.init();*/ }
	};

	return AdminAni;
});





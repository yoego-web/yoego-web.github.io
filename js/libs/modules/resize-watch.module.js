define([], function(){
	// ResizeWatch -- Response JS
	function ResizeWatch(objs, R){
		this.objs = objs;
		this.R = R;
		this.constructor();
	};

	ResizeWatch.prototype = {
		init: function(){ 
			var self = this;
			this.watchScroll();
			this.isTablet();
			this.R.resize(function(){
				self.isTablet();
			});
		},
		isTablet: function(){ 
			// '.band' ancho dispositivo, 'media' ancho actual resize
			this.R.device.band(768, 1023) || this.R.media('(min-width:768px) and (max-width:1023px)').matches ? 
				this.objs.menuTablet.setLeftMenuTablet() : null;
			this.R.media('max-width:1023px') ? 
				this.resetPositionContents() : null;
		},
		resetPositionContents: function(){
			this.objs.sliderPages.resetPosition();
		},
		watchScroll: function(){
			var self = this;
			$(document).on('scroll', function(e){
				$(this).scrollTop() >= self.objs.infoSkills.getPosY() ? 
					self.objs.infoSkills.checkTitlePage('developer') : null;
			});
		},
		constructor: function(){ this.init(); }
	};

	return ResizeWatch;
});
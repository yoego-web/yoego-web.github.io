var APP = {
	init: function(){
		var slider = new HeaderSlider();
		var detectTopNavbar = new DetectTopNavbar();
	}
};

function HeaderSlider() {
	this.ele = $('.c-header-slider__back-image');
	this.eleSelected = 'c-header-slider__back-image--selected';
	this.interval = null;
	this.count = 0;
	this.sliderLength = this.ele.length;
	this.timeInterval = 3000;
	this.constructor();
};

HeaderSlider.prototype = {  
	init: function(){
		this.asignInterval();
	},
	asignInterval: function(){
		var self = this; 
		this.interval = setInterval(function(){ 
			self.count == self.sliderLength ? self.count = 0 : self.count++;
			self.ele.removeClass(self.eleSelected);
			self.ele.eq(self.count).addClass(self.eleSelected); 
		}, this.timeInterval);
	},
	constructor: function(){ this.init(); }
};

function DetectTopNavbar(){
	this.navBar = $('#navigate-bar');
	this.pageScroll = $(window);
	this.topTarget = $('#container-services').offset().top;
	this.constructor();
};

DetectTopNavbar.prototype = {
	init: function(){
		this.initScroll();
	},
	initScroll: function(){
		var self = this;
		$(window).scroll(function(event) {
			self.pageScroll.scrollTop() >= self.topTarget ? 
				self.navBar.addClass('bg-dark') : self.navBar.removeClass('bg-dark');
		});
	},
	constructor: function(){ this.init(); }
}

$(function(){
	APP.init();
	// $(window).scroll(function(event) {
	// 	$(window).scrollTop() == $('#container-services').offset().top ? ; 
	// });
});

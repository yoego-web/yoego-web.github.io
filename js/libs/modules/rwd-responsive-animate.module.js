define([], function(){
	/*
		Animacion Simulador Responsive Design
		- simulara un dispositivo q cambiara de pc-tablet-mobile
		agregandole una clase en cada cierto tiempo un ciclo de 3 stados
	*/
	function RWDanimate(ele, eleTitle, timeCicle){
		this.ele = $(ele);
		this.eleTitle = $(eleTitle);
		this.colTitles = ['PC', 'TABLET', 'MOBILE'];
		this.hgtDevices = [90, 110, 150],
		this.clsTablet = 'dev-tablet';
		this.clsMobile = 'dev-mobile';
		this.nroStates = 2;
		this.timeCicle = timeCicle;
		this.constructor();
	};

	RWDanimate.prototype = {
		init: function(){
			this.setCycleStates();
		},
		setCycleStates: function(){
			var self = this;
			setInterval(function(){
				self.nroStates == 2 ? self.nroStates = 0 : self.nroStates++;
				self.verifyState();
			}, this.timeCicle);
		},
		verifyState: function(){
			switch(this.nroStates){
				case 0: 
					this.eleTitle.text(this.colTitles[this.nroStates]);
					this.ele.removeClass(this.clsTablet+' '+this.clsMobile);
					this.setHeightDevice( this.nroStates );
					break;
				case 1: 
					this.eleTitle.text(this.colTitles[this.nroStates]);
					this.setHeightDevice( this.nroStates ) ;
					this.ele.addClass(this.clsTablet);
					break;
				case 2: 
					this.eleTitle.text(this.colTitles[this.nroStates]);
					this.setHeightDevice( this.nroStates );
					this.ele.addClass(this.clsMobile);
					break;
				default: null;
			};
		},
		setHeightDevice: function( currentDevice ){
			var wdt = this.ele.width(),
				currentHgt =  Math.floor((wdt * this.hgtDevices[ currentDevice ]) / 100);
			this.ele.height( currentHgt );
		},
		constructor: function(){ this.init(); }
	};

	return RWDanimate;
});
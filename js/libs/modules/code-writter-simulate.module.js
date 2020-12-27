define([
	'libs/modules/utils.module'
], function( Utils ){

	// SIMULATE CODE WRITTER
	function CodeWritter(el, itemLine, clsShow, elRef){
		this.el = $(el);
		this.line = $(itemLine);
		this.elRef = $(elRef);
		this.lineLength = this.line.length;
		this.clsShow = clsShow;
		this.currentIndex = 0;
		this.constructor();
	};

	CodeWritter.prototype = {
		init: function(){
			this.setTop(false);
			this.initLoopLine();
		},
		initLoopLine: function(){
			var self = this;
			this.lineLength >= this.currentIndex ?
				setTimeout( function(){
					self.currentIndex % 2 == 0 ? self.setTop(true) : null;
					self.showLineCode(true); self.initLoopLine();
				}, 2300) : this.finishLoop();
		},
		finishLoop: function(){ 
			this.currentIndex = 0;
			var self = this;
			setTimeout(function(){
				self.el.addClass('is--finish'); self.setTop(false); 
			}, 3000);
			setTimeout(function(){
				self.el.removeClass('is--finish'); 
				self.line.removeClass(self.clsShow);
				self.initLoopLine();
			}, 13000);
		},
		setTop: function(bool){
			var topInit = parseInt(this.elRef.offset().top - (this.elRef.height() / 2));
			var topCurrent = parseInt(this.el.css('top')) - 28;
			var top = bool ? topCurrent : topInit;
			this.el.css('top', top); 
			bool == false ? this.listenEndAnimation() : null;
		},
		showLineCode(){
			this.line.eq(this.currentIndex).addClass(this.clsShow);
			this.currentIndex++;
		},
		listenEndAnimation: function(){
			var self = this, eventAniEnd = new Utils.AniTool().getAniEndSupport();
			this.el.one(eventAniEnd,  function(){
				self.el.addClass('is--start');
			});
		},
		constructor: function(){ this.init(); }
	};

	return CodeWritter;
});


define([], function(){
	/* ----------------
		SlIDER-PAGES
	   ---------------- */
	function SliderPages(elWrapper, nroSliders){
		this.el = $(elWrapper);
		this.nroSliders = nroSliders;
		this.unityMove = 100 / this.nroSliders;
		this.currentPage = 0;
		this.dir = '-';
		this.constructor();
	};

	SliderPages.prototype = {
		init: function(){
			this.movePage(0);
		},
		movePage: function(page){
			this.currentPage = page;
			this.setDirection();
			var move = String(this.dir + (this.unityMove * this.currentPage));
			this.el.css('transform', 'translateX('+move+'%)');
		},
		setDirection: function(){
			this.dir = this.currentPage == 0 ? '' : '-';
		},
		resetPosition: function(){
			this.el.css('transform', 'translateX(0)');
		},
		constructor: function(){ this.init(); }
	};

	return SliderPages;
});
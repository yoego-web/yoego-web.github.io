define([], function(){
	// BTN-SCROLLTOP botones de scrolltop (Menu de Mobile)
	function BtnScrolltop(btns, objInfoSkills){
		this.btns = $(btns);
		this.objInfoSkills = objInfoSkills;
		this.constructor();
	};

	BtnScrolltop.prototype = {
		init: function(){
			this.setCLickBtns();
		},
		setCLickBtns: function(){
			var self = this;
			this.btns.on('click', function(e){
				e.preventDefault();
				self.setScrolltop( $(this).data('btn-scrolltop') );
				self.activeAniPageDeveloper( $(this).data('btn-scrolltop') );
				return false;
			});
		},
		setScrolltop: function(target){
			var targetContent = $('#id-content-'+target);
			$('html, body').animate({
				scrollTop: targetContent.offset().top
			}, 600);
		},
		activeAniPageDeveloper: function(titlePage){ 
			titlePage == 'developer' ? this.objInfoSkills.checkTitlePage(titlePage) : null;
		},
		constructor: function(){ this.init(); }
	};

	return BtnScrolltop;
});


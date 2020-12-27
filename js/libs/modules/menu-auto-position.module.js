define([], function(){
	// TABLET MENU posicionarlo
	function MenuTabletPosition(el, elRef){
		this.el = $(el);
		this.elRef = $(elRef);
	};

	MenuTabletPosition.prototype = {
		setLeftMenuTablet: function(){ 
			var left = this.getLeftElRef() - this.el.width();
			this.el.css({'left': left });
		},
		getLeftElRef: function(){
			return this.elRef.offset().left;
		}
	};

	return MenuTabletPosition;
});
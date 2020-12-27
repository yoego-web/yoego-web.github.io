define([], function(){
	/*
		LINKS-BUTTONS botones de navegacion 
		cada click a uno de ellos activa 
	*/
	function LinkBtns(el, elTooltip, elObjTitle, elObjContentSlider){
		this.el = $(el);
		this.tlp = $(elTooltip);
		this.elObjTitle = elObjTitle;
		this.elObjContentSlider = elObjContentSlider;
		this.constructor();
	};

	LinkBtns.prototype = {
		init: function(){
			this.setBtnsClick();
			this.setTooltip();
		},
		setBtnsClick: function(){
			var self = this;
			this.el.on('click', function(e){ 
				var hasTargetUrl = $(this).attr('target') == '_blank' ? true : false;
				hasTargetUrl ? null : (function(){
					e.preventDefault();
					var target = $(e.currentTarget);
					var currentPageSlider = parseInt($(e.currentTarget).data('pospage'));
					var objEl = {
						'txt': $(e.currentTarget).data('linkbtn'),
						'icon': $(e.currentTarget).data('icon')
					};
					self.removeSelect();
					target.addClass('is--select');
					self.elObjContentSlider.movePage(currentPageSlider);
					// disparamos el evento global
					self.elObjTitle.triggerChangeTitle(objEl);
				})();
				// si el "false" disparamos el "e.prepeventDefault"
				return hasTargetUrl;
			});
		},
		setTooltip: function(){
			var self = this;
			this.el.hover(
				function(e) { 
					var txt = $(this).data('linkbtn');
					var coords = $(this).offset();
					var elWH = {'wdt': $(e.currentTarget).width(), 'hgt': $(e.currentTarget).height()};
					var tplCoords = self.getCoordsEl(coords, elWH, self.tlp.height());
					self.tlp
						.text('')
						.text(txt)
						.addClass('is--select')
						.css({'top': tplCoords.top, 'left': tplCoords.left });
				}, function() {
					self.tlp.removeClass('is--select');
				}
			);
		},
		getCoordsEl: function(coords, elWH, elTplHgt){  
			return {
				'top': coords.top + ((elWH.hgt - elTplHgt) / 2),
				'left': coords.left + (elWH.wdt + 5)
			};
		},
		removeSelect: function(){
			this.el.removeClass('is--select');
		},
		constructor: function(){ this.init(); }
	};

	return LinkBtns;
});
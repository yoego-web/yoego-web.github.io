define([], function(){
	/*
		UX LAYER
	*/
	function UxLayer(eleBtn, uxParent){
		this.ele = $(eleBtn);
		this.uxParent = $(uxParent);
		this.eleAll = $(uxParent).find(eleBtn);
		this.unitCoords = '';
		this.constructor();
	}; 

	UxLayer.prototype = {
		init: function(){ 
			this.setEleAllPositions();
			this.setClickBtn();
		},
		setClickBtn: function(){
			var self = this;
			this.ele.on('click', function(e){
				e.preventDefault();
				var coords = $(this).offset(), parent = $(this).parent();
				parent.toggleClass('is--select');
				parent.hasClass('ux-layer__desc--pos-right') && !parent.hasClass('is--select') ?
					self.setInitialPositionParent(parent, $(this)) : 
					parent.hasClass('ux-layer__desc--pos-right') ?
						self.setPositionParentCustom(parent, $(this)) : null;

				return false;
			});
		},
		saveCoordsInData: function(eleCurrent){
			var self = this; 
			eleCurrent.attr({
				'data-coords-left': self.trimPx(eleCurrent.css('left')),
				'data-coords-top': self.trimPx(eleCurrent.css('top'))
			});
		},
		setPositionParentCustom: function(parent, eleCurrent){
			var coord = eleCurrent.data('coords-left');
			var measure = eleCurrent.data('unit-coords') == '%' ? 'calc('+coord+'% - 200px)' : parseInt(coord) - 220;
			parent.css({'left': measure});
		},
		setInitialPositionParent: function(parent, eleCurrent){
			var coord = eleCurrent.data('coords-left');
			var measure = eleCurrent.data('unit-coords') == '%' ? coord + '%'  : parseInt(coord);
			parent.css({'left': measure});
		},
		setEleAllPositions: function(){
			var self = this;  
			var method = ['trimPx', 'trimPercentage'];
			this.eleAll.each(function(i){
				var txtPos = $(this).parent().css('left');
				var trim = txtPos.charAt(txtPos.length - 1) == "x" ? method[0] : method[1];
				trim == 'trimPercentage' ? $(this).attr('data-unit-coords', '%') : null;
				$(this).attr({ 
					'data-coords-left': self[trim]($(this).parent().css('left')),
					'data-coords-top': self[trim]($(this).parent().css('top'))
				});
			});
		},
		trimPx: function(str){
			return str.substr(0, str.length - 2);
		},
		trimPercentage: function(str){
			return str.substr(0, str.length - 1);
		},
		constructor: function(){
			this.init();
		}
	};

	return UxLayer;
});
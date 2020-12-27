define([], function(){

	//codigo para cambiar las rotaciones via "input range"
	var ChangeRotateRange = function(wrapElement, inputRanges, eleChangeTarget){
		this.wrapElement = $(wrapElement);
		this.inputRanges = this.wrapElement.find(inputRanges);
		this.eleChangeTarget = $(eleChangeTarget);
		this.constructor();
	};

	ChangeRotateRange.prototype = {
		init: function(){ 
			this.setBehaviorRange();
		},
		setBehaviorRange: function(ele){
			var _this = this;
			//aplicamos el evento "input" y no "change" xq recordemos que se trata
			//de un input "range" un deslidazador, y que el evento "change" se dispara
			//cunado el input cambia de valor, pero necesitamos que se actulize segun 
			//vayamos manipulando es deslizador y para esto esta el evento "input"
			this.inputRanges.on('input', function(e){ 
				_this.updateLegend( $(this) );
				_this.updateRotateEleTarget( _this.getValuesRange() );
			});
		},
		updateRotateEleTarget: function(values){
			this.eleChangeTarget.css({'transform': values});
		},
		getValuesRange: function(){
			var values = {
				rx: 'rotateX('+ $('#range-x').val()+'deg)',
				ry: 'rotateY('+ $('#range-y').val()+'deg)',
				rz: 'rotateZ('+ $('#range-z').val()+'deg)'
			};
			return values.rx +' '+values.ry+' '+values.rz;
		},
		updateLegend: function(ele){ 
			ele.next().find('.val').text( ele.val() );
		},
		constructor: function(){ this.init(); }
	};

	return ChangeRotateRange;
});
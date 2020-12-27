define([], function(){
	// Manipular Capas
	var ManipulateLayers = function(ele, comboLayers, comboProperties){
		this.ele = $(ele);
		this.targetEle = $('#'+this.ele.data('target'));
		this.comboLayers = $(comboLayers);
		this.comboProperties = $(comboProperties);
		this.selectLayer = null;
		this.selectPropertie = null;
		this.btnsPlusMinus = this.ele.find('.btnchoices_wrapper_plusminus span');
		this.propertiesLayers = {
			'ry': 'rotateY', 
			'rx': 'rotateX',
			'tz': 'translateZ'
		};
		this.constructor();
	};
	ManipulateLayers.prototype = {
		init: function(){
			this.setSelect();
			this.onChangeSet();
			this.setBtnPlusMinusBehavior();
		},
		setSelect: function(){
			this.selectLayer = this.comboLayers.val();
			this.selectPropertie = this.comboProperties.val();
		},
		onChangeSet: function(){
			var _this = this;
			this.comboLayers.on('change', function(){ _this.setSelect(); _this.setLayerClassSelect(); });
			this.comboProperties.on('change', function(){ _this.setSelect(); });
		},
		setBtnPlusMinusBehavior: function(){
			var _this = this;
			this.btnsPlusMinus.on('click', function(){
				_this.setChangePropertie( $(this).hasClass('plus') );
			});
			this.btnsPlusMinus.mousedown(function(e){
				$(this).addClass('is--pulsed'); 
			});
			this.btnsPlusMinus.mouseup(function(e){
				$(this).removeClass('is--pulsed'); 
			});
		},
		setChangePropertie: function(bool){  
			var layer = this.targetEle.find('.stage_cube'+this.selectLayer),
			    properties = this.getProperties(layer.data('rotate'), bool, layer);
			layer.css(properties); 
		},
		setLayerClassSelect: function(){
			this.targetEle.find('[class^=stage_cube--]').removeClass('is--select');
			this.targetEle.find('.stage_cube'+this.selectLayer).addClass('is--select');
		},
		getProperties: function(n, bool, el){ 
			n = bool ? ++n : --n; this.updateDataRotate(el,n);
			return {
				'transform': this.propertiesLayers[this.selectPropertie]+'('+ n +'deg)'
			};
		},
		updateDataRotate: function(el, data){
			el.data('rotate', data);
		},
		constructor: function(){ this.init(); }
	};

	return ManipulateLayers;
});
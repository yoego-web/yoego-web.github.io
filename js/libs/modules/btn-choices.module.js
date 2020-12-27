define([], function(){

	// BTN CHOICES
	var BtnChoices = function(ele, targetEle, propertieChange, dataGet){
		this.ele = $(ele);
		this.btn = this.ele.find('.btnchoices_btn');
		this.targetEle = $(targetEle);
		this.propertieChange = propertieChange;
		this.dataGet = dataGet;
		this.selectClass = "is--select";
		this.currentBtn = null;
		this.constructor();
	};

	BtnChoices.prototype = {
		init: function(){
			this.setBtnBehavior();
		},
		setBtnBehavior: function(event){
			var _this = this;
			this.btn.on('click', function(e){ 
				var propertie = $(this).data(_this.dataGet); 
				if(!$(this).hasClass(_this.selectClass)){
					_this.btn.removeClass(_this.selectClass);
					$(this).addClass(_this.selectClass);
					_this.setState( _this.setProperties(propertie) );
				}
			});
		},
		setProperties: function(data){
			var properties = {};
			properties[this.propertieChange] = data;
			return properties;
		},
		setState: function(properties){ 
			this.targetEle.css(properties); 
		},
		constructor: function(){ this.init(); }
	};

	return BtnChoices;
});


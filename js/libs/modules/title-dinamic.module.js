define([], function(){
	/* -----------------------------------------------------------
		TITLE-DINAMIC objeto para los titulos segun se haga click
	   ----------------------------------------------------------- */
	function TitleDinamic(el, elIcon, elTxt, elLayer, infoSkills){
		this.el = $(el);
		this.elClass = el; 
		this.elIcon = $(el+' > '+elIcon);
		this.elTxt = $(el+' > '+elTxt);
		this.elLayer = $(el+' > '+elLayer);
		this.currentIcon = 'fa-address-card-o';
		this.infoSkills = infoSkills;
		this.objElTitle = null;
		this.constructor();
	};

	TitleDinamic.prototype = {
		init: function(){
			this.setEventGlobal();
			this.setEventChangeTitle();
		},
		setEventGlobal: function(){
			var self = this;
			$(document).on('triggerchangetitle', function(e, data){
				self.el.trigger('changetitle', [data]);
			});
		},
		setEventChangeTitle: function(){
			var self = this;
			this.el.on('changetitle', function(e, data){
				self.changeTitle(data);
			});
		},
		triggerChangeTitle: function(obj){
			this.objElTitle = obj;
			var self = this;
			setTimeout(function(){
				$(document).trigger('triggerchangetitle', [self.objElTitle]);
			}, 150);
		},
		changeTitle: function(obj){
			this.el.removeClass('is--change');
			var self = this;
			setTimeout(function(){
				self.el.addClass('is--change');
			}, 50);
			setTimeout(function(){
				self.changeIcon(obj.icon);
				self.changeTxt(obj.txt);
			}, 400);
			this.infoSkills.checkTitlePage(obj.txt);
		},
		changeIcon: function(iconClass){
			this.elIcon.removeClass(this.currentIcon);
			this.elIcon.addClass(iconClass);
			this.currentIcon = iconClass;
		},
		changeTxt: function(txt){
			this.elTxt.text(''); this.elTxt.text(txt);
		},
		constructor: function(){ this.init(); }
	};

	return TitleDinamic;
});
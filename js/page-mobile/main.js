var app = {
	init: function(){
		this.translateMain();
		this.setBehavoiurOpenMenu();
	},
	setBehavoiurOpenMenu: function(){
		new OpenMenu('.toggle-menu', 'body', 'open-menu');
	},
	setWidth: function(){

	},
	translateMain: function(){
		new TranslateMain('main','.wrap-btn-scroll span','.btn-nav-page');
	}
};

var TranslateMain = function(ele, btnsScroll, btnNavPage){
	this.ele = $(ele);
	this.pages = this.ele.data('pages');
	this.btnScroll = $(btnsScroll);
	this.btnNav = $(btnNavPage);
	this.currentDataPage = this.ele.data('current-page');
	this.currentPage = 0;
	this.firstPage = (100/this.pages);
	this.lastPage = ((100/this.pages) * this.pages) - (100/this.pages);
	// guardamos a modo de array todo nuestros parametros 'arguments'
	this.args = Array.prototype.slice.call(arguments);
	this.constructor();
};

TranslateMain.prototype = {
	init: function(){
		this.btnBehavior();
		this.setSelectFirstPage();
	},
	translateEle: function(page){ 
		page != undefined ? this.currentPage = page : null; 
		if(page!=undefined && page == 0){ 
			this.ele.css({transform: 'translateY('+this.currentPage+')'});
		}else{
			this.ele.css({transform: 'translateY(-'+this.currentPage+'%)'});
		}
	},
	btnBehavior: function(){
		var _this = this;
		this.btnScroll.on('click', function(e){ 
			_this.setBehaviourScroll($(this).hasClass('plus'));
			_this.translateEle();
			_this.setClassSelectItem(_this.currentPage);
			_this.removeClassOpenMenu();
		});
		this.btnNav.on('click', function(e){
			_this.translateEle( $(this).data('page') );
			_this.setClassSelectItem( $(this).data('page') );
			_this.removeClassOpenMenu();
		});
	},
	setBehaviourScroll: function(bool){
		if(bool && (this.currentPage < this.lastPage)){
			this.currentPage += (100/this.pages); 
		}else if(!bool && (this.currentPage > 0)){
			this.currentPage -= (100/this.pages); 
		}; 
	},
	setClassSelectItem: function(page){
		var selectPage = $(this.args[2]+'[data-page="'+page+'"]'); 
		this.btnNav.removeClass('btn-nav-page--select');
		selectPage.addClass('btn-nav-page--select');
		$('.page-item').removeClass('page-item--select');
		$('#'+selectPage.data('page-rel')).addClass('page-item--select');
	},
	setSelectFirstPage: function(){
		setTimeout(function(){
			$('#home').addClass('page-item--select');
		}, 200);
	},
	removeClassOpenMenu: function(){
		$('body').removeClass('open-menu');
	},
	constructor: function(){ this.init(); }
};

var OpenMenu = function(ele, targetEle, activeClass){
	this.ele = $(ele);
	this.targetEle = $(targetEle);
	this.activeClass = activeClass;
	this.constructor();
};

OpenMenu.prototype = {
	init: function(){
		this.setBehavoiur();
	},
	setBehavoiur: function(){
		var _this = this;
		this.ele.on('click', function(e){
			_this.targetEle.toggleClass(_this.activeClass);
		});
	},
	constructor: function(){ this.init(); }
};

(function(R,$){
	app.init(); 
})(Response, jQuery);
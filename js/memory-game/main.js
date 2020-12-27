
var DATA = [
	{"idx": 0, "val":"a", "state":null}
	,{"idx": 1, "val":"a", "state":null}
	,{"idx": 2, "val":"b", "state":null}
	,{"idx": 3, "val":"b", "state":null}
	,{"idx": 4, "val":"c", "state":null}
	,{"idx": 5, "val":"c", "state":null}
	,{"idx": 6, "val":"d", "state":null}
	,{"idx": 7, "val":"d", "state":null}
	,{"idx": 8, "val":"e", "state":null}
	,{"idx": 9, "val":"e", "state":null}
	,{"idx": 10, "val":"f", "state":null}
	,{"idx": 11, "val":"f", "state":null}
	,{"idx": 12, "val":"g", "state":null}
	,{"idx": 13, "val":"g", "state":null}
	,{"idx": 14, "val":"h", "state":null}
	,{"idx": 15, "val":"h", "state":null}
	,{"idx": 16, "val":"i", "state":null}
	,{"idx": 17, "val":"i", "state":null}
	,{"idx": 18, "val":"j", "state":null}
	,{"idx": 19, "val":"j", "state":null}
	,{"idx": 20, "val":"k", "state":null}
	,{"idx": 21, "val":"k", "state":null}
	,{"idx": 22, "val":"l", "state":null}
	,{"idx": 23, "val":"l", "state":null}
];

var GameMemory = function(wrapper, btn, eleInfoTotalHits, currentHits, hitAnimate){
	this.wrapper = $(wrapper);
	this.btnReset = $(btn);
	this.eleInfoTotalHits = $(eleInfoTotalHits);
	this.currentHits = $(currentHits);
	this.eleHitAnimate = $(hitAnimate);
	this.cardCurrent = null;
	this.cards = DATA;
	this.totalHits = this.cards.length / 2;
	this.hits = 0;
	this.constructor();
};

GameMemory.prototype = {
	init: function(){
		this.loadData();
		this.setListenerBehaviors();
		this.setBehaviorBtnReset();
	},
	loadData: function(){
		// var _this = this;
		// $.getJSON('data.json', function(data){ 
		// 	_this.cards = data; 
		// 	_this.renderTmp();
		// });
		this.eleInfoTotalHits.text( this.totalHits );
		this.renderTmp();
	},
	setListenerBehaviors: function(){
		var _this = this;
		this.wrapper.on('click', function(event){
			var ele = $(event.target).parent();
			if( (ele.hasClass('card')) && (ele.data('state')!='compared') 
				  && (ele.data('idx') != _this.cardCurrent) ){
				if(_this.cardCurrent == null){
					_this.cardCurrent = ele.data('idx');
					_this.setClass(ele);
				}else{
					_this.setClass(ele);
					_this.compareValues(_this.cardCurrent, ele.data('idx'));
				}
			}
		});
	},
	setBehaviorBtnReset: function(){
		var _this = this;
		this.btnReset.on('click', function(){ _this.resetGame(); });
	},
	renderTmp: function(){
		var _this = this, size = this.cards.length;
		this.shuffleCards();
		for (var i=0; i<size; i++){ 
			this.wrapper.append( _this.setDataToTemp(_this.cards[i]) );
		};
	},
	shuffleCards: function(){
		var i = this.cards.length, j, temp;
		while(--i > 0){
			j = Math.floor(Math.random() * (i+1));
			temp = this.cards[j];
			this.cards[j] = this.cards[i];
			this.cards[i] = temp;
		};
	},
	setDataToTemp: function(obj){
		return '<div class="card" data-idx="'+obj.idx+'" data-state="'+obj.state+'" data-val="'+obj.val+'">'
			+'<div class="back-side"></div> <div class="front-side">'+obj.val+'</div>'+
		'</div>';
	},
	setClass: function(ele){
		ele.addClass('is-fliped');
	},
	compareValues: function(idx ,idx2){ 
		var a = $('[data-idx="'+idx+'"]'), b = $('[data-idx="'+idx2+'"]');
		a.data('val') == b.data('val') ? this.isCompleteGame(a,b) : this.resetCurrentCards(a,b);
		this.cardCurrent = null;
	},
	resetCurrentCards: function(a,b){
		setTimeout(function(){ a.removeClass('is-fliped'); b.removeClass('is-fliped');}, 1100);
	},
	isCompleteGame: function(a,b){
		a.attr('data-state','compared'); b.attr('data-state','compared');
		++this.hits;
		this.currentHits.text(this.hits);
		this.animateHit(); 
		if(this.hits == this.totalHits){
			this.wrapper.addClass('game-complete'); this.btnReset.addClass('is-show'); 
		}
	},
	animateHit: function(){
		var _this = this;
		this.eleHitAnimate.addClass('is-show');
		setTimeout(function(){ _this.eleHitAnimate.removeClass('is-show'); }, 500);
	},
	resetGame: function(){
		this.wrapper.removeClass('game-complete').find('.card').remove();
		this.cardCurrent = null; 
		this.hits = 0; this.currentHits.text( this.hits );
		this.btnReset.removeClass('is-show');
		this.renderTmp();
	},
	constructor: function(){ this.init(); }
};

$(function(){ 
	new GameMemory('#wrapper-game-memory','#resetGame','#hits-lenght','#hits-count','#hit-ok'); 
});  

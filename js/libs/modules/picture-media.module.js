define([], function(){
	//  COMP - PICTURE MEDIA
	function PictureMedia(btnShow, clsShow, clsFlip){
		this.btnShow = $(btnShow);
		this.clsShow = clsShow;
		this.clsFlip = clsFlip;
		this.clsSocials = {
			'youtube': 'select--youtube',
			'facebook': 'select--facebook',
			'tumblr': 'select--tumblr',
			'twitter': 'select--twitter'
		};
		this.constructor();
	};

	PictureMedia.prototype = {
		init: function(){
			this.setCLickBtnShow();
		},
		setCLickBtnShow: function(){
			var self = this;
			this.btnShow.on('click', function(e){
				var modeShow = $(this).data('picture-media-show-mode');
				modeShow == 'social' ? 
					self.setClsShowSocial( $(this), $(this).data('picture-media-social') ) :
					self.setClassShow( $(this), modeShow);
			});
		},
		setClassShow: function(btnCurrent, modeShow){
			var cls = modeShow == 'flip' ? this.clsFlip : this.clsShow;
			btnCurrent.parent().toggleClass(cls);
		},
		setClsShowSocial: function(btnCurrent, clsSocial){
			btnCurrent.parent().parent().toggleClass(this.clsSocials[clsSocial]);
		},
		constructor: function(){ this.init(); }
	};

	return PictureMedia;
});
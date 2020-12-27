define([], function(){
	/*
		TAB COMPONENT
	*/
	function TabComponent(tabBtn, tabsContent, tabWraps){
		this.tabBtn = $(tabBtn);
		this.tabsContent = null;
		this.tabWraps = null;
		this.clsTabContent = tabsContent;
		this.clsTabWraps = tabWraps
		this.constructor();
	};

	TabComponent.prototype = {
		init: function(){ 
			this.setTabBtnBehaviour();
		},
		setTabBtnBehaviour: function(){
			var self = this;
			this.tabBtn.on('click', function(e){
				e.preventDefault();
				self.setTabsContent_tabWraps( $(this).data('tab-target-theme') );
				self.addRemoveSelectBtnTab( $(this) );
				self.showTabContent( $(this).data('target-content') );
				return false;
			});
		},
		setTabsContent_tabWraps: function(targetTheme){
			this.tabsContent = $('[data-tab-theme="'+targetTheme+'"]').find(this.clsTabContent);
			this.tabWraps = $('[data-tab-theme="'+targetTheme+'"]').find(this.clsTabWraps);
		},
		showTabContent: function(targetContent){
			$('[data-tab-content="'+targetContent+'"]').siblings(this.clsTabContent).removeClass('is--select');
			$('[data-tab-content="'+targetContent+'"]').addClass('is--select');
		},
		addRemoveSelectBtnTab: function(btnTabCurrent){
			btnTabCurrent.parent().siblings(this.clsTabWraps).removeClass('is--select');
			btnTabCurrent.parent().addClass('is--select');
		},
		constructor: function(){ this.init(); }
	};

	return TabComponent;
});
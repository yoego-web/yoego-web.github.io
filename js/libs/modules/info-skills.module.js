define([
	'libs/modules/skills-data.module', 'libs/modules/utils.module'
], function( DATA_SKILLS, Utils ){
	/*  
		INFOSKILLS - informacion de habilidades
	*/  
	function InfoSkills(elParent, clsItem, contentPosY){
		this.elParent = $(elParent);
		this.clsItem = clsItem;
		this.titlePage = 'developer';
		this.colSkills = DATA_SKILLS;
		this.contentPosY = $(contentPosY);
		this.constructor();
	};

	InfoSkills.prototype = {
		init: function(){
			this.colSkills = Utils.ArrayTools.filter(this.colSkills, {
				'propertie':'hierarchie', 'match':1
			});
		},
		checkTitlePage: function(titlePage){ 
			// titlePage == 'desarrollador' ? this.setLevelSkills(true) :
			// this.titlePage == titlePage ? this.setLevelSkills(true) : this.setLevelSkills(false);
			(titlePage == this.titlePage || titlePage == 'desarrollador') ? 
				this.setLevelSkills(true) : this.setLevelSkills(false);
		},
		setLevelSkills: function(bool){ 
			for (var i=0, l=this.colSkills.length; i<l; i++) {		
				this.getParentAndCol(
					this.colSkills[i].searchName,
					bool ? this.colSkills[i].subSkills : []
				);
			};
		},
		getParentAndCol: function(parent, colSubkills){
			var self = this, 
				bool = colSubkills.length==0 ? false : true;
			$('[data-dev-skills="'+parent+'"]').find(this.clsItem).each(function(i){
				self.setItemPercentage( $(this), bool ? colSubkills[i].level : 0);
			});
		},
		setItemPercentage: function(ele, level){
			ele.css({'width': level});
		}, 
		getPosY: function(){
			return this.contentPosY.offset().top;
		},
		constructor: function(){ this.init(); }
	};

	return InfoSkills;
});
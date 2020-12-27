define([
	'libs/modules/skills-data.module', 'libs/modules/utils.module'
], function( DATA_SKILLS, Utils ){
	/*  
		INFO-SUBSKILLS - informacion de habilidades
	*/ 
	function InfoSubSkills(ele, eleWrapperSubkills, layersSubSkill, btnBack){
		this.ele = $(ele);
		this.layersSubSkill = $(layersSubSkill);
		this.eleWSK = $(eleWrapperSubkills);
		this.eleWSKcls = eleWrapperSubkills;
		this.eleParentSubSkills = null;
		this.btnBack = $(btnBack);
		this.colSkills = DATA_SKILLS;
		this.colSubskills = null;
		this.constructor();
	};

	InfoSubSkills.prototype = {
		init: function(){
			this.colSkills = Utils.ArrayTools.filter(this.colSkills, {
				'propertie':'hierarchie', 'match':2
			}); 
			this.setBtnsBehaviour();
			this.setBtnBackBehaviour();
		},
		setBtnsBehaviour: function(){
			var self = this;
			this.ele.on('click', function(e){
				e.preventDefault();
				var targetSubSkill = $(e.currentTarget).data('subskills'),
					targetThemeSkill = $(e.currentTarget).data('subskill-theme-target');
				self.showLayerThemeTarget(targetThemeSkill);
				self.showTargetSubSkill(targetSubSkill);
				return false;
			});
		},
		setBtnBackBehaviour: function(){
			var self = this;
			this.btnBack.on('click', function(e){ 
				self.eleWSK.removeClass('is--select');
				self.restartLevelSubskills();
			});
		},
		showTargetSubSkill: function(subSkill){ 
			this.layersSubSkill.removeClass('is--select');
			this.eleParentSubSkills = $('[data-layer-subskills="'+subSkill+'"]');
			this.eleParentSubSkills.addClass('is--select');
			this.setColSubSkills(subSkill);
			this.addLevelSubskills();
		},
		showLayerThemeTarget: function(targetTheme){
			$(this.eleWSKcls+'[data-subskill-theme="'+targetTheme+'"]').addClass('is--select');
		},
		addLevelSubskills: function(){
			var self = this;
			this.eleParentSubSkills.find('.list-skills__wrap-item__graphic__percentage').each(function(i){
				$(this).css({'width': self.colSubskills[i].level });
			});
		},
		restartLevelSubskills: function(){
			this.eleParentSubSkills.find('.list-skills__wrap-item__graphic__percentage').each(function(i){
				$(this).css({'width': '0%'});
			}); 
		},
		setColSubSkills: function(index){
			var objChoose = null;
			for (var i=this.colSkills.length - 1; i >= 0; i--) {
				this.colSkills[i].searchName == index ? objChoose = this.colSkills[i] : null;
			};
			this.colSubskills = objChoose['subSkills']; 
		},
		setNameSubSkills: function(){
			var self = this;
			var textSubSkill;
			for (var i=this.colSkills.length - 1; i>=0; i--) {
				textSubSkill = this.colSkills[i]['text'];
				setTimeout(function(){
					var currentEL = self.eleParentSubSkills.find('.list-skills__wrap-item__txt__txt-skill').eq(i);
					var currentText = '';
					for (var t=0; t>textSubSkill.length; t++) {
						currentEL.text(currentText + textSubSkill.charAt(t));
						currentText = currentEL.text();
					};
				}, 10);
			};
		},
		constructor: function(){ this.init(); }
	};

	return InfoSubSkills;
});
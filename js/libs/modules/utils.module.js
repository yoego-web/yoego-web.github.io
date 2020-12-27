define([], function(){

	// ARRAY TOOLS
	var ArrayTools = {
		filter: function(arr, obj){
			var col = [];
			for (var i = arr.length - 1; i >= 0; i--) {
				arr[i][obj.propertie] == obj.match ? col.push(arr[i]) : null;
			};
			return col;
		}
	};
	// ANIMATION TOOLS -- 
	/*
		-> 'getAniEndSupport' @method  retorna el prefijo soprtado por el actual navegador
		Consigue el evento de 'fin de animacion' que puede ser las q se encuentran abajo
		es el evento que se dispara cuando un elemento termina su animacion en este caso
		'transitionend' y como cualquier evento podemos dispara un fn
	*/
	function AniTool(){};
	AniTool.prototype = {
		getAniEndSupport: function(){
			var t, aniSupport,
				el = document.createElement("fakeelement");

		    var transitions = {
			    "transition"      : "transitionend",
			    "OTransition"     : "oTransitionEnd",
			    "MozTransition"   : "transitionend",
			    "WebkitTransition": "webkitTransitionEnd"
			};

		    for (t in transitions){
		    	if (el.style[t] !== undefined) aniSupport = transitions[t];
	    	}

	    	return aniSupport;
		}
	};

	return {
		'ArrayTools': ArrayTools,
		'AniTool': AniTool
	}

});


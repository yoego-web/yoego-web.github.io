/*********************************************************************
	ESTE ES UN ARCHIVO EJEMPLO DE COMO CONFIGURAR NUESTRAS RUTAS 
**********************************************************************/

//ASI DEFINIMOS una variable global ->donde 'bd' es el nombre de nuestra variable y en su callback retornamos su valor asignado.
define('db',function() {
	return [1,2,3,4];
});

//'require.config' metodo require q configurara nuestras ruta base y dependencias mas detalles abajo
require.config({
	//esta es la base raiz donde buscara los archivos
	baseUrl : '../js',
	//'paths' enrutara los archivos segun su posicion dentro de nuestra carpeta 'js'
	//aisgnamos cada 'clave' y su valor sera la ruta donde se encuentre el archivo para pasarlo asi a 'require' mas abajo
	//!!IMPORTANTE¡¡ no incluir la terminacion '.js' (obvìa q todos los archivos son javascript) a los archivos sino no dara error
	paths : {
		jquery     : 'jquery-1.9.0.min',
		underscore : 'backbone/underscore-min',
		backbone   : 'backbone/backbone-last',
		mustache   : 'backbone/mustache',
	},
	//ES importante poner configurar "shim" cada clave esta configurada en "paths",y en la primera clave le estamos diciendo
	//q exporte 'jquery' para asi los otros "AMD" puedan obtenerlo sin problemas con una variable global
	//2 clave 'backbone' en 'deps' le ponemos como variables 'jquery' y 'underscore' ya q backbone depende de ellos sino ponemos
	// esto lo bajara todo pero,a la hora de instanciar dira 'undefined',"deps" les dice dice q trabaja juntos y los bajara como uno
	//3 clave 'underscore' le decimos q exporte la variable asi '_' , "exports" exportara la variable como global a los demas "AMD"
	shim : {
		jquery : { exports : 'jquery'} ,
		//el hecho de hacer una dependencia 'deps' significa q cuando llamamos a backbone llamara automaticamente a los archivos
		//q asignamos a su array "deps :[jquery, archivo2, ...]" osea no necesitamos llamar a esos archivos solo a 'backbone'
		backbone : {
			deps : ['jquery','underscore'],
			exports : 'Backbone'
		},
		underscore : { exports : '_'} ,
		mustache   : {exports : 'mustache'}
	}
});

//aki en froma de array pasamos todos las claves('keys') de 'paths' y en su valor obvio q esta la ruta
require([
	'jquery',
	'underscore',
	'backbone',
	'mustache',
	'db', //->aki llamamos a la variable global
	'app'
]
,function($, _, Backbone, Mustache, db,App) {
	
	App.initialize();
})
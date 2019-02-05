function TransMod(){
	this.translate = function(lang, token) {
		return library[lang][token];
	}
	
	var library = new Array();
	
	library["en"] = new Array();
	library["en"]["translatable.title"] = "Translator";
	library["en"]["translatable.intro"] = "Create multilingual websites using only jQuery.";
	library["en"]["translatable.list-1"] = "Fast";
	library["en"]["translatable.list-2"] = "Simple";
	library["en"]["translatable.list-3"] = "Works with multiple languages";
	
	library["de"] = new Array();
	library["de"]["translatable.title"] = "Übersetzer";
	library["de"]["translatable.intro"] = "Erstelle mehrsprachige Websites mit nur jQuery.";
	library["de"]["translatable.list-1"] = "Schnell";
	library["de"]["translatable.list-2"] = "Einfach";
	library["de"]["translatable.list-3"] = "Anwendbar mit mehreren Sprachen";
	
	library["hu"] = new Array();
	library["hu"]["translatable.title"] = "Fordító";
	library["hu"]["translatable.intro"] = "Készíts többnyelvű weboldalakat csak jQueryvel.";
	library["hu"]["translatable.list-1"] = "Gyors";
	library["hu"]["translatable.list-2"] = "Egyszerű";
	library["hu"]["translatable.list-3"] = "Működik több nyelven";
	
}

( function(){
	
	function InitStaticText(lang){
		var langModule = new TransMod();
		
		$("#title").html(langModule.translate(lang, $("#title").attr("data-token")));
		$("#intro").html(langModule.translate(lang, $("#intro").attr("data-token")));
		$("#first-item").html(langModule.translate(lang, $("#first-item").attr("data-token")));
		$("#second-item").html(langModule.translate(lang, $("#second-item").attr("data-token")));
		$("#third-item").html(langModule.translate(lang, $("#third-item").attr("data-token")));
	}
	

	cookie.setDefault('lang', 'de', {
   expires: 8, // expires in one week
});
	InitStaticText(cookie.get('lang'));
	alert (cookie.get('lang'));
	$("#en").click(function(){ 
		InitStaticText("en");
			cookie.empty().set('lang', 'en', {
   expires: 8, // expires in one week
});
		
	});
	$("#de").click(function(){ 
		InitStaticText("de");
		cookie.empty().set('lang', 'de', {
   expires: 8, // expires in one week
});
	});
	$("#hu").click(function(){ 
		InitStaticText("hu");
		cookie.empty().set('lang', 'hu', {
   expires: 8, // expires in one week
});
	});
	
})();
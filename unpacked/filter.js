console.log("opened filter");

var loaded;
var keywords;

chrome.storage.local.get('filterKeywords', function(result){
    keywords = result.filterKeywords;
    watchPageForChange();
});

function watchPageForChange(){
	MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

	var observer = new MutationObserver(function(mutations, observer) {
	    // fired when a mutation occurs
	    mutations.forEach(function(mutation) {
	        if(mutation.type == "childList"){
	        	try {
				    loaded = mutation.addedNodes[0].childNodes[0].childNodes[0].childNodes;
				    if(loaded.length > 0){
				    	filterTimeline();
				    }
				}
				catch(err) {
				    ;
				}
			}
	    });
	});

	// define what element should be observed by the observer
	// and what types of mutations trigger the callback
	observer.observe(document.getElementsByClassName("_5pcb")[0], {
	  subtree: true,
	  childList: true
	});
}


function filterTimeline(){

	var timeline = document.getElementsByClassName("fbUserContent _5pcr");

	for (index = 0; index < timeline.length; ++index) {
	    
	    var paragraph = timeline[index].getElementsByTagName('p')[0];
	    
	    if(paragraph){
	    	paragraph = paragraph.innerText;

	    	for(indx = 0; indx < keywords.length; ++indx){
		      if(paragraph.toLowerCase().indexOf(keywords[indx].toLowerCase()) != -1){
		      	console.log("removed :" + paragraph);
				timeline[index].remove();
				break;
			  }
		    }
	    }
	    
	}
}
console.log('started watching your timeline');
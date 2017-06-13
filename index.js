//initialize the storage
//to make sure there exits an array to store the keywords
initStorage();

//populate the current keyword list
var list = document.getElementById("keyword-list");

//submit references
var submitBtn = document.getElementById("submit-button");
var textField = document.getElementById('keyword-val');

//form submit
submitBtn.addEventListener('click', function(e){
	addKeyword(textField.value);
});

function initStorage(){
	chrome.storage.local.get('filterKeywords', function(items) {
		if(!items.filterKeywords){
			chrome.storage.local.set({'filterKeywords': []}, function(){
			});
		}
	});
	console.log("initialized keywaord list");
}

renderList();

function addKeyword(keyword){
	chrome.storage.local.get('filterKeywords', function(items) {
		items.filterKeywords.push(keyword);
		chrome.storage.local.set({'filterKeywords': items.filterKeywords}, function(){
			renderList();
		});
	});
	textField.value = '';	
}

function renderList(){
	list.innerHTML = '';
	chrome.storage.local.get('filterKeywords', function(items) {
		items.filterKeywords.forEach(function(value, key){
			var entry = document.createElement('li');
			var cancel = document.createElement('button');

			cancel.addEventListener('click', function(e) {
				chrome.storage.local.get('filterKeywords', function(items) {
					var index = items.filterKeywords.indexOf(value);
					items.filterKeywords.splice(index, 1);
					chrome.storage.local.set({'filterKeywords': items.filterKeywords}, function(){
						renderList();
					});
				});
				entry.parentNode.removeChild(entry);

			}, false);

			entry.appendChild(document.createTextNode(value));
			cancel.appendChild(document.createTextNode("X"));
			entry.appendChild(cancel);
			list.appendChild(entry);
		});
	});
}
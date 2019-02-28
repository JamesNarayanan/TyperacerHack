var words = [];

var spot = 0;

var gameModes = {
	COMPETITION: 0,
	PRACTICE: 1
};

var gameMode = gameModes.COMPETITION;

var autoType;

function getFirstWord() {
	words = [];
	spot = 0;

	var passageNode = document.querySelectorAll("td[id^=gwt-uid]")[gameMode].childNodes[1].childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0];
	var children = passageNode.childNodes;
	var l = children.length;
	if(children[l - 3])
		words.push(children[l - 3].innerHTML + children[l - 2].innerHTML);
	else
		words.push(children[l - 2].innerHTML);
}

function getOtherWords() {
	var passageNode = document.querySelectorAll("td[id^=gwt-uid]")[gameMode].childNodes[1].childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0];

	var otherWords = passageNode.childNodes[passageNode.childNodes.length - 1].innerHTML;

	var otherWordsList = otherWords.split(" ");
	otherWordsList.forEach(word => words.push(word));
	words.splice(1,1); // Removes the blank spot

	console.log(words);
}

function getWords() {
	getFirstWord();
	getOtherWords();
}

function type() {
	if(document.getElementsByClassName("countdownPopup").length > 0)
		return;

	if(spot == words.length) {
		clearInterval(autoType);
		return;
	}

	var input = document.querySelectorAll("td[id^=gwt-uid]")[gameMode].childNodes[1].childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[1].childNodes[0].childNodes[0];
	input.value = words[spot++] + " ";
	fireKey(input); // Necessary to progress words
}

function fireKey(el) {
	var key = 39; // Right Arrow
	if(document.createEventObject) {
		var eventObj = document.createEventObject();
		eventObj.keyCode = key;
		el.fireEvent("onkeydown", eventObj);   
	} else if(document.createEvent) {
		var eventObj = document.createEvent("Events");
		eventObj.initEvent("keydown", true, true);
		eventObj.which = key;
		el.dispatchEvent(eventObj);
	}
}

chrome.storage.sync.get(["gameMode", "speed"], function(items) {
	if (!chrome.runtime.error) {
		gameMode = items.gameMode;
		getWords();
		autoType = setInterval(type, items.speed); // An interval of 700ms puts you about right below 100wpm
	}
});
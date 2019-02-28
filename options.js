document.body.onload = function() {
	chrome.storage.sync.get("gameMode", function(items) {
	  if (!chrome.runtime.error) {
		console.log(items);
	  }
	});
}
document.getElementById("set").onclick = function() {
	var d = document.getElementById("gameMode").value;
	chrome.storage.sync.set({ "gameMode" : d }, function() {
		if (chrome.runtime.error) {
			console.log("Runtime error.");
		}
		else {
			document.getElementById("status").style.color = "black";
			setTimeout(() => {
				document.getElementById("status").style.color = "white";
			}, 1000);
		}
	});
	// window.close();
}

document.getElementById("run").onclick = function() {
	chrome.tabs.executeScript(null, {file: "hack.js"});
}
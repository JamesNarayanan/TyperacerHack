document.body.onload = function() {
	chrome.storage.sync.get(["gameMode", "speed"], function(items) {
	  if (!chrome.runtime.error) {
		console.log(items);
		document.getElementById("gameMode").value = items.gameMode;
		document.getElementById("currentMode").innerHTML = items.gameMode == 0 ? "Competition" : "Practice";
		document.getElementById("currentSpeed").innerHTML = items.speed;
	  }
	});
}
document.getElementById("set").onclick = function() {
	var gameMode = document.getElementById("gameMode").value;
	if(document.getElementById("speed").value < 50) { // Any lower and it kicks you out
		document.getElementById("speed").value = document.getElementById("currentSpeed").innerHTML;
	}
	var speed = document.getElementById("speed").value;
	chrome.storage.sync.set({"gameMode": gameMode, "speed": speed }, function() {
		if (chrome.runtime.error) {
			console.log("Runtime error.");
		}
		else {
			document.getElementById("currentMode").innerHTML = gameMode == 0 ? "Competition" : "Practice";
			document.getElementById("currentSpeed").innerHTML = speed;
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
	window.close();
}
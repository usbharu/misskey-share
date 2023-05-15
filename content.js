const s = document.createElement("script");
s.src = chrome.runtime.getURL("inject.js");
(document.head || document.documentElement).appendChild(s);
s.parentNode.removeChild(s);

window.addEventListener("message",function (event) {

});
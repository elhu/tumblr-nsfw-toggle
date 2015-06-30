// Building toggle button
var userTools = document.getElementById('user_tools');
var toggleDiv = document.createElement("div");
var toggleIcon = document.createElement("img");
toggleDiv.classList.add('tab');
toggleDiv.classList.add('iconic');
toggleDiv.id = 'tumblr-nsfw-toggle';
toggleIcon.setAttribute('src', chrome.extension.getURL('images/evil2.png'));

// Adding button to Tumblr UI
toggleDiv.appendChild(toggleIcon);
userTools.appendChild(toggleDiv);

// Preparing the style to hide NSFW elements
var style = document.createElement('style');
style.type = 'text/css';
style.id = "tumblr-nsfw-toggle-style";
style.appendChild(document.createTextNode('div.post[data-tumblelog-content-rating="nsfw"] .post_media img { visibility: hidden; }'));

// Handling the actual toggle
toggleDiv.addEventListener('click', function() {
  var styleElt = document.getElementById("tumblr-nsfw-toggle-style");
  if (styleElt == null) {
    document.getElementsByTagName('head')[0].appendChild(style);
  } else {
    styleElt.parentNode.removeChild(styleElt);
  }
});

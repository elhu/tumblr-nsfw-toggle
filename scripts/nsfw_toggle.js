// Building toggle button
var userTools = document.getElementById('user_tools');
var toggleDiv = document.createElement("div");
var toggleIcon = document.createElement("i");
var toggleWrapper = document.createElement("a");

toggleDiv.classList.add('tab');
toggleDiv.classList.add('iconic');
toggleDiv.id = 'tumblr-nsfw-toggle';

toggleIcon.classList.add('icon_lock');
toggleIcon.style.fontSize = '22px';
toggleIcon.style.lineHeight = '30px';

// Adding button to Tumblr UI
toggleDiv.appendChild(toggleIcon);
userTools.appendChild(toggleDiv);

// Preparing the style to hide NSFW elements
var styleNode = document.createElement('style');
styleNode.type = 'text/css';
styleNode.id = 'tumblr-nsfw-toggle-style';

var style = '\
div.post[data-tumblelog-content-rating="nsfw"] .post_media img, div.post[data-tumblelog-content-rating="adult"] .post_media img {\
 visibility: hidden;\
}\
div.post[data-tumblelog-content-rating="nsfw"] .post_body, div.post[data-tumblelog-content-rating="adult"] .post_body {\
 color: #fff;\
}\
div.post[data-tumblelog-content-rating="nsfw"] .post_body .note_item, div.post[data-tumblelog-content-rating="adult"] .post_body  .note_item {\
 color: #f5f5f5;\
}'

styleNode.appendChild(document.createTextNode(style));

function hideNSFWContent() {
  toggleIcon.style.color = '#fff';
  document.getElementsByTagName('head')[0].appendChild(styleNode);
}

// Handle stored state
chrome.storage.local.get('inUse', function(items) {
  if (items['inUse'] == true) {
    hideNSFWContent();
  }
});

// Handling the actual toggle
toggleDiv.addEventListener('click', function() {
  var styleElt = document.getElementById('tumblr-nsfw-toggle-style');
  if (styleElt == null) {
    hideNSFWContent();
    chrome.storage.local.set({'inUse': true});
  } else {
    toggleIcon.style.color = 'rgba(255,255,255,.5)';
    styleElt.parentNode.removeChild(styleElt);
    chrome.storage.local.remove('inUse');
  }
});

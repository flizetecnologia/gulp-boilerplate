// font loader module

var WebFontConfig = {
  google: {
    families: ['Open Sans:300,400,700']
  }
};

(function() {
  var wf = document.createElement("script");
  wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
    '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
  wf.async = 'true';
  document.head.appendChild(wf);
})();

// loader.js: Dynamically loads the chat widget bundle and initializes it
(function() {
  var script = document.createElement('script');
  script.src = 'PATH_TO_BUNDLE/greeto-chat-widget.iife.js'; // Update with actual path
  script.onload = function() {
    if (window.GreetoChatWidget && typeof window.GreetoChatWidget.init === 'function') {
      window.GreetoChatWidget.init();
    }
  };
  document.body.appendChild(script);
})();

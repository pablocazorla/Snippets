jQuery('document').ready(function(){
  "use strict";
  if(window.SnippetApp){
    // Apply Bindings
    for(var a in SnippetApp){
      if(SnippetApp[a].DOMbindingId){
        ko.applyBindings(SnippetApp[a], document.getElementById(SnippetApp[a].DOMbindingId));

        if(SnippetApp[a].init){
          SnippetApp[a].init();
        }
      }
    }








  };
});
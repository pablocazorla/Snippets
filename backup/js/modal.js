(function() {
  "use strict";
  if (!window.SnippetApp) {
    window.SnippetApp = {};
  }

  SnippetApp.modal = (function() {
    var $window,
      $modal,
      $modalDimmer,
      $modalBody,
      $modalClose,
      moving = false,
      shown = false,
      duration = 200,

      resize = function() {
        var windowHeight = $window.height(),
          modalBodyHeight = $modalBody.height(),
          top = .5 * (windowHeight - modalBodyHeight);
        top = (top < 0) ? 0 : Math.round(top);

        $modalDimmer.css({
          'height': (modalBodyHeight > windowHeight) ? modalBodyHeight + 'px' : '100%'
        });
        $modalBody.css({
          'top': top + 'px'
        });
      };

    var M = {};

    M.init = function() {
      $window = jQuery(window);
      $modal = jQuery('#modal');
      $modalDimmer = jQuery('#modal-dimmer');
      $modalBody = jQuery('#modal-body');
      $modalClose = jQuery('.modal-close');
      resize();
      $window.resize(resize);
      $modalClose.click(function(){
        M.hide();
      });
    };
    M.show = function(callback) {
      if (!moving && !shown) {
        moving = true;
        $modal.fadeIn(duration, function() {
          moving = false;
          shown = true;
          resize();
          if (callback) {
            callback();
          }
        });
      }
    };
    M.hide = function(callback) {
      if (!moving && shown) {
        moving = true;
        $modal.fadeOut(duration, function() {
          moving = false;
          shown = false;
          if (callback) {
            callback();
          }
        });
      }
    }

    return M;
  })();
})();
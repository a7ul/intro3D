/**
 * Created by atulr on 16/08/15.
 */
(function () {
  'use strict';
  var intro3d = window.introJs.intro3d || {};

  intro3d.domManipulator = function () {
    var init3dDom = function () {
      var toolTipContainer = $('.introjs-tooltip');
      var toolTipHeight = toolTipContainer.height() + 20;
      var characterContainer = $('<div class="tooltip-3d-character"></div>');
      characterContainer.height(toolTipHeight);
      characterContainer.width(toolTipHeight);
      characterContainer.css({
        "right": -toolTipHeight, position: "absolute",
        "top": 0
      });
      characterContainer.appendTo(toolTipContainer);
    };

    return {
      init3dDom: init3dDom
    };
  }();

}());
/**
 * Created by atulr on 17/08/15.
 */
(function () {
  'use strict';

  //introInstance._currentStep is the array index of introitems not the actual step as in html

  var intro3d = window.introJs.intro3d || {};

  intro3d.initialize = function (introJSInstance) {
    intro3d.domManipulator.init3dDom();
    var getCharacterDataFromDomAndAddCharacter = function () {

      var currentToolTippedElement = introJSInstance._introItems[introJSInstance._currentStep].element;
      var characterName = $(currentToolTippedElement).attr('data-character');
      var animationName = $(currentToolTippedElement).attr('data-character-animation');
      var position = $(currentToolTippedElement).attr('data-character-position');
      var shrink = $(currentToolTippedElement).attr('data-character-shrink');
      var offset = ($('.tooltip-3d-character').height());

      intro3d.init3DCharacterScene('.tooltip-3d-character', characterName, animationName, shrink);

      if (position === 'right') {
        $('.tooltip-3d-character').css({
          "right": -1 * offset,
          "left": ''
        });
      } else {
        $('.tooltip-3d-character').css({
          "left": -1 * offset,
          "right": ''
        });
      }
    };

    getCharacterDataFromDomAndAddCharacter();

    $('.introjs-nextbutton').click(getCharacterDataFromDomAndAddCharacter);
    $('.introjs-prevbutton').click(getCharacterDataFromDomAndAddCharacter);
    $('.introjs-bullets > ul > li >a').click(getCharacterDataFromDomAndAddCharacter);
    $('.introjs-skipbutton').click(function(){
      $('.tooltip-3d-character').remove();
    });

  };
  //introJSInstance._introItems[introJSInstance._currentStep].step;

}());
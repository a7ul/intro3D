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
      intro3d.init3DCharacterScene('.tooltip-3d-character', characterName, animationName);
      if (position === 'right') {
        $('.tooltip-3d-character').css({
          "right": -1 * ($('.introjs-tooltip').height() + 20),
          "left": ''
        });
      } else {
        $('.tooltip-3d-character').css({
          "left": -1 * ($('.introjs-tooltip').height() + 20),
          "right": ''
        });
      }
    };

    getCharacterDataFromDomAndAddCharacter();

    $('.introjs-nextbutton').click(getCharacterDataFromDomAndAddCharacter);
    $('.introjs-prevbutton').click(getCharacterDataFromDomAndAddCharacter);
    $('.introjs-bullets > ul > li >a').click(getCharacterDataFromDomAndAddCharacter);

  };
  //function () {
  //  var updatedStep = introJSInstance._introItems[introJSInstance._currentStep].step;
  //  console.log('next Step Clicked ', 'updated to ', updatedStep);
  //  getCharacterDataFromDomAndAddCharacter();
  //};


}());
'use strict';
const browser = require('webextension-polyfill');
togglbutton.render('.story-state:not(.toggl)', { observe: true }, async function (
  elem
) {
  const wrap = createTag('div');
  const element = elem;
  elem = elem.parentNode.parentNode.parentNode;

  const getEpicName = function () {
    return $('#story-dialog-epic-dropdown .value', elem).textContent;
  };

  const getProjectName = function () {
    return $('.story-project .value', elem).textContent;
  };

  const getStoryId = function () {
    return $('.story-dialog .right-column .story-id input', elem).value;
  };

  const getStoryTitle = function () {
    return $('h2.story-name', elem).textContent;
  };

  // Looks for field names in string ie: {{ storyId }}
  const customDescriptionRegEx = new RegExp(/{{\s*(.*?)\s*}}/);
  // Matches field names to appropriate get function
  const customDescriptionMap = {
    epicName: getEpicName(),
    projectName: getProjectName(),
    storyId: getStoryId(),
    storyTitle: getStoryTitle()
  };
  // Replaces {{ }} fields with result of appropriate get function
  const parseCustomDescription = (templateStr) => {
    let strMatch = templateStr.match(customDescriptionRegEx);
    while (strMatch) {
      templateStr = templateStr.replace(strMatch[0], customDescriptionMap[strMatch[1]]);
      strMatch = templateStr.match(customDescriptionRegEx);
    }
    return templateStr;
  };

  let chUseCustomDescription = false;
  let chCustomDescriptionTemplate = '';
  function handleResponse (res) {
    chUseCustomDescription = res.chUseCustomDescription;
    chCustomDescriptionTemplate = res.chCustomDescriptionTemplate;
  }
  function handleError (error) {
    console.log('handleError: ', error);
  }
  await browser.runtime.sendMessage({
    type: 'getChCustomDescriptionSettings'
  }).then(handleResponse, handleError);

  const link = togglbutton.createTimerLink({
    className: 'clubhouse',
    // If useClubhouse settings then use parseCustomDescription, otherwise use the default function
    description: chUseCustomDescription ? parseCustomDescription(chCustomDescriptionTemplate) : getStoryTitle,
    projectName: getProjectName
  });

  wrap.className = 'attribute editable-attribute';
  wrap.appendChild(link);

  element.parentNode.insertBefore(wrap, element.nextSibling);
});

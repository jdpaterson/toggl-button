# Run Custom Toggl Button in browser development mode

1. clone this repo locally: https://github.com/jdpaterson/toggl-button
2. navigate to the cloned directory
3. run `npm install`
4. run `npm run build`

## Installation Instructions

  ### Instructions for Chrome

  #### Enable Development Mode and Load Unpacked Extension

  https://developer.chrome.com/extensions/getstarted#manifest

  - Open the Extension Management page by navigating to chrome://extensions.
  - The Extension Management page can also be opened by clicking on the Chrome menu, hovering over More Tools then selecting Extensions.
  Enable Developer Mode by clicking the toggle switch next to Developer mode.
  - Click the LOAD UNPACKED button and select: `/[your-toggl-button-repo]/dist/chrome`

  That should be enough for it to get installed

  ### Instructions for Firefox

  The regular Firefox will always uninstall temorary add-ons when the browser closes. To avoid this we must use Firefox Developer Edition

  #### Install Firefox Developer Edition (FDE)
  https://www.mozilla.org/en-CA/firefox/developer/

  #### Install temporary add-on
  - In FDE, navigate to this url: `about:debugging#/runtime/this-firefox`
  - Click Load Temporary Add-On and select `/[your-toggl-button-repo]/dist/firefox/manifest.json`
  - Follow the prompts to login to your toggle account

## Using Custom Clubhouse Settings

  ### Adding your Clubhouse address to integrations
  - Click the toggle-extension button in your browser window and click the 'gear' icon
  - Click on the Integrations tab
  - In the list of integrations, check "Clubhouse"
  - Scroll to Custom URLs for integrations
  - Enter `laterolabs` in the "Custom Domain URL" input
  - Select Clubhouse from the dropdown
  - Click Add

  ### Enable Custom Description Templates
  - Click the toggle-extension button in your browser window and click the 'gear' icon
  - Click the Clubhouse tab under 'Settings'
  - Enable 'Use Custom Description'
  - If nothing displays in the Custom Description Template input, add: `({{ epicName }}) [{{ storyId }}] - {{ storyTitle }}`

  That's it. Now head to app.clubhouse.io, make sure the page is refreshed, open a card, and click the `Start Timer` button.

  The toggle timer info should be formatted appropriately.

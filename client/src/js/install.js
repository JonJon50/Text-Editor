const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
  // Prevent the default prompt
  event.preventDefault();

  // Show a custom prompt
  // We can store the `event` object for later use in the `click` event handler
  const installPrompt = event;
  // Update the UI to show the install button
  butInstall.style.display = 'block';
  // Attach the `click` event handler to the install button
  butInstall.addEventListener('click', async () => {
    // Hide the install button
    butInstall.style.display = 'none';
    // Show the browser's install prompt
    installPrompt.prompt();
    // Wait for the user to respond to the prompt
    const choiceResult = await installPrompt.userChoice;
    // Log the user's response
    console.log(`User ${choiceResult.outcome}: ${choiceResult.platform}`);
  });
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async (event) => {
  // Prevent the default behavior of the button
  event.preventDefault();

  // Show the browser's install prompt
  const installPrompt = event;
  installPrompt.prompt();

  // Wait for the user to respond to the prompt
  const choiceResult = await installPrompt.userChoice;
  // Log the user's response
  console.log(`User ${choiceResult.outcome}: ${choiceResult.platform}`);
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
  // Add code here to track the installation of the PWA or to perform any other tasks
  console.log('The app was successfully installed!');
});

const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (event) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  event.preventDefault();

  // Stash the event so it can be triggered later.
  deferredPrompt = event;

  // Update UI to notify the user they can add to home screen
  butInstall.style.display = 'block';
});


// Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    // Show the prompt
    deferredPrompt.prompt();
  
    // Wait for the user to respond to the prompt
    const choiceResult = await deferredPrompt.userChoice;
  
    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }
  
    // Reset the deferredPrompt variable, since it can only be used once
    deferredPrompt = null;
  });
  
// Add a handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    console.log('The app was successfully installed');
  });
  

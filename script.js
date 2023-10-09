document.addEventListener("DOMContentLoaded", function() {
    // For the toggle functionality
    const toggleElement = document.querySelector('.toggle');
    const bioElement = document.querySelector('.bio');
    const toggleIcon = document.querySelector('.toggle-icon');
  
    toggleElement.addEventListener('click', function() {
      if (bioElement.style.display === 'none' || bioElement.style.display === '') {
        bioElement.style.display = 'block';
        toggleIcon.textContent = '[-]';
      } else {
        bioElement.style.display = 'none';
        toggleIcon.textContent = '[+]';
      }
    });
  
    // For the info boxes
    const harvestLink = document.querySelector('a[href="http://link-to-harvest-project.com"]');
    const tofthLink = document.querySelector('a[href="http://link-to-tofth-research.com"]');
    const harvestInfoBox = document.getElementById('info-box-harvest');
    const tofthInfoBox = document.getElementById('info-box-tofth');

    const overlay = document.getElementById('overlay');
  
    function showInfoBox(infoBox) {
        console.log("Function showInfoBox triggered"); // Debugging line
        overlay.style.display = 'block'; // Show the overlay
        infoBox.style.display = 'block';
        setTimeout(() => {
          infoBox.style.opacity = '1';
        }, 1);  // Giving a slight delay so that the box has time to be "displayed" before starting the fade-in
      }
  
    function hideInfoBox(infoBox) {
        overlay.style.display = 'none'; // Hide the overlay
      infoBox.style.opacity = '0';
      setTimeout(() => {
        infoBox.style.display = 'none';
      }, 300);
    }
  
    if (harvestLink) {
      harvestLink.addEventListener('click', function(e) {
        e.preventDefault();
        showInfoBox(harvestInfoBox);
      });
    }
  
    if (tofthLink) {
      tofthLink.addEventListener('click', function(e) {
        e.preventDefault();
        showInfoBox(tofthInfoBox);
      });
    }
  
    document.querySelectorAll('.info-box-close').forEach(button => {
      button.addEventListener('click', function() {
        hideInfoBox(this.closest('.info-box'));
      });
    });
  });
  


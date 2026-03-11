// Wait for the DOM to fully load before running scripts
document.addEventListener('DOMContentLoaded', () => {

  // 1. Smooth Scrolling for Navigation Links
  const navLinks = document.querySelectorAll('nav a[href^="#"]');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // 2. Smart "Book Now" Buttons on Packages
  const packageButtons = document.querySelectorAll('.package button');
  const destinationSelect = document.getElementById('destination');
  const bookingSection = document.getElementById('booking');

  packageButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      // Find the title of the package that was clicked
      const packageCard = e.target.closest('.package');
      const packageTitle = packageCard.querySelector('h3').innerText.toLowerCase();

      // Scroll smoothly to the booking form
      bookingSection.scrollIntoView({ behavior: 'smooth' });

      // Attempt to auto-select the destination based on the package title
      if (packageTitle.includes('europe') || packageTitle.includes('paris')) {
        destinationSelect.value = 'Paris';
      } else if (packageTitle.includes('maldives') || packageTitle.includes('bali')) {
        // Fallback to Bali if Maldives isn't in the dropdown list yet
        destinationSelect.value = 'Bali'; 
      } else if (packageTitle.includes('tokyo')) {
        destinationSelect.value = 'Tokyo';
      } else if (packageTitle.includes('dubai')) {
        // You might want to add Dubai to your HTML select options!
        destinationSelect.value = ''; 
      }
      
      // Briefly highlight the select box to draw the user's eye
      destinationSelect.style.transition = 'box-shadow 0.3s ease';
      destinationSelect.style.boxShadow = '0 0 10px #ffca28';
      setTimeout(() => {
        destinationSelect.style.boxShadow = 'none';
      }, 1500);
    });
  });

  // 3. Form Handling and Mock Submission
  const bookingForm = document.querySelector('form');

  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent the default page reload

    // Grab the user's name to personalize the message
    const fullName = document.getElementById('fullname').value;
    const selectedDestination = destinationSelect.value;

    // Basic validation check
    if (!selectedDestination) {
      alert('Please select a destination from the dropdown list.');
      return;
    }

    // Simulate a successful booking request
    alert(`Thank you, ${fullName}! Your booking request for ${selectedDestination} has been received. The WanderEase team will contact you shortly to finalize details.`);
    
    // Reset the form for the next use
    bookingForm.reset();
  });

});

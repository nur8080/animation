/*===== MENU SHOW =====*/ 
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            nav.classList.toggle('show')
        })
    }
}
showMenu('nav-toggle','nav-menu')

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () =>{
    const scrollDown = window.scrollY

  sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id'),
              sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')
        
        if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
            sectionsClass.classList.add('active-link')
        }else{
            sectionsClass.classList.remove('active-link')
        }                                                    
    })
}
window.addEventListener('scroll', scrollActive)

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200,
//     reset: true
});

sr.reveal('.home__data, .about__img, .skills__subtitle, .skills__text',{}); 
sr.reveal('.home__img, .about__subtitle, .about__text, .skills__img',{delay: 400}); 
sr.reveal('.icon',{ interval: 200}); 
sr.reveal('.skills__data, .work__img, .contact__input',{interval: 200}); 

/*===== COUNTING ANIMATION IN SKILLS =====*/
const skillElements = document.querySelectorAll('.skills__data'); // Each skill row
const observerOptions = {
    root: null, // Observe within the viewport
    threshold: 0.6, // At least 60% of the element must be visible
};

function startCounting(entry) {
    const skillElement = entry.target; // Current skill being observed
    const percentageElement = skillElement.querySelector('.skills__percentage');
    const skillBar = skillElement.querySelector('.skills__bar');
    const target = parseInt(percentageElement.textContent.replace('%', ''));
    let count = 0;
    const increment = Math.ceil(target / 180); // Adjust speed here
    const interval = setInterval(() => {
        count += increment;
        if (count >= target) {
            count = target;
            clearInterval(interval);
        }
        percentageElement.textContent = `${count}%`;
        skillBar.style.width = `${count}%`;
    }, 60); // Adjust interval here
}

// Create an Intersection Observer
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            startCounting(entry); // Start counting only when the skill is in view
            skillObserver.unobserve(entry.target); // Stop observing once counted
        }
    });
}, observerOptions);

// Observe each skill row
skillElements.forEach((skill) => skillObserver.observe(skill));

// Rotating role in home section with typewriter effect
// Rotating role in home section with typewriter effect
const roles = ["Developer", "Designer", "Editor"];
let currentRoleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 100; // Speed of typing in ms
const deletingSpeed = 50; // Speed of deleting in ms
const delayBetweenRoles = 2000; // Delay before starting to type next role in ms
const roleChangeInterval = 5000; // Total time before switching roles

function typeWriterEffect() {
    const roleElement = document.querySelector(".home__role");
    if (!roleElement) return;

    const currentRole = roles[currentRoleIndex];

    if (isDeleting) {
        roleElement.textContent = currentRole.substring(0, charIndex--);
    } else {
        roleElement.textContent = currentRole.substring(0, charIndex++);
    }

    // Determine the delay based on typing or deleting
    const currentSpeed = isDeleting ? deletingSpeed : typingSpeed;

    if (!isDeleting && charIndex === currentRole.length) {
        // Wait before starting to delete
        setTimeout(() => (isDeleting = true), delayBetweenRoles);
    } else if (isDeleting && charIndex === 0) {
        // Move to the next role after deleting
        isDeleting = false;
        currentRoleIndex = (currentRoleIndex + 1) % roles.length;
    }

    // Call this function again after the appropriate delay
    setTimeout(typeWriterEffect, currentSpeed);
}

// Initialize the typewriter effect
setTimeout(typeWriterEffect, typingSpeed);


document.getElementById('contactForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    try {
        const response = await fetch('https://send-h4gl.onrender.com/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, message }),
        });

        const feedbackElement = document.getElementById('feedback');

        if (response.ok) {
            feedbackElement.textContent = 'Submit successfully ';
            feedbackElement.classList.add('success');
            document.getElementById('contactForm').reset();
        } else {
            feedbackElement.textContent = 'Failed to send the message. Please try again.';
            feedbackElement.classList.add('error');
        }

        // Show the feedback message
        feedbackElement.style.display = 'block';

        // Hide the message after 5 seconds
        setTimeout(() => {
            feedbackElement.style.display = 'none';
            feedbackElement.classList.remove('success', 'error');
        }, 5000);
    } catch (error) {
        console.error('Error:', error);
        feedbackElement.textContent = 'An error occurred. Please check your internet connection.';
        feedbackElement.classList.add('error');
        feedbackElement.style.display = 'block';

        setTimeout(() => {
            feedbackElement.style.display = 'none';
            feedbackElement.classList.remove('error');
        }, 5000);
    }
});

// Adding hover and validation effects to the contact form inputs

document.addEventListener("DOMContentLoaded", () => {
    const inputs = document.querySelectorAll(".contact__input");
    const emailInput = document.getElementById("email");
  
    // Add hover effect
    inputs.forEach((input) => {
      input.addEventListener("mouseover", () => {
        input.style.borderColor = "blue";
        input.style.borderWidth = "2px";
      });
  
      input.addEventListener("mouseout", () => {
        if (!input.value) {
          input.style.borderColor = "var(--second-color)";
          input.style.borderWidth = "1.5px";
        }
      });
  
      // Add focus and input effects
      input.addEventListener("focus", () => {
        input.style.borderColor = "blue";
        input.style.borderWidth = "2px";
      });
  
      input.addEventListener("input", () => {
        if (input !== emailInput) {
          input.style.borderColor = "green";
          input.style.borderWidth = "2px";
        }
      });
  
      input.addEventListener("blur", () => {
        if (input.value) {
          if (input !== emailInput) {
            input.style.borderColor = "green";
            input.style.borderWidth = "1.5px";
          }
        } else {
          input.style.borderColor = "var(--second-color)";
          input.style.borderWidth = "1.5px";
        }
      });
    });
  
    // Validate email input dynamically
    emailInput.addEventListener("input", () => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailRegex.test(emailInput.value)) {
        emailInput.style.borderColor = "green";
        emailInput.style.borderWidth = "2px";
      } else {
        emailInput.style.borderColor = "var(--second-color)";
        emailInput.style.borderWidth = "1.5px";
      }
    });
  
    emailInput.addEventListener("blur", () => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailInput.value || !emailRegex.test(emailInput.value)) {
        emailInput.style.borderColor = "red";
        emailInput.style.borderWidth = "2px";
      } else {
        emailInput.style.borderColor = "green";
        emailInput.style.borderWidth = "1.5px";
      }
    });
  });  
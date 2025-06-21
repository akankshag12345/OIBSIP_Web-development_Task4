import { auth } from './firebaseauth.js';

// UI switching
const signUpButton = document.getElementById('signUpButton');
const signInButton = document.getElementById('signInButton');
const signUpForm = document.getElementById('signup');
const signInForm = document.getElementById('signIn');

signUpButton.addEventListener('click', () => {
  signInForm.style.display = "none";
  signUpForm.style.display = "block";
});
signInButton.addEventListener('click', () => {
  signUpForm.style.display = "none";
  signInForm.style.display = "block";
});

// Toggle password visibility
document.querySelectorAll('.toggle-password').forEach(icon => {
  icon.addEventListener('click', () => {
    const input = document.querySelector(icon.dataset.toggle);
    if (input.type === "password") {
      input.type = "text";
      icon.classList.add("fa-eye-slash");
      icon.classList.remove("fa-eye");
    } else {
      input.type = "password";
      icon.classList.remove("fa-eye-slash");
      icon.classList.add("fa-eye");
    }
  });
});

// Handle Sign Up
document.getElementById('submitSignUp').addEventListener('click', async function () {
  const email = document.getElementById('rEmail').value;
  const password = document.getElementById('rPassword').value;
  const messageDiv = document.getElementById('signUpMessage');

  messageDiv.style.display = "block";

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    messageDiv.innerHTML = "Sign Up successful!";
  } catch (error) {
    messageDiv.innerHTML = `Error: ${error.message}`;
  }
});

// Handle Sign In
document.getElementById('submitSignIn').addEventListener('click', async function () {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const messageDiv = document.getElementById('signInMessage');

  messageDiv.style.display = "block";

  try {
    await signInWithEmailAndPassword(auth, email, password);
    messageDiv.innerHTML = "Sign In successful!";
  } catch (error) {
    messageDiv.innerHTML = `Error: ${error.message}`;
  }
});


// Handle Password Recovery
document.getElementById('recoverPassword').addEventListener('click', async function (e) {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const messageDiv = document.getElementById('signInMessage');

  if (!email || !email.includes('@')) {
    messageDiv.innerHTML = "Please enter a valid email above before recovering.";
    messageDiv.style.display = "block";
    return;
  }

  try {
    await sendPasswordResetEmail(auth, email);
    messageDiv.innerHTML = "Reset email sent! Please check your inbox.";
  } catch (error) {
    messageDiv.innerHTML = `Error: ${error.message}`;
  }
});



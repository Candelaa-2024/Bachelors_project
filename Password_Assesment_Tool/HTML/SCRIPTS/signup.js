const passwordInput = document.querySelector('.input-style[type="password"]');
passwordInput.addEventListener('input', () => {
  const password = passwordInput.value;
  const strength = checkPasswordStrength(password);
  const score = scorePassword(password);
  // Display the assessment result
  const passwordStrengthIndicator = document.querySelector('.password-strength-indicator');
  passwordStrengthIndicator.innerText = strength;

  const scorepassword = document.querySelector('.score-password');
  scorepassword.innerText = score;

});
function checkPasswordStrength(password) {
    // Define minimum lengths and required character sets
    const hasNumber = /\d/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const minLength = 8;
  
    // Check password length and character sets
    if (password.length < minLength) {
      return "Weak (less than " + minLength + " characters)";
    } else if (!hasNumber || !hasUpper || !hasLower) {
      return "Moderate (lacking at least one number, uppercase, or lowercase letter)";
    } else if (!hasSpecial) {
      return "Strong (missing special characters)";
    } else {
      return "Very Strong";
    }
  }
function scorePassword(password) {
    if (password.length < 1) {
      return 0;
    }
  
    let score = 1;
    const digitRegex = /\d/;
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const specialRegex = /[!@#$%^&*(),.?":{}|<>-_+=]/;
  
    // Count characters, digits, uppercase, lowercase, and special characters
    for (let i = 0; i < password.length; i++) {
      score++;
      if (digitRegex.test(password[i])) {
        score++;
      }
      if (uppercaseRegex.test(password[i])) {
        score++;
      }
      if (lowercaseRegex.test(password[i])) {
        score++;
      }
      if (specialRegex.test(password[i])) {
        score += 2;
      }
    }
  
    return score;
}
function submit() {
  console.log(12);
  const URL = "http://localhost:5000/api/users";

  const inputs = document.getElementsByClassName("input-style");
  const checkbox = document.getElementById("checkbox");

  if (checkbox.checked === false) {
      addErrorMessage("Something went wrong! You didn't agree with our T&C!");
      return;
  }
  if (inputs[1].value === ""  || inputs[2].value === "") {
      addErrorMessage("Something went wrong! Your email or email is empty!");
      return;
  }
  
  const emailRegex = new RegExp(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/, "gm");
  const isEmailValid = emailRegex.test(inputs[1].value);
  if (!isEmailValid) {
      addErrorMessage("Invalid email provided. Please try again using a valid email...");
      return;
  }
  
  data = {
      "name": inputs[0].value,
      "email": inputs[1].value,
      "password": inputs[2].value,
      "retyped_password": inputs[3].value
  }

  const request = new XMLHttpRequest();
  request.open("POST", URL);
  request.setRequestHeader("Access-Control-Allow-Credentials", "true");
  request.setRequestHeader("Content-Type", "application/json");

  request.onload = processData();
  
  request.send(JSON.stringify(data));

  function processData() {
      
      if (request.status === 200 || request.status === 201) {
          const data = JSON.parse(request.response);
          localStorage.setItem("user-id", data.data.user_id);
          
          window.location.replace("homepage.html")
          console.log("User registered successfully!");
          
      } 
  

     if (request.status === 400 || request.status === 500) {
          // display an error
          addErrorMessage("Failed to register a new user. Please try again...");
      }

      
  }
}


function addErrorMessage(message) {
  const existingErrorMessage = document.getElementById("errorMessage");
  if (existingErrorMessage) {
      existingErrorMessage.innerText = message;
  } else {
      const errorMessage = document.createElement("p");
      const parent = document.getElementsByClassName("container")[0];
      errorMessage.id = "errorMessage";
      errorMessage.innerText = message;
      errorMessage.classList.add("error-message"); 
      parent.appendChild(errorMessage);
  }



// Add an event listener to the password input field


  const bannedPasswords = [
    "password",
    "123456",
    "123456789",
    "qwerty",
    "12345678",
    "111111",
    "12345",
    "dragon",
    "pussy",
    "baseball",
    "football",
    "letmein",
    "monkey",
    "shadow",
    "master",
    "michael",
    "jennifer",
    "jordan",
    "basketball",
    "hockey",
    "fuck",
    "sex",
    "soccer",
    "yahoo",
    "admin",
    "golf",
    "login",
    "password1",
    "qwerty123",
    "123qwe",
    "1q2w3e",
    "123123",
    "qwe123",
    "qaz123",
    "000000",
    "abc123",
    "password2",
    "!@#$%^&*",
    "passw0rd",
  ];
  
  function isBannedPassword(password) {
    return bannedPasswords.includes(password);
  }
} 
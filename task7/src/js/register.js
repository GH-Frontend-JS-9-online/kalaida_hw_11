let emailRegister = document.querySelector('#regEmail'),
  passwordRegister = document.querySelector('#regPassword'),
  passwordConfirmRegister = document.querySelector('#regConfirmPassword'),
  registerBtn = document.querySelector('#signup'),
  registerError = document.querySelector('#regError'),
  registerBlocker = document.querySelector('#signupInputBlocker'),
  registerEmail, registerPassword, registerPasswordConfirm,
  emailTestString =  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  testLetters = /[a-zA-Z]/,
  testNumber = /[0-9]/,
  usersArr = [];

if(emailRegister) {
  emailRegister.addEventListener('input', function (event) {
    registerEmail = event.target.value;
    if(!emailTestString.test(registerEmail)) {
      if(registerBlocker.classList.contains('signup-inputBlockerNo')) {
        registerBlocker.classList.remove('signup-inputBlockerNo');
      }
      registerError.innerHTML = 'Oops, looks like email or password is incorrect. Please try again.';
    } else {
      if(!registerBlocker.classList.contains('signup-inputBlockerNo') && ((registerPassword.length > 4 && registerPassword.length < 24) || testLetters.test(registerPassword) || testNumber.test(registerPassword)) && registerPasswordConfirm === registerPassword) {
        registerBlocker.classList.add('signup-inputBlockerNo');
      }
      registerError.innerHTML = '';
    }
  });
}

if(passwordRegister) {
  passwordRegister.addEventListener('input', function (event) {
    registerPassword = event.target.value;
    if(registerPassword.length < 4 || !testLetters.test(registerPassword) || !testNumber.test(registerPassword) || registerPassword.length > 24 || !emailTestString.test(registerEmail)) {
      if(registerBlocker.classList.contains('signup-inputBlockerNo')) {
        registerBlocker.classList.remove('signup-inputBlockerNo');
      }
      registerError.innerHTML = 'Oops, looks like email or password is incorrect. Please try again.';
    } else {
      if(!registerBlocker.classList.contains('signup-inputBlockerNo') && emailTestString.test(registerEmail) && registerPasswordConfirm === registerPassword) {
        registerBlocker.classList.add('signup-inputBlockerNo');
      }
      registerError.innerHTML = '';
    }
  });
}

if(passwordConfirmRegister) {
  passwordConfirmRegister.addEventListener('input', function (event) {
    registerPasswordConfirm = event.target.value;
    if(registerPasswordConfirm !== registerPassword) {
      if(registerBlocker.classList.contains('signup-inputBlockerNo')) {
        registerBlocker.classList.remove('signup-inputBlockerNo');
      }
      registerError.innerHTML = 'Please confirm your password!';
    } else {
      if(!registerBlocker.classList.contains('signup-inputBlockerNo') && emailTestString.test(registerEmail)) {
        registerBlocker.classList.add('signup-inputBlockerNo');
      }
      registerError.innerHTML = '';
    }
  });
}

if(registerBtn) {
  registerBtn.addEventListener('click', function(event) {
    event.preventDefault();
    usersArr.push({email : registerEmail, password : registerPassword});
    console.log(usersArr);
    localStorage.setItem('users', JSON.stringify(usersArr));
    alert('You\'ve successfully registered!');
  });
}
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
  usersArr = [],
  dbUsers,
  secondDbUsers;

  function sendRequest(method, url, myEmail, myPass, myId) {
    return fetch(url, {
      method : method,
      headers: {
        'Content-Type': 'application/json'
      },
      body : JSON.stringify({
        _id: myId,
        email: myEmail,
        password: myPass
      }),
    })
      .then(response => {
        if(response.ok) {
          return response.json();
        }
        return response.json().then(error => {
          const err = new Error('Something went wrong');
          err.data = error;
          throw err;
        })
      });
  }

if(emailRegister) {
  emailRegister.addEventListener('input', function (event) {
    registerEmail = event.target.value;
    if(!emailTestString.test(registerEmail)) {
      if(registerBlocker.classList.contains('signup-inputBlockerNo')) {
        registerBlocker.classList.remove('signup-inputBlockerNo');
      }
      registerError.innerHTML = 'Oops, looks like email or password is incorrect. Please try again.';
    } else {
      if(!registerBlocker.classList.contains('signup-inputBlockerNo') && ((registerPassword.length > 4) || testLetters.test(registerPassword) || testNumber.test(registerPassword)) && registerPasswordConfirm === registerPassword) {
        registerBlocker.classList.add('signup-inputBlockerNo');
      }
      registerError.innerHTML = '';
    }
  });
}

if(passwordRegister) {
  passwordRegister.addEventListener('input', function (event) {
    registerPassword = event.target.value;
    if(registerPassword.length < 4 || !testLetters.test(registerPassword) || !testNumber.test(registerPassword) || !emailTestString.test(registerEmail)) {
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
    const registerId = `f${(~~(Math.random()*1e8)).toString(16)}`;
    sendRequest('POST','http://localhost:3000/users', registerEmail, registerPassword, registerId)
      .then(() => {
        alert('You\'ve successfully registered!');
        location.reload();
      })
      .catch(error => console.log(error))
  });
}
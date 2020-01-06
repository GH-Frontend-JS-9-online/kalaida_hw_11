let emailLogin = document.querySelector('#email'),
  passwordLogin = document.querySelector('#password'),
  loginBtn = document.querySelector('#login'),
  loginMessage = document.querySelector('#loginAlert'),
  loginError = document.querySelector('#loginError'),
  loginBlocker = document.querySelector('#loginInputBlocker'),
  loginEmail, loginPassword,
  emailTestString =  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  testLetters = /[a-zA-Z]/,
  testNumber = /[0-9]/,
  dbUsers;

if(emailLogin) {
  emailLogin.addEventListener('input', function (event) {
    loginEmail = event.target.value;
    if(!emailTestString.test(loginEmail)) {
      if(loginBlocker.classList.contains('login-inputBlockerNo')) {
        loginBlocker.classList.remove('login-inputBlockerNo');
      }
      loginError.innerHTML = 'Oops, looks like email or password is incorrect. Please try again.';
    } else {
      if(!loginBlocker.classList.contains('login-inputBlockerNo') && ((loginPassword.length > 4 && loginPassword.length < 24) || testLetters.test(loginPassword) || testNumber.test(loginPassword))) {
        loginBlocker.classList.add('login-inputBlockerNo');
      }
      loginError.innerHTML = '';
    }
  });
}

if(passwordLogin) {
  passwordLogin.addEventListener('input', function (event) {
    loginPassword = event.target.value;
    if(loginPassword.length < 4 || !testLetters.test(loginPassword) || !testNumber.test(loginPassword) || loginPassword.length > 24 || !emailTestString.test(loginEmail)) {
      if(loginBlocker.classList.contains('login-inputBlockerNo')) {
        loginBlocker.classList.remove('login-inputBlockerNo');
      }
      loginError.innerHTML = 'Oops, looks like email or password is incorrect. Please try again.';
    } else {
      if(!loginBlocker.classList.contains('login-inputBlockerNo') && emailTestString.test(loginEmail)) {
        loginBlocker.classList.add('login-inputBlockerNo');
      }
      loginError.innerHTML = '';
    }
  });
}

if(loginBtn) {
  loginBtn.addEventListener('click', function (event) {
    let checkUserNumber = 0;
    dbUsers = JSON.parse(localStorage.getItem('users'))
    event.preventDefault();
    console.log(loginEmail);
    console.log(loginPassword);
    for(let i = 0; i < dbUsers.length; i++) {
      if(loginEmail === dbUsers[i].email && loginPassword === dbUsers[i].password) {
        loginMessage.classList.add('header-loginTextLogin');
        checkUserNumber = 1;
      }
    }
    if(checkUserNumber === 0) {
      alert('Account was not found!');
      location.reload();
    } else {
      setTimeout(() => {
        location.reload();
      }, 2500);
    }
  });
}



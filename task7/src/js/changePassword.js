let resetEmailInput = document.querySelector('#resetEmail'),
  resetBtn1 = document.querySelector('#reset1'),
  checkEmailBtn = document.querySelector('#checkEmailBtn'),
  reset2Pass = document.querySelector('#reset2Pass'),
  reset2ConfirmPass = document.querySelector('#reset2ConfirmPass'),
  reset1InputBlocker = document.querySelector('#reset1InputBlocker'),
  reset2InputBlocker = document.querySelector('#reset2InputBlocker'),
  reset1Error = document.querySelector('#reset1Error'),
  reset2Error = document.querySelector('#reset2Error'),
  resetForm = document.querySelector('#resetForm'),
  resetMainMessage = document.querySelector('#resetMainMessage'),
  resetEmail,
  emailTestString = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  testLetters = /[a-zA-Z]/,
  testNumber = /[0-9]/,
  dbEmails, resetEmailId, reset2Password, reset2ConfirmPassword;


if(resetEmailInput) {
  resetEmailInput.addEventListener('input', function (event) {
    resetEmail = event.target.value;
    if(!emailTestString.test(resetEmail)) {
      if(reset1InputBlocker.classList.contains('reset1-inputBlockerNo')) {
        reset1InputBlocker.classList.remove('reset1-inputBlockerNo');
      }
      reset1Error.innerHTML = 'Account was not found.';
    } else {
      if(!reset1InputBlocker.classList.contains('reset1-inputBlockerNo')) {
        reset1InputBlocker.classList.add('reset1-inputBlockerNo');
      }
      reset1Error.innerHTML = '';
    }
  });
}

if(resetBtn1) {
  resetBtn1.addEventListener('click', function (event) {
    let resetNumber;
    event.preventDefault();

    dbEmails = JSON.parse(localStorage.getItem('users'));
    for(let i = 0; i < dbEmails.length; i++) {
      if(resetEmail === dbEmails[i].email) {
        resetNumber = 1;
        resetEmailId = i;
        i = dbEmails.length - 1;
      } else {
        resetNumber = 0
      }
    }
    if(resetNumber === 1) {
      resetForm.style.display = 'none';
      resetMainMessage.style.display = 'block';
    } else {
      alert('Account was not found!');
      location.reload();
    }
  });
}

if(checkEmailBtn) {
  checkEmailBtn.addEventListener('click', function (event) {
    document.querySelector('#reset2MainRightText').style.display = 'inline-block';
    document.querySelector('#reset1Link').style.display = 'none';
    resetMainMessage.style.display = 'none';
    document.querySelector('#resetMain2Form').style.display = 'block';
  });
}

if(reset2Pass) {
  reset2Pass.addEventListener('input', function (event) {
    reset2Password = event.target.value;
    dbEmails = JSON.parse(localStorage.getItem('users'));
    console.log(resetEmail);
    if(reset2Password === dbEmails[resetEmailId].password || (reset2Password.length < 4 || !testLetters.test(reset2Password) || !testNumber.test(reset2Password) || reset2Password.length > 24)) {
      if(reset2InputBlocker.classList.contains('reset2-inputBlockerNo')) {
        reset2InputBlocker.classList.remove('reset2-inputBlockerNo');
      }
      reset2Error.innerHTML = 'Password is incorrect!';
    } else {
      if(!reset2InputBlocker.classList.contains('reset2-inputBlockerNo') && reset2ConfirmPassword === reset2Password && reset2Password !== dbEmails[resetEmailId].password) {
        reset2InputBlocker.classList.add('reset2-inputBlockerNo');
      }
      reset2Error.innerHTML = '';
    }
  });
}

if(reset2ConfirmPass) {
  reset2ConfirmPass.addEventListener('input', function (event) {
    reset2ConfirmPassword = event.target.value;
    if(reset2ConfirmPassword !== reset2Password || reset2Password === dbEmails[resetEmailId].password) {
      if(reset2InputBlocker.classList.contains('reset2-inputBlockerNo')) {
        reset2InputBlocker.classList.remove('reset2-inputBlockerNo');
      }
      reset2Error.innerHTML = 'Password is incorrect!';
    } else {
      if(!reset2InputBlocker.classList.contains('reset2-inputBlockerNo') && (reset2Password !== dbEmails[resetEmailId].password || (reset2Password.length > 4 || testLetters.test(reset2Password) || testNumber.test(reset2Password) || reset2Password.length < 24))) {
        reset2InputBlocker.classList.add('reset2-inputBlockerNo');
      }
      reset2Error.innerHTML = '';
    }
  });
}
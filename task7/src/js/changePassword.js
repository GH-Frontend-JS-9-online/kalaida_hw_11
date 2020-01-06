let resetEmailInput = document.querySelector('#resetEmail'),
  resetBtn1 = document.querySelector('#reset1'),
  reset1InputBlocker = document.querySelector('#reset1InputBlocker'),
  reset1Error = document.querySelector('#reset1Error'),
  resetForm = document.querySelector('#resetForm'),
  resetMainMessage = document.querySelector('#resetMainMessage'),
  resetEmail,
  emailTestString = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  dbEmails;

if(resetEmailInput) {
  resetEmailInput.addEventListener('input', function (event) {
    resetEmail = event.target.value;
    if(!emailTestString.test(resetEmail)) {
      if(reset1InputBlocker.classList.contains('reset1-inputBlockerNo')) {
        reset1InputBlocker.classList.remove('reset1-inputBlockerNo');
      }
      reset1Error.innerHTML = 'Oops, looks like email or password is incorrect. Please try again.';
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
        i = dbEmails.length - 1;
      } else {
        resetNumber = 0
      }
    }
    if(resetNumber === 1) {
      console.log(1);
      resetForm.style.display = 'none';
      resetMainMessage.style.display = 'block';
    }
  });
}
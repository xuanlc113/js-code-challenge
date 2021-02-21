let form = document.getElementById("form");
let button = document.getElementById("form-button");

let labels = document.getElementsByTagName("label");
let inputAddress = document.getElementById("input-address");
let inputAmount = document.getElementById("input-amount");
let inputOtp = document.getElementsByClassName("input-otp");

let inputAddressError = document.getElementById("input-address-error");
let inputAmountError = document.getElementById("input-amount-error");
let inputOtpError = document.getElementById("input-otp-error");
let inputErrors = document.getElementsByClassName("input-error");

for (let el of inputErrors) {
  el.style.display = "none";
}

for (let el of inputOtp) {
  const numberRegex = /\d/;
  el.addEventListener("input", (event) => {
    if (numberRegex.test(event.target.value)) {
      el.value = event.target.value;
    } else {
      el.value = "";
    }
  });
}

function clickEvent(first, last) {
  if (first.value.length) {
    document.getElementById(last).focus();
  }
}

form.addEventListener("submit", (event) => {
  if (!validateForm()) {
    event.preventDefault();
  }
});

function validateForm() {
  let errors = 0;
  if (!validateAddress()) {
    toggleError(inputAddress, inputAddressError, true);
    errors++;
  } else {
    toggleError(inputAddress, inputAddressError, false);
  }
  if (!validateAmount()) {
    toggleError(inputAmount, inputAmountError, true);
    errors++;
  } else {
    toggleError(inputAmount, inputAmountError, false);
  }
  if (!validateOtp()) {
    for (el of inputOtp) {
      el.classList.add("error");
    }
    inputOtpError.style.display = "block";
    errors++;
  } else {
    for (el of inputOtp) {
      el.classList.remove("error");
    }
    inputOtpError.style.display = "none";
  }
  return errors ? false : true;
}

function toggleError(input, inputError, active) {
  if (active) {
    inputError.style.display = "block";
    input.classList.add("error");
  } else {
    inputError.style.display = "none";
    input.classList.remove("error");
  }
}

function validateAddress() {
  const bitcoinRegex = /^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$/;
  if (bitcoinRegex.test(inputAddress.value)) {
    return true;
  }
  return false;
}

function validateAmount() {
  const amountRegex = /^\d+$|^\d+\.\d*$/;
  if (amountRegex.test(inputAmount.value)) {
    return true;
  }
  return false;
}

function validateOtp() {
  let otp = "";
  for (el of inputOtp) {
    otp = otp.concat(el.value);
  }
  const otpRegex = /^\d{6}$/;
  if (otpRegex.test(otp)) {
    return true;
  }
  return false;
}

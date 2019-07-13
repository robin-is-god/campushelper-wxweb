function isValidPhone(str) {
  var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
  if (!myreg.test(str)) {
    return false;
  } else {
    return true;
  }
}

function isValidPrice(str) {
  var myreg = /^[0-9]+([.]{1}[0-9]{1})?$/;
  if (!myreg.test(str)) {
    return false;
  } else {
    return true;
  }
}

function isValidStock(str) {
  var myreg = /^\+?[1-9]\d*$/;
  if (!myreg.test(str)) {
    return false;
  } else {
    return true;
  }
}

function isValidPayPass(str) {
  var myreg = new RegExp("^[0-9]{6}$");
  if (!myreg.test(str)) {
    return false;
  } else {
    return true;
  }
}

module.exports = {
  isValidPhone,
  isValidPrice,
  isValidStock,
  isValidPayPass
}
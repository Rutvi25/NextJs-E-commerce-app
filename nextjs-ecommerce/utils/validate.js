const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const validate = (name, email, password, confirmPassword) => {
  if(!name || !email || !password || !confirmPassword) {
    return 'All the fields are mendatory';
  } else if(!validateEmail(email)) {
    return 'Invalid Email';
  } else if (password.length < 6) {
    return 'Password should contain atleast 6 characters';
  } else if(password !== confirmPassword) {
    return 'password & confirm password should be same';
  }
}

export default validate;
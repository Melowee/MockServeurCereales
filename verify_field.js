function fields_ok(data) {
  console.log(data)
  if (!verify_field_name(data.firstName)) {
    throw Error("The first name is not in a valid format.")
  }

  if (!verify_field_name(data.lastName)) {
    throw Error("The last name is not in a valid format.")
  }

  if (!verify_field_email(data.email)) {
    throw Error("The email is not in a valid format.")
  }

  return true;

}

function verify_field_email(email) {
  const regex_email = /\S+@\S+\.\S+/g;

  return regex_email.test(email)
}

function verify_field_name(name) {
  const regex_name = /^[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ_\s-]{1,60}$/g;

  return regex_name.test(name)

}

module.exports = { fields_ok , verify_field_email, verify_field_name} ;



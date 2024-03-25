const firebase = require("firebase/auth");
const signOutUser = () => firebase.auth.signout();
async function logout(req, res) {
  try {
    signOutUser();
    res.status(200).json({res});
  } catch (error) {
    res.status(500);
  }
}

module.exports = logout;

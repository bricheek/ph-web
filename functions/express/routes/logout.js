const firebase = require("firebase/auth");
const auth = require("firebase/auth");
// const signOutUser = () => firebase.auth().signout().then(() => {
// console.log("Signed out user");
// });
function logout() {
  firebase.signOut(auth).then(() => {
    // Sign-out successful.
    console.log("Signed out successfully");
  }).catch((error) => {
    // An error happened.
  });
}
module.exports = logout;

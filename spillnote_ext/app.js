var domain = window.location.hostname;
domain = domain
  .replace("http://", "")
  .replace("https://", "")
  .replace("www.", "")
  .split(/[/?#]/)[0];
//gets the domain of the current window for initialization in firebase.mjs
var domain = window.location.hostname;
//retrieves hostname of web page
domain = domain
  .replace("http://", "")
  .replace("https://", "")
  .replace("www.", "")
  .split(/[/?#]/)[0];
//cleans up the domain variable

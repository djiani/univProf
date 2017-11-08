//module.exports = {loadAuthToken, saveAuthToken, clearAuthToken};
const loadAuth = (authName) =>{
  return localStorage.getItem(authName);
}
const saveAuth = (authName, authValue) =>{
  return localStorage.setItem(authName, authValue);
}

const clearAuth = (authName) =>{
  return localStorage.removeItem(authName);
}
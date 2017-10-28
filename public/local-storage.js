
const loadAuthToken = () => {
    return localStorage.getItem('authToken');
};

 const saveAuthToken = authToken => {
    localStorage.setItem('authToken', authToken);
};

 const clearAuthToken = () => {
    localStorage.removeItem('authToken');
};


//module.exports = {loadAuthToken, saveAuthToken, clearAuthToken};
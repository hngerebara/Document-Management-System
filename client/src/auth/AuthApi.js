class AuthApi {  
  static checkin(credentials) {
    const request = new Request('http://localhost:8000/users/login', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }), 
      body: JSON.stringify({auth: credentials})
    });
    return fetch(request)
      .then(response => {
        return response.json();
      }).catch(error => {
        return error;
    });
  } 
}

export default AuthApi;  
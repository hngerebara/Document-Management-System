import jwtDecode from 'jwt-decode';
import { setCurrentUser } from '../components/auth/AuthActions';

export default function CheckCurrentUser(store) {
  if (localStorage.token) {
    const decodedToken = jwtDecode(localStorage.token);
    store.dispatch(setCurrentUser({
      id: decodedToken.id,
      username: decodedToken.username,
      firstName: decodedToken.firstName,
      lastName: decodedToken.lastName,
      password: decodedToken.password,
      email: decodedToken.email,
      roleId: decodedToken.roleId

    }));
  }
}

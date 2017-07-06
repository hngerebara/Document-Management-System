import jwtDecode from 'jwt-decode';
import { setCurrentUser } from '../components/auth/AuthActions';

export default function CheckCurrentUser(store) {
  if (localStorage.token) {
    const decodedToken = jwtDecode(localStorage.token);
    store.dispatch(setCurrentUser({
      id: decodedToken.id,
      username: decodedToken.username,
      roleId: decodedToken.roleId
    }));
  }
}

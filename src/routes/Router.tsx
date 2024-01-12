import { createBrowserRouter } from 'react-router-dom';

import BoardScreen, { BoardLoader } from '../screens/BoardScreen';
import LoginPage from '../screens/LoginScreen';
import LogoutScreen from '../screens/LogoutScreen';
import SignupScreen from '../screens/SignupScreen';
import loginAction from '../utils/loginAction';
import signupAction from '../utils/signupAction';

const router = createBrowserRouter([
  {
    id: 'root',
    path: '/',
    loader: BoardLoader,
    Component: BoardScreen,
    errorElement: (
      <div>
        <p>Page not found</p>
      </div>
    ),
  },
  {
    path: '/login',
    Component: LoginPage,
    action: loginAction,
  },
  {
    path: '/signup',
    Component: SignupScreen,
    action: signupAction,
  },
  {
    path: '/logout',
    Component: LogoutScreen,
  },
]);

export default router;

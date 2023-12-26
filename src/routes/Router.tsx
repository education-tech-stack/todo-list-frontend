import { createBrowserRouter, redirect } from 'react-router-dom';

import BoardScreen, { boardLoader } from '../screens/BoardScreen';
import LoginPage from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import loginAction from '../utils/loginAction';
import signupAction from '../utils/signupAction';

const router = createBrowserRouter([
  {
    id: 'root',
    path: '/',
    loader: boardLoader,
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
    async action() {
      // We signout in a "resource route" that we can hit from a fetcher.Form
      // await fakeAuthProvider.signout();
      return redirect('/');
    },
  },
]);

export default router;

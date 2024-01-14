import { LoaderFunctionArgs, redirect } from 'react-router-dom';

import { login } from '../store/boardSlice';
import store from '../store/store';

export default async function loginAction({ request }: LoaderFunctionArgs) {
  const formData = await request.formData();

  const email = formData.get('email') as string | null;
  const password = formData.get('password') as string | null;

  // Validate our form inputs and return validation errors via useActionData()
  if (!email || !password) {
    return {
      error: 'You must provide a email & password to log in',
    };
  }

  // Sign in and redirect to the proper destination if successful.
  try {
    await store.dispatch(login({ email, password })).unwrap();
  } catch (error) {
    return {
      error: 'Invalid login attempt',
    };
  }

  return redirect('/');
}

import { AxiosError } from 'axios';
import { LoaderFunctionArgs, redirect } from 'react-router-dom';

import { signup } from '../store/boardSlice';
import store from '../store/store';

export default async function signupAction({ request }: LoaderFunctionArgs) {
  const formData = await request.formData();

  const userName = formData.get('username') as string | null;
  const email = formData.get('email') as string | null;
  const password = formData.get('password') as string | null;

  // Validate our form inputs and return validation errors via useActionData()
  if (!email || !password || !userName) {
    return {
      error: 'You must provide a email, password, & username to log in',
    };
  }

  // Sign in and redirect to the proper destination if successful.
  try {
    await store.dispatch(signup({ userName, email, password })).unwrap();
  } catch (error) {
    const err = error as AxiosError;
    const message = (err.response?.data || {
      error: 'Username or Email already taken!',
    }) as { error: string };
    // eslint-disable-next-line no-console
    console.error('error', err);
    return {
      error: message.error,
    };
  }

  return redirect('/');
}

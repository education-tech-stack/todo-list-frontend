import axios, { AxiosError } from 'axios';
import { LoaderFunctionArgs, redirect } from 'react-router-dom';

import { Authentication } from '../types';

export default async function signupAction({ request }: LoaderFunctionArgs) {
  const formData = await request.formData();

  const username = formData.get('username') as string | null;
  const email = formData.get('email') as string | null;
  const password = formData.get('password') as string | null;

  // Validate our form inputs and return validation errors via useActionData()
  if (!email || !password || !username) {
    return {
      error: 'You must provide a email, password, & username to log in',
    };
  }

  // Sign in and redirect to the proper destination if successful.
  try {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    await axios.post(`${import.meta.env.VITE_SERVER}/users/signup`, {
      userName: username,
      email,
      password,
    });
  } catch (error) {
    const err = error as AxiosError;
    const message = (err.response?.data || {
      error: 'Invalid Signup attempt',
    }) as { error: string };
    // eslint-disable-next-line no-console
    console.error('error', err);
    return {
      error: message.error,
    };
  }

  return redirect('/');
}

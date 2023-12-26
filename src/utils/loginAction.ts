import axios from 'axios';
import { LoaderFunctionArgs, redirect } from 'react-router-dom';
import { Authentication } from '../types';

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
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const auth: Authentication = await axios.post(
      `${import.meta.env.VITE_SERVER}/users/login`,
      {
        email,
        password,
      }
    );

    localStorage.setItem(
      'access_token',
      JSON.stringify(auth.data.access_token)
    );
  } catch (error) {
    return {
      error: 'Invalid login attempt',
    };
  }

  return redirect('/');
}

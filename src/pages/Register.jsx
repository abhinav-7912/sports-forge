import React from 'react';
import RegisterComponent from '../components/RegisterComponent';
import { onAuthStateChanged } from 'firebase/auth';

export default function Register() {
  return <RegisterComponent />;
}

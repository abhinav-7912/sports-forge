import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import { RouterProvider} from "react-router-dom";
import { router } from './Routes';
import {app , auth} from './firebaseConfig';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "react-quill/dist/quill.snow.css";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
    <ToastContainer />
  </React.StrictMode>,
)

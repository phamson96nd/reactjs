import React from 'react'
import ReactDOM from 'react-dom/client'
import {RouterProvider} from 'react-router-dom'
import './index.css'
import '../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import router from './router'
import {Container} from '@mui/system'
import './firebase/config'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Container maxWidth='lg' sx={{ textAlign: 'center', marginTop: '50px' }}>
    <RouterProvider router={router} />
  </Container>
);

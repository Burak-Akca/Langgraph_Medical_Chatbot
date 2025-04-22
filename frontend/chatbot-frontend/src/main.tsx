import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {GoogleOAuthProvider} from '@react-oauth/google'
const  CLIENT_ID="1014200023198-e0qgqpmgqn1m5i849vpaj5qr0mtdres0.apps.googleusercontent.com"

createRoot(document.getElementById('root')!).render(
    <GoogleOAuthProvider clientId={CLIENT_ID}>
    <App />
    </GoogleOAuthProvider>
)

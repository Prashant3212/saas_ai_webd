import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ClerkProvider } from '@clerk/clerk-react'
import { dark } from '@clerk/themes'
import './index.css'
import App from './App.tsx'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

console.log('🔐 Clerk Publishable Key:', PUBLISHABLE_KEY ? 'Found' : 'Missing');
console.log('🔐 Key starts with:', PUBLISHABLE_KEY?.substring(0, 10));

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      afterSignOutUrl="/"
      appearance={{
        baseTheme: dark
      }}
    >
      <App />
    </ClerkProvider>
  </StrictMode>,
)

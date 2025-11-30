import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './fonts.css'
import App from './App.tsx'

import UserContextProvider from './store/UserContext.tsx';
import GameContextProvider from './store/GameContext.tsx'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './utils/http.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserContextProvider>
      <GameContextProvider>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </GameContextProvider>
    </UserContextProvider>
  </StrictMode>,
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { QueryClient, QueryClientProvider, useQueryClient } from '@tanstack/react-query'
import { Provider } from 'react-redux'
import { store } from './assets/lib/store.js'
import {NextUIProvider} from "@nextui-org/react";

const queryClient = new QueryClient()


createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <QueryClientProvider client={queryClient}>
            <NextUIProvider>
                <App />
            </NextUIProvider>
        </QueryClientProvider>
    </Provider>
)

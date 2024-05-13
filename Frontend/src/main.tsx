import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { Sepolia } from '@thirdweb-dev/chains'
import { ThirdwebProvider } from '@thirdweb-dev/react'
import { App } from './app'
import './index.css'
import { Toaster } from 'sonner'
import { StateContextProvider } from './contexts'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
    <ThirdwebProvider activeChain={Sepolia} clientId={import.meta.env.VITE_TEMPLATE_CLIENT_ID}>
        <Router>
            <StateContextProvider>
                <App />
            </StateContextProvider>
        </Router>
        <Toaster richColors />
    </ThirdwebProvider>
)
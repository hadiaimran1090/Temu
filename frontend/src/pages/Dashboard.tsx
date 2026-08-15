import { useAppContext } from '../contexts/AppContext'
export function Dashboard() { const { logout, cart } = useAppContext(); return <section className="content-card"><h1>Dashboard</h1><p>You are signed in. Cart items: {cart.length}</p><button className="action-button action-button-secondary" onClick={logout}>Logout</button></section> }

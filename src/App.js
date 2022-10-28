
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Home from './components/Home';
import Users from './pages/Users';
import CashFlow from './pages/CashFlow';
import LoginPage from './pages/LoginPage';
function App() {

  const [currentUser,setCurrentUser] = useState([]);
  const [user,setUser] = useState(false)

  const RequireAuth = ({children}) =>{
    return user ? children : <Navigate to='/LoginPage'/>
  }
  return (

<div className='App'>
<BrowserRouter>
<Navbar/>
<Routes>
  <Route path="/" element={<RequireAuth><Home/></RequireAuth>} />
  <Route path="/Users" element={<RequireAuth><Users /></RequireAuth>} />
  <Route path="/LoginPage" element={<LoginPage setUser={setUser}/>} />
  <Route path="/Cashflow" element={<RequireAuth><CashFlow /></RequireAuth>} />
</Routes>
</BrowserRouter>
</div>








    
  )
}

export default App;

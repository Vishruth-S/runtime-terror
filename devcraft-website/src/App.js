import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import RequireAuth from './Components/RequireAuth';
import Transactions from './Components/Transactions';
import CreateBankAccount from './pages/CreateBankAccount';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import SendMoney from './pages/SendMoney';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/createacc" element={<RequireAuth><CreateBankAccount /></RequireAuth>} />
          <Route path="/sendmoney" element={<RequireAuth><SendMoney /></RequireAuth>} />
          <Route path="/transactions" element={<RequireAuth><Transactions /></RequireAuth>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

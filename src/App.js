import logo from './logo.svg';
import './App.css';
import Login from './components/AuthComponents/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './components/MainPage';
import { UserProvider } from './components/UserContext';
import Main from './pages/Main';
import ProtectedRoute from './components/AuthComponents/ProtectedRoute';
import LoginGuardedRoute from './components/AuthComponents/LoginGuardedRoute';

function App() {
  return (
    <Router>
      <UserProvider>
      <Routes>
      <Route
            path="/"
            element={<LoginGuardedRoute element={<Login />} />}
          />
        {/* <Route path="/main" element={<MainPage />} /> */}
        {/* <Route path="/main" element={<Main />} /> */}
        <Route path="/main" element={<ProtectedRoute element={<Main />} />}></Route>

      </Routes>
      </UserProvider>
    </Router>
  );
}

export default App;

import './App.css';
import UserState from './context/users/UserState';
import Home from './pages/Home';
import Header from './components/Header';

function App() {
  return (
    <UserState>
      <div className="App">
        <div className='header'>
          <Header />
        </div>
        <div className='content'>
          <Home />
        </div>
        <div className='footer'>
          <h2>Footer</h2>
        </div>
      </div>
    </UserState>
  );
}

export default App;

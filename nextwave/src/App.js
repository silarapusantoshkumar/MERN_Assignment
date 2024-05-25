import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddUser from './components/addUser';
import Header from './components/header';
import HorizontalTabs from './components/horizontaltabs';
import './App.css';

function App() {
  return (
    <>
     
    <Router>

    <Header/>
    <main class="main">
    <Routes>
  
      <Route path="/adduser" element={<AddUser />} />
      <Route path="/" element={<HorizontalTabs/>} />
    
    </Routes>
    </main>

    </Router>
   
  
    </>
  );
}

export default App;

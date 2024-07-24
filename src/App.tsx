import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ControlledForm from './pages/controlled-form.page';
import UnControlledForm from './pages/Uncontrolled-form.page';
import Navbar from './components/navbar/navbar.component';
import Home from './pages/home.page';


function App() {
  return (
    <>
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/controlled-form" element={<ControlledForm />} />
          <Route path="/uncontrolled-form" element={<UnControlledForm />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
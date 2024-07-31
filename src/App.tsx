import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ControlledForm from './pages/controlled-form.page';
import Navbar from './components/navbar/navbar.component';
import Home from './pages/home.page';
import FormikForm from './pages/formik-form.page';
import UncontrolledFormikForm from './pages/formik-uncontrolled.page';
import UnControlledForm from './pages/Uncontrolled-form.page';

function App() {
  return (
    <>
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/controlled-form" element={<ControlledForm />} />
          <Route path="/Uncontrolled-form" element={<UnControlledForm />} />
          <Route path="/formik-form" element={<FormikForm />} />
          <Route path="/formik-uncontrolled" element={<UncontrolledFormikForm/>} />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
     


    </>
  );
}

export default App;
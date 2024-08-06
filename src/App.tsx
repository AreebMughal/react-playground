import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar/navbar.component';
import ControlledForm from './pages/forms/controlled/controlled-form.page';
import FormikControlledForm from './pages/forms/formik/formik-controlled-form.page';
import FormikUncontrolledForm from './pages/forms/formik/formik-uncontrolled-form.page';
import HookFormControlled from './pages/forms/react-hook-form/hook-form-controlled';
import HookFormUncontrolled from './pages/forms/react-hook-form/hook-form-uncontrolled';
import TanStackControlledForm from './pages/forms/tan-stack/tanstack-controlled-form';
import TanStackUncontrolledForm from './pages/forms/tan-stack/tanstack-uncontrolled-form.page';
import UncontrolledForm from './pages/forms/uncontrolled/uncontrolled-form.page';
import Home from './pages/home/home.page';
import PageNotFound from './pages/404/404.page';

export default function App() {
  return (
    <section className="">
      <BrowserRouter>
        <Navbar />
        <div className="!h-[89vh]">
          <Routes>
            <Route path="/controlled-form" element={<ControlledForm />} />
            <Route path="/uncontrolled-form" element={<UncontrolledForm />} />
            <Route
              path="/formik-controlled-form"
              element={<FormikControlledForm />}
            />
            <Route
              path="/formik-uncontrolled-form"
              element={<FormikUncontrolledForm />}
            />
            <Route
              path="/react-hook-form-controlled"
              element={<HookFormControlled />}
            />
            <Route
              path="/react-hook-form-uncontrolled"
              element={<HookFormUncontrolled />}
            />
            <Route
              path="/tanstack-controlled-form"
              element={<TanStackControlledForm />}
            />
            <Route
              path="/tanstack-controlled-form"
              element={<TanStackUncontrolledForm />}
            />
            <Route path="/" element={<Home />} />

            {/* Place it in the end. If route not defined then load this. */}
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </section>
  );
}

import { useNavigate } from 'react-router-dom';
import Button from '../../components/buttons/button.component';

export default function PageNotFound() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 text-gray-800 text-center p-4 h-full">
      {/* <div className="p-8 rounded-lg shadow-lg bg-white"> */}
        <h1 className="text-9xl font-bold">404</h1>
        <h2 className="text-4xl mt-2">Page Not Found</h2>
        <p className="text-lg mt-4">Sorry, the page you are looking for does not exist.</p>
        <Button text="Go to Home" onClick={handleGoHome} className="mt-4 bg-gray-800 hover:bg-gray-950" />
      {/* </div> */}
    </div>
  );
}

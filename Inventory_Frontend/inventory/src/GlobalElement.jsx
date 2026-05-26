import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';
import './GlobalElement.css';

function GlobalError() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="error-page">
      {/* Simple Animated Background */}
      <div className="error-background">
        <div className="error-circle error-circle-1"></div>
        <div className="error-circle error-circle-2"></div>
        <div className="error-circle error-circle-3"></div>
      </div>

      {/* Error Content */}
      <div className="error-wrapper">
        {/* Animated 404 */}
        <div className="error-number">
          <span className="error-digit">4</span>
          <span className="error-digit error-digit-middle">0</span>
          <span className="error-digit">4</span>
        </div>

        <h1 className="error-heading">Page Not Found</h1>
        <p className="error-text">
          Sorry, The page you're looking for doesn't exist or has been moved.
        </p>

        
      </div>
    </div>
  );
}

export default GlobalError;

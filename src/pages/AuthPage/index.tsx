import { Outlet } from "react-router-dom";
import './AuthPage.scss';

function AuthPage() {
  return (
    <div className="auth-page">
      <div className="auth-page-wrapp">
        <div className="auth-page-form">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;

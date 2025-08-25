import { Link } from "react-router-dom";

export const MainNavigation = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-3">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="nav mx-auto">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Вести
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/utro" className="nav-link">
                  Вести утро
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

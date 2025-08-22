
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="absolute top-0 left-0 w-full z-40 bg-white-50 text-white backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">

          <Link to="/" className="text-2xl font-bold">
            DTU-TIMES
          </Link>

        
          <div className="flex space-x-6">
            <Link 
              to="/editions" 
              className="hover:text-white/85 transition"
            >
              Editions
            </Link>
            <Link 
              to="/create" 
              className="hover:text-white/85 transition"
            >
              Create Edition
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/basket-logo.svg";
import { User } from "lucide-react";
const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const navigate = useNavigate();
    useEffect(() => {
      const token = localStorage.getItem('token');
      setIsLoggedIn(!!token);
    });

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/login');
    }
    return (
        <nav className="sticky top-0 z-50 shadow-md w-full h-fit">
            <div className="flex flex-row bg-orange-600">
              <div className=" w-2/7 h-fit bg-orange-400 rounded-r-4xl">
                <div className="flex flex-row w-11/14 px-4 py-3 bg-orange-500 rounded-r-4xl">
                  <Link to="/">
                    <img src={logo} alt="Home" className="h-17 w-4xl pl-5"/>
                  </Link>
                </div>
              </div>
              <div className="flex flex-row justify-between px-4 py-3 w-5/7 h-21">
                <div className="flex flex-row justify-center items-center pl-16">
                  <Link to="/" className="px-2 py-2 mx-2 text-white hover:text-gray-300 hover:bg-orange-300 rounded-4xl">Home</Link>
                  <Link to="/players" className="px-2 py-2 mx-2 text-white hover:text-gray-300 hover:bg-orange-300 rounded-4xl">Players</Link>
                  <Link to="/games" className="px-2 py-2 mx-2 text-white hover:text-gray-300 hover:bg-orange-300 rounded-4xl">Games</Link>
                  <Link to="/clubs" className="px-2 py-2 mx-2 text-white hover:text-gray-300 hover:bg-orange-300 rounded-4xl">Clubs</Link>
                </div>
                <div className="w-fit h-fit flex flex-row justify-around items-center relative">
                  {isLoggedIn ? (
                    <div className="dropdown dropdown-end">
                      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar w-fit h-fit flex flex-row justify-around items-center hover:bg-orange-300 rounded-4xl">
                        <User className="w-16 h-16 px-2 py-2 mx-2 text-white hover:text-gray-300" />
                      </div>
                      <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content mt-3 z-[60] p-2 shadow rounded-box w-52 bg-[#1d1d1d]"
                      >
                        <li>
                          <Link to="/profile" className=" hover:bg-orange-300 rounded-lg">Profile</Link>
                        </li>
                        <li>
                          <Link to="/settings" className=" hover:bg-orange-300 rounded-lg">Settings</Link>
                        </li>
                        <li>
                          <button onClick={handleLogout} className=" hover:bg-orange-300 rounded-lg">Logout</button>
                        </li>
                      </ul>
                    </div>
                  ) : (
                    <div className="flex flex-row justify-center items-center mt-3">
                    <Link to="/login" className="p-3 mx-2 text-white hover:bg-orange-300 rounded-4xl">Login</Link>
                    <Link to="/signup" className="p-3 mx-2 text-white hover:bg-orange-300 rounded-4xl">Signup</Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
        </nav>
    )
}

export default Navbar
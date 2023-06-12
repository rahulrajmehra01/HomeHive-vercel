import { useContext, useCallback, useState, useEffect, useRef } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { UserContext } from "./UserContext";
import MenuItem from "./hooks/MenuItem";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Header() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const menuRef = useRef(null);


  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const onRent = useCallback(() => {
    if (!user) {
      // Handle the login functionality or redirect to the login page
      navigate("/login");
    } else {
      // Handle the rent functionality or redirect to the place form page
      navigate("/account/places/");
    }
  }, [user, navigate]);

  const logout = useCallback(async () => {
    await axios.post('/logout');
    setUser(null);
    navigate("/login"); // Redirect to the login page
    alert('Logout successful')
  }, [setUser, navigate]);

  const handleClickOutside = useCallback((event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <header className="flex justify-between px-16 pt-4">
              <Link to={'/'} className='flex items-center gap-1'>
                <img src="../images/logo1.png" alt="" className="w-12 h-12"/>
           <span className='font-bold text-xl'>HomeHive</span>
        </Link>
        {/* <div className='flex gap-2 border border-gray-300 rounded-full py-2 px-1 shadow-md shadow-gray-300'>
          <div>Anywhere</div>
        <div className="border-l border-gray-300"></div>
          <div>Anyweek</div>
        <div className="border-l border-gray-300"></div>
          <div>Add guest</div>
          <button className='bg-primary text-white p-2 rounded-full'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
          </button>
        </div> */}
         <div className="z-50 relative" ref={menuRef}>
           <div className="flex flex-row items-center gap-3">
           <div
             onClick={onRent}
             className="hidden md:flex items-center text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
           >
             <span className="mr-2">Become a Host</span>
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
               <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
             </svg>
           </div>
             <div
            onClick={toggleOpen}
            className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
          >
            <AiOutlineMenu />
            <div className='bg-gray-500 text-white rounded-full border border-gray-500 overflow-hidden p-1'>
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 relative top-1">
             <path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clip-rule="evenodd" />
             </svg>
          </div>
          {!!user && (
            <div>
              {user.name}
            </div>
          )}
          </div>
        </div>
        {isOpen && (
          <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
            <div className="flex flex-col cursor-pointer">
              {user ? (
                <>
                  <MenuItem
                    label="Account"
                    onClick={() => navigate("/account")}
                  />
                  <MenuItem
                    label="My Booking"
                    onClick={() => navigate("/account/bookings")}
                  />
                  <MenuItem
                    label="My Properties"
                    onClick={() => navigate("/account/places/")}
                  />
                  <MenuItem
                    label="My Guest Booking"
                    onClick={() => navigate("/account/guest-bookings")}
                  />
                  <hr/>
                  <MenuItem label="Logout" onClick={logout} />
                </>
              ) : (
                <>
                  <MenuItem label="Login" onClick={() => navigate("/login")} />
                  <hr />
                  <MenuItem
                    label="Sign up"
                    onClick={() => navigate("/register")}
                  />
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

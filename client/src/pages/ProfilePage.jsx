import { useContext, useState, useEffect } from "react";
import { UserContext } from "../UserContext";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from 'axios';
import AccountNav from "../AccountNav";

export default function ProfilePage() {
  const { ready, user, setUser } = useContext(UserContext);
  const [numPlaces, setNumPlaces] = useState(0);
  const [numBookings, setNumBookings] = useState(0);
  const [numguestBookings, setGuestBookings] = useState(0);

  const { subpage: currentPage } = useParams();
  const subpage = currentPage || 'profile';

  async function logout() {
    await axios.post('/logout');
    setUser(null);
  }

  useEffect(() => {
    // Fetch the number of places and bookings for the logged-in user
    async function fetchData() {
      try {
        const response = await axios.get(`/user-places`);
        setNumPlaces(response.data.length);
      } catch (error) {
        console.error(error);
      }

      try {
        const response = await axios.get(`/bookings`);
        setNumBookings(response.data.length);
      } catch (error) {
        console.error(error);
      }

      try {
        const response = await axios.get(`/host-bookings`);
        setGuestBookings(response.data.length);
      } catch (error) {
        console.error(error);
      }
    }

    if (user) {
      fetchData();
    }
  }, [user]);

  if (!ready) {
    return 'Loading...';
  }

  if (ready && !user) {
    return <Navigate to={'/login'} />;
  }

  return (
    <div>
      <AccountNav />
      {subpage === 'profile' && (
          <div className="w-auto flex items-center justify-center">
           <div className="bg-white shadow-lg rounded m-8 p-8 flex md:bg-orange items-center justify-center max-w-screen-lg">

           <div className="sm:w-auto">
                     <h3 className="text-orange text-xl font-semibold md:text-black mt-1">User Name : {user.name}</h3>  
                     <h3 className="text-orange text-xl font-semibold md:text-black mt-1">User Email : {user.email}</h3>   
            <p className="text-grey-dark font-thin text-base leading-normal md:text-black mt-2"> Number of properties listed: {numPlaces}</p>
            <p className="text-grey-dark font-thin text-base leading-normal md:text-black mt-2"> Number of bookings: {numBookings} </p>
            <p className="text-grey-dark font-thin text-base leading-normal md:text-black mt-2"> Number of my guests bookings: {numguestBookings} </p>
            <button onClick={logout} className="primary py-1 px-2 mt-6 mx-auto">Login with another account</button>
           </div>  
           </div>
           </div>
      )}
    </div>
  );
}

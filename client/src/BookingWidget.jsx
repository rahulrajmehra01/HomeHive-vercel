import { useContext, useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { UserContext } from "./UserContext.jsx";
// import Razorpay from "razorpay";

export default function BookingWidget({ place}) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [redirect, setRedirect] = useState("");
  const { user } = useContext(UserContext);
  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    // console.log("User:", user);
    if (user) {
      setName(user.name);
    }
  }, [user]);

  let numberOfNights = 0;
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }

  async function createBooking() {
    try {
      // Create the booking in the database
      const bookingResponse = await axios.post("/bookings", {
        checkIn,
        checkOut,
        numberOfGuests,
        name,
        phone,
        place: place._id,
        price: numberOfNights * place.price,
        orderId,
      });
      const bookingId = bookingResponse.data._id; // Get the booking ID from the response
  
      alert("Payment and Booking are successful! Please wait...");
      setRedirect(`/account/bookings/${bookingId}`);
    } catch (error) {
      // Handle the booking creation failure
      alert("Booking failed!");
    }
  }


  async function bookThisPlace() {
    if (!user) {
      alert("Please login to book this place.");
      return;
    }

    if (!checkIn || !checkOut || !name || !phone) {
      alert("Please fill in all the required fields.");
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      alert("Invalid phone number. Please enter a 10-digit number.");
      return;
    }

    if (user._id === place.owner.toString()) {
      alert("You cannot book your own property.");
      return;
    }
    

    try {
      
      // Redirect to Razorpay payment page
      const options = {
        key: "rzp_test_8Y64LSQLP6IhdB", // Replace with your Razorpay API Key
        amount: numberOfNights * place.price * 100, // Amount in paise (multiply by 100 for rupees)
        currency: "INR",
        name: "HomeHive",
        description: "Booking Payment",
        order_id: orderId,
        handler: function (response) {
          // Handle the payment success or failure response
          if (response.razorpay_payment_id) {
            setOrderId(response.razorpay_order_id);
            alert("Payment successful!");
            createBooking();
          } else {
            alert("Payment failed");
          }
        },
        prefill: {
          name: name,
          email: user.email,
          contact: phone,
        },
        theme: {
          color: "#EC2049",
        },
      };

      const paymentObject = new window.Razorpay(options);

      paymentObject.open();

    } catch (error) {
      // Handle any errors during the payment process
      alert("Payment failed");
    }
  }
  // console.log(user.id)
  // console.log(place.owner.toString())

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="bg-white shadow p-4 rounded-2xl">
      <div className="text-2xl text-center">
        Price: ₹{place.price} / night
      </div>
      <div className="border rounded-2xl mt-4">
        <div className="flex">
          <div className="py-3 px-4">
            <label>Check in :</label>
            <input
              type="date"
              value={checkIn}
              onChange={(ev) => setCheckIn(ev.target.value)}
              required
            />
          </div>
          <div className="py-3 px-4 border-l">
            <label>Check out : </label>
            <input
              type="date"
              value={checkOut}
              onChange={(ev) => setCheckOut(ev.target.value)}
              required
            />
          </div>
        </div>
        <div className="py-3 px-4 border-t">
          <label>Number of guests:</label>
          <input
            type="number"
            value={numberOfGuests}
            onChange={(ev) => setNumberOfGuests(ev.target.value)}
          />
        </div>
        {numberOfNights > 0 && (
          <div className="py-3 px-4 border-t">
            <label>Your full name:</label>
            <input
              type="text"
              value={name}
              onChange={(ev) => setName(ev.target.value)}
              required
            />
            <label>Phone number:</label>
            <input
              type="tel"
              value={phone}
              onChange={(ev) => setPhone(ev.target.value)}
              pattern="[0-9]{10}$"
              required
            />
          </div>
        )}
      </div>
      <button onClick={bookThisPlace} className="primary mt-4">
        Book this place
        {numberOfNights > 0 && <span> ₹{numberOfNights * place.price}</span>}
      </button>
      <div className="mt-2 pt-4">
      </div>
    </div>
  );
}

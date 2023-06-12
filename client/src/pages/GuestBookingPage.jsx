import { useEffect, useState } from 'react';
import AccountNav from "../AccountNav";
import axios from 'axios';
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import PlaceImg from '../PlaceImg';
import BookingDates from '../BookingDates';

export default function GuestBookingPage() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Fetch the bookings data from the backend API
    axios.get('/host-bookings')
      .then(response => {
        setBookings(response.data);
      })
      .catch(error => {
        console.error('Error fetching bookings:', error);
      });
  }, []);

  return (
    <div>
      <AccountNav />
      <h1 className='font-medium leading-[1.5] flex mb-8 justify-center text-2xl'>Guest Bookings</h1>
      {bookings.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 px-8">
          {bookings.map(booking => (
            <Card key={booking._id} className="shadow-lg">
              <CardHeader color="blue-gray">
                <PlaceImg place={booking.place} />
                <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60" />
              </CardHeader>
              <CardBody className='pb-2'>
                <div className="mb-3 flex items-center justify-between">
                  <Typography variant="h5" color="blue-gray" className="font-medium">
                    {booking.place.title}
                  </Typography>
                  <Typography color="blue-gray" className="flex items-center gap-1.5 font-normal">
                    {/* Additional information */}
                  </Typography>
                </div>
                <Typography color="gray">Booking ID: {booking._id}</Typography>
                <Typography color="gray">Guest Name: {booking.name}</Typography>
                <Typography color="gray">Guest Phone Number: {booking.phone}</Typography>
                <Typography variant="h6" color="gray">Total Amount Paid: {booking.price}</Typography>
                <BookingDates
                    booking={booking}
                    className="mb-2 mt-4 text-gray-500"
                  />
                <div className='pt-4'>
                <Button onClick={''} className='rounded-md hover:bg-primary hover:text-white text-black border border-black'>
                  Cancel Booking
                </Button>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      ) : (
        <p className='flex mt-16 justify-center text-2xl text-gray-500 underline'>No bookings found.</p>
      )}
    </div>
  );
}

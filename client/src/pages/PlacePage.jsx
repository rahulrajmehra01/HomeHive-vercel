import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import BookingWidget from "../BookingWidget";
import PlaceGallery from "../PageGallery";
import AddressLink from "../AddressLink";
import ReviewPage from "./ReviewPage";

export default function PlacePage() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/places/${id}`).then((response) => {
      setPlace(response.data);
    });
  }, [id]);

  if (!place) return "";

  return (
    <div className="mt-4 bg-gray-100 -mx-8 px-20 pt-8">
      <h1 className="text-3xl">{place.title}</h1>
      <AddressLink>{place.address}</AddressLink>
      <PlaceGallery place={place} />
      <div className="mt-8 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
        <div>
          <div className="my-4">
            <h2 className="font-semibold text-2xl">Description</h2>
            <ul className="list-disc list-inside">
              {place.description.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </div>
          Check-in: {place.checkIn}
          <br />
          Check-out: {place.checkOut}
          <br />
          Max number of guests: {place.maxGuests}
          <br />
          Category: {place.category}
        </div>
        <div>
          <BookingWidget place={place} />
        </div>
      </div>
      <div className="flex">
        <div className="bg-white -mx-8 px-8 py-8 border-t flex-1 rounded-l-2xl">
          <div>
            <h2 className="font-semibold text-2xl">Perks</h2>
          </div>
          <div className="mb-4 mt-2 text-sm text-gray-700 leading-5">
            {place.perks.map((perk, index) => (
              <div key={index} className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {perk}
              </div>
            ))}
          </div>
        </div>
        <div className="border-r border-gray-300 mx-8"></div>
        <div className="bg-white -mx-8 px-8 py-8 border-t flex-1 rounded-r-2xl">
          <div>
            <h2 className="font-semibold text-2xl">Extra info</h2>
          </div>
          <div className="mb-4 mt-2 text-sm text-gray-700 leading-5">
            {place.extraInfo}
          </div>
        </div>
      </div>
      <hr />
      <ReviewPage placeId={id}/>
    </div>
  );
}

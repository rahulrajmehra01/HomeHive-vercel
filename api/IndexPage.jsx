import { useEffect, useState } from "react";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import Image from "../Image.jsx";
import qs from 'query-string';
import { TbBeach, TbMountain, TbPool } from 'react-icons/tb';
import { 
  GiBarn, 
  GiBoatFishing, 
  GiCactus, 
  GiCastle, 
  GiCaveEntrance, 
  GiForestCamp, 
  GiIsland,
  GiWindmill
} from 'react-icons/gi';
import { FaSkiing } from 'react-icons/fa';
import { BsSnow } from 'react-icons/bs';
import { IoDiamond } from 'react-icons/io5';
import { MdOutlineVilla } from 'react-icons/md';

const useRouter = () => {
  const [pathname, setPathname] = useState(window.location.pathname);
  const [searchParams, setSearchParams] = useState(qs.parse(window.location.search));

  useEffect(() => {
    const handleRouteChange = () => {
      setPathname(window.location.pathname);
      setSearchParams(qs.parse(window.location.search));
    };

    window.addEventListener('popstate', handleRouteChange);

    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  const push = (url) => {
    window.history.pushState({}, '', url);
    setPathname(window.location.pathname);
    setSearchParams(qs.parse(window.location.search));
  };

  return {
    pathname,
    searchParams,
    push,
  };
};

const CategoryBox = ({ icon: Icon, label, selected, onClick }) => (
  <div
    onClick={onClick}
    className={`
      flex 
      flex-col 
      items-center 
      justify-center 
      gap-2
      p-3
      border-b-2
      hover:text-neutral-800
      transition
      cursor-pointer
      ${selected ? 'border-b-neutral-800' : 'border-transparent'}
      ${selected ? 'text-neutral-800' : 'text-neutral-500'}
    `}
  >
    <Icon size={26} />
    <div className="font-medium text-sm">{label}</div>
  </div>
);

const Container = ({ children }) => (
  <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4">{children}</div>
);

const categories = [
  {
    label: 'Beach',
    icon: TbBeach,
    description: 'This property is close to the beach!',
  },
  {
    label: 'Windmills',
    icon: GiWindmill,
    description: 'This property is has windmills!',
  },
  {
    label: 'Modern',
    icon: MdOutlineVilla,
    description: 'This property is modern!'
  },
  {
    label: 'Countryside',
    icon: TbMountain,
    description: 'This property is in the countryside!'
  },
  {
    label: 'Pools',
    icon: TbPool,
    description: 'This is property has a beautiful pool!'
  },
  {
    label: 'Islands',
    icon: GiIsland,
    description: 'This property is on an island!'
  },
  {
    label: 'Lake',
    icon: GiBoatFishing,
    description: 'This property is near a lake!'
  },
  {
    label: 'Skiing',
    icon: FaSkiing,
    description: 'This property has skiing activies!'
  },
  {
    label: 'Castles',
    icon: GiCastle,
    description: 'This property is an ancient castle!'
  },
  {
    label: 'Caves',
    icon: GiCaveEntrance,
    description: 'This property is in a spooky cave!'
  },
  {
    label: 'Camping',
    icon: GiForestCamp,
    description: 'This property offers camping activities!'
  },
  {
    label: 'Arctic',
    icon: BsSnow,
    description: 'This property is in arctic environment!'
  },
  {
    label: 'Desert',
    icon: GiCactus,
    description: 'This property is in the desert!'
  },
  {
    label: 'Barns',
    icon: GiBarn,
    description: 'This property is in a barn!'
  },
  {
    label: 'Lux',
    icon: IoDiamond,
    description: 'This property is brand new and luxurious!'
  }
];

export default function IndexPage() {
  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [filterPrice, setFilterPrice] = useState("");
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  useEffect(() => {
    axios.get("/places").then((response) => {
      setPlaces([...response.data, ...response.data, ...response.data]);
    });
  }, []);

  useEffect(() => {
    if (filterPrice) {
      const filtered = places.filter((place) => place.price === filterPrice);
      setFilteredPlaces(filtered);
    } else {
      setFilteredPlaces(places);
    }
  }, [filterPrice, places]);

  const handleFilterChange = (event) => {
    const value = event.target.value;
    setFilterPrice(value !== "" ? parseInt(value) : "");
  };

  const handleFilterSubmit = (event) => {
    event.preventDefault();
    setIsFilterVisible(false);
  };

  const handleResetFilter = () => {
    setFilterPrice("");
  };

  const router = useRouter();
  const category = router.searchParams.category;
  const pathname = router.pathname;
  const isMainPage = pathname === '/';

  const handleClick = (label) => {
    const currentQuery = { ...router.searchParams };

    const updatedQuery = {
      ...currentQuery,
      category: label,
    };

    if (currentQuery.category === label) {
      delete updatedQuery.category;
    }

    const url = qs.stringifyUrl(
      {
        url: '/',
        query: updatedQuery,
      },
      { skipNull: true }
    );

    router.push(url);
  };

  return (
    <div className="mt-8">
      <div className="flex mb-4">
        <button
          className="bg-gray-100 flex hover:bg-primary hover:text-white text-black py-2 px-4 rounded-full focus:outline-none"
          onClick={() => setIsFilterVisible(!isFilterVisible)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
          </svg>
          Filter
        </button>
        {isFilterVisible && (
          <form className="ml-4 flex" onSubmit={handleFilterSubmit}>
            <input
              type="number"
              className="border border-gray-300 rounded-full px-2 py-1"
              placeholder="Enter price"
              value={filterPrice}
              onChange={handleFilterChange}
            />
            <button
              type="submit"
              className="bg-gray-100 hover:bg-gray-300 text-black py-2 px-4 ml-2 rounded-full focus:outline-none"
            >
              Apply
            </button>
            <button
              type="button"
              className="bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 ml-2 rounded-full focus:outline-none"
              onClick={handleResetFilter}
            >
              Reset
            </button>
          </form>
        )}
      </div>
      {/* Add the following code */}
      {isMainPage && (
        <Container>
        <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
          {categories.map((item) => (
            <CategoryBox
              key={item.label}
              label={item.label}
              icon={item.icon}
              selected={category === item.label}
              onClick={() => handleClick(item.label)}
            />
          ))}
            <Link  
            to="/"
            className="bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 ml-2 rounded-full focus:outline-none"
            >
              Reset
            </Link>
          </div>
      </Container>
      )}
      <div className="grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8">
        {(filterPrice ? filteredPlaces : places).map((place) => (
          <Link to={"/place/" + place._id} key={place._id}>
            <div className="bg-gray-500 mb-2 rounded-2xl flex">
              {place.photos?.[0] && (
                <Image
                  className="rounded-2xl object-cover aspect-square"
                  src={place.photos?.[0]}
                  alt=""
                />
              )}
            </div>
            <h2 className="font-bold">{place.address}</h2>
            <h3 className="text-sm text-gray-500">{place.title}</h3>
            <div className="mt-1">
              <span className="font-bold">₹{place.price}</span> per night
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

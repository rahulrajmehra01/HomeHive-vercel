import Image from "./Image";

export default function PlaceImg({ place, index = 0, className = null }) {
  if (!place?.photos || !place.photos.length) {
    return null;
  }
  
  if (!className) {
    className = 'object-cover';
  }
  
  return (
    <Image className={className} src={place.photos[index]} alt="" />
  );
}

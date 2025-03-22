import { useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import {
  GoogleMap,
  LoadScript,
  DirectionsRenderer,
  Autocomplete,
} from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 28.7041, // Default center (Delhi, India)
  lng: 77.1025,
};

const GOOGLE_MAPS_API_KEY = import.meta.env.REACT_APP_GOOGLE_MAPS_API_KEY;

export default function UserHome() {
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [pickupRef, setPickupRef] = useState(null);
  const [dropRef, setDropRef] = useState(null);
  const [directions, setDirections] = useState(null);

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const location = `${position.coords.latitude},${position.coords.longitude}`;
      setPickup(location);
    });
  };

  const handleRoute = () => {
    if (!pickup || !drop) return;
    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin: pickup,
        destination: drop,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirections(result);
        } else {
          alert("Could not calculate route");
        }
      }
    );
  };

  const handlePlaceSelect = (type) => {
    if (type === "pickup" && pickupRef) {
      const place = pickupRef.getPlace();
      if (place && place.formatted_address) {
        setPickup(place.formatted_address);
      }
    } else if (type === "drop" && dropRef) {
      const place = dropRef.getPlace();
      if (place && place.formatted_address) {
        setDrop(place.formatted_address);
      }
    }
  };

  return (
    <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY} libraries={["places"]}>
      <div className="w-full min-h-screen bg-gray-100 flex flex-col items-center p-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Where You want to Go!
        </h2>
        <div className="w-full max-w-md space-y-4">
          {/* Pickup Location with Autocomplete */}
          <div className="relative">
            <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-500" />
            <Autocomplete
              onLoad={(ref) => setPickupRef(ref)}
              onPlaceChanged={() => handlePlaceSelect("pickup")}
            >
              <input
                type="text"
                placeholder="Enter Pickup Location"
                className="w-full p-3 pl-10 border border-gray-300 rounded-md"
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
              />
            </Autocomplete>
            <button
              className="mt-2 w-full bg-blue-500 text-white p-2 rounded"
              onClick={getCurrentLocation}
            >
              Use Current Location
            </button>
          </div>

          {/* Drop Location with Autocomplete */}
          <div className="relative">
            <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-500" />
            <Autocomplete
              onLoad={(ref) => setDropRef(ref)}
              onPlaceChanged={() => handlePlaceSelect("drop")}
            >
              <input
                type="text"
                placeholder="Enter Drop Location"
                className="w-full p-3 pl-10 border border-gray-300 rounded-md"
                value={drop}
                onChange={(e) => setDrop(e.target.value)}
              />
            </Autocomplete>
          </div>

          {/* Show Route Button */}
          <button
            className="w-full p-3 bg-yellow-500 text-white font-bold rounded-md hover:bg-yellow-600"
            onClick={handleRoute}
          >
            Show Route
          </button>
        </div>

        {/* Google Map with Directions Renderer */}
        <div className="w-full mt-6">
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={10}
          >
            {directions && <DirectionsRenderer directions={directions} />}
          </GoogleMap>
        </div>
      </div>
    </LoadScript>
  );
}

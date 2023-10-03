import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import restaurants from "./assets/googlemaps.json";
// @ts-ignore
import { Helmet } from "react-helmet";

function App() {
  const [restaurant, setRestaurant] = useState("restaurant");
  const [address, setAddress] = useState("address");
  const [priceLevel, setPriceLevel] = useState(0);
  const [rating, setRating] = useState("rating");
  const [ratingQty, setRatingQty] = useState("ratingqty");
  const [placeID, setPlaceID] = useState("ratingqty");

  const [imageLink, setImageLink] = useState("");

  // maps link: https://maps.google.com/?q=term
  // ex: https://maps.google.com/?q=5213 Yonge Street

  function truncate(str: string, n: number) {
    return str.length > n ? str.slice(0, n - 1) + "..." : str;
  }

  function renderPriceLevel(priceLevel: number) {
    if (priceLevel === 1) {
      return "$";
    } else if (priceLevel === 2) {
      return "$$";
    } else if (priceLevel === 3) {
      return "$$$";
    } else if (priceLevel === 4) {
      return "$$$$";
    } else if (priceLevel === undefined) {
      return "unknown";
    }
  }

  function getRandomElementFromArray(arr: any) {
    const randomIndex = Math.floor(Math.random() * arr.length);

    setRestaurant(arr[randomIndex]["candidates"][0]["name"]);
    setAddress(arr[randomIndex]["candidates"][0]["formatted_address"]);
    setPriceLevel(arr[randomIndex]["candidates"][0]["price_level"]);
    setRating(arr[randomIndex]["candidates"][0]["rating"] + " stars");
    setRatingQty(
      arr[randomIndex]["candidates"][0]["user_ratings_total"] + " ratings"
    );
    setPlaceID(arr[randomIndex]["candidates"][0]["place_id"]);

    // setLatLng(
    //   arr[randomIndex]["geometry"]["coordinates"][1] +
    //     ", " +
    //     arr[randomIndex]["geometry"]["coordinates"][0]
    // );
    setImageLink(
      arr[randomIndex]["candidates"][0]["photos"][0]["photo_reference"] + ".jpg"
    );
  }

  return (
    <div className="App">
      <Helmet>
        <script
          src="https://kit.fontawesome.com/3de586085d.js"
          crossOrigin="anonymous"
        ></script>
      </Helmet>
      <div className="restaurantFrame mx-auto pb-1">
        <div className="restaurantImageDiv">
          {
            <img
              className="restaurantImage align-items-center mx-auto"
              src={"../public/gmaps_photos/" + imageLink}
            ></img>
          }
        </div>
        <div className="restaurantInfoDiv">
          <div className="restaurantNameDiv align-items-center">
            <h2 className="mx-auto m-3">
              <a
                className="text-decoration-none restaurantName"
                href={
                  "https://www.google.com/maps/place/?q=place_id:" + placeID
                }
                target="_blank"
              >
                {truncate(restaurant, 30)}
                <span className="fontSize12">
                  <i className="fa-solid fa-link"></i>
                </span>
              </a>
            </h2>
          </div>
        </div>
        <p>{truncate(address, 30)}</p>
        <p>Price level: {renderPriceLevel(priceLevel)}</p>
        <p>{rating}</p>
        <p>{ratingQty}</p>
      </div>
      <div className="container">
        <div className="col-md-12 text-center mt-3">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => getRandomElementFromArray(restaurants)}
          >
            Generate random
          </button>
          <div>Number of restaurants: {restaurants.length}</div>
        </div>
      </div>
    </div>
  );
}

export default App;

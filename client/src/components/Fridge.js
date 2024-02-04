import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import Header from './Header';
import Footer from './Footer';



const Fridge = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const items = [
    {
      "_id": {
        "$oid": "65bf778964706408f868cbe4"
      },
      "user_email": "adel.muursepp@gmail.com",
      "expiration_date": "2024-02-21T11:39:49.000Z",
      "nutriscore": "a",
      "product_name": "Oat",
      "calories": {
        "$numberInt": "185"
      },
      "image": "https://images.openfoodfacts.org/images/products/541/118/811/5366/front_en.166.200.jpg"
    },
    {
      "_id": {
        "$oid": "65bf778964706408f868cbe5"
      },
      "user_email": "adel.muursepp@gmail.com",
      "expiration_date": "2024-02-21T11:40:00.000Z",
      "nutriscore": "b",
      "product_name": "Almond Milk",
      "calories": {
        "$numberInt": "80"
      },
      "image": "https://images.openfoodfacts.org/images/products/541/118/811/5366/front_en.166.200.jpg"
    },
    {
      "_id": {
        "$oid": "65bf778964706408f868cbe6"
      },
      "user_email": "adel.muursepp@gmail.com",
      "expiration_date": "2024-02-21T11:40:15.000Z",
      "nutriscore": "c",
      "product_name": "Banana",
      "calories": {
        "$numberInt": "105"
      },
      "image": "https://images.openfoodfacts.org/images/products/541/118/811/5366/front_en.166.200.jpg"
    },
    {
      "_id": {
        "$oid": "65bf778964706408f868cbe7"
      },
      "user_email": "adel.muursepp@gmail.com",
      "expiration_date": "2024-02-21T11:41:00.000Z",
      "nutriscore": "a",
      "product_name": "Spinach",
      "calories": {
        "$numberInt": "23"
      },
      "image": "https://images.openfoodfacts.org/images/products/541/118/811/5366/front_en.166.200.jpg"
    }
  ];

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div>
      <div>
          <Header />
      </div>
      <div className="welcomepage">
          <div className='welcome-box'>
              <div className="welcome-info">
                  <h2>Your Fridge</h2>
              </div>

            <div className="grid-container-wrapper">
                <div className="grid-container">
                {items?.map((item, index) => (
                    <div key={index} className="grid-item">
                        <center>{item.product_name}<br></br>
                        <img src={item.image} alt={item.product_name}></img></center><br></br><br></br>
                        NutriScore: {item.nutriscore}<br></br>
                        Calories: {item.calories.$numberInt}<br></br>
                        <b>Expires on: {item.expiration_date.split("T")[0]}<br></br></b>
                    </div>
                ))}
                </div>
            </div>
          </div>
      </div>
      <div>
          <Footer />
      </div>
      </div>
    )
  );
};

export default Fridge;


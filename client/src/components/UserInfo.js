import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import Header from './Header';
import Footer from './Footer';

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

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
                  <img src={user.picture} alt={user.name} />
                  <br></br><br></br>
                  <h2>Welcome back, {user.name}!</h2>
                  <br></br><br></br>
                  <p>You are logged in as {user.email}</p>
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

export default Profile;


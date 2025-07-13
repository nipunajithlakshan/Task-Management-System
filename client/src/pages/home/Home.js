import React from "react";
import bgImage from "../../assets/bg-Image.jpg";
import "./Home.css"; 
import Button from "../../component/button/Button";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="home-container">
      <img src={bgImage} alt="bg" className="bg-image" />
      <div className="overlay-text">
        <h1 className="typewriter">Welcome to Task Management System</h1>
        <p className="motion-effect">Join us for an unforgettable experience!</p>
        <div className="motion-effect">
        <Button
       
          style={{ width: "200px",height:"55px" }}
          variant="register"
          onClick={() => navigate(`/login`)}
        >
          <span className="button-text">Get Start </span>
        </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;

import React from "react";
import AdvertisementImage from "../../assets/images/advertisement.png";
import Member1Image from "../../assets/images/member-1.png";
import Member2Image from "../../assets/images/member-2.png";
import Member3Image from "../../assets/images/member-3.png";

const RightBar = () => {
  return (
    <div className="right-sidebar">
      <div className="sidebar-title">
        <h4>Events</h4>
        <a href="#">See All</a>
      </div>

      <div className="event">
        <div className="event-left">
          <h3>18</h3>
          <span>March</span>
        </div>
        <div className="event-right">
          <h4>Social Media</h4>
          <p>
            <i className="fas fa-map-marker-alt"></i> Willson Tech Park
          </p>
          <a href="#">More Info</a>
        </div>
      </div>
      <div className="event">
        <div className="event-left">
          <h3>22</h3>
          <span>March</span>
        </div>
        <div className="event-right">
          <h4>Mobile Marketing</h4>
          <p>
            <i className="fas fa-map-marker-alt"></i> Willson Tech Park
          </p>
          <a href="#">More Info</a>
        </div>
      </div>

      <div className="sidebar-title">
        <h4>Advertisement</h4>
        <a href="#">Close</a>
      </div>

      {/* Use the imported images */}
      <img src={AdvertisementImage} alt="Advertisement" className="sidebar-ad" />

      <div className="sidebar-title">
        <h4>Conversation</h4>
        <a href="#">Hide Chat</a>
      </div>

      <div className="online-list">
        <div className="online">
          <img src={Member1Image} alt="Member 1" />
        </div>
        <p>Alison Mina</p>
      </div>
      <div className="online-list">
        <div className="online">
          <img src={Member2Image} alt="Member 2" />
        </div>
        <p>Jackson Aston</p>
      </div>
      <div className="online-list">
        <div className="online">
          <img src={Member3Image} alt="Member 3" />
        </div>
        <p>Samona Rose</p>
      </div>
    </div>
  );
};

export default RightBar;

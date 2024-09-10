import React from "react";
import "./aboutPage.scss";

function AboutPage() {
  return (
    <div className="aboutPage">
      <div className="textContainer1">
        <div className="wrapper">
          <h1 className="title">About Us</h1>
          <p className="title_dis">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos
            explicabo suscipit cum eius, iure est nulla animi consequatur
            facilis id pariatur fugit quos laudantium temporibus dolor ea
            repellat provident impedit!
          </p>
          <h2 className="title1">Our Mission</h2>
          <p className="title1_dis">
            At our real estate platform, our mission is to connect buyers and
            sellers seamlessly, providing an exceptional experience for both
            parties involved.
          </p>
          <h2 className="title1">Why Choose Us?</h2>
          <div className="reasons">
            <div className="reason">
              <h3>Years of Experience</h3>
              <p>With over 16 years of experience in the real estate industry, we bring expertise and knowledge to every transaction.</p>
            </div>
            <div className="reason">
              <h3>Awards</h3>
              <p>We have been recognized with over 200 awards for our outstanding service and achievements.</p>
            </div>
            <div className="reason">
              <h3>Properties</h3>
              <p>Our platform offers a selection of over 2000 properties, ensuring you'll find your dream home.</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default AboutPage;

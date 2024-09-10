// ContactUsPage.jsx
import React from "react";
import "./contactPage.scss";

function ContactUsPage() {
  return (
    <div className="contactUsPage">
      <div className="imgContainer">
        <img src="/bg.png" alt="Contact background" />
      </div>
      <div className="textContainer">
        <div className="wrapper">
          <h1 className="title">Contact Us</h1>
          <p>Email: example@example.com</p>
          <p>Phone: +1234567890</p>
          <p>Address: 123 Main St, City, Country</p>
          {/* <ContactDetails /> */}
        </div>
      </div>
    </div>
  );
}

export default ContactUsPage;

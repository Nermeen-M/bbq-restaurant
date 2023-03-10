import BookingForm from "../components/BookingForm";
// import ownerImage from "../assets/images/owner.png";

export default function Contact() {
  return (
    <div className="contact container">
      {/* <img src={ownerImage} className="main-image" alt="" /> */}
      <h3>Opening times</h3>
      <p className="timing">
        <span>Monday to Friday: </span>
        <span>09:00 AM - 08:00 PM</span>
      </p>
      <p className="timing">
        <span>Saturday and Sunday: </span>
        <span>09:00 AM - 05:00 PM</span>
      </p>

      <h3>Book a table</h3>
      <BookingForm />

      <h3>Address</h3>
      <p>Luddingsbo Mekanikusv 76</p>
      <p>Stockholm, Sweden.</p>
      <div className="map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d130266.39963652029!2d17.841971254832547!3d59.326066814030526!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465f763119640bcb%3A0xa80d27d3679d7766!2sStockholm!5e0!3m2!1sen!2sse!4v1674252752452!5m2!1sen!2sse"
          width="100%"
          height="450"
          style={{ border: 0 }}
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
}

// components/ContactForm.js
import './main.css';  

export default function ContactForm() {
  return (
    <div className="contactContainer">
      <div className="formSection">
        <h2 className="heading">
          Contact <span>Us</span>
        </h2>

        <form className="form">
          <input type="text" placeholder="Name" required />
          <div className="row">
            <input type="email" placeholder="E-mail" required />
            <input type="tel" placeholder="Phone" required />
          </div>
          <textarea placeholder="Message" rows="5" required></textarea>
          <button type="submit">Submit</button>
        </form>
      </div>

      <div className="mapSection">
        <iframe
          title="VELOX Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.476210827251!2d70.05007781493837!3d22.997432984962266!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39576b1e1ba346a7%3A0xa69dbf3a2c93b4b1!2sVELOX%20SOLUTION!5e0!3m2!1sen!2sin!4v1665567890015!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
}

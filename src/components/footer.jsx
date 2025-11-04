import Link from 'next/link';
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaYoutube, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import Image from 'next/image';
import '../app/main.css'; 

export default function Footer() {
  return (
    <footer className="footer">
      <div className="topSection">
        <div className="column">
          <Image
                      src="/images/logo_text1.png"
                      alt="Velox Logo"
                      width={200}
                      height={50}
                      priority
                    /> 
          <p className="description">
            We provide better home service by professionals you’ve never seen before.
          </p>
          <div className="socialIcons">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaLinkedinIn /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaYoutube /></a>
          </div>
        </div>

        <div className="column">
          <h4>Contact Us</h4>
          <ul className="contactList">
            <li><FaMapMarkerAlt /> S-06, 2nd Floor, Momai Complex, Near Blue Club, Khodiyar Colony, Jamnagar 361001</li>
            <li><FaPhoneAlt /> +91 9714 883 884</li>
            <li><FaPhoneAlt /> +91 90 818 818 89</li>
            <li><FaEnvelope /> veloxsolutionpvtltd@gmail.com</li>
          </ul>
        </div>

        <div className="column">
          <h4>Newsletters</h4>
          <p>Sign up to receive more tips and coupons for our services.</p>
          <div className="newsletter">
            <input type="email" placeholder="Enter your Email" />
            <button>Subscribe</button>
          </div>  
        </div>
      </div>

      <hr className="divider" />

      <div className="serving">
        <p>Serving in</p>
        <div className="cities">
          {['India', 'Surat', 'Jamnagar', 'Ahmedabad', 'Rajkot', 'Porbandar', 'Chiloda', 'Morbi'].map((city) => (
            <button key={city}>{city}</button>
          ))}
        </div>
      </div>

      <div className="bottomLinks">
        <a href="#">Terms & Conditions</a>
        <a href="#">Return & Refund Policy</a>
        <a href="#">Privacy Policy</a>
        <a href="#">End-User License Agreement</a>
        <a href="#">Disclaimer</a>
        <a href="#">Cookie Policy</a>
      </div>

      <div className="copyright">
        Copyright © 2021 All Rights Reserved
      </div>
    </footer>
  );
}

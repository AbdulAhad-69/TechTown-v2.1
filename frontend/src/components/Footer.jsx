import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer>
            <div className="footer-grid">
                <div className="footer-col">
                    <h4>About Us</h4>
                    <ul>
                        <li><Link to="/about">Why TechTown?</Link></li>
                        <li><Link to="/privacy">Privacy Policy</Link></li>
                        <li><Link to="/terms">Terms & Conditions</Link></li>
                        <li><Link to="/refund">Refund Policy</Link></li>
                    </ul>
                </div>
                <div className="footer-col">
                    <h4>Customer Service</h4>
                    <ul>
                        <li><Link to="/faq">FAQ</Link></li>
                        <li><Link to="/contact">Contact Us</Link></li>
                        <li><Link to="/stores">Store Locator</Link></li>
                        <li><Link to="/tracking">Track Order</Link></li>
                    </ul>
                </div>
                <div className="footer-col">
                    <h4>Contact</h4>
                    <ul>
                        <li><a href="mailto:info@techtown.com.bd">info@techtown.com.bd</a></li>
                        <li><a href="tel:+8801969067909">+880 1969 067 909</a></li>
                        <li>Mirpur, Dhaka-1216, Bangladesh</li>
                    </ul>
                </div>
                <div className="footer-col">
                    <h4>Follow Us</h4>
                    <ul>
                        <li><a href="https://www.facebook.com/techtown" target="_blank" rel="noreferrer">Facebook</a></li>
                        <li><a href="https://www.instagram.com/techtown" target="_blank" rel="noreferrer">Instagram</a></li>
                        <li><a href="https://www.linkedin.com/company/techtown" target="_blank" rel="noreferrer">LinkedIn</a></li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2026 TechTown BD Ltd. No Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
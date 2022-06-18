import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    return (
        <footer className="min-w-full h-16 flex flex-col justify-center bg-slate-400">
            <nav className="px-20 flex text-lg justify-between items-center">
                <img src="../postbank-logo.png" alt="logo" className="w-44" />

                <ul className="w-1/4 flex justify-evenly">
                    <li><a href="https://www.facebook.com/PostbankBG" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faFacebook} size="2x" className="text-white"></FontAwesomeIcon></a></li>
                    <li><a href="https://www.instagram.com/postbankbg.official/" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faInstagram} size="2x" className="text-white"></FontAwesomeIcon></a></li>
                    <li><a href="https://www.linkedin.com/company/postbankbg" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faLinkedinIn} size="2x" className="text-white"></FontAwesomeIcon></a></li>
                </ul>
            </nav>
        </footer>
    );
};

export default Footer;
import { Link } from 'react-router-dom';
import { FaSearch, FaShoppingCart, FaUser } from 'react-icons/fa';
import logo from '../assets/images/TechTown Logo1.png';

const Navbar = () => {
    return (
        <header>
            <nav className="navbar">
                <div className="logo">
                    <Link to="/">
                        <img src={logo} alt="TechTown Logo" />
                    </Link>
                </div>

                <div className="search-container">
                    <form style={{ display: 'flex', width: '100%', position: 'relative' }}>
                        <input
                            type="text"
                            name="search"
                            className="search-bar"
                            placeholder="Search devices..."
                            autoComplete="off"
                        />
                        <button
                            type="submit"
                            style={{ background: 'none', border: 'none', position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', color: '#888' }}
                        >
                            <FaSearch />
                        </button>
                    </form>
                </div>

                <ul className="nav-links">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/products">Shop</Link></li>
                </ul>

                <div className="nav-icons" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <Link to="/cart" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <FaShoppingCart />
                        <span style={{ fontSize: '14px', fontWeight: 'bold' }}>(0)</span>
                    </Link>
                    <Link to="/dashboard">
                        <FaUser />
                    </Link>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
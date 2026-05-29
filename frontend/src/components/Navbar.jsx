import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaShoppingCart, FaUser, FaSignOutAlt, FaTachometerAlt } from 'react-icons/fa';
import logo from '../assets/images/TechTown Logo1.png';

// Import our new global stores
import { useCartStore } from '../store/cartStore';
import { useAuthStore } from '../store/authStore';

const Navbar = () => {
    const navigate = useNavigate();
    
    // Extract what we need from the stores
    const getCartCount = useCartStore(state => state.getCartCount);
    const cartCount = getCartCount();
    
    const { user, logout } = useAuthStore();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

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

                <div className="nav-icons" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <Link to="/cart" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <FaShoppingCart />
                        <span style={{ fontSize: '14px', fontWeight: 'bold', color: 'var(--primary-orange)' }}>
                            ({cartCount})
                        </span>
                    </Link>

                    {/* Conditional Rendering: Check if user is logged in */}
                    {user ? (
                        <>
                            <Link to="/dashboard" title="Dashboard">
                                <FaTachometerAlt />
                            </Link>
                            <button onClick={handleLogout} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#333', fontSize: '18px' }} title="Logout">
                                <FaSignOutAlt />
                            </button>
                        </>
                    ) : (
                        <Link to="/login" title="Login">
                            <FaUser />
                        </Link>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
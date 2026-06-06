import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useProductStore } from '../store/productStore';
import { FaMobileAlt, FaLaptop, FaCamera, FaStopwatch, FaArrowRight } from 'react-icons/fa';

const Home = () => {
    const { products, fetchProducts, isLoading } = useProductStore();

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    // Dynamically filter the newest products for each category
    const smartphones = products.filter(p => p.category === 'Smartphones').slice(0, 4);
    const laptops = products.filter(p => p.category === 'Laptops').slice(0, 4);

    return (
        <div style={{ backgroundColor: '#f9f9f9', minHeight: '100vh', paddingBottom: '60px' }}>
            
            {/* HERO SECTION */}
            <section style={{ 
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7)), url('/assets/images/content.jpg')`, 
                backgroundSize: 'cover', 
                backgroundPosition: 'center', 
                height: '400px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                textAlign: 'center',
                color: '#fff'
            }}>
                <div>
                    <h1 style={{ fontSize: '42px', fontWeight: 'bold', marginBottom: '15px', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
                        Get your desired device instantly
                    </h1>
                    <p style={{ fontSize: '18px', marginBottom: '30px', color: '#e0e0e0' }}>
                        Bangladesh's first e-commerce marketplace. Where you can't buy anything.
                    </p>
                    <Link to="/shop" style={{ 
                        background: '#fff', 
                        color: 'var(--primary-orange, #f57224)', 
                        padding: '12px 30px', 
                        borderRadius: '4px', 
                        textDecoration: 'none', 
                        fontWeight: 'bold', 
                        fontSize: '16px',
                        transition: '0.3s ease',
                        display: 'inline-block'
                    }}>
                        Start Browsing
                    </Link>
                </div>
            </section>

            {/* QUICK CATEGORY ACTIONS */}
            <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                gap: '20px', 
                marginTop: '-40px', 
                position: 'relative', 
                zIndex: 10,
                flexWrap: 'wrap',
                padding: '0 20px'
            }}>
                {[
                    { icon: <FaMobileAlt size={24} />, name: 'Phones', link: '/shop?category=Smartphones' },
                    { icon: <FaLaptop size={24} />, name: 'Laptops', link: '/shop?category=Laptops' },
                    { icon: <FaCamera size={24} />, name: 'Cameras', link: '/shop?category=Cameras' },
                    { icon: <FaStopwatch size={24} />, name: 'Watches', link: '/shop?category=Smart Watches' }
                ].map((cat, idx) => (
                    <Link key={idx} to={cat.link} style={{ 
                        background: '#fff', 
                        width: '140px', 
                        padding: '20px', 
                        borderRadius: '8px', 
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)', 
                        textAlign: 'center', 
                        textDecoration: 'none', 
                        color: '#333',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '10px',
                        transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.15)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)'; }}
                    >
                        <div style={{ color: '#555' }}>{cat.icon}</div>
                        <span style={{ fontWeight: 'bold', fontSize: '14px' }}>{cat.name}</span>
                    </Link>
                ))}
            </div>

            {/* SMARTPHONE HOT COLLECTION */}
            <div style={{ maxWidth: '1200px', margin: '60px auto 0', padding: '0 20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', borderBottom: '2px solid #eee', paddingBottom: '10px' }}>
                    <h2 style={{ margin: 0, fontSize: '22px', color: '#333' }}>Smartphone Hot Collection</h2>
                    <Link to="/shop?category=Smartphones" style={{ color: 'var(--primary-orange, #f57224)', textDecoration: 'none', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '14px' }}>
                        View all <FaArrowRight />
                    </Link>
                </div>

                {isLoading ? (
                    <p style={{ textAlign: 'center', color: '#777' }}>Loading Smartphones...</p>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '25px' }}>
                        {smartphones.length > 0 ? smartphones.map(product => (
                            <ProductCard key={product._id} product={product} />
                        )) : <p style={{ color: '#777' }}>No smartphones listed yet.</p>}
                    </div>
                )}
            </div>

            {/* LAPTOP HOT COLLECTION */}
            <div style={{ maxWidth: '1200px', margin: '60px auto 0', padding: '0 20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', borderBottom: '2px solid #eee', paddingBottom: '10px' }}>
                    <h2 style={{ margin: 0, fontSize: '22px', color: '#333' }}>Laptop Hot Collection</h2>
                    <Link to="/shop?category=Laptops" style={{ color: 'var(--primary-orange, #f57224)', textDecoration: 'none', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '14px' }}>
                        View all <FaArrowRight />
                    </Link>
                </div>

                {isLoading ? (
                    <p style={{ textAlign: 'center', color: '#777' }}>Loading Laptops...</p>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '25px' }}>
                        {laptops.length > 0 ? laptops.map(product => (
                            <ProductCard key={product._id} product={product} />
                        )) : <p style={{ color: '#777' }}>No laptops listed yet.</p>}
                    </div>
                )}
            </div>

        </div>
    );
};

// =========================================================
// STRICT, UNIFORM PRODUCT CARD
// =========================================================
const ProductCard = ({ product }) => {
    return (
        <Link to={`/product/${product._id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block', height: '100%' }}>
            <div style={{ 
                background: '#fff', 
                borderRadius: '8px', 
                padding: '15px', 
                boxShadow: '0 2px 10px rgba(0,0,0,0.04)', 
                border: '1px solid #eaeaea',
                transition: 'all 0.3s ease',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                boxSizing: 'border-box'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.08)'; e.currentTarget.style.borderColor = '#f57224'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.04)'; e.currentTarget.style.borderColor = '#eaeaea'; }}
            >
                {/* STRICT GREY IMAGE BOX */}
                <div style={{ 
                    height: '200px', 
                    width: '100%',
                    backgroundColor: '#f4f6f8', 
                    borderRadius: '6px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    marginBottom: '15px', 
                    padding: '15px',
                    boxSizing: 'border-box'
                }}>
                    <img 
                        src={product.image?.startsWith('http') || product.image?.startsWith('/assets') ? product.image : `/${product.image}`} 
                        alt={product.name} 
                        style={{ 
                            maxWidth: '100%', 
                            maxHeight: '100%', 
                            objectFit: 'contain',
                            mixBlendMode: 'multiply' // Makes white backgrounds disappear into the grey
                        }} 
                        onError={(e) => e.target.src = '/assets/images/TechTown Logo1.png'}
                    />
                </div>
                
                {/* UNIFORM TEXT CONTAINER */}
                <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' }}>
                    <h4 style={{ 
                        margin: '0 0 10px 0', 
                        fontSize: '14px', 
                        color: '#333', 
                        lineHeight: '1.4',
                        // Forces exact 2-line height even if name is short or extremely long
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        minHeight: '39px' 
                    }}>
                        {product.name}
                    </h4>
                    <p style={{ margin: 0, fontSize: '18px', fontWeight: 'bold', color: 'var(--primary-orange, #f57224)' }}>
                        ৳ {product.price.toLocaleString()}
                    </p>
                </div>
            </div>
        </Link>
    );
};

export default Home;
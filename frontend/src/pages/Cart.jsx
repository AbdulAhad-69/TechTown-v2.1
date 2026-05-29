import { Link } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';

const Cart = () => {
    const { cart, removeFromCart, getCartTotal } = useCartStore();

    if (cart.length === 0) {
        return (
            <div className="text-center mt-60 mb-80">
                <h2>Your Cart is Empty</h2>
                <p style={{ marginTop: '20px' }}>Looks like you haven't added any devices yet.</p>
                <Link to="/products" style={{ display: 'inline-block', marginTop: '20px', padding: '10px 20px', background: 'var(--primary-orange, #f57224)', color: '#fff', textDecoration: 'none', borderRadius: '4px', fontWeight: 'bold' }}>
                    Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <section className="mt-60 mb-80" style={{ maxWidth: '1000px', margin: '60px auto', padding: '0 20px' }}>
            <h2 style={{ marginBottom: '30px' }}>Shopping Cart</h2>

            <div className="order-table" style={{ padding: '20px' }}>
                {cart.map((item) => (
                    <div key={item._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee', padding: '15px 0' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                            <img src={item.image} alt={item.name} style={{ width: '80px', height: '80px', objectFit: 'contain' }} />
                            <div>
                                <h4 style={{ margin: 0 }}>{item.name}</h4>
                                <p style={{ margin: '5px 0 0 0', color: '#777' }}>Quantity: {item.quantity}</p>
                            </div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <p style={{ fontWeight: 'bold', fontSize: '18px', margin: '0 0 10px 0' }}>৳ {(item.price * item.quantity).toLocaleString()}</p>
                            <button
                                onClick={() => removeFromCart(item._id)}
                                style={{ background: '#dc3545', color: '#fff', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ))}

                <div style={{ marginTop: '30px', textAlign: 'right', padding: '20px', background: '#f9f9f9', borderRadius: '8px' }}>
                    <h3>Total: <span style={{ color: 'var(--primary-orange, #f57224)' }}>৳ {getCartTotal().toLocaleString()}</span></h3>
                    <p style={{ fontSize: '12px', color: '#777', marginBottom: '20px' }}>*Shipping calculated at checkout</p>

                    <button style={{ padding: '12px 30px', background: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px' }}>
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Cart;
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { useAuthStore } from '../store/authStore';
import { toast } from 'react-toastify';
import axios from 'axios';

const Checkout = () => {
    const navigate = useNavigate();
    const { cart, getCartTotal, clearCart } = useCartStore();
    const { user } = useAuthStore();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        shipping_address: '',
        phone: user?.phone || '', 
        payment_method: 'Cash on Delivery', 
        bank: ''
    });

    useEffect(() => {
        if (!user) {
            toast.error("Please log in to proceed to checkout");
            navigate('/login');
        } else if (cart.length === 0) {
            navigate('/products');
        }
    }, [user, cart, navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
            ...(name === "payment_method" && value !== "Card Payment" ? { bank: "" } : {})
        }));
    };

    const handlePaymentSelect = (method) => {
        setFormData(prev => ({
            ...prev,
            payment_method: method,
            ...(method !== "Card Payment" ? { bank: "" } : {})
        }));
    };

    const handleBankSelect = (bankName) => {
        setFormData(prev => ({ ...prev, bank: bankName }));
    };

    const placeOrder = async (e) => {
        e.preventDefault();
        
        if (formData.payment_method === 'Card Payment' && !formData.bank) {
            return toast.warning("Please select a bank for your card payment.");
        }

        setIsSubmitting(true);

        try {
            const orderItems = cart.map(item => ({
                productId: item.productId,
                name: item.name,
                price: item.price, 
                quantity: item.quantity,
                image: item.image
            }));

            const orderPayload = {
                orderItems,
                shipping_address: formData.shipping_address,
                phone: formData.phone,
                payment_method: formData.payment_method,
                bank: formData.bank
            };

            const res = await axios.post('/api/orders', orderPayload);

            toast.success(`Order placed successfully! Order ID: ${res.data._id.substring(0, 8)}`);
            clearCart(); 
            navigate('/dashboard'); 

        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to place order");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!user || cart.length === 0) return null;

    const deliveryFee = 120;
    const cartTotal = getCartTotal();
    const finalTotal = cartTotal + deliveryFee;

    return (
        <>
            <style>{`
                .checkout-wrapper {
                    max-width: 1100px;
                    margin: 40px auto 80px;
                    padding: 0 20px;
                }
                .checkout-grid {
                    display: grid;
                    grid-template-columns: 1.5fr 1fr;
                    gap: 30px;
                }
                .checkout-section {
                    background: #fff;
                    padding: 30px;
                    border-radius: 12px;
                    box-shadow: 0 8px 30px rgba(0,0,0,0.04);
                }
                .section-title {
                    font-size: 18px;
                    font-weight: 700;
                    color: #333;
                    margin-bottom: 20px;
                    padding-bottom: 10px;
                    border-bottom: 2px solid #f1f5f9;
                }
                .form-group {
                    margin-bottom: 20px;
                }
                .form-label {
                    display: block;
                    font-size: 14px;
                    font-weight: 600;
                    color: #475569;
                    margin-bottom: 8px;
                }
                .custom-input {
                    width: 100%;
                    padding: 12px 15px;
                    border: 1px solid #cbd5e1;
                    border-radius: 8px;
                    font-size: 14px;
                    transition: all 0.3s;
                    background: #f8fafc;
                }
                .custom-input:focus {
                    background: #fff;
                    border-color: var(--primary-orange, #f57224);
                    outline: none;
                    box-shadow: 0 0 0 3px rgba(245, 114, 36, 0.1);
                }
                
                /* Payment Cards UI */
                .payment-options {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
                    gap: 15px;
                    margin-bottom: 20px;
                }
                .pay-card {
                    border: 2px solid #e2e8f0;
                    border-radius: 8px;
                    padding: 15px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    background: #fff;
                    text-align: center;
                    gap: 10px;
                }
                .pay-card img {
                    height: 35px;
                    object-fit: contain;
                }
                .pay-card span {
                    font-size: 12px;
                    font-weight: 600;
                    color: #64748b;
                }
                .pay-card:hover {
                    border-color: #cbd5e1;
                    transform: translateY(-2px);
                }
                .pay-card.active {
                    border-color: var(--primary-orange, #f57224);
                    background: #fffaf7;
                    box-shadow: 0 4px 12px rgba(245, 114, 36, 0.1);
                }
                .pay-card.active span {
                    color: var(--primary-orange, #f57224);
                }

                /* Receipt Sidebar */
                .receipt-box {
                    background: #f8fafc;
                    border-radius: 12px;
                    padding: 25px;
                    position: sticky;
                    top: 100px;
                }
                .receipt-item {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 15px;
                    font-size: 14px;
                    color: #475569;
                }
                .receipt-total {
                    display: flex;
                    justify-content: space-between;
                    margin-top: 20px;
                    padding-top: 20px;
                    border-top: 2px dashed #cbd5e1;
                    font-size: 18px;
                    font-weight: 800;
                    color: #0f172a;
                }
                .checkout-btn {
                    width: 100%;
                    padding: 16px;
                    background: var(--primary-orange, #f57224);
                    color: #fff;
                    border: none;
                    border-radius: 8px;
                    font-size: 16px;
                    font-weight: 700;
                    cursor: pointer;
                    transition: 0.3s;
                    margin-top: 25px;
                    box-shadow: 0 4px 15px rgba(245, 114, 36, 0.3);
                }
                .checkout-btn:hover {
                    background: #e0601b;
                    transform: translateY(-2px);
                }
                .checkout-btn:disabled {
                    background: #cbd5e1;
                    cursor: not-allowed;
                    transform: none;
                    box-shadow: none;
                }

                @media (max-width: 768px) {
                    .checkout-grid {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>

            <section className="checkout-wrapper">
                <div className="checkout-grid">
                    
                    {/* LEFT COLUMN: Form & Payment */}
                    <div className="checkout-left">
                        <form id="checkout-form" onSubmit={placeOrder}>
                            
                            {/* Shipping Details */}
                            <div className="checkout-section" style={{ marginBottom: '30px' }}>
                                <h3 className="section-title">1. Delivery Information</h3>
                                
                                <div className="form-group">
                                    <label className="form-label">Contact Phone</label>
                                    <input
                                        type="text"
                                        name="phone"
                                        className="custom-input"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        placeholder="01XXXXXXXXX"
                                        required
                                    />
                                </div>

                                <div className="form-group" style={{ marginBottom: 0 }}>
                                    <label className="form-label">Shipping Address</label>
                                    <textarea
                                        name="shipping_address"
                                        className="custom-input"
                                        value={formData.shipping_address}
                                        onChange={handleInputChange}
                                        required
                                        rows="3"
                                        placeholder="House No, Road No, Area, City"
                                    />
                                </div>
                            </div>

                            {/* Payment Selection */}
                            <div className="checkout-section">
                                <h3 className="section-title">2. Payment Method</h3>
                                
                                <div className="payment-options">
                                    <div 
                                        className={`pay-card ${formData.payment_method === 'Cash on Delivery' ? 'active' : ''}`}
                                        onClick={() => handlePaymentSelect('Cash on Delivery')}
                                    >
                                        <img src="/assets/images/cod.png" alt="COD" />
                                        <span>Cash on Delivery</span>
                                    </div>
                                    
                                    <div 
                                        className={`pay-card ${formData.payment_method === 'bKash' ? 'active' : ''}`}
                                        onClick={() => handlePaymentSelect('bKash')}
                                    >
                                        <img src="/assets/images/bKash.png" alt="bKash" />
                                        <span>bKash</span>
                                    </div>

                                    <div 
                                        className={`pay-card ${formData.payment_method === 'Card Payment' ? 'active' : ''}`}
                                        onClick={() => handlePaymentSelect('Card Payment')}
                                    >
                                        <img src="/assets/images/bankcard.jpg" alt="Card" style={{ borderRadius: '4px' }} />
                                        <span>Bank / Card</span>
                                    </div>
                                </div>

                                {/* Conditional Bank Selection (Shows only if Card Payment is selected) */}
                                {formData.payment_method === "Card Payment" && (
                                    <div style={{ marginTop: '25px', padding: '20px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                                        <label className="form-label">Select Your Bank</label>
                                        <div className="payment-options" style={{ marginBottom: 0 }}>
                                            
                                            <div 
                                                className={`pay-card ${formData.bank === 'BRAC Bank' ? 'active' : ''}`}
                                                onClick={() => handleBankSelect('BRAC Bank')}
                                            >
                                                <img src="/assets/images/brac.jpg" alt="BRAC Bank" style={{ borderRadius: '4px' }} />
                                            </div>

                                            <div 
                                                className={`pay-card ${formData.bank === 'IFIC Bank' ? 'active' : ''}`}
                                                onClick={() => handleBankSelect('IFIC Bank')}
                                            >
                                                <img src="/assets/images/ific.png" alt="IFIC Bank" style={{ borderRadius: '4px' }} />
                                            </div>

                                            <div 
                                                className={`pay-card ${formData.bank === 'Islami Bank' ? 'active' : ''}`}
                                                onClick={() => handleBankSelect('Islami Bank')}
                                            >
                                                <img src="/assets/images/ibbl.png" alt="Islami Bank" style={{ borderRadius: '4px' }} />
                                            </div>

                                        </div>
                                    </div>
                                )}
                            </div>
                        </form>
                    </div>

                    {/* RIGHT COLUMN: Order Summary Receipt */}
                    <div className="checkout-right">
                        <div className="receipt-box">
                            <h3 className="section-title">Order Summary</h3>
                            
                            <div style={{ marginBottom: '20px', maxHeight: '200px', overflowY: 'auto' }}>
                                {cart.map((item, index) => (
                                    <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                                        <img src={item.image} alt={item.name} style={{ width: '40px', height: '40px', objectFit: 'contain', background: '#fff', borderRadius: '4px', padding: '2px' }} />
                                        <div style={{ flex: 1, fontSize: '13px', color: '#333', lineHeight: '1.4' }}>
                                            <div style={{ fontWeight: '600', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '180px' }}>{item.name}</div>
                                            <div style={{ color: '#64748b' }}>Qty: {item.quantity}</div>
                                        </div>
                                        <div style={{ fontSize: '13px', fontWeight: 'bold' }}>
                                            ৳{(item.price * item.quantity).toLocaleString()}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="receipt-item">
                                <span>Subtotal</span>
                                <span style={{ fontWeight: 'bold', color: '#333' }}>৳{cartTotal.toLocaleString()}</span>
                            </div>
                            <div className="receipt-item">
                                <span>Delivery Fee</span>
                                <span style={{ fontWeight: 'bold', color: '#333' }}>৳{deliveryFee.toLocaleString()}</span>
                            </div>
                            
                            <div className="receipt-total">
                                <span>Total Payable</span>
                                <span style={{ color: 'var(--primary-orange, #f57224)' }}>৳{finalTotal.toLocaleString()}</span>
                            </div>

                            <button 
                                form="checkout-form"
                                type="submit" 
                                className="checkout-btn"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Processing Securely...' : 'Place Order Now'}
                            </button>
                            <p style={{ textAlign: 'center', fontSize: '12px', color: '#94a3b8', marginTop: '15px' }}>
                                By placing this order, you agree to TechTown's Terms & Conditions.
                            </p>
                        </div>
                    </div>

                </div>
            </section>
        </>
    );
};

export default Checkout;
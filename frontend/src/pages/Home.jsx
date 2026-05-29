import { useEffect } from 'react';
import { useProductStore } from '../store/productStore';
import ProductCard from '../components/ProductCard';

const Home = () => {
    const { products, fetchProducts, isLoading } = useProductStore();

    // The empty array [] means this runs exactly ONCE when the page loads
    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    if (isLoading) {
        return <h2 className="text-center mt-60 mb-80">Loading latest devices...</h2>;
    }

    return (
        <section className="mt-60 mb-80" style={{ maxWidth: '1200px', margin: '60px auto', padding: '0 20px' }}>
            <h2 className="text-center" style={{ marginBottom: '40px', fontSize: '32px' }}>Latest Devices</h2>
            
            {products.length === 0 ? (
                <p className="text-center">No products found. The database is empty!</p>
            ) : (
                <div className="grid-auto-fit">
                    {/* Loop through the array of products from MongoDB */}
                    {products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            )}
        </section>
    );
};

export default Home;
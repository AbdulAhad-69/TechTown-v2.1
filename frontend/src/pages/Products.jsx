import { useEffect } from 'react';
import { useProductStore } from '../store/productStore';
import ProductCard from '../components/ProductCard';

const Products = () => {
    const { products, fetchProducts, isLoading } = useProductStore();

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    if (isLoading) {
        return <h2 className="text-center mt-60 mb-80">Loading the TechTown Catalog...</h2>;
    }

    return (
        <section className="mt-60 mb-80" style={{ maxWidth: '1200px', margin: '60px auto', padding: '0 20px' }}>
            <h2 className="text-center" style={{ marginBottom: '40px', fontSize: '32px' }}>All Products</h2>

            {products.length === 0 ? (
                <p className="text-center">No products found in the database.</p>
            ) : (
                <div className="grid-auto-fit">
                    {products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            )}
        </section>
    );
};

export default Products;
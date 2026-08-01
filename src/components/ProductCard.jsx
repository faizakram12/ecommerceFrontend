import "../css/ProductCard.css";

function ProductCard({ product, onAddToCart }) {

    return (

        <div className="product-card">

            <img
                src={
                    product.imageUrl && product.imageUrl.trim() !== ""
                        ? product.imageUrl
                        : "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop"
                }
                alt={product.productName}
                className="product-image"
            />

            <h2>{product.productName}</h2>

            <p>{product.description}</p>

            <h3>₹ {product.price}</h3>

            <p>Stock : {product.stock}</p>

            <button onClick={() => onAddToCart(product)}>
                Add To Cart
            </button>

        </div>

    );

}

export default ProductCard;
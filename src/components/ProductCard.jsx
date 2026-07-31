import "../css/ProductCard.css";

function ProductCard({ product, onAddToCart }) {

    return (

        <div className="product-card">

            <img
                src={
                    product.imageUrl && product.imageUrl.trim() !== ""
                        ? product.imageUrl
                        : "https://placehold.co/300x200?text=No+Image"
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
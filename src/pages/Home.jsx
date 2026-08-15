import { useEffect, useState } from "react";
import API from "../api/api";
import ProductCard from "../components/ProductCard";
import { USER_ID } from "../constants";
import Category from "../category/Category";
import "../css/Home.css";

function Home() {

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        getAllProducts();
        getAllCategories();

    }, []);

    const getAllProducts = async () => {

        try {

            setLoading(true);

            const response = await API.get("/products");

            setProducts(response.data);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };

    const getAllCategories = async () => {

        try {

            const response = await API.get("/categories");

            setCategories(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    const filterCategory = async (categoryId) => {

        setSelectedCategory(categoryId);

        try {

            setLoading(true);

            if (categoryId === "") {

                const response = await API.get("/products");

                setProducts(response.data);

            } else {

                const response = await API.get("/products/category/" + categoryId);

                setProducts(response.data);

            }

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };

    const addToCart = async (product) => {

        const cart = {

            userId: USER_ID,
            productId: product.id,
            quantity: 1

        };

        try {

            await API.post("/cart", cart);

            alert(product.productName + " added to cart.");

        } catch (error) {

            console.log(error);

            const message =
                (error.response && error.response.data) ||
                "Unable to add product.";

            alert(message);

        }

    };

    const filteredProducts = products.filter((product) =>
        product.productName.toLowerCase().includes(search.toLowerCase())
    );

    if (loading) {

        return <h2 style={{ textAlign: "center", marginTop: "50px" }}>Loading...</h2>;

    }

    return (

        <div>

            
            <div style={{
                maxWidth: '1000px',
                margin: '20px auto',
                background: 'linear-gradient(90deg, #10035c 0%, #274cf1 100%)',
                borderRadius: '16px',
                padding: '30px 24px',
                color: 'white',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginLeft: '20px',
                marginRight: '20px'
            }}>
                <div>
                    <div style={{
                        background: 'rgba(255,255,255,0.2)',
                        display: 'inline-block',
                        padding: '4px 10px',
                        borderRadius: '20px',
                        fontSize: '11px',
                        fontWeight: '700',
                        marginBottom: '10px'
                    }}>
                        ⚡ Limited Time
                    </div>
                    <h2 style={{ fontSize: '28px', fontWeight: '800', margin: '0 0 6px 0', lineHeight: '1.1' }}>
                        Mega Sale - Up to 50% OFF
                    </h2>
                    <p style={{ margin: 0, opacity: 0.9, fontSize: '14px' }}>
                        On Electronics & Fashion • Ends tonight
                    </p>
                </div>
                <button style={{
                    background: 'black',
                    color: 'white',
                    border: 'none',
                    padding: '12px 20px',
                    borderRadius: '8px',
                    fontWeight: '600',
                    cursor: 'pointer'
                }}>
                    Shop Now →
                </button>
            </div>

            <div className="search-container">

                <input
                    type="text"
                    placeholder="Search Product..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <select
                    value={selectedCategory}
                    onChange={(e) => filterCategory(e.target.value)}
                >

                    <option value="">All Categories</option>

                    {
                        categories.map((category) => (

                            <option
                                key={category.id}
                                value={category.id}
                            >
                                {category.categoryName}
                            </option>

                        ))
                    }

                </select>

            </div>

            <div className="home-container">

                {
                    filteredProducts.length === 0 ?

                        <h2>No Products Found</h2>

                        :

                        filteredProducts.map((product) => (

                            <ProductCard
                                key={product.id}
                                product={product}
                                onAddToCart={addToCart}
                            />

                        ))
                }

            </div>

            <Category />

        </div>

    );

}

export default Home;
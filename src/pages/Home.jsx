import { useEffect, useState } from "react";
import API from "../api/api";
import ProductCard from "../components/ProductCard";
import "../css/Home.css";

const USER_ID = "6a6caa518e5dcc43e1fa9917";

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

            alert("Unable to add product.");

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

        </div>

    );

}

export default Home;
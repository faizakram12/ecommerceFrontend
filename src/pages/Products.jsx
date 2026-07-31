import { useEffect, useState } from "react";
import API from "../api/api";
import "../css/ProductPage.css";

function Products() {

    const emptyProduct = {
        productName: "",
        description: "",
        price: "",
        stock: "",
        imageUrl: ""
    };

    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState(emptyProduct);
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {

        try {

            const response = await API.get("/products");

            setProducts(response.data);

        } catch (error) {

            console.log(error);

        }

    };


    const saveProduct = async () => {

        try {

            if (editId == null) {

                await API.post("/products", product);

                alert("Product Added Successfully");

            } else {

                await API.put("/products/" + editId, product);

                alert("Product Updated Successfully");

            }

            setProduct(emptyProduct);

            setEditId(null);

            loadProducts();

        } catch (error) {

            console.log(error);

            alert("Unable to save product.");

        }

    };

    const deleteProduct = async (id) => {

        if (!window.confirm("Delete this product?")) {

            return;

        }

        try {

            await API.delete("/products/" + id);

            alert("Product Deleted");

            loadProducts();

        } catch (error) {

            console.log(error);

        }

    };


    const editProduct = (item) => {

        setEditId(item.id);

        setProduct({

            productName: item.productName,
            description: item.description,
            price: item.price,
            stock: item.stock,
            imageUrl: item.imageUrl

        });

    };



    return (

        <div className="product-page">

            <h1>Product Management</h1>

            <form className="product-form">

                <input
                    type="text"
                    placeholder="Product Name"
                    value={product.productName}
                    onChange={(e) =>
                        setProduct({ ...product, productName: e.target.value })
                    }
                />

                <input
                    type="text"
                    placeholder="Description"
                    value={product.description}
                    onChange={(e) =>
                        setProduct({ ...product, description: e.target.value })
                    }
                />

                <input
                    type="number"
                    placeholder="Price"
                    value={product.price}
                    onChange={(e) =>
                        setProduct({ ...product, price: e.target.value })
                    }
                />

                <input
                    type="number"
                    placeholder="Stock"
                    value={product.stock}
                    onChange={(e) =>
                        setProduct({ ...product, stock: e.target.value })
                    }
                />

                <input
                    type="text"
                    placeholder="Image URL"
                    value={product.imageUrl}
                    onChange={(e) =>
                        setProduct({ ...product, imageUrl: e.target.value })
                    }
                />

                <button type="button" onClick={saveProduct}>
                    {editId ? "Update Product" : "Add Product"}
                </button>

            </form>

            <table className="product-table">

                <thead>

                    <tr>

                        <th>Image</th>

                        <th>Name</th>

                        <th>Description</th>

                        <th>Price</th>

                        <th>Stock</th>

                        <th>Action</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        products.map((item) => (

                            <tr key={item.id}>

                                <td>

                                    <img
                                        src={item.imageUrl}
                                        alt={item.productName}
                                        width="70"
                                        height="70"
                                    />

                                </td>

                                <td>{item.productName}</td>

                                <td>{item.description}</td>

                                <td>₹ {item.price}</td>

                                <td>{item.stock}</td>

                                <td>

                                    <button
                                        onClick={() => editProduct(item)}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() => deleteProduct(item.id)}
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </div>

    );

}

export default Products;
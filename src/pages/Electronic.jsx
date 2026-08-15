import '../css/Electronic.css';

function Electronic() {

  const products = [
    { id: 1, name: 'Wireless Headphone', price: '₹1,999', img: '🎧', rating: '4.5★' },
    { id: 2, name: 'Smart Watch', price: '₹3,499', img: '⌚', rating: '4.3★' },
    { id: 3, name: 'Bluetooth Speaker', price: '₹1,499', img: '🔊', rating: '4.6★' },
    { id: 4, name: 'Mobile Phone', price: '₹15,999', img: '📱', rating: '4.8★' },
    { id: 5, name: 'Laptop Stand', price: '₹899', img: '💻', rating: '4.2★' },
    { id: 6, name: 'Gaming Mouse', price: '₹799', img: '🖱️', rating: '4.4★' },
  ];

  return (
    <div className="electronic-page">

      <div className="electronic-header">
        <h2>📱 Electronic Devices</h2>
        <p>Best deals on gadgets</p>
      </div>

      <div className="electronic-container">
        {products.map((item) => (
          <div key={item.id} className="electronic-card">
            <div className="e-img">{item.img}</div>
            <h4>{item.name}</h4>
            <p className="e-rating">{item.rating}</p>
            <p className="e-price">{item.price}</p>
            <button className="e-btn" onClick={() => alert(item.name + ' Added to Cart')}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Electronic;
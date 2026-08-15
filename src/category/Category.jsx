import "../css/Category.css";

function Category({ onSelect }) {
  const categories = [
    { id: 1, name: 'Electronic Devices', icon: '📱' },
    { id: 2, name: 'Furniture and Accessories', icon: '🛋️' },
    { id: 3, name: 'Beauty and Skin Care', icon: '💄' },
    { id: 4, name: 'Clothes and Fashion', icon: '👕' },
  ];

  return (
    <div className="category-list">
      {categories.map((cat) => (
        <div 
          key={cat.id} 
          className="category-item"
          onClick={() => onSelect(cat.name)}
        >
          <div className="cat-icon">{cat.icon}</div>
          <p>{cat.name}</p>
        </div>
      ))}
    </div>
  );
}

export default Category;
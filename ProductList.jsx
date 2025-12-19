import React from "react";
import { useDispatch } from "react-redux";
import "./ProductList.css";

const plantsData = [
  {
    id: 1,
    name: "Lavender",
    category: "Aromatic Plants",
    price: 12,
    description: "A fragrant plant known for its calming aroma.",
    image:
      "https://images.unsplash.com/photo-1524593119777-7e39e4d5c4a0",
  },
  {
    id: 2,
    name: "Mint",
    category: "Aromatic Plants",
    price: 8,
    description: "A refreshing herb with a cool, minty scent.",
    image:
      "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2",
  },
  {
    id: 3,
    name: "Aloe Vera",
    category: "Medicinal Plants",
    price: 10,
    description: "A medicinal plant with healing properties.",
    image:
      "https://images.unsplash.com/photo-1593482892290-9b6d1f0b5b8d",
  },
  {
    id: 4,
    name: "Tulsi",
    category: "Medicinal Plants",
    price: 9,
    description: "A sacred plant used in traditional medicine.",
    image:
      "https://images.unsplash.com/photo-1615485291022-46b56c0eeb5b",
  },
];

const ProductList = () => {
  const dispatch = useDispatch();

  const handleAddToCart = (plant) => {
    dispatch({ type: "ADD_ITEM", payload: plant });
  };

  const renderSection = (category) => (
    <>
      <h2 className="category-title">{category}</h2>
      <div className="products-grid">
        {plantsData
          .filter((plant) => plant.category === category)
          .map((plant) => (
            <div className="product-card" key={plant.id}>
              <img src={plant.image} alt={plant.name} />
              <h3>{plant.name}</h3>
              <p>{plant.description}</p>
              <p className="price">${plant.price}</p>
              <button onClick={() => handleAddToCart(plant)}>
                Add to Cart
              </button>
            </div>
          ))}
      </div>
    </>
  );

  return (
    <div className="product-list-container">
      <h1>Our Plants</h1>
      {renderSection("Aromatic Plants")}
      {renderSection("Medicinal Plants")}
    </div>
  );
};

export default ProductList;
//css
.product-list-container {
  padding: 20px;
}

.category-title {
  margin-top: 30px;
  color: #2e7d32;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
}

.product-card {
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 15px;
  text-align: center;
}

.product-card img {
  width: 100%;
  height: 160px;
  object-fit: cover;
  border-radius: 8px;
}

.price {
  font-weight: bold;
  margin: 10px 0;
}

.product-card button {
  background-color: #4caf50;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.product-card button:hover {
  background-color: #388e3c;
}


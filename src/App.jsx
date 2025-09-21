import React, { useState, useEffect } from 'react';
import { Plus, X } from 'lucide-react';

function App() {
  const [products, setProducts] = useState(() => {
    const stored = localStorage.getItem('products');
    return stored ? JSON.parse(stored) : [];
  });
  // Featured products: store featured status in product object
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    price: '',
    info: '',
    featured: false
  });

  useEffect(() => {
    console.log('Saving to localStorage:', products);
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  const resetForm = () => {
    setFormData({ name: '', image: '', price: '', info: '' });
    setShowForm(false);
    setEditing(null);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price) return; // Basic validation
    if (editing !== null) {
      setProducts((prev) => prev.map((p, i) => (i === editing ? formData : p)));
    } else {
      setProducts((prev) => [...prev, formData]);
    }
    resetForm();
  };

  // Toggle featured status for a product
  const handleToggleFeatured = (index) => {
    setProducts((prev) => prev.map((p, i) => i === index ? { ...p, featured: !p.featured } : p));
  };

  const handleDeleteProduct = (index) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleEditProduct = (index) => {
    setFormData(products[index]);
    setEditing(index);
    setShowForm(true);
  };

  return (
    <div className="body">
      <h1 className="heading" style={{fontSize: '3rem', fontWeight: 900, letterSpacing: '1.5px', color: '#111', marginBottom: '0.5rem'}}>
        Product Cart Manager
      </h1>
      <p className="sub-heading" style={{fontSize: '1.5rem', color: '#444', marginBottom: '2.5rem'}}>
        Create and manage beautiful product cards
      </p>

      {/* Search Bar */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search products..."
          style={{ padding: '0.5rem 1rem', fontSize: '1rem', width: '300px', borderRadius: '6px', border: '1px solid #ccc' }}
        />
      </div>

      {/* Featured Products Section */}
      {products.filter(p => p.featured).length > 0 && (
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '2rem', color: '#222', marginBottom: '1rem' }}>Featured Products</h2>
          <div className="product-list" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {products.filter(p => p.featured).slice(0, 3).map((product, idx) => (
              <div className="product-card" key={idx} style={{ border: '2px solid #ffd700', boxShadow: '0 0 10px #ffe066' }}>
                <div className="card-image-container">
                  {product.image ? (
                    <img src={product.image} alt={product.name} className="card-image" />
                  ) : (
                    <div className="image-placeholder" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100px', width: '100px' }}>
                      <span style={{ color: '#888' }}>No Image</span>
                    </div>
                  )}
                </div>
                <h3>{product.name}</h3>
                <p className="product-price">${product.price}</p>
                <p className="product-info">{product.info}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Product List with Search and Featured Toggle */}
      <div className="product-list">
        {products.filter(p => p.name.toLowerCase().includes(search.toLowerCase())).length === 0 ? (
          <p style={{ textAlign: 'center', marginTop: '2rem' }}>No products found.</p>
        ) : (
          products.filter(p => p.name.toLowerCase().includes(search.toLowerCase())).map((product, idx) => (
            <div className="product-card" key={idx}>
              <div className="card-image-container">
                {product.image && (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="card-image"
                    onError={e => {
                      e.target.style.display = 'none';
                      const placeholder = e.target.nextElementSibling;
                      if (placeholder) placeholder.style.display = 'flex';
                    }}
                  />
                )}
                <div
                  className={`image-placeholder ${!product.image ? 'visible' : ''}`}
                  style={{ display: product.image ? 'none' : 'flex', alignItems: 'center', justifyContent: 'center', height: '100px', width: '100px' }}
                >
                  <span style={{ color: '#888' }}>No Image</span>
                </div>
              </div>
              <h3>{product.name}</h3>
              <p className="product-price">${product.price}</p>
              <p className="product-info">{product.info}</p>
              <div style={{display: 'flex', gap: '0.5rem', alignItems: 'center'}}>
                <button className="btn edit" onClick={() => handleEditProduct(idx)} style={{marginRight: '0.5rem'}}>
                  Edit
                </button>
                <button className="btn delete" onClick={() => handleDeleteProduct(idx)}>
                  <X size={16} /> Delete
                </button>
                <button className="btn" style={{marginLeft: '0.5rem', background: product.featured ? '#ffd700' : '#eee', color: '#222'}} onClick={() => handleToggleFeatured(idx)}>
                  {product.featured ? 'Unfeature' : 'Feature'}
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.5rem' }}>
        <button className="btn" onClick={() => setShowForm(true)}>
          <Plus size={20} /> Add New Product
        </button>
      </div>

      {showForm && (
        <div className="modal" onClick={(e) => e.target === e.currentTarget && resetForm()}>
          <div className="modal-content">
            <h2>{editing ? 'Edit Product' : 'Add New Product'}</h2>
            <button className="close" onClick={resetForm}>
              <X size={20} />
            </button>

            <form onSubmit={handleFormSubmit}>
              <input
                type="text"
                name="name"
                value={formData.name}
                placeholder="Product Name"
                required
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="image"
                value={formData.image}
                placeholder="Image URL"
                onChange={handleInputChange}
              />
              <input
                type="number"
                name="price"
                value={formData.price}
                placeholder="Price"
                required
                onChange={handleInputChange}
              />
              <textarea
                name="info"
                value={formData.info}
                placeholder="Product Info"
                onChange={handleInputChange}
              />
              <label style={{ display: 'flex', alignItems: 'center', margin: '0.5rem 0' }}>
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleInputChange}
                  style={{ marginRight: '0.5rem' }}
                />
                Featured Product
              </label>
              <button className="btn" type="submit">
                {editing ? 'Update Product' : 'Add Product'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
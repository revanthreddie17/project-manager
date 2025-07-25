import React, { useState } from 'react'
import { Plus, X } from 'lucide-react';  

function App() {
  const [products, setProducts] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    image: '', 
    price: '',
    info: ''
  });

  const resetForm = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({
      name: '',
      image: '',
      price: '',
      info: ''
    });
  };

   const handleSubmit = ()=>{
    if(!formData.name.trim()|| !formData.price.trim()){
      alert('Please fill required fields name and price');
    }
    if(editingId){
      setProducts(products.map(product =>
        product.id === editingId? {...formData,id:editingId,price:parseFloat(formData.price)||0}:product
      ))
    } else{
      const newProduct = {id:Date.now(),...formData,price:parseFloat(formData.price)||0}
    }
   }
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }

  return (
    <div className='body'>
      <h1 className='heading'>Product Card Generator</h1>
      <p className='sub-heading'>Create and Manage Beautiful product cards</p>
      <button className='btn' onClick={() => setShowForm(true)}>
        <Plus size={15}/>Add New Product
      </button>
      {showForm && (
        <>
          <div className='modal' onClick={(e)=>e.target === e.currentTarget && resetForm()}></div>
          <div className='modal-content'>
            <h2>{editingId ? 'Edit Product' : 'Add New Product'}</h2>
            <button className='close' onClick={resetForm}>
              <X size={20}/>
            </button>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder='Product Name'
              required
            />

            <input
              type="url"
              name="image"
              value={formData.name}
              onChange={handleInputChange}
              placeholder='image url(optional)'
              required
            />
             
            <input
              type="number"
              name="price"
              value={formData.name}
              onChange={handleInputChange}
              placeholder='product price'
              step='0.01'
              min='0'required
            />
            
            <textarea name="info" value={formData.info}
            placeholder='product Description(optional)' onChange={handleInputChange}
            rows={3}/>
            
          </div>
        </>
      )}
    </div>
  )
}

export default App;
import React, { useState, useEffect } from 'react';
import ItemForm from './components/ItemForm';

const App = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const response = await fetch('http://192.168.56.3:5001/items');
    const data = await response.json();
    setItems(data);
  };

  const addItem = async (name) => {
    const response = await fetch('http://192.168.56.3:5001/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    });
    const newItem = await response.json();
    setItems([...items, newItem]);
  };

  const updateItem = async (id, name) => {
    const response = await fetch(`http://192.168.56.3:5001/items/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    });
    const updatedItem = await response.json();
    setItems(items.map(item => (item.id === id ? updatedItem : item)));
  };

  const deleteItem = async (id) => {
    await fetch(`http://192.168.56.3:5001/items/${id}`, { method: 'DELETE' });
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div>
      <h1>Items</h1>
      <ItemForm addItem={addItem} />
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.name}
            <button onClick={() => updateItem(item.id, prompt('New name:', item.name))}>Edit</button>
            <button onClick={() => deleteItem(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;

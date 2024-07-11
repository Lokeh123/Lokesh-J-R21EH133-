const products = [
    {
      id: 1,
      name: 'Product 1',
      company: 'Company A',
      category: 'Category 1',
      price: 100,
      rating: 4.5,
      discount: 10,
      availability: 'In Stock',
    },
    {
      id: 2,
      name: 'Product 2',
      company: 'Company B',
      category: 'Category 2',
      price: 200,
      rating: 4.0,
      discount: 20,
      availability: 'Out of Stock',
    },
    // Add more mock products here
  ];
  
  export const fetchProducts = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(products);
      }, 500); // Simulate network delay
    });
  };
  
  export const fetchProductById = async (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(products.find(product => product.id === id));
      }, 500); // Simulate network delay
    });
  };
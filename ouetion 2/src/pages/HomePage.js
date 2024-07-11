import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../services/api';
import ProductCard from '../components/ProductCard';
import { Grid, MenuItem, Select, InputLabel, FormControl } from '@material-ui/core';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState({ category: '', sort: 'price' });

  useEffect(() => {
    fetchProducts().then(setProducts);
  }, []);

  const handleFilterChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  const sortedAndFilteredProducts = products
    .filter(product => filter.category ? product.category === filter.category : true)
    .sort((a, b) => {
      if (filter.sort === 'price') return a.price - b.price;
      if (filter.sort === 'rating') return b.rating - a.rating;
      if (filter.sort === 'discount') return b.discount - a.discount;
      return 0;
    });

  return (
    <div>
      <FormControl>
        <InputLabel>Category</InputLabel>
        <Select name="category" value={filter.category} onChange={handleFilterChange}>
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Category 1">Category 1</MenuItem>
          <MenuItem value="Category 2">Category 2</MenuItem>
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel>Sort By</InputLabel>
        <Select name="sort" value={filter.sort} onChange={handleFilterChange}>
          <MenuItem value="price">Price</MenuItem>
          <MenuItem value="rating">Rating</MenuItem>
          <MenuItem value="discount">Discount</MenuItem>
        </Select>
      </FormControl>
      <Grid container spacing={3}>
        {sortedAndFilteredProducts.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default HomePage;
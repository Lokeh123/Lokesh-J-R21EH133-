import React, { useEffect, useState } from 'react';
import { fetchProductById } from '../services/api';
import { useParams } from 'react-router-dom';
import { Card, CardContent, Typography } from '@material-ui/core';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProductById(id).then(setProduct);
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{product.name}</Typography>
        <Typography>{product.company}</Typography>
        <Typography>Price: ${product.price}</Typography>
        <Typography>Rating: {product.rating}</Typography>
        <Typography>Discount: {product.discount}%</Typography>
        <Typography>Availability: {product.availability}</Typography>
        <Typography>Category: {product.category}</Typography>
      </CardContent>
    </Card>
  );
};

export default ProductPage;
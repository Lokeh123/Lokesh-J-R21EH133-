import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';

const ProductCard = ({ product }) => (
  <Card>
    <CardContent>
      <Typography variant="h5">{product.name}</Typography>
      <Typography>{product.company}</Typography>
      <Typography>Price: ${product.price}</Typography>
      <Typography>Rating: {product.rating}</Typography>
      <Typography>Discount: {product.discount}%</Typography>
      <Typography>Availability: {product.availability}</Typography>
    </CardContent>
  </Card>
);

export default ProductCard;
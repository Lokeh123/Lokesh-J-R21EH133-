const express = require('express');
const axios = require('axios');

const app = express();
const port = 5000;

const BASE_URL = 'http://20.244.56.144/test/companies';
const AUTH_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzIwNjc2NTU2LCJpYXQiOjE3MjA2NzYyNTYsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjZhY2Y1NGVlLTVhZWItNDFiNi1iZTA4LTEyZWRiOWUzYTJlZCIsInN1YiI6Imtsb2tlc2hqNUBnbWFpbC5jb20ifSwiY29tcGFueU5hbWUiOiJSZXZhIFVuaXZlcnNpdHkiLCJjbGllbnRJRCI6IjZhY2Y1NGVlLTVhZWItNDFiNi1iZTA4LTEyZWRiOWUzYTJlZCIsImNsaWVudFNlY3JldCI6IlJaTEdOV1hEZGhRUnFLRU0iLCJvd25lck5hbWUiOiJMb2tlc2ggSiIsIm93bmVyRW1haWwiOiJrbG9rZXNoajVAZ21haWwuY29tIiwicm9sbE5vIjoiUjIxRUgxMzMifQ.HEMw3yOhUiSoBBMMCxcKGUlH8yXHDYUNFOnet633uw0';

// Helper function to fetch product data
const fetchProductData = async (company, category, top, minPrice, maxPrice) => {
    const url = `${BASE_URL}/${company}/categories/${category}/products`;
    const params = {
        top,
        minPrice,
        maxPrice,
    };

    try {
        const response = await axios.get(url, {
            params,
            headers: {
                'Authorization': AUTH_TOKEN
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching product data:', error.response ? error.response.data : error.message);
        throw new Error(error.response ? error.response.data.message : 'Error fetching product data');
    }
};

// Endpoint to get top products
app.get('/categories/:categoryname/products', async (req, res) => {
    const { categoryname } = req.params;
    const { company, top, minPrice, maxPrice } = req.query;

    if (!company || !top || !minPrice || !maxPrice) {
        return res.status(400).json({ error: 'Missing required query parameters' });
    }

    try {
        const products = await fetchProductData(company, categoryname, top, minPrice, maxPrice);
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint to get product details
app.get('/categories/:categoryname/products/:productid', async (req, res) => {
    const { categoryname, productid } = req.params;
    const { company } = req.query;

    if (!company) {
        return res.status(400).json({ error: 'Missing required query parameter: company' });
    }

    try {
        const products = await fetchProductData(company, categoryname, 10, 1, 100000); // Fetch top 10 for simplicity
        const product = products.find(p => p.id === productid);

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

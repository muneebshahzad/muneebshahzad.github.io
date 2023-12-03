const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/get-last-order', async (req, res) => {
    try {
        const adminApiAccessToken = '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';

        const response = await axios.get('https://your-shop-name.myshopify.com/admin/api/2022-01/orders.json', {
            headers: {
                'X-Shopify-Access-Token': adminApiAccessToken,
            },
        });

        const lastOrderNumber = response.data.orders[0].order_number;

        res.json({ lastOrderNumber });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

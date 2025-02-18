import express from "express";

const router = express.Router();

router.get('/me', (req, res) => {
    const address = req.headers['x-address'];
    if (!address) {
        return res.status(401).json({ error: 'Not authenticated' });
    }
    console.log("Address: ",address)
    res.json({ address });
});

export default router;
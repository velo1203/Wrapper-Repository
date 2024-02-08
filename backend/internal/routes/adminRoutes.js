const express = require('express');
const authenticateAdmin = require('../middleware/authenticateAdmin')
const router = express.Router()

router.get('/check', authenticateAdmin,(req, res) => {
    res.json({ message: "Admin role verified", admin:true});
})

module.exports = router;
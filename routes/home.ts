const express = require('express')
const router = express.Router();

router.get('/',(req,res) => {
    res.send('GOOD MORNING')
})

module.exports = router;
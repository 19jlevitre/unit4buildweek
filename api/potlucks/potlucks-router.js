const router = require('express').Router();
const Potluck = require('./potlucks-model');

router.get('/potlucks', async (req,res) => {
res.json(await Potluck.findAll())
})
module.exports = router
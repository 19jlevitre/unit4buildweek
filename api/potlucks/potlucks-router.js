const router = require('express').Router();
const Potluck = require('./potlucks-model');

router.get('/', async (req,res) => {
res.json(await Potluck.findAll())
})
router.post('/',(req, res) => {
    
    Potluck.insertPotluck(req.body)
      .then(potluck => {
        return res.status(201).json(potluck)
      }).catch(err => {
        console.log(err)
      })
  });

router.put('/:id', router.put('/:id', (req, res,) => {
    Potluck.update(req.params.id, req.body)
    .then(updatedPotluck => {
      res.json(updatedPotluck)
    })
  }))

module.exports = router
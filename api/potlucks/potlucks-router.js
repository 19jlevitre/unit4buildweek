const router = require('express').Router();
const Potluck = require('./potlucks-model');
const { checkUserAtPotluck } = require('./potlucks-middlware')
const db = require('../data/db-config')
router.get('/', async (req,res) => {
res.json(await Potluck.findAll())
})
router.get('/:id', async (req,res) => {
    await Potluck.findById(req.params.id).then(
        found=> {
            res.json(found)
        }
    )
    })
router.post('/',(req, res) => {
    
    Potluck.insertPotluck(req.body)
      .then(potluck => {
        return res.status(201).json(potluck)
      }).catch(err => {
        console.log(err)
      })
  });

  router.post('/:id/users', (req,res) => {
    const user = req.body
    Potluck.inviteUser( req.params.id, user.user_id)
return res.json({message: `user: ${user.username} added`})
  })

  router.delete('/:id/users', async  (req, res)=> {
      const user = req.body
      Potluck.uninviteUser(req.params.id, user)
      .then(
      res.json({message: `user: ${user.username} removed from potluck with id:${req.params.id}`}))
      .catch(err=> {
          console.log(err)
      })
  })

router.put('/:id', (req, res,) => {
    Potluck.update(req.params.id, req.body)
    .then(updatedPotluck => {
      res.json(updatedPotluck)
    })
  })

  router.post('/:id/items', (req, res) => {
      Potluck.createItem(req.body)
      .then(newItem => {
        
           Potluck.addItemToPotluck(req.params.id, newItem.item_id) 
        res.json({message: 'item added'})
    })
          .catch(err=> 
            console.log(err))
  })
  router.put('/:id/items', checkUserAtPotluck, async (req, res) => {
      const changes = req.body
    return await db('items_potlucks as ip').update(1, changes )

  })

module.exports = router
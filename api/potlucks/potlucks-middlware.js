/*
adds item
.inserts(item) into items table
.then(newtitem => {
    newitem.id insert into items_potlucks
})

*/
const Potluck = require('./potlucks-model')
const db = require('../data/db-config')
const checkUserAtPotluck  = async (req, res, next) => {
Potluck.findyByUserId(req.params.id, req.body.user_id)
.then(([found]) => {
    if(!found){
        return res.status(404).json({message: 'user not found'})
    }else{
      Potluck.findItemPotluck(req.params.id, req.body.item_id)
      .then(([item])=> {
          req.params.id = item.ip_id
          next()
      })
    }
})
}
module.exports = {
    checkUserAtPotluck
}
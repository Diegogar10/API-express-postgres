const express = require('express');
const UserServices = require('./../services/user.service');
const validatorHandler = require('./../middlewares/validator.handler');
const {
  createUserSchema,
  updateUserSchema,
  getUserSchema
} = require('./../schemas/user.schema');
const router = express.Router();
const service = new UserServices();

router.get('/', async (req, res, next) => {
  try {
    const users = await service.find();
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.get('/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await service.findOne(id);
      res.json(user)
    } catch (err) {
      next(err);
    }
  }
);

router.post('/',
  validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newCategory = await service.create(body);
      res.status(201).json(newCategory);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
validatorHandler(getUserSchema, 'params'),
validatorHandler(updateUserSchema, 'body'),
  async (req, res) => {
    try {
      const {id} = req.params;
      const body = req.body;
      const user = await service.update(id, body)
      res.json(user);
    } catch (error) {
      res.status(404).json({
        message: error.message
      })
    }
  }
);

router.delete('/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req,res)=>{
    try{
      const {id} = req.params;
      const rta = await service.delete(id);
      res.json(rta);
    }catch (err) {
      res.status(404).json({
        message: err.message
      })
    }
})

module.exports = router;

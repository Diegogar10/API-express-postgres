const express = require('express');
const ProductsService = require('./../services/product.service');
const validatorHandler = require('./../middlewares/validator.handler');
const {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
  queryProductSchema
} = require('./../schemas/product.schema');

const router = express.Router();
const service = new ProductsService();

router.get('/',
  validatorHandler(queryProductSchema,'query'),
  async (req, res, next) => {
    try {
      const products = await service.find(req.query);
      res.json(products);
    } catch (err) {
      next(err);
    }
  }
);

// los endpoints de forma especifica siempre van antes de los dinamicos para que tenga un comportamiento adecuado
router.get('/filter', (req,res) => {
  res.send('yo soy un filter');
});

router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await service.findOne(id);
      res.json(product)
    } catch (err) {
      next(err);
    }
  }
);

router.post('/',
validatorHandler(createProductSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newProduct = await service.create(body);
    res.status(201).json(newProduct);
  }
);

router.patch('/:id',
validatorHandler(getProductSchema, 'params'),
validatorHandler(updateProductSchema, 'body'),
  async (req, res) => {
    try {
      const {id} = req.params;
      const body = req.body;
      const product = await service.update(id, body)
      res.json(product);
    } catch (error) {
      res.status(404).json({
        message: error.message
      })
    }
  }
);

router.delete('/:id', async (req,res)=>{
  const {id} = req.params;
  const rta = await service.delete(id);
  res.json(rta);
})

module.exports = router;

const router = require('express').Router();
const { Category, Product, Tag } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories, be sure to include its associated Products
  try {
    const catData = await Category.findall();
    res.status(200).json(catData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value, be sure to include its associated Products
  try {
    const catData = await Category.findByPk(req.params.id, {
      // dont know if this is right
      include: [{ model: Product, through: Category, as: ''}]
    });
    if (!catData) {
      res.status(400).json({ message: 'No Category found with this id!'});
      return;
    }
    res.status(200).json(catData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const catData = await Category.create(req.body);
    res.status(200).json(catData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const catData = await Category.update({
      where: {
        tag_name: req.params.id
      }
    })
    // from product-routes.js line 51
    // .then((category) => {
    //   return category.findAll({ where: { category_name: req.params.id }});
    // })
    // .then()
    if (!catData) {
      res.status(404).json({ message: 'No Category found with this id'});
      return;
    }

    res.status(200).json(catData);
  } catch (err) {
    res.status(500).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const catData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!catData) {
      res.status(404).json({ message: 'No Category found with this id!'});
      return;
    }
    
    res.status(200).json(catData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

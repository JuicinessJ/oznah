const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags, be sure to include its associated Product data
  try {
    const tagData = Tag.findAll();
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`, be sure to include its associated Product data
  try {
    const tagData = Tag.findByPk(req.params.id, {
      // dont know if this is right
      include: [{ model: ProductTag, through: Product, as: ''}]
    });

    if (!tagData) {
      res.status(400).json({ message: 'No Tag found with this id!'});
      return;
    }
    
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  // create a new tag
  try {
    const tagData = Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err)
  }
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagData = Tag.update({
      where: {
        tag_name: req.params.id
      }
    })
    // from product-routes.js line 51
    // .then((tag) => {
    //   return Tag.findAll({ where: { tag_name: req.params.id }});
    // })
    // .then()
    if (!tagData) {
      res.status(404).json({ message: 'No Tag found with this id'});
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err)
  }
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagData = Tag.destroy({
      where: {
        id: req.params.id
      }
    });
    
    if (!tagData) {
      res.status(404).json({ message: 'No Tag found with this id!'});
      return;
    }
    
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;

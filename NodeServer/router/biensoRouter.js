const express = require('express')
const router = express.Router()
const BiensoController = require('../Controller/BiensoControler')
router.get('/',BiensoController.getBienSo)
router.post('/',BiensoController.createBienSo)
router.delete('/:_id',BiensoController.deleteBienSo)
router.put('/update/:_id',BiensoController.updateBiensoxe)
module.exports = router

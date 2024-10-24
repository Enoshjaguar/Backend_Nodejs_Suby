const express = require("express");
const firmController = require('../controllers/FirmController');
const verifyToken = require('../middleware/verifyToken');
const router = express.Router();

router.post('/add-firm', verifyToken, firmController.addFirm);
router.get('/uploads/:imageName',(req,res)=>{
    const imageName = req.params.imageName;
    req.headers('Content-Type','image/jpeg');
    res.sendFile(path.join(__dirname,'..','uploads','imageName'));
})
router.delete('/:firmId',firmController.deletefirmById);
module.exports = router;
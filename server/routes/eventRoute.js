const router = require('express').Router();
const { addEventController ,getAllEventsController ,getSingleEventsController, deleteEventController , updateEventController } = require('../controllers/eventController')
const multer =require("multer")
const  path  = require("path")

const storage = multer.diskStorage({
    destination : (req , file , cb) => {

        cb(null , 'public/images')
    } , 
    filename : (req , file , cb) => {
        cb(null , file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage : storage
})

router.post('/add-event', upload.single("image") ,  addEventController);
router.get('/',  getAllEventsController );
router.get('/single-event/:id',  getSingleEventsController );
router.delete('/delete-event/:id',  deleteEventController );
router.post('/update-event/:id',  upload.single("image")  , updateEventController );

module.exports = router;
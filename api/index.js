const express = require('express')
const app = express();
const path = require('path');
const cors = require('cors');
const multer = require('multer');
const port = process.env.PORT || 8080;

// Databse Connection
//const connection = require('./config/database');

app.use(cors());

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../ui-table/public/assets', 'uploads'),
    filename: function (req, file, cb) {        
	    cb(null, Date.now() + '-' + file.originalname )
    }
    
})

app.post('/imageupload', async (req, res) => {	
	try {
		
		let upload = multer({ storage: storage}).single('avatar');
		
		upload(req, res, function(err) {
			
			if (!req.file) {
				return res.send('Please select an image to upload');
			}
			else if (err instanceof multer.MulterError) {
				return res.send(err);
			}
			else if (err) {
				return res.send(err);
			}
			
			const classifiedsadd = {
				image: req.file.filename
			};
			
			// const sql = "INSERT INTO users SET ?";
			// connection.query(sql, classifiedsadd, (err, results) => {  if (err) throw err;
			// 	res.json({ success: 1 })      
			// });  
		});  
  } catch (err) {console.log(err)}
});


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
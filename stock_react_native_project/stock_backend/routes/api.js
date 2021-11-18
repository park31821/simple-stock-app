var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');

const SALT_ROUND = 5;

router.get('/', function(req, res, next) {
    res.json({status: 'success'})
  });
  
  
  
router.post("/update", (req,res,next) => {
    if (!req.body.ID || !req.body.WatchList){
        res.status(400).json({Message: `Error Updating ${req.body.ID}`, Code: 400});
        console.log(`Error on request body: ${JSON.stringify(req.body.ID)}`);
    } else {
        
        const ID = req.body.ID;
        const watchList = req.body.WatchList;

        req.db("Customers").where('ID', ID).update('WatchList', watchList).then(() => {
            res.status(200).json({Message: `Successful updating ${ID}`, Code: 200});
            console.log(`Successful watch list update ${ID}`);

        }).catch(error => {
            res.status(500).json({Message: `Database error - not updated`, Code: 500});
            console.log(`Error executing sql query: ${error}`);

        })
    }
});

router.post("/getWatchList", (req,res,next) => {
    if (!req.body.ID){
        res.status(400).json({Message: "Error Loading, no ID to load from.", Code: 400});
        console.log(`Error on request body: ${JSON.stringify(req.body)}`);
    }else{

        (async () => {
            try{
                let rows = await req.db.from("Customers").where('ID', req.body.ID).select("WatchList");
                res.json({ Error: false, Message: "Loading Success", WatchList: rows[0]['WatchList'], Code: 200
            });
            }catch(err){
                console.log(err);
                res.status(500).json({ Error: true, Message: "Failed loading, something went wrong.", Code: 500 });
            };
        }
        )();
    }
});


router.post("/add", (req,res,next) => {
    if (!req.body.ID || !req.body.Password || !req.body.Email){
        res.status(400).json({Message: "Error creating new user, please enter all the details.", Code: 400});
        console.log(`Error on request body: ${JSON.stringify(req.body)}`);
    }else{


        const password = req.body.Password;
        bcrypt.hash(password, SALT_ROUND).then((response)=>{
            const filter = {
                            ID: req.body.ID,
                            Password: response,
                            Email: req.body.Email
            }     
            
            req.db("Customers").insert(filter).then(() => {
                res.status(201).json({Message: `Successful creating user ${req.body.ID}`, Code: 201});
                console.log(`Successful inserting ${req.body.ID}`);
    
            }).catch(error => {
                res.status(500).json({Message: `Database error - not updated`, Code: 500});
                console.log(`Error executing sql query: ${error}`);
            })
        })

    }
});


router.post('/validate', function(req,res){
    if (!req.body.ID || !req.body.Password ){
        res.status(400).json({Message: "Error validating, please enter ID and password.", Code: 400});
        console.log(`Please enter your ID and password.`);
    } else {
        
        const filter = {
            ID: req.body.ID,
        }

        const password = req.body.Password;

        (async () => {

            let rows = await req.db.from("Customers").where(filter).select("Password");
            let hash = rows[0]['Password'];
            bcrypt.compare(password, hash).then((result)=>{
                try{
                    if(result){
                        res.status(200).json({ Error: false, Message: "Validation Success", Code:200});
                    }else {
                        res.status(500).json({ Error: true, Message: "Please check your ID and password", Code:500});
                    }
                }catch(err){
                    console.log(err);
                    res.status(500).json({ Error: true, Message: "Please check your ID and password",Code:500 });
                };
            })
                
        }
        )();
    }
});

  module.exports = router;
  
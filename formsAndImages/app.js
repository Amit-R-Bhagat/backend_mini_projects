const express = require('express');
const fileUpload = require('express-fileupload')
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: "diwjisa8z",
    api_key: "412855887379845",
    api_secret: "tPfYcxI4968c20jaYEBxOgsZd0c"
})

const app = express();

//variables
const PORT = process.env.PORT || 3000;

//setting template engine
app.set('view engine','ejs');

//middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/"
}));

app.get('/',(req,res)=>{
    let data = req.query;
    console.log(data);
    res.send(data);
})

app.post('/',async(req,res)=>{   
    try{
        let {firstname, lastname} = req.body;

        let result;
        let images = [];

        if(req.files){
            // using promises 
            // await Promise.all(req.files.sampleFile.map(async(image)=>{
            //     let result = await cloudinary.uploader.upload(image.tempFilePath,{
            //         folder: "users"
            //     });
                
            //     // let promise = new Promise((resolve,reject)=>{
            //     //     setTimeout(resolve('hello'),1000);
            //     // })
            //     // let result = await promise;
            //     console.log(result);
            //     images.push(result);
            // }));

            await req.files.sampleFile.forEach(async(image)=>{
                // let promise = new Promise((resolve)=>{
                //     // setTimeout(resolve('hello'),1000);
                //     resolve('hello');
                // });
                // let result = await promise;
                let result = await cloudinary.uploader.upload(image.tempFilePath,{
                            folder: "users"
                        });
                console.log(result);
                images.push(result);
            })

            // using for loop
            // for (let idx = 0; idx < req.files.sampleFile.length; idx++) {
            //     let result = await cloudinary.uploader.upload(req.files.sampleFile[idx].tempFilePath,{
            //                 folder: "users"
            //             });
            //             images.push(result);
            // }
        }

        console.log(images);

        // single file
        // let file = req.files.sampleFile;
        // let result = await cloudinary.uploader.upload(file.tempFilePath,{
        //     folder: "users"
        // })

        let details = {
            firstname,
            lastname,
            images
        };

        console.log(details);

        res.send(details);
    }catch(err){
        console.log(err);
    }
    
})

app.get('/getForm',(req,res)=>{
    res.render('getForm.ejs');
})

app.get('/postForm',(req,res)=>{
    res.render('postForm.ejs');
})

app.listen(PORT,()=>console.log(`Server started on port ${PORT}`));
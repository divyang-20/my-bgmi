//Importing Libraries
const express=require('express');
const path=require('path');
const app=express();
const bodyparser=require('body-parser');
const mongoose = require('mongoose');

const uri=process.env.MONGODB_URI || 'mongodb://localhost:27017/contactbgmi'
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect(uri,{useNewUrlParser:true,useUnifiedTopology:true});
}

//defining schema
const contactSchema = new mongoose.Schema({
    name: String,
    gamename: String,
    phone: String,
    bgmiid: String,
    desc: String,
  });

//Model
const Contact = mongoose.model('Contact', contactSchema);

//server port
const port=process.env.PORT || 8000;

//EXPRESS SPECIFIC STUFFS
app.use('/static',express.static('static'))//for serving static files
app.use(express.urlencoded())

//PUG SPECIFIC STUFFS
app.set('view engine','pug')//set the template engine as pug
app.set('views',path.join(__dirname,'views'))//set the views directory

//ENDPOINTS
app.get('/',(req,res)=>{
    const params={}
    res.render('home.pug');
})

app.get('/about',(req,res)=>{
    res.render('about.pug');
})

app.get('/services',(req,res)=>{
    res.render('services.pug');
})

app.get('/contact',(req,res)=>{
    res.render('contact.pug');
})

app.post('/contact',(req,res)=>{
    var myData=new Contact(req.body);
    myData.save().then(()=>{
        res.send("Your data has been safely saved to yash's Database")
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database")
    });
})

//START THE SERVER
app.listen(port,()=>{
    console.log(`the application started successfully on port ${port}`)
});
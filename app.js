//Importing Libraries
const express=require('express');
const path=require('path');
const app=express();
const bodyparser=require('body-parser');
const mongoose = require('mongoose');
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://localhost:27017/contactbgmi');
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
const port=8000;

//EXPRESS SPECIFIC STUFFS
app.use('/static',express.static('static'))//for serving static files
app.use(express.urlencoded())

//PUG SPECIFIC STUFFS
app.set('view engine','pug')//set the template engine as pug
app.set('views',path.join(__dirname,'views'))//set the views directory

//ENDPOINTS
app.get('/',(req,res)=>{
    const params={}
    res.status(200).render('home.pug',params);
})

app.get('/about',(req,res)=>{
    const params={}
    res.status(200).render('about.pug',params);
})

app.get('/services',(req,res)=>{
    const params={}
    res.status(200).render('services.pug',params);
})

app.get('/contact',(req,res)=>{
    const params={}
    res.status(200).render('contact.pug',params);
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
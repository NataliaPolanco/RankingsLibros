const express= require('express');
const router =express.Router();
const Note = require ('../models/Note');

const{isAuthenticated}= require('../helpers/outs');
router.get('/notes/add', isAuthenticated, (req,res)=>{
    res.render('notes/new-note');
});
router.post('/notes/new-note', isAuthenticated, async (req,res)=>{
const{title,description,datePub,author}=req.body;
const errors= [];

if(!title){
    errors.push({text:'Por favor escriba el título.'})

}
if(!description){
    errors.push({text:'Por favor escriba una descripción.'})
    
}
if(!datePub){
    errors.push({text:'Por favor escriba la fecha de publicación.'})
    
}
if(!author){
    errors.push({text:'Por favor escriba el nombre del autor.'})
    
}

if (errors.length>0){
    res.render('notes/new-note',{
        errors, title,
        description, datePub, author
    }); 
}
else{
    const newNote = new Note({title,description,datePub,author});
    newNote.user = req.user.id;
    await newNote.save();
    req.flash('success_msg', 'Ficha añadida satisfactoriamente');
    res.redirect('/notes');

  

}

});
router.get('/notes', isAuthenticated, async (req,res)=>{

const notes= await Note.find().sort({date:'desc'}); 
res.render('notes/all-notes',{notes});

});

router.get('/notes/edit/:id', isAuthenticated,async (req,res)=>{
   const note= await Note.findById(req.params.id);

    res.render('notes/edit-note',{note} );
    
});
router.put('/notes/edit-note/:id', isAuthenticated,async (req,res)=>{
    const{title, description,datePub,   author}=req.body;
    await Note.findByIdAndUpdate(req.params.id,{title,description,datePub, author});
    req.flash('success_msg', 'Ficha editada satisfactoriamente');

    res.redirect('/notes');
});

router.delete('/notes/delete/:id',isAuthenticated, async (req,res)=>{
    await Note.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Ficha borrada satisfactoriamente');

    res.redirect('/notes');
})
module.exports= router;
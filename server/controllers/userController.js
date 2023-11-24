const bcrypt = require('bcrypt');
const User = require('../models/userModel')
const Contact = require('../models/contactModel')
//register controller
const registerController = async(req,res)=>{
    const { name , email ,password } = req.body;
    try {
                   if(!name || !email || !password) {
                       throw Error('Please fill all the fields')
                   }

                //    password hashing
                  const isExistUser = await User.findOne({email});
                 if(isExistUser){
                    throw Error('Sorry User already exists');
                 }

                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(req.body.password, salt);

                    const newUser = await new User({
                       name,
                       email,
                       password:hashedPassword
                   });

                   await newUser.save();
                   return res.status(200).send({message:"User Regestered successfully"});

                }
                   catch(error){
                    return res.status(400).json({message:error.message});
                   }


       }
       //login controller         
       const loginController = async(req,res)=>{
           const { email,password } = req.body;
           try {

               if(!email ||!password) {
                   throw Error('please fill all the fields')
               }
               const isExistUser = await User.findOne({ email});
               if(!isExistUser){
                   throw Error('Sorry! User not found ');
               }
               //comparing password
               const isMatch = await bcrypt.compare(password,isExistUser.password);
               if(!isMatch){
                   throw Error('Password or Email is Invalid');
               }

               return res.status(200).send({message:"User Logged in successfully"});


            }
            catch(error){
                return res.status(400).json({message:error.message});
            }
        
        }

        const contactController = async(req,res)=>{
                  
                  try {
                    const { name,email,phone,message } = req.body;
                    const newContact = await Contact({
                     name,
                     email,
                     phone,
                     message
                    });
 
                    await newContact.save();
                    return res.status(200).send({message:"Message sent successfully"});
                  } catch (error) {
                    return res.status(500).send({message:error.message});
                  }
        }
        const getContactController = async(req,res)=>{
            try {
                const contacts = await Contact.find();
                return res.status(200).send(contacts);
            } catch (error) {
                return res.status(500).send({message:error.message});
            }
        }
 module.exports = {registerController , loginController ,getContactController, contactController}

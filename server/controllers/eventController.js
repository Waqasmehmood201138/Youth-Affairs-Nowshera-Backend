const Event  = require('../models/eventModel')

const addEventController = async (req,res)=>{
    try {
        const { title, description , categories ,time } = req.body;
        const image = req.file.filename;
        
        
    // if(!title || !categories){
    //     throw new Error("Please Select a specific category or inset Title");
    // }
    
    
    const newEvent  = await new Event({
        title,
        description,
        categories,
        time,
        image
    })
    await newEvent.save();

    return res.status(200).json({message:"Event saved successfully"})
   } catch (error) {

    return res.status(500).json({message:error.message});
    
   }

}

const getAllEventsController  = async (req,res)=>{
    try {
        const events = await Event.find();
        
        if(events.length === 0){
            throw  Error("No events found")
        }
        return res.status(200).json(events);
    } catch (error) {
        return res.status(400).json({message:error.message});
    }
}

const getSingleEventsController = async(req,res)=>{
        try {
            const eventId = req.params.id;
              
            const event = await Event.findById(eventId);
            
            if(!event){
                throw new Error("Event not found!")
            }
            return res.status(200).json(event);
        } catch (error) {
              return res.status(400).json({message:error.message})
        }

}

const deleteEventController = async (req,res)=>{
    try {
        const deleteEvent = await Event.findByIdAndDelete({_id:req.params.id})
        if(!deleteEvent){
            throw new Error("Event already deleted!")
        }
        return res.status(200).json(deleteEvent);
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

const updateEventController = async (req,res)=>{

    try {
        const updatedEventData = {
            title: req.body.title,
            description: req.body.description,
            categories: req.body.categories,
            time: req.body.time,
        
          };
         const updateEvent = await Event.findByIdAndUpdate({_id:req.params.id},updatedEventData,{new:true})
        if(!updateEvent){
            throw new Error("Not found any sepecific Event!");
        }
        return res.status(200).json(updateEvent);
    } catch (error) {
        return res.status(400).json({error:error.message});
    }
}
module.exports = {addEventController , getAllEventsController ,getSingleEventsController, deleteEventController , updateEventController }
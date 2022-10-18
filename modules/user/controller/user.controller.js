import commentModel from "../../../DB/models/comment.model.js";
import postModel from "../../../DB/models/post.model.js";
import userModel from "../../../DB/models/user.model.js";

export const updateAccount=async(req,res)=>{
    let{userName,phone}=req.body;
    const update=await userModel.findByIdAndUpdate({_id:req.currentUserID},
        {
            userName,phone
        },{new:true}
        )
        res.json({message:"Updated Successfully",update})
}



// ## 5- delete account (with posts and comments created by this account) (user must be logged in)(Get user ID from token)
export const deleteAccount=async(req,res)=>{
  const user=await userModel.findById(req.currentUserID)
if(user){
    const posts=await postModel.deleteMany({createdBy:req.currentUserID})
    const comments=await commentModel.deleteMany({createdBy:req.currentUserID})
    const deletedUser=await userModel.findByIdAndDelete({_id:req.currentUserID})
    res.json({message:"Done",deletedUser})
}
 else{

    res.json({message:"Failed"})

}}
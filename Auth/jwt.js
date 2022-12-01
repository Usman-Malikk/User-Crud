import jwt from "jsonwebtoken"

export const verifytoken =(req,res,next)=>
{
    let access_token = req.cookies.access_token
    if(!access_token)
    {
        return res.json(
            {
                success:false,
                message:"You are not authenticated"
            }
        )
    }
    
    jwt.verify(access_token,"agdhsahdhsadhvsagdhsvagjdvgajgjsacgjdgsacgdcg",(err,user)=>
    {
if(err)
{
    return res.json(
        {
            success:false,
            message:"Wrong Token"
        }
    )
}
req.user = user
console.log(req.user.id)
next()
    })
}

// Verify User 

export const verifyuser=(req,res,next)=>
{
    verifytoken(req,res,()=>
    {
if(req.user.id===req.body.id || req.user.IsdAmin)next()
    })
}







/*   17th april 2024 cd mailer
    npm start
    localhost 5000
    thunder client use (POST req) http://localhost:5000/api/user/signup
    output you get msg,info,preview
    thundder client use (POST req) http://localhost:5000/api/product/getbill
    in BODY (JSON DATA) write this code here create a email using temp mail.org
    {
  "userEmail":"lotiyid984@etopys.com" // fake mail
}
output msg:"you should receive an email"
 */

const express=require('express');
const appRoute=require('./routes/route.js')
const app=express()
const PORT=process.env.PORT ||5000;
app.use(express.json());
app.use('/api',appRoute)

app.listen(PORT,()=>{
    console.log(`Server is on http://localhost:${PORT}`)
})


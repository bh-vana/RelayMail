const nodemailer=require('nodemailer');
const Mailgen = require('mailgen');
const { PASSWORD, EMAIL} = require('../env.js')

/** send mail from testing account */
const signup= async (req,res) => {
    let testedAccount=await nodemailer.createTestAccount();
    //create reusable transporter
    let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: testedAccount.user,
      pass: testedAccount.pass,
    },
  });
  
    // send mail with defined transport object
    let message = {
      from: '"radison " <raddison53@ethereal.email>', // sender address
      to: "bar@example.com, baz@example.com", // list of receivers
      subject: "Hello.. ", // Subject line
      text: "sucessfull register with  us", // plain text body
      html: "<b>sucessfull register with  us</b>", // html body
    };
  transporter.sendMail(message).then((info)=> {
    return res.status(201)
    .json({ 
        msg: "you should receive an email",
        info: info.messageId,
        preview: nodemailer.getTestMessageUrl(info)
    
    })
  }).catch(error => {
    return res.status(500).json({error })
  })

    //res.status(201).json("bill sucessfull");

}
/** send mail from real gmail account */
const getbill =(req,res) => {
  const {userEmail} = req.body;

    let config = {
        service:'gmail',
        auth:{
            user:EMAIL,
            pass:PASSWORD
        }
    }
    let transporter = nodemailer.createTransport(config)
     let MailGenerator = new Mailgen({
        theme: "default",
        product:{
            name:"Mailgen",
            link:'https://mailgen.js'
        }
     })

     let response = {
          /* body :{
            name: "Yours Beloved..",
            intro:"LOVE PROPOSAL ......From the moment I met you, my world shifted, and suddenly everything seemed brighter. Bhavana your laugh is the melody that fills my days, and your smile is the beacon guiding me home. Will you allow me the honor of being the one who cherishes and loves you?",
         
          outro:"Looking forward My Dear bhav's...!"
        }*/
        body: {
            name:"daily tusions",
            intro:"your bill has arrived",
            table:{
                data:[
                    {
                    item:"Nodemailer Stack Book",
                    description:"A backend application",
                    price:"$10.99",
                }
            ]
            },
            outro:"Looking forward to do more business"
        }
     }
  let mail= MailGenerator.generate(response)
  let message = {
    from:EMAIL,
    to:userEmail,
    subject:"Place order",
    html:mail
  }
  transporter.sendMail(message).then(() => {
    return res.status(201).json({
        msg:"you should receive an email"
    })
  }).catch(error => {
    return res.status(500).json({error})
  })
   // res.status(201).json("getbi;;");
}
module.exports={
    signup,
    getbill
}
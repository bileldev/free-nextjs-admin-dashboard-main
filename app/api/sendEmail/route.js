import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request, res, ) {
try{

    const{subject,message} = await request.json();

    const transporter = nodemailer.createTransport({
        service:'gmail',
        host: 'smtp.gmail.com',
        port:465,
        secure:true,
        auth:{
            user: 'bilel.bennour23@gmail.com',
            pass: 'qbrh dytk tknq mtht'
        }
    })
    const mailOption = {
        from:  'bilel.bennour23@gmail.com',
        to:'pannour68@gmail.com',
        subject:"Monitor Warning",
        html: `<h2>hello world!${subject}</h2>
        <h3>${message}</h3>`

    }
    await transporter.sendMail(mailOption)
    return NextResponse.json({message: "Email sent successfully"}, {status: 200});
}catch(error){
    return NextResponse.json({message: "Failed"}, {status: 400});

}
}
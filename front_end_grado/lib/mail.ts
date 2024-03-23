import nodemailer from 'nodemailer'
import * as handlebars from 'handlebars'
import { acceptEmailTemplate } from '@/app/StudentsList/Templates/AcceptEmail';

export async function sendMail ({to, name, subject, body}:{
    to:string; 
    name:string; 
    subject:string; 
    body:string}) {
        const { SMTP_EMAIL, SMTP_PASSWORD } = process.env;
        
        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: SMTP_EMAIL,
                pass: SMTP_PASSWORD,
            }
        });
        try {
            const testResult = await transport.verify();
            console.log(testResult);
        } catch (error) {
            console.log(error);
            return;
        }

        try {
            const sendResult = await transport.sendMail({
                from: SMTP_EMAIL, 
                to, 
                subject, 
                html:body
            });
            console.log(sendResult);
        } catch (error) {
            console.log(error);
        }
}

export function compileAcceptEmailTemplate(personName:string, observations:string) {
    const template = handlebars.compile(acceptEmailTemplate);
    const htmlBody = template({
        name: personName,
        observations: observations
    });

    return htmlBody;
}
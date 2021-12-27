import type { RequestHandler } from '@sveltejs/kit';
import type { Locals } from '$lib/types';
import sgMail from '@sendgrid/mail'

const smptAPIKey: string = import.meta.env.VITE_SMTP_API_KEY.toString();
const recipient: string = import.meta.env.VITE_SMTP_RECIPIENT.toString();
const sender: string = import.meta.env.VITE_SMTP_SENDER.toString();

export const post: RequestHandler<Locals> = async (request) => {
    const data = JSON.parse(request.body);
    
    sgMail.setApiKey(smptAPIKey)
    const msg = {
        to: recipient, 
        from: sender,
        subject: `Inquery from website regarding: ${data.contactReason}`,
        html: `
        <h1>New inquery from website regarding: ${data.contactReason}</h1>
        <h3>From: ${data.firstName} ${data.lastName}</h3>
        <h3>Email: ${data.email}</h3>
        <p>${data.message}</p>`,
    }

    return sgMail
        .send(msg)
        .then(() => {
            return { status: 200, };  
        })
        .catch((error) => {
            console.error(error)
            return { status: 500, };  
        })  
};
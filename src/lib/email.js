import sgMail from "@sendgrid/mail"


sgMail.setApiKey(process.env.SEND_EMAIL)

export const sendEmail = async recipientAddress => {

    const msg = {
        to: recipientAddress,
        from: "vemanavijaykumar154@gmail.com",
        cc: "vemanav@gmail.com",
        subject: "Hello i am from SendGrid!",
        text: "i am super usefull for sending emails.....",
        html: "<strong>welcome</strong>",
    }
    await sgMail.send(msg)
}
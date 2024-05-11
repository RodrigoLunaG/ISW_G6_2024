import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'Gmail', //servicio
    auth: {
      user: 'tangoappmailer@gmail.com', // mail
      pass: 'aidt lrpj iqqt luzg' // contrasenia especial de app armada para nodemailer (2FA), si quieren entrar la contra es tp6isw2024
    }
  });

async function enviarCorreo(destinatario, asunto, mensaje) {
    try {
        await transporter.sendMail({

            from: 'tangoappmailer@gmail.com',
            to: destinatario,
            subject: asunto,
            text: mensaje
        });
        console.log('Correo electrónico enviado correctamente a:', destinatario);
    } catch (error) {
        console.error('Error al enviar el correo electrónico:', error);
    }
}

export { enviarCorreo };

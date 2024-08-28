import nodemailer from "nodemailer";
import { config } from "../config/config.js";

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: config.mailer.host,
      port: config.mailer.port,
      auth: config.mailer.auth,
    });
  }

  getMessageTemplate(type, mail) {
    let body = `<h1>Hola ${mail},</h1>`;

    switch (type) {
      case "welcome":
        body += `        
        <p style="font-size: 16px; color: red">Te damos la bienvenida a nuestro servicio de mensajes masivos.</p>
        
        <p style="font-size: 16px; color: red">Si tienes alguna pregunta, no dudes en contactarnos.</p>
        
        

        <a href="http://localhost:5000/api/users/activate/codigoSecreto" style="color: red; text-decoration: none;">Activar cuenta</a>
        `;
        break;

      case "activation":
        body += `        
        Te damos la bienvenida a nuestro servicio de mensajes masivos. 
        
        Si tienes alguna pregunta, no dudes en contactarnos.
       `;
        break;
    }

    body += `        
    <p style="font-size: 16px; color: red">Saludos,</p>
    <p style="font-size: 16px; color: red">Equipo de Mensajes Masivos</p>
    `;

    return body;
  }

  async sendMail({ to, subject, type }) {
    try {
      const html = this.getMessageTemplate(type, to);

      const info = await this.transporter.sendMail({
        from: this.from,
        to,
        subject,
        html,
        attachments: [],
      });
      console.log(info);
    } catch (error) {
      console.log(error);
    }
  }
}

export const mailService = new MailService();

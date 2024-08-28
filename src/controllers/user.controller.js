import { mailService } from "../services/mail.service.js";

// DB
const users = [];

export class UserController {
  static async getAll(req, res) {
    return res.json(users);
  }

  static async create(req, res) {
    const { name, email, phone } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const user = { name, email, phone };

    users.push(user);

    await mailService.sendMail({
      to: email,
      subject: "New user registered",
      // html: `<h1>New user registered</h1><p>Name: ${name}</p><p>Email: ${email}</p><p>Phone: ${phone}</p>`,
      type: "welcome",
    });

    return res.status(201).json(user);
  }
}

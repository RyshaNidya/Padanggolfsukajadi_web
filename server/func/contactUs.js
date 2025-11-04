// File: server/functions/submit.js

require("dotenv").config(); // Load ENV variables

const nodemailer = require("nodemailer");

// Handler utama Netlify Function
exports.handler = async (event, context) => {
  // Hanya menerima permintaan POST
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: "Hanya metode POST yang diizinkan." }),
    };
  }

  try {
    // Ambil data dari body permintaan POST
    const data = JSON.parse(event.body);
    const { name, email, message } = data;

    // Validasi
    if (!name || !email || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: "Semua field (nama, email, pesan) wajib diisi.",
        }),
      };
    }

    // 1. Konfigurasi Nodemailer (menggunakan ENV dari Netlify)
    // Kredensial rahasia harus disimpan di Netlify, BUKAN di file .env lokal saat deploy
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_PORT == 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // 2. Opsi Email
    const mailOptions = {
      from: process.env.EMAIL_FROM || '"Form Web" <no-reply@netlify.com>',
      to: process.env.EMAIL_TO, // Email penerima Anda
      replyTo: email,
      subject: `Kritik/Saran Baru dari ${name}`,
      html: `
                <h3>Kritik dan Saran Baru</h3>
                <p><strong>Nama:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <hr>
                <p><strong>Pesan:</strong> ${message}</p>
            `,
    };

    await transporter.sendMail(mailOptions);

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: "Kritik dan saran berhasil dikirim!",
      }),
    };
  } catch (error) {
    console.error("Error mengirim email:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        message: "Gagal mengirim pesan.",
      }),
    };
  }
};

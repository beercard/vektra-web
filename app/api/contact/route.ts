import { NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

// Simple anti-spam: check for honeypot field and submission timing
const MINIMUM_SUBMISSION_TIME = 3000 // 3 seconds minimum to fill form

interface ContactFormData {
  nombre: string
  email: string
  servicio: string
  mensaje: string
  honeypot?: string
  timestamp?: number
  token?: string
}

function generateEmailTemplate(data: ContactFormData): string {
  const fecha = new Date().toLocaleDateString('es-AR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })

  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nuevo Prospecto - Vektra</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="padding: 40px 0;">
        <table role="presentation" style="width: 100%; max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background-color: #000000; padding: 30px 40px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">
                Vek<span style="color: #00DEC7;">tra</span>
              </h1>
              <p style="margin: 8px 0 0; color: rgba(255,255,255,0.7); font-size: 12px; letter-spacing: 2px; text-transform: uppercase;">
                Nuevo Prospecto
              </p>
            </td>
          </tr>

          <!-- Badge -->
          <tr>
            <td style="padding: 30px 40px 0;">
              <table role="presentation" style="width: 100%;">
                <tr>
                  <td style="background-color: #00DEC7; padding: 12px 20px; border-radius: 8px; text-align: center;">
                    <span style="color: #000000; font-weight: 600; font-size: 14px;">
                      Servicio solicitado: ${data.servicio}
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 30px 40px;">
              <h2 style="margin: 0 0 20px; color: #000000; font-size: 20px; font-weight: 600;">
                Datos del prospecto
              </h2>
              
              <!-- Info Cards -->
              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 15px; background-color: #f8f9fa; border-radius: 8px; margin-bottom: 10px;">
                    <p style="margin: 0; color: #666666; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Nombre</p>
                    <p style="margin: 5px 0 0; color: #000000; font-size: 16px; font-weight: 500;">${data.nombre}</p>
                  </td>
                </tr>
              </table>
              
              <div style="height: 10px;"></div>
              
              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 15px; background-color: #f8f9fa; border-radius: 8px;">
                    <p style="margin: 0; color: #666666; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Email</p>
                    <p style="margin: 5px 0 0; color: #000000; font-size: 14px; font-weight: 500;">
                      <a href="mailto:${data.email}" style="color: #00DEC7; text-decoration: none;">${data.email}</a>
                    </p>
                  </td>
                </tr>
              </table>
              
              <div style="height: 20px;"></div>
              
              <!-- Message -->
              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 20px; background-color: #f8f9fa; border-radius: 8px; border-left: 4px solid #00DEC7;">
                    <p style="margin: 0 0 10px; color: #666666; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Mensaje</p>
                    <p style="margin: 0; color: #000000; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${data.mensaje}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Action Buttons -->
          <tr>
            <td style="padding: 0 40px 30px;">
              <table role="presentation" style="width: 100%;">
                <tr>
                  <td style="text-align: center;">
                    <a href="mailto:${data.email}" style="display: inline-block; padding: 14px 28px; background-color: #00DEC7; color: #000000; text-decoration: none; font-weight: 600; border-radius: 50px;">
                      Responder por Email
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #000000; padding: 25px 40px; text-align: center;">
              <p style="margin: 0; color: rgba(255,255,255,0.7); font-size: 12px;">
                Recibido el ${fecha}
              </p>
              <p style="margin: 10px 0 0; color: rgba(255,255,255,0.5); font-size: 11px;">
                Este es un mensaje automatico de vektra.digital
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { nombre, email, servicio, mensaje, honeypot, timestamp, token } = body as ContactFormData

    // Anti-spam: Check honeypot field (should be empty)
    if (honeypot) {
      console.log("[v0] Spam detected: honeypot field filled")
      return NextResponse.json({ success: true }) // Return success to not reveal spam detection
    }

    // Anti-spam: reCAPTCHA v3 verification
    if (token) {
      try {
        const verifyRes = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=6LdXk1MsAAAAALpTXGY2jvX0Njb3C4c2NQ95gC5L&response=${token}`, { method: 'POST' })
        const verifyData = await verifyRes.json()
        
        if (!verifyData.success || verifyData.score < 0.5) {
          console.log("[v0] Spam detected: low reCAPTCHA score", verifyData.score)
          return NextResponse.json({ success: true })
        }
      } catch (error) {
        console.error("Error verifying reCAPTCHA:", error)
        // Proceed if verification fails due to network error to avoid blocking legitimate users
      }
    }

    // Anti-spam: Check minimum submission time
    if (timestamp && Date.now() - timestamp < MINIMUM_SUBMISSION_TIME) {
      console.log("[v0] Spam detected: form submitted too quickly")
      return NextResponse.json({ success: true }) // Return success to not reveal spam detection
    }

    // Validate required fields
    if (!nombre || !email || !mensaje || !servicio) {
      return NextResponse.json(
        { error: "Faltan campos requeridos" },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Email invalido" },
        { status: 400 }
      )
    }

    // Generate email HTML
    const emailHtml = generateEmailTemplate({ nombre, email, servicio, mensaje })

    // Send email using Nodemailer
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT) || 587,
          secure: Boolean(process.env.SMTP_SECURE) || false, // true for 465, false for other ports
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        })

        await transporter.sendMail({
          from: process.env.SMTP_FROM || '"Vektra Web" <noreply@vektra.digital>',
          to: process.env.SMTP_TO || "contacto@vektra.digital", // Replace with your receiving email
          subject: `Nuevo Prospecto Vektra: ${servicio} - ${nombre}`,
          text: `Nuevo contacto de ${nombre} (${email}). Servicio: ${servicio}. Mensaje: ${mensaje}`, // Fallback plain text
          html: emailHtml,
          replyTo: email,
        })
        
        console.log("[v0] Email sent successfully via Nodemailer")
      } catch (emailError) {
        console.error("[v0] Error sending email with Nodemailer:", emailError)
        // We don't fail the request if email fails, but we log it. 
        // In a production app, you might want to store it in a DB as backup.
      }
    } else {
      console.warn("[v0] SMTP credentials not found. Email not sent. Check environment variables.")
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Contact form error:", error)
    return NextResponse.json(
      { error: "Error al procesar el formulario" },
      { status: 500 }
    )
  }
}

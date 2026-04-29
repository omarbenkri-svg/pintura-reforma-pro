// WhatsApp Business API — BCN Pro Reforma
// No editar directamente: usa variables de entorno en Vercel

export const WA_CONFIG = {
  phoneNumberId: process.env.WA_PHONE_NUMBER_ID || '',
  accessToken:   process.env.WA_ACCESS_TOKEN   || '',
  verifyToken:   process.env.WA_VERIFY_TOKEN   || 'bcnproreforma_whatsapp_2026',
  webhookUrl:    'https://bcnproreforma.app.n8n.cloud/webhook/whatsapp-inbound',
  businessHoursStart: 8,   // 08:00h
  businessHoursEnd:   20,  // 20:30h → usamos 20 como hora, minutos se comprueban en router
  timezone: 'Europe/Madrid',
};

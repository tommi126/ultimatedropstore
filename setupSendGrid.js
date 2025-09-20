/**
 * scripts/setupSendGrid.js
 * Creates SendGrid templates for purchase email and abandoned cart (requires SENDGRID_API_KEY env)
 *
 * Usage (locally):
 *   SENDGRID_API_KEY=SG.xxxx node scripts/setupSendGrid.js
 *
 * It will print the created template IDs — paste them in your .env or use them in your app.
 */
const client = require('@sendgrid/client');
client.setApiKey(process.env.SENDGRID_API_KEY || '');

async function createTemplate(name, subject, htmlContent) {
  try {
    const [tmplRes] = await client.request({
      method: 'POST',
      url: '/v3/templates',
      body: { name }
    });
    const templateId = tmplRes.body.id || tmplRes.body.template_id || tmplRes.body.id;
    // Add version
    const version = {
      active: 1,
      name: `${name}-v1`,
      html_content: htmlContent,
      subject,
      plain_content: htmlContent.replace(/<[^>]+>/g, ''),
      editors: 'design'
    };
    await client.request({
      method: 'POST',
      url: `/v3/templates/${templateId}/versions`,
      body: version
    });
    console.log('Created template', name, templateId);
    return templateId;
  } catch (e) {
    console.error('SendGrid template create error', e && e.response && e.response.body ? e.response.body : e);
    process.exit(1);
  }
}

async function main(){
  if(!process.env.SENDGRID_API_KEY){ console.error('SENDGRID_API_KEY not set'); process.exit(1); }
  const purchaseHtml = `<p>Grazie per il tuo acquisto di {{product_title}}.</p><p>Licenza: {{license_key}}</p><p>Scarica qui: {{download_link}}</p>`;
  const abandonedHtml = `<p>Hai lasciato un carrello con: {{items}}.</p><p>Usa il codice {{coupon}} per avere uno sconto.</p>`;
  await createTemplate('purchase-email', 'Il tuo acquisto', purchaseHtml);
  await createTemplate('abandoned-cart', 'Hai dimenticato il carrello', abandonedHtml);
  console.log('Templates created. Copy the template IDs into env if needed.');
}

main();

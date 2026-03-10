const PDFDocument = require('pdfkit');

const generateCertificate = ({
  donorName,
  kgFood,
  mealsFed,
  co2Prevented,
  ngoName,
}) => {
  return new Promise((resolve, reject) => {
    try {
      const doc    = new PDFDocument({
        size:    'A4',
        margins: { top: 60, bottom: 60, left: 60, right: 60 },
      });

      const buffers = [];
      doc.on('data',  (chunk) => buffers.push(chunk));
      doc.on('end',   () => resolve(Buffer.concat(buffers)));
      doc.on('error', reject);

      const W = doc.page.width;

      /* ── Background ── */
      doc
        .rect(0, 0, W, doc.page.height)
        .fill('#f7fafc');

      /* ── Header Banner ── */
      doc
        .rect(0, 0, W, 160)
        .fill('#63b3ed');

      /* ── Decorative corner circles ── */
      doc
        .circle(0, 0, 80)
        .fill('rgba(104,211,145,0.25)');
      doc
        .circle(W, 0, 80)
        .fill('rgba(104,211,145,0.25)');

      /* ── Logo emoji area ── */
      doc
        .fontSize(48)
        .fillColor('#ffffff')
        .text('🌱', W / 2 - 28, 32, { lineBreak: false });

      /* ── Title ── */
      doc
        .fontSize(24)
        .font('Helvetica-Bold')
        .fillColor('#ffffff')
        .text('FOOD RESCUE CERTIFICATE', 60, 96, {
          align: 'center', width: W - 120,
        });

      doc
        .fontSize(11)
        .font('Helvetica')
        .fillColor('rgba(255,255,255,0.85)')
        .text('ResQ-AI — From Waste to Worth', 60, 130, {
          align: 'center', width: W - 120,
        });

      /* ── White Card ── */
      doc
        .roundedRect(40, 180, W - 80, 480, 20)
        .fill('#ffffff');

      /* ── Recipient ── */
      doc
        .fontSize(13)
        .font('Helvetica')
        .fillColor('#718096')
        .text('This certificate is proudly awarded to:', 60, 210, {
          align: 'center', width: W - 120,
        });

      doc
        .fontSize(30)
        .font('Helvetica-Bold')
        .fillColor('#1a202c')
        .text(donorName, 60, 238, {
          align: 'center', width: W - 120,
        });

      /* ── Divider ── */
      doc
        .moveTo(120, 290)
        .lineTo(W - 120, 290)
        .strokeColor('#e2e8f0')
        .lineWidth(1)
        .stroke();

      /* ── Impact Statement ── */
      doc
        .fontSize(12)
        .font('Helvetica')
        .fillColor('#718096')
        .text(
          'for their generous food donation that created the following impact:',
          60, 308,
          { align: 'center', width: W - 120 }
        );

      /* ── Stats Grid ── */
      const stats = [
        { icon: '🥗', value: `${kgFood} kg`,       label: 'Food Donated'    },
        { icon: '🍽️', value: `${mealsFed}`,        label: 'Meals Fed'       },
        { icon: '🌍', value: `${co2Prevented} kg`, label: 'CO2 Prevented'   },
        { icon: '🌳', value: `${Math.round(co2Prevented / 20)}`, label: 'Trees Equivalent' },
      ];

      const boxW  = (W - 120 - 30) / 2;
      const boxH  = 90;
      const startX = 60;
      const startY = 340;

      stats.forEach((stat, i) => {
        const col = i % 2;
        const row = Math.floor(i / 2);
        const x   = startX + col * (boxW + 15);
        const y   = startY + row * (boxH + 12);

        doc
          .roundedRect(x, y, boxW, boxH, 12)
          .fill('#f7fafc');

        doc
          .fontSize(24)
          .text(stat.icon, x + 16, y + 18, { lineBreak: false });

        doc
          .fontSize(22)
          .font('Helvetica-Bold')
          .fillColor('#63b3ed')
          .text(stat.value, x + 56, y + 16, {
            width: boxW - 70, lineBreak: false,
          });

        doc
          .fontSize(10)
          .font('Helvetica')
          .fillColor('#718096')
          .text(stat.label, x + 56, y + 46, {
            width: boxW - 70, lineBreak: false,
          });
      });

      /* ── NGO Delivered To ── */
      doc
        .roundedRect(60, 566, W - 120, 50, 12)
        .fill('rgba(104,211,145,0.12)');

      doc
        .fontSize(12)
        .font('Helvetica')
        .fillColor('#276749')
        .text(
          `🏠  Delivered to: ${ngoName}`,
          60, 582,
          { align: 'center', width: W - 120 }
        );

      /* ── Date ── */
      doc
        .fontSize(10)
        .font('Helvetica')
        .fillColor('#a0aec0')
        .text(
          `Issued on ${new Date().toLocaleDateString('en-IN', {
            day: 'numeric', month: 'long', year: 'numeric',
          })}`,
          60, 630,
          { align: 'center', width: W - 120 }
        );

      /* ── SDG Badges Row ── */
      const sdgs = ['SDG 2', 'SDG 11', 'SDG 12', 'SDG 13'];
      const sdgW = 80;
      const totalW = sdgs.length * sdgW + (sdgs.length - 1) * 10;
      let sdgX = (W - totalW) / 2;

      sdgs.forEach((sdg) => {
        doc
          .roundedRect(sdgX, 650, sdgW, 22, 11)
          .fill('rgba(99,179,237,0.12)');

        doc
          .fontSize(8)
          .font('Helvetica-Bold')
          .fillColor('#63b3ed')
          .text(sdg, sdgX, 657, {
            width: sdgW, align: 'center', lineBreak: false,
          });

        sdgX += sdgW + 10;
      });

      /* ── Footer ── */
      doc
        .rect(0, doc.page.height - 60, W, 60)
        .fill('#1a202c');

      doc
        .fontSize(10)
        .font('Helvetica')
        .fillColor('#68d391')
        .text(
          'ResQ-AI  ·  Every meal rescued is love delivered  💚',
          0, doc.page.height - 38,
          { align: 'center', width: W }
        );

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = { generateCertificate };
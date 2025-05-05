const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateRecommendation = async (location, capital, interest) => {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const prompt = `
Saya tinggal di ${location}, memiliki modal ${capital}, dan memiliki minat dalam bidang ${interest}.
Berikan jawaban dengan format berikut (jawab dalam 6 baris, satu poin per baris):
1. Jenis usaha yang paling sesuai
2. Usaha lain yang menjanjikan walau tidak sesuai minat
3. Rekomendasi lokasi strategis untuk membuka usaha
4. Rekomendasi tempat beli bahan baku (misal: pasar atau supplier)
5. Estimasi potensi keuntungan (per bulan)
6. Risiko atau tantangan umum yang perlu diantisipasi
`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();

    // Pisahkan tiap baris sebagai output terstruktur
    const lines = text.split('\n').filter(line => line.trim() !== '');

    return {
      businessType: lines[0]?.replace(/^1\.?\s*/, '') || '-',
      promisingBusiness: lines[1]?.replace(/^2\.?\s*/, '') || '-',
      strategicLocation: lines[2]?.replace(/^3\.?\s*/, '') || '-',
      supplierRecommendation: lines[3]?.replace(/^4\.?\s*/, '') || '-',
      expectedProfit: lines[4]?.replace(/^5\.?\s*/, '') || '-',
      potentialRisk: lines[5]?.replace(/^6\.?\s*/, '') || '-',
    };

  } catch (error) {
    console.error('Error saat menghubungi Gemini:', error.message);
    throw new Error('Gagal mendapatkan rekomendasi dari Gemini.');
  }
};

module.exports = { generateRecommendation };

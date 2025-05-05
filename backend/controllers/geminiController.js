const { generateRecommendation } = require('../services/geminiService');

const getRecommendation = async (req, res) => {
  const { location, capital, interest } = req.body;

  try {
    const recommendation = await generateRecommendation(location, capital, interest);
    res.json(recommendation);
  } catch (error) {
    res.status(500).json({ error: 'Terjadi kesalahan saat memproses rekomendasi.' });
  }
};

module.exports = { getRecommendation };

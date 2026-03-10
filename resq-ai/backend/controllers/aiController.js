const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs');

exports.getShelfLife = async (req, res) => {
    try {
        const { itemType, prepDate } = req.body;
        // Mocking Gemini AI response
        res.status(200).json({
            shelfLife: '3 days',
            analysis: `Based on ${itemType}, it should remain safe until ${new Date(new Date(prepDate).getTime() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString()}.`,
            safetyScore: 95
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.checkImage = async (req, res) => {
    try {
        if (!process.env.GEMINI_API_KEY) {
            throw new Error('GEMINI_API_KEY is not configured in environment variables');
        }

        if (!req.file) {
            return res.status(400).json({ message: 'No image uploaded' });
        }

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const imageData = fs.readFileSync(req.file.path);
        const imageBase64 = imageData.toString('base64');

        const prompt = `Analyze this food image for human consumption safety, freshness, and donation suitability. 
        Detect ANY signs of:
        - Spoilage: Rot, fuzzy mold, slime, wilting, or severe discoloration.
        - Decay: Bruising, dark spots on vegetables, or fermented appearance.
        - Waste: Food that looks like plate scraps, half-eaten leftovers, or industrial waste.
        - Expiration: Any visible date labels (Exp, Best Before, Use By). If the date is TODAY (${new Date().toLocaleDateString()}), YESTERDAY, or any past date, mark as "Unsafe".
        - Stale/Old: Food that looks dry, hardened, or like it has been sitting out for too long.

        CRITICAL: If the food looks like it came from a trash can, a scrap plate, or is even slightly unappetizing, MARK AS UNSAFE. 
        It is better to REJECT safe food than to allow one unsafe item. 
        If you see ANY date on a package, you MUST read it. If it is within 2 days of today's date (${new Date().toLocaleDateString()}) or in the past, mark it as "Unsafe".
        
        Respond with "status": "unsafe" for ANY of the above. 

        Return a JSON object with:
        - quality: "Safe", "Unsafe", or "Caution"
        - status: "safe" (only if quality is Safe), "unsafe" (if quality is Unsafe or Caution)
        - confidence: a number from 0-100
        - label: the name of the food item detected
        - shelfLife: estimated remaining shelf life (e.g., "3 days" or "Expired/Zero")
        - score: a number from 0 to 1 (safety rating, 1 is perfect)
        - findings: an array of strings describing specific visual cues (e.g., "Expired date label found", "Fresh leafy greens")
        Respond ONLY with the JSON object.`;

        const result = await model.generateContent([
            prompt,
            {
                inlineData: {
                    data: imageBase64,
                    mimeType: req.file.mimetype
                }
            }
        ]);

        const response = await result.response;
        let text = response.text();

        // Clean up markdown code blocks if present
        text = text.replace(/```json|```/gi, '').trim();
        const analysis = JSON.parse(text);

        // Delete the temporary file
        fs.unlinkSync(req.file.path);

        res.status(200).json(analysis);
    } catch (error) {
        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }
        res.status(500).json({ message: error.message });
    }
};

exports.predictWaste = async (req, res) => {
    try {
        res.status(200).json({
            predictedWaste: '15%',
            recommendation: 'Reduce quantity by 10% for next Tuesday'
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
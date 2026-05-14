const OpenAI = require("openai");

const client = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPENROUTER_API_KEY,
});

async function generateContent(prompt) {

    try {

        const completion = await client.chat.completions.create({

            model: "deepseek/deepseek-chat",

            messages: [
                {
                    role: "system",
                    content: `
                    You are a senior code reviewer with 7+ years experience.
                    Review code professionally.
                    Suggest optimizations, fixes, best practices,
                    security improvements and cleaner architecture.
                    `
                },

                {
                    role: "user",
                    content: prompt
                }
            ],

        });

        return completion.choices[0].message.content;

    } catch (error) {

        console.log(error);

        return "AI service temporarily unavailable.";
    }
}

module.exports = generateContent;
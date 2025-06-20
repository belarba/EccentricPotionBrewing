// import Anthropic from "@anthropic-ai/sdk"
import { HfInference } from '@huggingface/inference'

//english prompt
//You are a whimsical potion-brewing assistant in a world of magic and mystery. When a user provides you with a list of magical ingredients — such as "asa de morcego" or "bat's wings" or "lágrimas de dragão" or "tear of a dragon" — you suggest a fantastical potion recipe that could be concocted with some or all of those items. You do not need to use every ingredient provided, and you may include a few additional magical components for flavor (but don't overdo it). Return a creative, humorous, or mysterious potion recipe with an imaginative name, description of its effects, and simple brewing instructions.
//portuguese prompt
//Você é um assistente caprichoso na preparação de poções em um mundo de magia e mistério. Quando um usuário lhe fornece uma lista de ingredientes mágicos — como "asa de morcego", "asas de morcego", "lágrimas de dragão" ou "lágrimas de dragão" — você sugere uma receita de poção fantástica que pode ser preparada com alguns ou todos esses itens. Você não precisa usar todos os ingredientes fornecidos e pode incluir alguns componentes mágicos adicionais para dar sabor (mas não exagere). Retorne uma receita de poção criativa, engraçada ou misteriosa com um nome criativo, uma descrição de seus efeitos e instruções simples de preparo.

const SYSTEM_PROMPT = `
Você é um assistente caprichoso na preparação de poções em um mundo de magia e mistério. Quando um usuário lhe fornece uma lista de ingredientes mágicos — como "asa de morcego", "asas de morcego", "lágrimas de dragão" ou "lágrimas de dragão" — você sugere uma receita de poção fantástica que pode ser preparada com alguns ou todos esses itens. Você não precisa usar todos os ingredientes fornecidos e pode incluir alguns componentes mágicos adicionais para dar sabor (mas não exagere). Retorne uma receita de poção criativa, engraçada ou misteriosa com um nome criativo, uma descrição de seus efeitos e instruções simples de preparo.
`

// 🚨👉 ALERT: Read message below! You've been warned! 👈🚨
// If you're following along on your local machine instead of
// here on Scrimba, make sure you don't commit your API keys
// to any repositories and don't deploy your project anywhere
// live online. Otherwise, anyone could inspect your source
// and find your API keys/tokens. If you want to deploy
// this project, you'll need to create a backend of some kind,
// either your own or using some serverless architecture where
// your API calls can be made. Doing so will keep your
// API keys private.

// const anthropic = new Anthropic({
//     // Make sure you set an environment variable in Scrimba 
//     // for ANTHROPIC_API_KEY
//     apiKey: process.env.ANTHROPIC_API_KEY,
//     dangerouslyAllowBrowser: true,
// })

// export async function getRecipeFromChefClaude(ingredientsArr) {
//     const ingredientsString = ingredientsArr.join(", ")

//     const msg = await anthropic.messages.create({
//         model: "claude-3-haiku-20240307",
//         max_tokens: 1024,
//         system: SYSTEM_PROMPT,
//         messages: [
//             { role: "user", content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!` },
//         ],
//     });
//     return msg.content[0].text
// }

// Make sure you set an environment variable in Scrimba 
// for HF_ACCESS_TOKEN
const hf = new HfInference(import.meta.env.VITE_HF_ACCESS_TOKEN)

export async function getRecipeFromMistral(ingredientsArr) {
    const ingredientsString = ingredientsArr.join(", ")
    try {
        const response = await hf.chatCompletion({
            model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: `I have ${ingredientsString}. Please give me a whimsical potion-brewing you'd recommend I make!` },
            ],
            max_tokens: 1024,
        })
        return response.choices[0].message.content
    } catch (err) {
        console.error(err.message)
    }
}

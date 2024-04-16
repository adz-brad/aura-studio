'use server'

import OpenAI from 'openai'

const client = new OpenAI({apiKey: process.env.OPENAI_API_KEY})

export const generateString = async (prompt) => {
    return await client.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{role: "system", content: prompt}],
        n: 4,
    }).then((res) => res?.choices?.map((choice) => choice?.message?.content?.replace(/"/g, '')))
}

export const generateArrary = async (prompt) => {
    return await client.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{role: "system", content: prompt}],
        n: 1,
    }).then((res) => res)
}
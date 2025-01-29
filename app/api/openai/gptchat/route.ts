import { gptResponse } from '@/app/components/chat/ChatBox';
import OpenAI from 'openai';

type gptData = {
    chatHistory: gptResponse[];
    message: string;
};

type completion_Params = {
    role: 'system' | 'user';
    content: string;
};
export async function POST(request: Request) {
    console.log('Request received');
    const openai = new OpenAI({
        apiKey: process.env.NEXT_PUBLIC_OPEN_AI_SECRET_KEY,
    });
    const data: gptData = await request.json();
    const existingHistory = data.chatHistory;

    const OAI_System_Prompt: completion_Params = {
        role: 'system',
        content: `You are a helpful assistant.
                    Your role is to respond to the user's prompt by categorizing the response and organizing it into a detailed and structured JSON format:
                    {
                        "responses": [
                            { "text": "<response text>", "htmlTag": "<html tag>" }
                        ]
                    }
                    Rules:
                    - Always include a high-level category as the first entry using an <h1> tag.
                    - Your response should be in the form { "text": "", htmlTag: "", gptResponse: true}.
                    - For lists:
                      - Use { "text": "", "htmlTag": "ul", gptResponse: true } to denote the start of a list.
                      - Represent each list item as { "text": "<list item text>", "htmlTag": "li", gptResponse: true }.
                      - Do not include raw HTML in the "text" field.
                    - Ensure every item in the "responses" array is an object with "text" and "htmlTag" properties.
                    - Avoid single-sentence responses; expand with actionable steps, examples, or insights to make the response comprehensive.
                    - Structure the response logically so that it flows naturally, starting with an overview and breaking down into detailed sections.
                    - Use formatting tags appropriately:
                      - h1: Primary category
                      - h2: Subcategory or section header
                      - p: Paragraphs for detailed explanations
                      - ul: Start of a list
                      - li: Each item in the list.
                    - When asked a straightforward question, provide the answer in one word or phrase
                    {"text": "Your response", "htmlTag": "h3", "gptResponse": true}
                    and then give a brief explanation.
                    - Use the context provided to generate a relevant response.
                    ONLY use the context to have relevant responses to the user's prompt.
                        - the context of the ongoing conversation is ${JSON.stringify(existingHistory)}
                        - the context might look like this: {"text" : string, "htmlTag" : string, "gptResponse" : boolean},
                        whenever the gptResponse is true, it means that the response was generated by AI whenever it is false, it means it was a user query.
                        - whenever relevant, use the previous context to generate a response.
                    - Validate that the JSON maintains a consistent structure, with no missing entries and properly paired text and tags.
    
                    `,
    };

    const completion = await openai.chat.completions.create({
        model: 'chatgpt-4o-latest',
        messages: [
            {
                role: OAI_System_Prompt.role,
                content: `You are a helpful assistant.
                Your role is to respond to the user's prompt by categorizing the response and organizing it into a detailed and structured JSON format:
                {
                    "responses": [
                        { "text": "<response text>", "htmlTag": "<html tag>" }
                    ]
                }
                Rules:
                - Always include a high-level category as the first entry using an <h1> tag.
                - Your response should be in the form { "text": "", htmlTag: "", gptResponse: true}.
                - For lists:
                  - Use { "text": "", "htmlTag": "ul", gptResponse: true } to denote the start of a list.
                  - Represent each list item as { "text": "<list item text>", "htmlTag": "li", gptResponse: true }.
                  - Do not include raw HTML in the "text" field.
                - Ensure every item in the "responses" array is an object with "text" and "htmlTag" properties.
                - Unless asked, avoid single-sentence responses; expand with actionable steps, examples, or insights to make the response comprehensive.
                - Structure the response logically so that it flows naturally, starting with an overview and breaking down into detailed sections.
                - Use formatting tags appropriately:
                  - h1: Primary category
                  - h2: Subcategory or section header
                  - p: Paragraphs for detailed explanations
                  - ul: Start of a list
                  - li: Each item in the list.
                - When asked a straightforward question, provide the answer in one word or phrase
                {"text": "Your response", "htmlTag": "h3", "gptResponse": true}
                and then give a brief explanation.
                - Straightforward questions similar to true or false, or multiple-choice questions should be answered with a single word or phrase that is a h2 tag then further expanded with p tags.
                be sure to make it clear by saying 'The answer is' or 'The answer to your question is' before the answer.
                - Be sure to add a summary at the end of the response to summarize the key points. Use a p tag for this.
                - Use the context provided to generate a relevant response.
                ONLY use the context to have relevant responses to the user's prompt.
                    - the context of the ongoing conversation is ${JSON.stringify(existingHistory)}
                    - the context might look like this: {"text" : string, "htmlTag" : string, "gptResponse" : boolean},
                    whenever the gptResponse is true, it means that the response was generated by AI whenever it is false, it means it was a user query.
                    - whenever relevant, use the previous context to generate a response.
                - Validate that the JSON maintains a consistent structure, with no missing entries and properly paired text and tags.

                `,
            },
            { role: 'user', content: data.message },
        ],
        response_format: { type: 'json_object' },
    });

    return new Response(JSON.stringify({ message: completion.choices[0].message }), { headers: { 'Content-Type': 'application/json' } });
}

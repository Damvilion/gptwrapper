import React from 'react';

export type HtmlTags = 'h1' | 'h2' | 'p' | 'ul' | 'ol';

interface ResponsesProps {
    text: string;
    tag: HtmlTags;
    gptResponse: boolean;
}
const tagStyles = {
    h1: 'text-2xl font-bold text-white text-center my-5',
    h2: 'text-xl font-semibold text-white text-center my-3',
    h3: 'text-lg font-bold text-white text-center my-3',
    p: 'text-lg text-white text-left p-2',
    ul: 'list-disc text-white text-left font-bold',
    ol: 'list-decimal text-white text-left',
    li: 'text-white text-left p-2',
};

const nonGptResponseTagStyles = {
    h1: 'text-2xl font-bold text-white text-center my-5',
    h2: 'text-xl font-semibold text-white text-center my-3',
    h3: 'text-lg font-bold text-white text-center my-3',
    p: 'text-lg text-white text-left p-2',
    ul: 'list-disc text-white text-left',
    ol: 'list-decimal text-white text-left',
    li: 'text-white text-left p-2',
};

export default function Responses({ text, tag, gptResponse }: ResponsesProps) {
    // const stylings = 'text-white p-2 text-center text-xl';

    const Tag = tag as keyof JSX.IntrinsicElements;
    if (gptResponse) {
        return <Tag className={tagStyles[tag]}>{text}</Tag>;
    }

    return (
        <div className='bg-slate-800 rounded-lg p-4 my-2 flex flex-row-reverse'>
            <Tag className={nonGptResponseTagStyles[tag]}>{text}</Tag>;
        </div>
    );
}

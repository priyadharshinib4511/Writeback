import {AiChat} from '@nlux/react';
import {useChatAdapter, ChatAdapterOptions} from '@nlux/langchain-react';
import '@nlux/themes/nova.css';
import * as React from 'react';

const adapterOptions: ChatAdapterOptions<any> = {
    url: 'https://pynlux.api.nlkit.com/pirate-speak',
};

export const ChatBot = () => {
    const chatGptAdapter = useChatAdapter(adapterOptions);

    return (
        <AiChat
            adapter={chatGptAdapter}
            composerOptions={{
                placeholder: 'How can I help you today?'
            }}
        />
    );
};
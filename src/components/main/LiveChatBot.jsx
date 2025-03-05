// LiveChat.jsx
import React, { useState } from 'react';

const LiveChat = ({ isOpen, onClose }) => {
    const [message, setMessage] = useState('');

    if (!isOpen) return null;

    return (
        <div className='fixed top-0 right-16 z-40 h-screen flex items-center'>
            <div
                className='bg-white/85 rounded-lg shadow-xl flex flex-col overflow-hidden border border-gray-200 mr-10 mt-56'
                style={{ width: '400px', height: '700px' }}
            >
                {/* 채팅 헤더 */}
                <div className='flex items-center justify-between p-4 border-b'>
                    <div className='flex items-center space-x-2'>
                        <span className='text-gray-500 font-bold'>•••</span>
                        <span className='text-sm font-medium text-gray-700'>Chat with us!</span>
                    </div>
                    <div className='flex items-center space-x-4'>
                        <div className='w-5 h-0.5 bg-gray-300'></div>
                        <button onClick={onClose} className='text-gray-500'>
                            ✕
                        </button>
                    </div>
                </div>

                {/* Chat Agent Info */}
                <div className='flex items-center p-4 border-b'>
                    <div className='flex items-center'>
                        <div className='w-6 h-6 rounded-md bg-indigo-800 flex items-center justify-center text-white mr-2'>
                            {/* Chat icon placeholder */}
                        </div>
                        <div>
                            <div className='text-sm font-medium'>Chatbot</div>
                            <div className='text-xs text-gray-400'>Support Agent</div>
                        </div>
                    </div>
                    <div className='ml-auto flex'>
                        <div className='mx-1 text-gray-400'>{/* Thumbs up icon placeholder */}</div>
                        <div className='mx-1 text-gray-400'>{/* Thumbs down icon placeholder */}</div>
                    </div>
                </div>

                {/* Chat Messages */}
                <div className='flex-1 overflow-y-auto p-4 space-y-8'>
                    {/* Agent message with timestamp */}
                    <div className='flex items-start'>
                        <div className='w-3 h-3 rounded-full bg-indigo-800 flex items-center justify-center text-white mr-2 mt-1'>
                            {/* Small dot */}
                        </div>
                        <div>
                            <div className='text-xs text-gray-500 mb-1'>Livechat 02:10 PM</div>
                            <div className='bg-gray-100 p-3 rounded-lg inline-block max-w-xs'>
                                <p className='text-sm text-gray-700'>Hello Nice</p>
                            </div>
                            <div className='bg-gray-100 p-3 rounded-lg inline-block max-w-xs mt-2'>
                                <p className='text-sm text-gray-700'>
                                    Welcome to LiveChat
                                    <br />I was made with. Pick a<br />
                                    topic from the list or type
                                    <br />
                                    down a question!
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* User message with timestamp */}
                    <div className='flex flex-col items-end'>
                        <div className='text-xs text-gray-500 mb-1'>Visitor 02:12 PM</div>
                        <div className='bg-blue-800 p-3 rounded-lg inline-block max-w-xs'>
                            <p className='text-sm text-white'>Welcome</p>
                        </div>
                        <div className='text-xs text-gray-400 mt-1'>Read</div>
                    </div>
                </div>

                {/* Input Area */}
                <div className='p-4 border-t'>
                    <div className='flex items-center'>
                        <div className='flex-1 p-2 text-sm text-gray-500'>Write a message</div>
                        <div className='p-2 text-gray-400'>{/* Emoji icon placeholder */}</div>
                        <div className='p-2 text-gray-400'>{/* Attachment icon placeholder */}</div>
                        <div className='p-2 text-blue-600'>{/* Send icon placeholder */}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LiveChat;

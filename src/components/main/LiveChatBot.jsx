// LiveChatBot.jsx
import React, { useState, useRef, useEffect } from 'react';
import { fetchBotResponse } from '../main/ChatBotLogic'; // 위에서 만든 로직을 별도 파일로 분리했다고 가정

// 현재 시간을 포맷팅하는 함수
const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    return `${hours > 12 ? hours - 12 : hours === 0 ? 12 : hours}:${minutes < 10 ? '0' + minutes : minutes} ${
        hours >= 12 ? 'PM' : 'AM'
    }`;
};

// 추천 질문 데이터
const SUGGESTED_QUESTIONS = [
    '배송은 얼마나 걸리나요?',
    'HEAVY HOOD 가격이 얼마인가요?',
    '교환 및 반품 정책이 궁금해요',
    '사이즈는 어떻게 선택하나요?',
    '오프라인 매장이 있나요?',
];

const LiveChat = ({ isOpen, onClose }) => {
    // 메시지 상태 관리
    const [message, setMessage] = useState('');
    const [chatMessages, setChatMessages] = useState([
        {
            id: 1,
            sender: 'agent',
            text: '안녕하세요! OHESHIO 입니다!! 무엇을 도와드릴까요?',
            time: getCurrentTime(),
        },
        {
            id: 2,
            sender: 'agent',
            text: '제품 정보, 배송, 교환/반품 등에 관해 질문해주세요.',
            time: getCurrentTime(),
        },
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(true);

    // 자동 스크롤을 위한 ref
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    // 새 메시지가 추가될 때 자동 스크롤
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
        // 컴포넌트가 마운트될 때 input에 포커스
        if (isOpen) {
            inputRef.current?.focus();
        }
    }, [chatMessages, isOpen]);

    // 추천 질문 선택 처리
    const handleSuggestedQuestion = (question) => {
        setShowSuggestions(false);
        handleSendMessageWithText(question);
    };

    // 메시지 전송 처리 (텍스트 직접 전달 버전)
    const handleSendMessageWithText = async (text) => {
        if (!text || isLoading) return;

        const currentTime = getCurrentTime();

        // 사용자 메시지 추가
        const newUserMessage = {
            id: Date.now(),
            sender: 'user',
            text: text,
            time: currentTime,
            read: false,
        };

        // 메시지 목록 업데이트
        setChatMessages((prevMessages) => [...prevMessages, newUserMessage]);
        setMessage(''); // 입력창 비우기
        setIsLoading(true); // 로딩 상태 활성화

        try {
            // 향상된 챗봇 로직으로 응답 가져오기
            const botResponse = await fetchBotResponse(text);

            // 에이전트 응답 메시지
            const autoResponse = {
                id: Date.now() + 1,
                sender: 'agent',
                text: botResponse,
                time: getCurrentTime(),
            };

            // 상태 업데이트 - 새 메시지 추가와 읽음 표시를 한번에 처리
            setChatMessages((prevMessages) => {
                const updatedMessages = prevMessages.map((msg) =>
                    msg.id === newUserMessage.id ? { ...msg, read: true } : msg
                );
                return [...updatedMessages, autoResponse];
            });
        } catch (error) {
            console.error('Error fetching bot response:', error);

            // 오류 메시지 표시
            const errorResponse = {
                id: Date.now() + 1,
                sender: 'agent',
                text: '죄송합니다, 응답을 처리하는 데 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.',
                time: getCurrentTime(),
            };

            setChatMessages((prevMessages) => {
                const updatedMessages = prevMessages.map((msg) =>
                    msg.id === newUserMessage.id ? { ...msg, read: true } : msg
                );
                return [...updatedMessages, errorResponse];
            });
        } finally {
            setIsLoading(false); // 로딩 상태 비활성화
        }
    };

    // 메시지 전송 처리 (폼 제출 시)
    const handleSendMessage = () => {
        if (message.trim()) {
            handleSendMessageWithText(message.trim());
        }
    };

    // 엔터 키로 메시지 전송
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    // 컴포넌트가 닫혀있으면 렌더링하지 않음
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
                            {/* 챗봇 아이콘 */}
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                className='h-4 w-4'
                                fill='none'
                                viewBox='0 0 24 24'
                                stroke='currentColor'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth={2}
                                    d='M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z'
                                />
                            </svg>
                        </div>
                        <div>
                            <div className='text-sm font-medium'>Chatbot</div>
                            <div className='text-xs text-gray-400'>Support Agent</div>
                        </div>
                    </div>
                    <div className='ml-auto flex'>
                        <div className='mx-1 text-gray-400'>
                            {/* 좋아요 아이콘 */}
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                className='h-4 w-4'
                                fill='none'
                                viewBox='0 0 24 24'
                                stroke='currentColor'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth={2}
                                    d='M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5'
                                />
                            </svg>
                        </div>
                        <div className='mx-1 text-gray-400'>
                            {/* 싫어요 아이콘 */}
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                className='h-4 w-4'
                                fill='none'
                                viewBox='0 0 24 24'
                                stroke='currentColor'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth={2}
                                    d='M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.095c.5 0 .905-.405.905-.905 0-.714.211-1.412.608-2.006L17 13v-9m-7 10h2m-2-10v5a2 2 0 01-2 2h-2.5'
                                />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Chat Messages */}
                <div className='flex-1 overflow-y-auto p-4 space-y-8'>
                    {chatMessages.map((msg) =>
                        msg.sender === 'agent' ? (
                            // 에이전트 메시지
                            <div key={msg.id} className='flex items-start'>
                                <div className='w-3 h-3 rounded-full bg-indigo-800 flex items-center justify-center text-white mr-2 mt-1'>
                                    {/* 작은 점 */}
                                </div>
                                <div>
                                    <div className='text-xs text-gray-500 mb-1'>Oheshio CS {msg.time}</div>
                                    <div className='bg-gray-100 p-3 rounded-lg inline-block max-w-xs'>
                                        <p className='text-sm text-gray-700'>{msg.text}</p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            // 사용자 메시지
                            <div key={msg.id} className='flex flex-col items-end'>
                                <div className='text-xs text-gray-500 mb-1'>
                                    {msg.time} {msg.read ? '읽음' : ''}
                                </div>
                                <div className='bg-indigo-600 p-3 rounded-lg inline-block max-w-xs'>
                                    <p className='text-sm text-white'>{msg.text}</p>
                                </div>
                            </div>
                        )
                    )}

                    {/* 로딩 인디케이터 */}
                    {isLoading && (
                        <div className='flex items-start'>
                            <div className='w-3 h-3 rounded-full bg-indigo-800 mr-2 mt-1'></div>
                            <div>
                                <div className='text-xs text-gray-500 mb-1'>Oheshio CS {getCurrentTime()}</div>
                                <div className='bg-gray-100 p-3 rounded-lg inline-block'>
                                    <div className='flex space-x-1'>
                                        <div className='w-2 h-2 rounded-full bg-gray-400 animate-bounce'></div>
                                        <div
                                            className='w-2 h-2 rounded-full bg-gray-400 animate-bounce'
                                            style={{ animationDelay: '0.2s' }}
                                        ></div>
                                        <div
                                            className='w-2 h-2 rounded-full bg-gray-400 animate-bounce'
                                            style={{ animationDelay: '0.4s' }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* 추천 질문 섹션 */}
                {showSuggestions && (
                    <div className='p-4 border-t'>
                        <div className='text-xs text-gray-500 mb-2'>Question</div>
                        <div className='flex flex-wrap gap-2'>
                            {SUGGESTED_QUESTIONS.map((question, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleSuggestedQuestion(question)}
                                    className='text-xs bg-gray-100 hover:bg-gray-200 rounded-full px-3 py-1 transition-colors'
                                >
                                    {question}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* 메시지 입력 영역 */}
                <div className='p-4 border-t'>
                    <div className='flex items-center bg-gray-100 rounded-full px-4 py-2'>
                        <input
                            type='text'
                            ref={inputRef}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder='Write a message'
                            className='flex-1 bg-transparent outline-none text-sm'
                        />
                        <button
                            onClick={handleSendMessage}
                            disabled={!message.trim() || isLoading}
                            className={`ml-2 rounded-full p-1 ${
                                !message.trim() || isLoading ? 'text-gray-400' : 'text-indigo-600 hover:bg-indigo-100'
                            }`}
                        >
                            {/* 전송 아이콘 */}
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                className='h-5 w-5'
                                fill='none'
                                viewBox='0 0 24 24'
                                stroke='currentColor'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth={2}
                                    d='M12 19l9 2-9-18-9 18 9-2zm0 0v-8'
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LiveChat;

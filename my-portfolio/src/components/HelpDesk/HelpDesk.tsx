"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useChat } from 'ai/react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './HelpDesk.module.scss';
import { useLanguage } from '../LanguageToggle/LanguageContext';

export default function HelpDesk() {
  const [isOpen, setIsOpen] = useState(false);
  const { lang } = useLanguage();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { messages, input, handleInputChange, handleSubmit, isLoading, append } = useChat({
    api: '/api/chat',
    initialMessages: [
      {
        id: 'welcome',
        role: 'assistant',
        content: lang === 'ar' ? 'مرحباً! أنا مساعد الذكاء الاصطناعي لـ عبدالله. كيف يمكنني مساعدتك؟' : 'Hi! I am Abdallah\'s AI assistant. How can I help you today?',
      }
    ]
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(scrollToBottom, 50);
    }
  }, [messages, isOpen]);

  const toggleChat = () => setIsOpen(!isOpen);

  const predefinedQuestions = lang === 'ar' ? [
    'حدثني عن خبرات عبدالله',
    'ما هي التقنيات التي يستخدمها؟',
    'كيف يمكنني التواصل معه؟'
  ] : [
    'Tell me about Abdallah\'s experience',
    'What technologies does he use?',
    'How can I contact him?'
  ];

  const handleSuggestionClick = (question: string) => {
    append({ role: 'user', content: question });
  };

  return (
    <div className={styles.helpDeskContainer}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={styles.chatWindow}
          >
            <div className={styles.header}>
              <div className="flex items-center gap-2" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 8V4H8"/><rect x="4" y="8" width="16" height="12" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/>
                </svg>
                <span>{lang === 'ar' ? 'مساعد الذكاء الاصطناعي' : 'AI Assistant'}</span>
              </div>
              <button 
                onClick={toggleChat}
                className={styles.closeButton}
                aria-label="Close Chat"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            <div className={styles.messages}>
              {messages.map((m: { id: string; role: string; content: string }) => (
                <div 
                  key={m.id} 
                  className={`${styles.message} ${m.role === 'user' ? styles.userMessage : styles.aiMessage}`}
                >
                  {m.content}
                </div>
              ))}
              
              {isLoading && (
                <div className={`${styles.message} ${styles.aiMessage}`}>
                  <div className={styles.typingIndicator}>
                    <div className={styles.dot}></div>
                    <div className={styles.dot}></div>
                    <div className={styles.dot}></div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {messages.length === 1 && (
              <div className={styles.suggestions}>
                {predefinedQuestions.map((q, idx) => (
                  <button 
                    key={idx} 
                    onClick={() => handleSuggestionClick(q)}
                    className={styles.suggestionChip}
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            <form onSubmit={handleSubmit} className={styles.inputForm}>
              <input
                value={input}
                onChange={handleInputChange}
                placeholder={lang === 'ar' ? 'اكتب رسالتك...' : 'Type a message...'}
                className={styles.input}
                aria-label="Chat input"
              />
              <button 
                type="submit" 
                className={styles.sendButton}
                disabled={isLoading || !input.trim()}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: 'translateX(2px)' }}>
                  <line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        className={styles.fab}
        onClick={toggleChat}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle Chat"
      >
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        )}
        {!isOpen && messages.length > 1 && (
          <span className={styles.badge} />
        )}
      </motion.button>
    </div>
  );
}

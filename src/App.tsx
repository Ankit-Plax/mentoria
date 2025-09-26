import React, { useState } from 'react';
import { LogIn, Upload, BookOpen, MessageCircle, ArrowLeft, Search, Filter, Send } from 'lucide-react';

type Page = 'login' | 'dashboard' | 'upload' | 'browse' | 'ai';

interface Note {
  id: string;
  title: string;
  subject: string;
  uploader: string;
  uploadDate: string;
}

interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: string;
}

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');

  // Dummy notes data
  const notes: Note[] = [
    {
      id: '1',
      title: 'Introduction to React Hooks',
      subject: 'Computer Science',
      uploader: 'Sarah Chen',
      uploadDate: '2025-01-08'
    },
    {
      id: '2',
      title: 'Calculus II - Integration Techniques',
      subject: 'Mathematics',
      uploader: 'Alex Rodriguez',
      uploadDate: '2025-01-07'
    },
    {
      id: '3',
      title: 'Modern Art Movements',
      subject: 'Art History',
      uploader: 'Emma Thompson',
      uploadDate: '2025-01-06'
    },
    {
      id: '4',
      title: 'Organic Chemistry Reactions',
      subject: 'Chemistry',
      uploader: 'Michael Kim',
      uploadDate: '2025-01-05'
    },
    {
      id: '5',
      title: 'World War II Timeline',
      subject: 'History',
      uploader: 'David Wilson',
      uploadDate: '2025-01-04'
    }
  ];

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentPage('dashboard');
  };

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString() + '-user',
      text: chatInput,
      isUser: true,
      timestamp: new Date().toLocaleTimeString()
    };

    const aiResponse: ChatMessage = {
      id: Date.now().toString() + '-ai',
      text: `I understand you're asking about "${chatInput}". As an AI study assistant, I can help you understand complex concepts, explain topics in simpler terms, and provide study guidance. What specific aspect would you like me to elaborate on?`,
      isUser: false,
      timestamp: new Date().toLocaleTimeString()
    };

    setChatMessages(prev => [...prev, userMessage, aiResponse]);
    setChatInput('');
  };

  const renderHeader = () => {
    if (currentPage === 'login') return null;

    return (
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              {currentPage !== 'dashboard' && (
                <button
                  onClick={() => setCurrentPage('dashboard')}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                >
                  <ArrowLeft className="h-5 w-5 text-gray-600" />
                </button>
              )}
              <h1 className="text-2xl font-bold text-blue-900">Mentoria</h1>
            </div>
          </div>
        </div>
      </header>
    );
  };

  const renderLogin = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-20 w-20 bg-blue-600 rounded-2xl flex items-center justify-center mb-8">
            <BookOpen className="h-10 w-10 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-2">Mentoria</h2>
          <p className="text-lg text-gray-600">Your collaborative learning platform</p>
        </div>
        
        <div className="bg-white p-8 rounded-2xl shadow-xl">
          <button
            onClick={handleLogin}
            className="w-full flex items-center justify-center space-x-3 bg-white border-2 border-gray-300 rounded-xl px-6 py-3 text-gray-700 font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 transform hover:scale-105"
          >
            <LogIn className="h-5 w-5" />
            <span>Continue with Google</span>
          </button>
        </div>
      </div>
    </div>
  );

  const renderDashboard = () => (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Welcome back!</h2>
          <p className="text-xl text-gray-600">What would you like to do today?</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <button
            onClick={() => setCurrentPage('upload')}
            className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-100"
          >
            <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-6">
              <Upload className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Upload Notes</h3>
            <p className="text-gray-600">Share your study materials with the community</p>
          </button>

          <button
            onClick={() => setCurrentPage('browse')}
            className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-100"
          >
            <div className="w-16 h-16 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-6">
              <BookOpen className="h-8 w-8 text-emerald-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Browse Notes</h3>
            <p className="text-gray-600">Explore notes shared by other students</p>
          </button>

          <button
            onClick={() => setCurrentPage('ai')}
            className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-100 md:col-span-2 lg:col-span-1"
          >
            <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-6">
              <MessageCircle className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Ask AI</h3>
            <p className="text-gray-600">Get instant help with your studies</p>
          </button>
        </div>
      </div>
    </div>
  );

  const renderUpload = () => (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Upload Notes</h2>
          <p className="text-lg text-gray-600">Share your study materials with fellow students</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <form className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Note Title
              </label>
              <input
                type="text"
                id="title"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                placeholder="e.g., Introduction to Calculus"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                Subject
              </label>
              <select
                id="subject"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
              >
                <option value="">Select a subject</option>
                <option value="mathematics">Mathematics</option>
                <option value="computer-science">Computer Science</option>
                <option value="chemistry">Chemistry</option>
                <option value="physics">Physics</option>
                <option value="history">History</option>
                <option value="art">Art History</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload File
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors duration-200">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">Drag and drop your file here, or</p>
                <button
                  type="button"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Browse Files
                </button>
                <p className="text-sm text-gray-500 mt-2">PDF, DOC, DOCX up to 10MB</p>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-200 transform hover:scale-105"
            >
              Upload Notes
            </button>
          </form>
        </div>
      </div>
    </div>
  );

  const renderBrowse = () => (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Browse Notes</h2>
          <p className="text-lg text-gray-600">Discover study materials from fellow students</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search notes..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
              />
            </div>
            <button className="flex items-center space-x-2 px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors duration-200">
              <Filter className="h-5 w-5" />
              <span>Filter</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note) => (
            <div key={note.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{note.title}</h3>
              <p className="text-sm text-blue-600 font-medium mb-2">{note.subject}</p>
              <p className="text-sm text-gray-600 mb-4">by {note.uploader}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">{note.uploadDate}</span>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors duration-200">
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAI = () => (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ask AI</h2>
          <p className="text-lg text-gray-600">Get instant help with your studies</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 h-96 mb-6">
          <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto mb-4 space-y-4">
              {chatMessages.length === 0 ? (
                <div className="text-center py-12">
                  <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Start a conversation with your AI study assistant!</p>
                </div>
              ) : (
                chatMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                        message.isUser
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p>{message.text}</p>
                      <p className={`text-xs mt-1 ${message.isUser ? 'text-blue-200' : 'text-gray-500'}`}>
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-4">
          <div className="flex items-center space-x-4">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask me anything about your studies..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
            />
            <button
              onClick={handleSendMessage}
              className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 transition-colors duration-200 transform hover:scale-105"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      {renderHeader()}
      {currentPage === 'login' && renderLogin()}
      {currentPage === 'dashboard' && renderDashboard()}
      {currentPage === 'upload' && renderUpload()}
      {currentPage === 'browse' && renderBrowse()}
      {currentPage === 'ai' && renderAI()}
    </div>
  );
}

export default App;
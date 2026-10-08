import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  Send,
  X,
  History,
  RotateCcw,
  PlusCircle,
  MapPin,
  Star,
  Building2,
  Utensils,
  Bus,
  Compass,
  ChevronRight,
  CheckCircle2,
  Trash2,
  AlertCircle,
} from 'lucide-react';
import { aiService } from '../../services/aiService';
import { AIMessage, AIConversation, AIRecommendationItem, AITripPlan } from '../../types/ai';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialPrompt?: string;
  onNavigatePlace?: (placeId: string) => void;
  onNavigateTab?: (tab: string) => void;
}

const STARTER_PROMPTS = [
  { title: 'Plan a 2-day trip to Sajek', prompt: 'Plan a 2-day trip to Sajek Valley for 2 people with budget estimation' },
  { title: 'Find a trip under ৳5,000', prompt: 'Find a complete travel trip in Bangladesh with budget under ৳5,000' },
  { title: "Cheap hotels in Cox's Bazar", prompt: "Find cheap, verified hotels in Cox's Bazar near the beach" },
  { title: 'Best places to visit in Sylhet', prompt: 'Best tourist places to visit in Sylhet and famous local restaurants' },
  { title: 'Make a trip plan for 2 people', prompt: 'Make a trip plan for 2 people visiting Sreemangal tea gardens' },
];

const renderInlineMarkdown = (text: string) => {
  const parts = text.split(/(\*\*.*?\*\*|\*.*?\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-bold text-slate-900">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('*') && part.endsWith('*')) {
      return <em key={i} className="italic text-slate-600">{part.slice(1, -1)}</em>;
    }
    return part;
  });
};

const AIMarkdownContent: React.FC<{ content: string; isUser?: boolean }> = ({ content, isUser }) => {
  if (isUser) {
    return <div className="whitespace-pre-wrap text-xs sm:text-sm font-medium">{content}</div>;
  }

  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let listItems: string[] = [];

  const flushList = (keyPrefix: string) => {
    if (listItems.length > 0) {
      elements.push(
        <ul key={`${keyPrefix}-list`} className="space-y-1.5 my-2 pl-0.5">
          {listItems.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
              <span>{renderInlineMarkdown(item)}</span>
            </li>
          ))}
        </ul>
      );
      listItems = [];
    }
  };

  lines.forEach((line, index) => {
    const trimmed = line.trim();

    if (!trimmed) {
      flushList(`flush-${index}`);
      elements.push(<div key={`space-${index}`} className="h-1.5" />);
      return;
    }

    if (trimmed === '---') {
      flushList(`hr-${index}`);
      elements.push(<hr key={`hr-${index}`} className="my-2.5 border-slate-200" />);
      return;
    }

    if (trimmed.startsWith('###')) {
      flushList(`h3-${index}`);
      const heading = trimmed.replace(/^###\s*/, '');
      elements.push(
        <h3 key={`h3-${index}`} className="text-sm sm:text-base font-bold text-slate-900 mt-3 mb-1.5 flex items-center gap-1.5">
          {renderInlineMarkdown(heading)}
        </h3>
      );
      return;
    }

    if (trimmed.startsWith('>')) {
      flushList(`quote-${index}`);
      const quote = trimmed.replace(/^>\s*/, '');
      elements.push(
        <div key={`quote-${index}`} className="my-2 p-2.5 sm:p-3 rounded-xl bg-emerald-50/90 border-l-4 border-emerald-500 text-xs sm:text-sm text-emerald-950 font-medium shadow-2xs">
          {renderInlineMarkdown(quote)}
        </div>
      );
      return;
    }

    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      listItems.push(trimmed.slice(2));
      return;
    }

    const numMatch = trimmed.match(/^(\d+)\.\s*(.*)/);
    if (numMatch) {
      flushList(`num-${index}`);
      elements.push(
        <div key={`num-${index}`} className="flex items-start gap-2 my-1 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <span className="font-bold text-emerald-600 shrink-0">{numMatch[1]}.</span>
          <span>{renderInlineMarkdown(numMatch[2])}</span>
        </div>
      );
      return;
    }

    flushList(`p-${index}`);
    elements.push(
      <p key={`p-${index}`} className="text-xs sm:text-sm text-slate-700 leading-relaxed my-1">
        {renderInlineMarkdown(trimmed)}
      </p>
    );
  });

  flushList('final');
  return <div className="space-y-0.5">{elements}</div>;
};

export const YEANAAIChatModal: React.FC<Props> = ({
  isOpen,
  onClose,
  initialPrompt,
  onNavigatePlace,
  onNavigateTab,
}) => {
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<AIMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [lastFailedMessage, setLastFailedMessage] = useState<string | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [conversations, setConversations] = useState<AIConversation[]>([]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && initialPrompt && messages.length === 0) {
      handleSendMessage(initialPrompt);
    }
  }, [isOpen, initialPrompt]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  const loadHistory = async () => {
    try {
      const list = await aiService.getConversations();
      setConversations(list);
    } catch (e) {
      console.warn('Error loading conversations:', e);
    }
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text || isLoading) return;

    setInputText('');
    setErrorMessage(null);
    setLastFailedMessage(null);

    const tempUserMsg: AIMessage = {
      id: `temp-${Date.now()}`,
      conversation_id: conversationId || 'temp',
      role: 'user',
      content: text,
      created_at: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, tempUserMsg]);
    setIsLoading(true);

    try {
      const res = await aiService.sendMessage(text, conversationId);

      if (res && res.success) {
        if (!conversationId && res.conversation_id) {
          setConversationId(res.conversation_id);
        }
        setMessages((prev) => {
          const filtered = prev.filter((m) => m.id !== tempUserMsg.id);
          const confirmedUser: AIMessage = { ...tempUserMsg, conversation_id: res.conversation_id };
          return [...filtered, confirmedUser, res.message];
        });
      } else {
        throw new Error(res.error || 'Failed to get response');
      }
    } catch (err: any) {
      console.error('Chat error:', err);
      setLastFailedMessage(text);
      setErrorMessage("Sorry, YEANA AI couldn't respond right now. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartNewChat = () => {
    setConversationId(null);
    setMessages([]);
    setErrorMessage(null);
    setShowHistory(false);
  };

  const handleSelectConversation = async (cid: string) => {
    setConversationId(cid);
    setShowHistory(false);
    setIsLoading(true);
    try {
      const msgs = await aiService.getMessages(cid);
      setMessages(msgs);
    } catch (e) {
      console.warn('Error loading messages:', e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteConversation = async (e: React.MouseEvent, cid: string) => {
    e.stopPropagation();
    await aiService.deleteConversation(cid);
    setConversations((prev) => prev.filter((c) => c.id !== cid));
    if (conversationId === cid) {
      handleStartNewChat();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl h-[92vh] max-h-[750px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-200">
        
        {/* Header */}
        <div className="px-5 py-3.5 bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-600 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-inner">
              <Sparkles className="w-5 h-5 text-emerald-100" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base tracking-tight">YEANA AI</h3>
                <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-500/40 text-emerald-100 rounded-full border border-emerald-300/30">
                  TRAVEL ASSISTANT
                </span>
              </div>
              <p className="text-[11px] text-emerald-100/90 font-medium flex items-center gap-1.5 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
                Verified Bangladesh Travel & Budget Planner
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleStartNewChat}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all text-xs font-semibold flex items-center gap-1"
              title="New Chat"
            >
              <PlusCircle className="w-4 h-4" />
              <span className="hidden sm:inline">New</span>
            </button>
            <button
              onClick={() => {
                setShowHistory(!showHistory);
                if (!showHistory) loadHistory();
              }}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all text-xs font-semibold flex items-center gap-1"
              title="Chat History"
            >
              <History className="w-4 h-4" />
              <span className="hidden sm:inline">History</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all ml-1"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* History Drawer or Chat Body */}
        {showHistory ? (
          <div className="flex-1 overflow-y-auto p-4 bg-slate-50">
            <div className="flex items-center justify-between mb-3 px-1">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Conversation History ({conversations.length})
              </h4>
              <button
                onClick={handleStartNewChat}
                className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
              >
                <PlusCircle className="w-3.5 h-3.5" /> Start New Chat
              </button>
            </div>

            {conversations.length === 0 ? (
              <div className="text-center py-16 text-slate-400">
                <History className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No previous conversations found.</p>
              </div>
            ) : (
              <div className="space-y-2">
                {conversations.map((c) => (
                  <div
                    key={c.id}
                    onClick={() => handleSelectConversation(c.id)}
                    className="flex items-center justify-between p-3.5 bg-white rounded-xl border border-slate-200/80 hover:border-emerald-300 hover:shadow-xs transition-all cursor-pointer group"
                  >
                    <div className="min-w-0 pr-3">
                      <p className="font-semibold text-sm text-slate-800 truncate group-hover:text-emerald-700">
                        {c.title}
                      </p>
                      <p className="text-[11px] text-slate-400 mt-0.5 truncate">
                        {c.last_message || new Date(c.updated_at || c.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={(e) => handleDeleteConversation(e, c.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-500" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-slate-50/70">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center min-h-[380px] text-center max-w-md mx-auto py-6">
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-center text-emerald-600 mb-3.5 shadow-sm">
                  <Sparkles className="w-7 h-7" />
                </div>
                <h4 className="text-lg font-bold text-slate-800 mb-1.5">
                  Hi! I'm YEANA AI ✈️
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed mb-6">
                  I can help you plan trips across all 64 districts, estimate budgets in Taka (৳), recommend verified hotels, restaurants and transportation.
                </p>

                <div className="w-full space-y-2 text-left">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-1">
                    Suggested Prompts:
                  </p>
                  {STARTER_PROMPTS.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(item.prompt)}
                      className="w-full text-left p-3 rounded-xl bg-white border border-slate-200/80 hover:border-emerald-300 hover:bg-emerald-50/40 text-xs font-medium text-slate-700 transition-all flex items-center justify-between shadow-2xs group"
                    >
                      <span>{item.title}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-emerald-500" />
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((m) => {
                const isUser = m.role === 'user';
                const recs = m.metadata?.recommendations || [];
                const plan = m.metadata?.trip_plan;

                return (
                  <div
                    key={m.id}
                    className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    {!isUser && (
                      <div className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center text-white shrink-0 mt-1 shadow-xs">
                        <Sparkles className="w-3.5 h-3.5" />
                      </div>
                    )}

                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                        isUser
                          ? 'bg-emerald-600 text-white rounded-br-xs shadow-sm'
                          : 'bg-white text-slate-800 border border-slate-200/80 rounded-bl-xs shadow-xs'
                      }`}
                    >
                      {!isUser && (
                        <div className="flex items-center gap-1.5 mb-1.5 text-[11px] font-bold text-emerald-700">
                          <span>YEANA AI</span>
                          <span className="w-1 h-1 rounded-full bg-emerald-400" />
                          <span className="text-[10px] text-slate-400 font-normal">Verified Travel Guide</span>
                        </div>
                      )}

                      <AIMarkdownContent content={m.content} isUser={isUser} />

                      {/* Trip Plan Card */}
                      {plan && !isUser && (
                        <div className="mt-3 p-3 bg-emerald-50/80 rounded-xl border border-emerald-200/80 text-xs">
                          <div className="flex items-center justify-between pb-2 mb-2 border-b border-emerald-200/60 font-bold text-emerald-900">
                            <span className="flex items-center gap-1.5">
                              <Compass className="w-4 h-4 text-emerald-600" />
                              {plan.destination} ({plan.duration_days} Days)
                            </span>
                            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-extrabold">
                              ৳{plan.estimated_budget?.toLocaleString()}
                            </span>
                          </div>
                          <div className="space-y-1.5">
                            {plan.days?.map((d: any) => (
                              <div key={d.day} className="flex justify-between text-slate-700 bg-white/90 p-2 rounded-lg border border-emerald-100">
                                <span className="font-medium">Day {d.day}: {d.title}</span>
                                {d.estimated_cost ? (
                                  <span className="text-emerald-700 font-bold">৳{d.estimated_cost}</span>
                                ) : null}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Recommendations */}
                      {recs.length > 0 && !isUser && (
                        <div className="mt-3 pt-3 border-t border-slate-100 space-y-2">
                          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                            Verified Recommendations:
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {recs.map((rec: AIRecommendationItem) => (
                              <div
                                key={rec.id}
                                className="flex gap-2.5 p-2 bg-slate-50/90 rounded-xl border border-slate-200/70 hover:border-emerald-300 transition-all text-xs"
                              >
                                {rec.image ? (
                                  <img
                                    src={rec.image}
                                    alt={rec.name}
                                    className="w-14 h-14 rounded-lg object-cover bg-slate-200 shrink-0"
                                  />
                                ) : (
                                  <div className="w-14 h-14 rounded-lg bg-emerald-100/80 flex items-center justify-center text-emerald-700 shrink-0 font-bold">
                                    BD
                                  </div>
                                )}
                                <div className="min-w-0 flex-1 flex flex-col justify-between">
                                  <div>
                                    <p className="font-bold text-slate-800 truncate">{rec.name}</p>
                                    <p className="text-[11px] text-slate-500 truncate">{rec.location}</p>
                                  </div>
                                  <div className="flex items-center justify-between mt-1">
                                    <span className="text-emerald-700 font-extrabold text-[11px]">
                                      {rec.price || 'Verified'}
                                    </span>
                                    {rec.rating ? (
                                      <span className="flex items-center gap-0.5 text-amber-500 text-[10px] font-bold">
                                        ★ {rec.rating}
                                      </span>
                                    ) : null}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className={`mt-1.5 text-[10px] text-right ${isUser ? 'text-emerald-100' : 'text-slate-400'}`}>
                        {new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                );
              })
            )}

            {isLoading && (
              <div className="flex items-center gap-2 text-xs text-slate-500 bg-white p-3 rounded-2xl border border-slate-200/70 w-fit">
                <Sparkles className="w-4 h-4 text-emerald-600 animate-spin" />
                <span>YEANA AI is finding verified recommendations...</span>
              </div>
            )}

            {errorMessage && (
              <div className="flex items-center justify-between p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs">
                <span className="flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 shrink-0" /> {errorMessage}
                </span>
                {lastFailedMessage && (
                  <button
                    onClick={() => handleSendMessage(lastFailedMessage)}
                    className="font-bold underline text-rose-800 hover:text-rose-900 ml-2"
                  >
                    Retry
                  </button>
                )}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        )}

        {/* Quick Suggestion Chips */}
        {!showHistory && (
          <div className="px-4 py-2 bg-white border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
            <span className="text-[11px] font-bold text-slate-400 uppercase shrink-0">Quick:</span>
            {STARTER_PROMPTS.slice(0, 4).map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(p.prompt)}
                className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-600 text-xs whitespace-nowrap transition-colors border border-slate-200/60"
              >
                {p.title}
              </button>
            ))}
          </div>
        )}

        {/* Input Bar */}
        <div className="p-3 bg-white border-t border-slate-200 shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask YEANA AI (e.g. Plan a 2-day trip to Sajek under ৳6,000)..."
              className="flex-1 px-4 py-2.5 rounded-xl bg-slate-100 focus:bg-white text-slate-800 text-xs sm:text-sm border border-slate-200 focus:border-emerald-500 focus:outline-none transition-all"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isLoading}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">Send</span>
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

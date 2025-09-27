// components/DocumentSummary.jsx
"use client";

import { useState } from "react";
import { Send } from "lucide-react";

const Generated = () => {
  const [messages, setMessages] = useState([
    { role: "system", text: "Hello! I’m ready to answer any questions you have about this summary. Just type your question below." },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    const newMessages = [...messages, { role: "user", text: input }];

    // Mock AI reply
    const aiReply = {
      role: "ai",
      text: "Based on the summary, the main causes of climate change include the burning of fossil fuels (coal, oil, and natural gas) for energy, deforestation, and industrial processes. These activities release greenhouse gases like carbon dioxide and methane into the atmosphere, trapping heat and leading to global warming.",
    };

    setMessages([...newMessages, aiReply]);
    setInput("");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-10">
      {/* Summary Section */}
      <div className="bg-white border rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-2">
          Summary for 'Global Climate Change Report'
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          AI-generated summary of your document.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Climate change refers to long-term shifts in temperatures and weather
          patterns. These shifts may be natural, but since the 1800s, human
          activities have been the main driver of climate change, primarily due
          to the burning of fossil fuels (like coal, oil, and gas) which produces
          heat-trapping gases. The Earth's climate has always changed over
          geological timescales, with ice ages and warmer periods. However, the
          current rate of warming is unprecedented and largely attributed to
          human-induced greenhouse gas emissions...
        </p>
      </div>

      {/* Q&A Section */}
      <div className="bg-white border rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">AI Q&A Interaction</h3>
        <p className="text-sm text-gray-500 mb-6">
          Ask questions about the summary and get instant answers.
        </p>

        <div className="space-y-4 max-h-[400px] overflow-y-auto border rounded-md p-4 bg-gray-50">
          {messages.map((msg, i) => (
            <div key={i} className="flex flex-col">
              <span
                className={`px-4 py-2 rounded-lg max-w-xl ${
                  msg.role === "user"
                    ? "bg-blue-100 self-end text-blue-900"
                    : msg.role === "ai"
                    ? "bg-green-100 self-start text-green-900"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                Helo {" "}
                {msg.text}
              </span>
            </div>
          ))}
        </div>

        {/* Input box */}
        <div className="mt-4 flex items-center gap-2">
          <input
            type="text"
            placeholder="Type your question here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 border rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSend}
            className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Generated;
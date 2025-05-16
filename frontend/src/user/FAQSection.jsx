import { useState } from "react";
import { FiChevronDown, FiChevronUp, FiSearch } from "react-icons/fi";

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const faqs = [
    {
      question: "How do I verify a graduate's document?",
      answer: "Enter the Document ID or graduate details in the verification portal. The system will instantly validate it against Bonga University's records.",
      tags: ["verify", "document", "process"]
    },
    {
      question: "What document types can I verify?",
      answer: "Degrees, diplomas, certificates, and transcripts issued by Bonga University.",
      tags: ["document", "types", "supported"]
    },
    {
      question: "Is there a limit to how many documents I can verify?",
      answer: "No, but bulk verification requires special access. Contact support for assistance.",
      tags: ["limit", "bulk", "multiple"]
    },
    {
      question: "Why does a document show as 'invalid'?",
      answer: "This could mean: (1) The document is forged, (2) It's not yet issued, or (3) There's a system error. Contact support@bongau.edu.et for clarification.",
      tags: ["invalid", "error", "troubleshoot"]
    },
    {
      question: "Can I verify documents from other universities?",
      answer: "No, this system only verifies credentials issued by Bonga University.",
      tags: ["other", "universities", "external"]
    },
    {
      question: "How long are verification reports valid?",
      answer: "Reports are valid indefinitely but reflect the database status at verification time. Re-verify for current status.",
      tags: ["validity", "expiry", "report"]
    }
  ];

  // Filter FAQs based on search query
  const filteredFAQs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-12 px-4 sm:px-6 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          Frequently Asked Questions
        </h2>
        
        {/* Search Bar */}
        <div className="relative mb-8 max-w-md mx-auto">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search FAQs..."
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              ×
            </button>
          )}
        </div>

        {/* Search Results Count */}
        {searchQuery && (
          <p className="text-center mb-6 text-gray-600 dark:text-gray-400">
            Found {filteredFAQs.length} {filteredFAQs.length === 1 ? "result" : "results"} for "{searchQuery}"
          </p>
        )}

        {/* FAQ List */}
        <div className="space-y-4">
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((faq, index) => (
              <div 
                key={index} 
                className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm transition-all duration-200"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex justify-between items-center p-6 text-left bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    {faq.question}
                  </h3>
                  {activeIndex === index ? (
                    <FiChevronUp className="text-gray-500 shrink-0" />
                  ) : (
                    <FiChevronDown className="text-gray-500 shrink-0" />
                  )}
                </button>
                
                {activeIndex === index && (
                  <div className="p-6 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-gray-600 dark:text-gray-300">
                      {faq.answer}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {faq.tags.map((tag, i) => (
                        <span 
                          key={i} 
                          className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">
                No FAQs found matching your search. Try different keywords or contact support.
              </p>
            </div>
          )}
        </div>

        {/* Support Contact */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Still have questions?
          </p>
          <a
            href="mailto:support@bongau.edu.et"
            className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            Contact Support
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
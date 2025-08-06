import { useState } from "react"
import { ChevronUp, ChevronDown } from "lucide-react"

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0)

  const faqs = [
    {
      question: "How do I know if I qualify?",
      answer: "Complete the form. A legal team will assess your situation based on your exposure and health condition."
    },
    {
      question: "Do I have to pay anything now?",
      answer: "No upfront costs. We work on a contingency fee basis, meaning we only get paid if you win your case."
    },
    {
      question: "Will someone contact me?",
      answer: "Yes, our legal team will contact you within 24 hours to discuss your case and next steps."
    },
    {
      question: "Can I file on behalf of a loved one?",
      answer: "Yes, you can file on behalf of a loved one if they are unable to do so themselves due to injury or incapacity."
    }
  ]

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index)
  }

  return (
    <section className="py-12 lg:py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-8">
            <span className="text-[#337ab7]">Frequently Asked</span>{" "}
            <span className="text-[#D9534F]">Questions</span>
          </h2>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`border-b border-gray-200 ${
                openIndex === index ? 'bg-gray-50' : 'bg-white'
              }`}
            >
              <button
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                onClick={() => toggleFAQ(index)}
              >
                <span className="text-lg font-medium text-gray-800">
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-[#D9534F]" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-[#337ab7]" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 
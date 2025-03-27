import React, {useState} from 'react';
import Breadcrumb from './Breadcrumb';

export default function Faq(){
    const [activeIndex, setActiveIndex] = useState(null);
  
    const toggleFAQ = (index) => {
      setActiveIndex(activeIndex === index ? null : index); // Toggles visibility
    };
  
    const faqs = [
      {
        question: " How do I log in to my HRM account?",
        answer: "Visit the login page and enter your email and password. Or you can log in using company credentials.",
      },
      {
        question: "How can I reset my password?",
        answer: "Click on the Forgot Password link on the login page, enter your registered email and follow the instructions to reset your password.",
      },
      {
        question: "Who should I contact for technical issues?",
        answer: "Contact your HR department.",
      },
      {
        question: "Where can I find my employee ID and other details?",
        answer: "Your employee ID is available in your profile section. You can also check your ID card or HR documents.",
      },
      {
        question: "How do I mark my attendance?",
        answer: "You can mark attendance through the HRM system dashboard.",
      },
    ];
  
    return (
      <div className='container-fluid'>
        <Breadcrumb/>
      <div className="faq-container">
        <div className="faq-title">FAQ</div>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`faq-item ${activeIndex === index ? "active" : ""}`}
            >
              <div
                className="faq-header"
                onClick={() => toggleFAQ(index)} 
              >
                <span className="faq-question">{faq.question}</span>
                <span className="faq-icon">
                  {activeIndex === index ? <img src={require("assets/img/close-dropdown-icon.png")} alt="..." style={{ width: '28px', height: '28px'}}/>
                   : <img src={require("assets/img/dropdown_icon.png")} alt="..." style={{ width: '10px', height: '10px'}}/> } 
                </span>
              </div>
              {activeIndex === index && (
                <div className="faq-content">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
      </div>
    );
  };
  

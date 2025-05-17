import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ViewFAQs() {
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/faqs');
        setFaqs(res.data);
      } catch (err) {
        console.error('Failed to load FAQs:', err);
      }
    };

    fetchFAQs();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h3>Uploaded FAQs</h3>
      <ul>
        {faqs.map((faq, index) => (
          <li key={index}>
            <strong>Q:</strong> {faq.question}<br />
            <strong>A:</strong> {faq.answer}
          </li>
        ))}
      </ul>
    </div>
  );
}

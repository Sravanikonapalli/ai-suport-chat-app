import { useState } from 'react';
import axios from 'axios';

export default function UploadFAQ() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const upload = async () => {
    if (!question.trim() || !answer.trim()) {
      alert('Both question and answer are required.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('You must be logged in to upload FAQs');
        return;
      }

      await axios.post(
        'http://localhost:5000/api/upload-faq',
        { question, answer },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      alert('FAQ uploaded');
      setQuestion('');
      setAnswer('');
    } catch (err) {
      console.error(err);
      alert('Upload failed. Make sure you are logged in and data is valid.');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h3>Upload FAQ</h3>
      <input
        placeholder="Question"
        value={question}
        onChange={e => setQuestion(e.target.value)}
        style={{ display: 'block', marginBottom: 10, width: '100%' }}
      />
      <input
        placeholder="Answer"
        value={answer}
        onChange={e => setAnswer(e.target.value)}
        style={{ display: 'block', marginBottom: 10, width: '100%' }}
      />
      <button onClick={upload}>Upload</button>
    </div>
  );
}

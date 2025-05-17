require('dotenv').config();

const express = require('express');
const router = express.Router();
const axios = require('axios');
const Conversation = require('../models/Conversation');
const FAQ = require('../models/FAQ');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET;

// Middleware to protect routes
function authenticateToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ error: 'Access denied' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
}

// Signup
router.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  try {
    const user = new User({ email, password: hashed });
    await user.save();
    res.json({ message: 'Signup successful' });
  } catch (err) {
    res.status(400).json({ error: 'User already exists' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ error: 'Invalid credentials' });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ error: 'Invalid credentials' });

  const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET);
  res.json({ token });
});

router.post('/chat', async (req, res) => {
  const { userId, message } = req.body;

  try {
    // Step 1: Load FAQs from DB
    const faqs = await FAQ.find({});
    const matchedFAQ = faqs.find(faq =>
      message.toLowerCase().includes(faq.question.toLowerCase())
    );

    let reply = null;

    if (matchedFAQ) {
      reply = matchedFAQ.answer;
    } else {
      // Step 2: Prepare message for OpenRouter
      const response = await axios.post('https://openrouter.ai/api/v1/chat/completions', {
        model: "openai/gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a helpful customer support assistant." },
          { role: "user", content: message }
        ]
      }, {
        headers: {
          'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json'
        }
      });

      reply = response.data.choices[0].message.content;
    }

    // Save to DB
    let convo = await Conversation.findOne({ userId });
    if (!convo) convo = new Conversation({ userId, messages: [] });

    convo.messages.push({ sender: 'user', content: message });
    convo.messages.push({ sender: 'bot', content: reply });

    await convo.save();

    res.json({ reply });

  } catch (err) {
    console.error('Error during /chat:', err.response?.data || err.message || err);
    res.status(500).json({ error: 'AI failed to respond' });
  }
});


router.get('/history/:userId', async (req, res) => {
  const { userId } = req.params;
  const convo = await Conversation.findOne({ userId });
  res.json(convo?.messages || []);
});

router.post('/upload-faq', authenticateToken, async (req, res) => {
  const { question, answer } = req.body;
  await FAQ.create({ question, answer });
  res.json({ message: 'FAQ uploaded' });
});


router.get('/faqs', async (req, res) => {
  try {
    const faqs = await FAQ.find({});
    res.json(faqs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch FAQs' });
  }
});

module.exports = router;

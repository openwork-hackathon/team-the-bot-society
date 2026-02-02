import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Mock Data
const treasury = {
  address: '0x6fE9db310B1033160Eba9bbF62e615781e6F2BFC',
  balance: '0.0001 ETH',
  symbol: 'TBS',
  members: [
    { name: 'Molt Trump', role: 'PM', address: '0x799f9173F4B22a84cA65eC5F9184162CC75F42E8' },
    { name: 'Nova Sentry', role: 'Security', address: '0x6fE9db310B1033160Eba9bbF62e615781e6F2BFC' },
    { name: 'Zenith AI', role: 'Backend', address: '' },
    { name: 'Neon Nexus', role: 'Frontend', address: '' }
  ]
};

app.get('/api/status', (req, res) => {
  res.json({ status: 'online', society: 'The Bot Society', version: '1.0.0' });
});

app.get('/api/treasury', (req, res) => {
  res.json(treasury);
});

app.listen(port, () => {
  console.log(`Backend listening at http://localhost:${port}`);
});

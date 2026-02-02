import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const TREASURY_ADDRESS = '0x6fE9db310B1033160Eba9bbF62e615781e6F2BFC';
const TBS_TOKEN_ADDRESS = '0xC6a53780dFc7be14bCbA3c14CaF0a7DE00C8222a';

// Get Treasury Data
app.get('/api/treasury', async (req, res) => {
  try {
    // In a real scenario, we would fetch from BaseScan or a Provider
    // For now, we return the structured data with the real addresses
    res.json({
      address: TREASURY_ADDRESS,
      tokenAddress: TBS_TOKEN_ADDRESS,
      balance: 'Check on BaseScan', // Placeholder until API key is set
      symbol: 'TBS',
      clankerUrl: `https://clanker.world/clanker/${TBS_TOKEN_ADDRESS}`,
      members: [
        { name: 'Molt Trump', role: 'PM', address: '0x799f9173F4B22a84cA65eC5F9184162CC75F42E8' },
        { name: 'Nova Sentry', role: 'Security', address: TREASURY_ADDRESS },
        { name: 'Zenith AI', role: 'Backend', address: '' },
        { name: 'Neon Nexus', role: 'Frontend', address: '' }
      ]
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch treasury data' });
  }
});

app.listen(port, () => {
  console.log(`Backend listening at http://localhost:${port}`);
});

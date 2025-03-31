import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ethers } from 'ethers';
import { FLOW_FUND_ABI, FLOW_FUND_ADDRESS, TEST_TOKEN_ADDRESS } from './FLOW_FUND_ABI';
import ReactConfetti from 'react-confetti';
import flowThumbnail from '../../../public/flows/1.jpg';

// ERC20 代币的基础 ABI
const ERC20_ABI = [
  'function approve(address spender, uint256 amount) public returns (bool)',
  'function allowance(address owner, address spender) public view returns (uint256)',
  'function balanceOf(address account) public view returns (uint256)',
];

declare global {
  interface Window {
    okxwallet?: {
      request: (args: { method: string; params?: any[] }) => Promise<any>;
    };
  }
}
import { Card } from '@/components/ui/card';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Area } from 'recharts';
import { ArrowUpRight, ArrowDownRight, MessageCircle, Users, Activity } from 'lucide-react';
import Navbar from '../../components/layout/Navbar';
import { formatCurrency } from '../../utils/format';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface CryptoOption {
  id: string;
  name: string;
  icon: string;
  disabled?: boolean;
}

// 添加状态管理
const useWindowSize = () => {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handler = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  return size;
};

const CRYPTO_OPTIONS: CryptoOption[] = [
  {
    id: 'bsc',
    name: 'BSC Chain',
    icon: '/token/bnb.png',
  },
  {
    id: 'eth',
    name: 'Ethereum',
    icon: '/token/eth.png',
    disabled: true,
  },
  {
    id: 'btc',
    name: 'Bitcoin',
    icon: '/token/btc.png',
    disabled: true,
  },
];

// 示例数据
const performanceData = [
  { date: '2024-01', value: 100, pnl: 0 },
  { date: '2024-02', value: 110, pnl: 10 },
  { date: '2024-03', value: 105, pnl: -5 },
  { date: '2024-04', value: 125, pnl: 20 },
  { date: '2024-05', value: 130, pnl: 5 },
  { date: '2024-06', value: 120, pnl: -10 },
  { date: '2024-07', value: 145, pnl: 25 },
  { date: '2024-08', value: 155, pnl: 10 },
  { date: '2024-09', value: 140, pnl: -15 },
  { date: '2024-10', value: 170, pnl: 30 },
  { date: '2024-11', value: 180, pnl: 10 },
  { date: '2024-12', value: 165, pnl: -15 },
  { date: '2025-01', value: 190, pnl: 25 },
  { date: '2025-02', value: 180, pnl: 5 },
];

const transactions = [
  {
    id: 1,
    type: 'invest',
    user: 'Alex Thompson',
    amount: 50000,
    timestamp: '2025-03-30T07:30:00Z',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
  },
  {
    id: 2,
    type: 'withdraw',
    user: 'Sarah Chen',
    amount: 25000,
    timestamp: '2025-03-29T15:45:00Z',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
  },
  {
    id: 3,
    type: 'invest',
    user: 'David Wilson',
    amount: 75000,
    timestamp: '2025-03-28T09:15:00Z',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
  },
  {
    id: 4,
    type: 'invest',
    user: 'Emma Thompson',
    amount: 30000,
    timestamp: '2025-03-27T14:20:00Z',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
  },
  {
    id: 5,
    type: 'withdraw',
    user: 'Michael Zhang',
    amount: 15000,
    timestamp: '2025-03-26T11:30:00Z',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
  },
  {
    id: 6,
    type: 'invest',
    user: 'Lisa Wang',
    amount: 100000,
    timestamp: '2025-03-25T16:45:00Z',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa',
  },
  {
    id: 7,
    type: 'withdraw',
    user: 'James Miller',
    amount: 45000,
    timestamp: '2025-03-24T10:20:00Z',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
  },
  {
    id: 8,
    type: 'invest',
    user: 'Sophie Chen',
    amount: 60000,
    timestamp: '2025-03-23T13:15:00Z',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie',
  },
];

const discussions = [
  {
    id: 1,
    user: 'Michael Zhang',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
    content:
      'Great performance this month! The grid trading strategy seems to be working well in this volatile market.',
    timestamp: '2025-03-30T08:15:00Z',
    likes: 12,
    replies: 3,
  },
  {
    id: 2,
    user: 'Sarah Chen',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    content:
      'I particularly like how the strategy handles sudden price movements. The automatic rebalancing feature has saved me a lot of time.',
    timestamp: '2025-03-29T22:30:00Z',
    likes: 8,
    replies: 2,
  },
  {
    id: 3,
    user: 'David Wilson',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
    content:
      'The risk management is solid. I appreciate how it automatically adjusts the grid size based on volatility.',
    timestamp: '2025-03-29T20:45:00Z',
    likes: 15,
    replies: 4,
  },
  {
    id: 4,
    user: 'Emma Thompson',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
    content:
      'Been using this strategy for 2 months now. The consistent returns are impressive, especially during sideways markets.',
    timestamp: '2025-03-29T18:20:00Z',
    likes: 10,
    replies: 1,
  },
  {
    id: 5,
    user: 'Alex Rodriguez',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    content:
      'Question: How does the strategy handle black swan events? Is there a circuit breaker mechanism in place?',
    timestamp: '2025-03-29T15:10:00Z',
    likes: 20,
    replies: 6,
  },
];

const FlowFundDetailPage: React.FC = () => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [transactionHash, setTransactionHash] = useState<string>('');
  const { width, height } = useWindowSize();
  // const { id } = useParams<{ id: string }>();
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [selectedCrypto, setSelectedCrypto] = useState<string>('');
  const [investAmount, setInvestAmount] = useState<string>('');
  const [isInvesting, setIsInvesting] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [totalInvestment, setTotalInvestment] = useState<string>('');

  return (
    <>
      {showConfetti && <ReactConfetti width={width} height={height} />}
      <div className="min-h-screen bg-tf-base-bg1-lmode dark:bg-tf-base-bg1">
        <Navbar onAiToggle={() => setIsAiOpen(!isAiOpen)} isAiOpen={isAiOpen} />

        <div className="container mx-auto px-4 py-8">
          {/* Header Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-2">
              <div className="bg-tf-base-bg2-lmode dark:bg-tf-base-bg2 rounded-xl p-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h1 className="text-3xl font-bold text-tf-base-text-lmode dark:text-tf-base-text mb-2">
                      Binance Grid Trading Bot
                    </h1>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <Avatar>
                          <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" />
                        </Avatar>
                        <span className="text-tf-base-subtext-lmode dark:text-tf-base-subtext">
                          by Alex Thompson
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-tf-base-subtext-lmode dark:text-tf-base-subtext" />
                        <span className="text-tf-base-subtext-lmode dark:text-tf-base-subtext">
                          156 investors
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Flow Preview Image */}
                <div className="mb-6 relative group cursor-pointer">
                  <div className="relative overflow-hidden rounded-lg">
                    <img
                      src={flowThumbnail}
                      alt="Flow Preview"
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-3 right-3 bg-black/70 text-white text-sm py-1 px-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center space-x-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                      <span>View full image</span>
                    </div>
                  </div>
                </div>

                {/* Strategy Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-tf-base-text-lmode dark:text-tf-base-text">
                    Strategy
                  </h3>
                  <p className="text-tf-base-text-lmode dark:text-tf-base-text">
                    This bot implements a grid trading strategy on Binance's BTC/USDT pair. It
                    places multiple buy and sell orders at regular price intervals, profiting from
                    price oscillations within a range. The strategy performs best in sideways
                    markets with high volatility.
                  </p>
                  <div className="bg-tf-base-bg1-lmode dark:bg-tf-base-bg1 rounded-lg p-4">
                    <h4 className="font-medium text-tf-base-text-lmode dark:text-tf-base-text mb-2">
                      Key Features
                    </h4>
                    <ul className="list-disc list-inside space-y-2 text-tf-base-text-lmode dark:text-tf-base-text">
                      <li>Automated grid order placement and management</li>
                      <li>Dynamic grid spacing based on volatility</li>
                      <li>Automatic profit taking and reinvestment</li>
                      <li>Risk management with stop-loss mechanisms</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-tf-base-text-lmode dark:text-tf-base-text mb-4">
                  Key Metrics
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-tf-base-bg2-lmode/30 dark:bg-tf-base-bg2/30 rounded-lg hover:bg-tf-base-bg2-lmode/50 dark:hover:bg-tf-base-bg2/50 transition-colors">
                    <div className="flex items-center space-x-2">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          28.5 >= 30 ? 'bg-green-400' : 'bg-gray-400'
                        }`}
                      ></div>
                      <span className="text-tf-base-subtext-lmode dark:text-tf-base-subtext">
                        ROI
                      </span>
                    </div>
                    <span
                      className={`font-semibold text-lg ${
                        28.5 >= 30
                          ? 'text-green-500 dark:text-green-400'
                          : 'text-tf-base-text-lmode dark:text-tf-base-text'
                      }`}
                    >
                      +28.5%
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-tf-base-bg2-lmode/30 dark:bg-tf-base-bg2/30 rounded-lg hover:bg-tf-base-bg2-lmode/50 dark:hover:bg-tf-base-bg2/50 transition-colors">
                    <div className="flex items-center space-x-2">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          1250000 >= 1000000 ? 'bg-blue-400' : 'bg-gray-400'
                        }`}
                      ></div>
                      <span className="text-tf-base-subtext-lmode dark:text-tf-base-subtext">
                        TVL
                      </span>
                    </div>
                    <span
                      className={`font-semibold text-lg ${
                        1250000 >= 1000000
                          ? 'text-blue-500 dark:text-blue-400'
                          : 'text-tf-base-text-lmode dark:text-tf-base-text'
                      }`}
                    >
                      {formatCurrency(1250000)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-tf-base-bg2-lmode/30 dark:bg-tf-base-bg2/30 rounded-lg hover:bg-tf-base-bg2-lmode/50 dark:hover:bg-tf-base-bg2/50 transition-colors">
                    <div className="flex items-center space-x-2">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          15 <= 20 ? 'bg-purple-400' : 'bg-gray-400'
                        }`}
                      ></div>
                      <span className="text-tf-base-subtext-lmode dark:text-tf-base-subtext">
                        Carry
                      </span>
                    </div>
                    <span
                      className={`font-semibold text-lg ${
                        15 <= 20
                          ? 'text-purple-500 dark:text-purple-400'
                          : 'text-tf-base-text-lmode dark:text-tf-base-text'
                      }`}
                    >
                      15%
                    </span>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="text-sm font-medium text-tf-base-subtext-lmode dark:text-tf-base-subtext mb-4">
                    Performance
                  </h4>
                  <div className="h-48 bg-tf-base-bg2-lmode/30 dark:bg-tf-base-bg2/30 rounded-lg p-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={performanceData}
                        margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
                      >
                        <defs>
                          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <XAxis
                          dataKey="date"
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: '#666', fontSize: 12 }}
                          tickFormatter={value => value.split('-')[1]}
                        />
                        <YAxis hide />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'rgba(255, 255, 255, 0.95)',
                            border: 'none',
                            borderRadius: '8px',
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                            padding: '8px 12px',
                          }}
                          formatter={value => [`$${value}`, 'Portfolio Value']}
                          labelFormatter={label => {
                            const date = new Date(label);
                            return date.toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                            });
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="value"
                          stroke="none"
                          fill="url(#colorValue)"
                        />
                        <Line
                          type="monotone"
                          dataKey="value"
                          stroke="#3b82f6"
                          strokeWidth={2}
                          dot={false}
                          activeDot={{
                            r: 4,
                            stroke: '#3b82f6',
                            strokeWidth: 2,
                            fill: '#fff',
                          }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold text-tf-base-text-lmode dark:text-tf-base-text mb-4">
                  Your Investment
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-tf-base-subtext-lmode dark:text-tf-base-subtext">
                      Principal
                    </span>
                    <span className="text-tf-base-text-lmode dark:text-tf-base-text font-semibold">
                      $50,000
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-tf-base-subtext-lmode dark:text-tf-base-subtext">
                      Current Value
                    </span>
                    <span className="text-tf-base-text-lmode dark:text-tf-base-text font-semibold">
                      $64,250
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-tf-base-subtext-lmode dark:text-tf-base-subtext">
                      Available to Withdraw
                    </span>
                    <span className="text-tf-base-text-lmode dark:text-tf-base-text font-semibold">
                      $12,150
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="relative">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="default" className="w-full">
                            {isInvesting ? (
                              <>
                                <span className="animate-spin inline-block mr-2">⌛</span>
                                Investing...
                              </>
                            ) : (
                              'Invest'
                            )}
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px] bg-white dark:bg-tf-base-bg2 border-0">
                          <div className="flex items-start space-x-4 mb-6 pt-2">
                            <img
                              src="/TF-LOGO_TRANS.png"
                              alt="TradingFlow Logo"
                              className="h-12 w-auto flex-shrink-0"
                            />
                            <DialogHeader>
                              <DialogTitle className="text-xl font-bold text-tf-base-text-lmode dark:text-tf-base-text">
                                Invest in Flow Fund
                              </DialogTitle>
                              <DialogDescription className="text-tf-base-subtext-lmode dark:text-tf-base-subtext">
                                Choose your investment currency and amount below.
                              </DialogDescription>
                            </DialogHeader>
                          </div>
                          <div className="grid gap-6">
                            <div className="space-y-3">
                              <Label className="text-sm font-medium text-tf-base-text-lmode dark:text-tf-base-text">
                                Select Chain
                              </Label>
                              <div className="grid gap-2">
                                {CRYPTO_OPTIONS.map(option => (
                                  <button
                                    key={option.id}
                                    className={`flex items-center space-x-3 p-3 rounded-lg transition-all ${
                                      option.disabled
                                        ? 'opacity-50 cursor-not-allowed bg-tf-base-bg2-lmode/10 dark:bg-tf-base-bg2/10'
                                        : selectedCrypto === option.id
                                        ? 'bg-tf-base-bg2-lmode/30 dark:bg-tf-base-bg2/30 border-tf-gradient-1-from'
                                        : 'hover:bg-tf-base-bg2-lmode/20 dark:hover:bg-tf-base-bg2/20 cursor-pointer'
                                    } border ${
                                      selectedCrypto === option.id
                                        ? 'border-tf-gradient-1-from'
                                        : 'border-tf-base-bg2-lmode dark:border-tf-base-bg2'
                                    }`}
                                    disabled={option.disabled || isInvesting}
                                    onClick={() => {
                                      if (!option.disabled) {
                                        setSelectedCrypto(option.id);
                                      }
                                    }}
                                  >
                                    <img
                                      src={option.icon}
                                      alt={option.name}
                                      className="w-8 h-8 rounded-full"
                                    />
                                    <span className="text-sm font-medium text-tf-base-text-lmode dark:text-tf-base-text">
                                      {option.name}
                                    </span>
                                    {!option.disabled && (
                                      <span className="ml-auto text-xs text-tf-base-subtext-lmode dark:text-tf-base-subtext">
                                        Available
                                      </span>
                                    )}
                                  </button>
                                ))}
                              </div>
                            </div>
                            <div className="space-y-3">
                              <Label className="text-sm font-medium text-tf-base-text-lmode dark:text-tf-base-text">
                                Investment Amount
                              </Label>
                              <div className="relative">
                                <Input
                                  type="number"
                                  placeholder="Enter amount"
                                  value={investAmount}
                                  onChange={e => setInvestAmount(e.target.value)}
                                  className="w-full pr-24 bg-transparent border-tf-base-bg2-lmode dark:border-tf-base-bg2"
                                  disabled={isInvesting}
                                />
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center space-x-2">
                                  <img
                                    src="/TF-TOKEN_LOGO.png"
                                    alt="TF Token"
                                    className="w-5 h-5"
                                  />
                                  <span className="text-sm text-tf-base-subtext-lmode dark:text-tf-base-subtext">
                                    TF Token
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="space-y-3">
                              <Label className="text-sm font-medium text-tf-base-text-lmode dark:text-tf-base-text">
                                Contract Address:
                              </Label>
                              <div className="p-3 bg-tf-base-bg2-lmode/10 dark:bg-tf-base-bg2/10 rounded-lg text-sm font-mono break-all text-tf-base-subtext-lmode dark:text-tf-base-subtext border border-tf-base-bg2-lmode dark:border-tf-base-bg2">
                                <a
                                  href={`https://testnet.bscscan.com/address/${TEST_TOKEN_ADDRESS}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="hover:text-blue-500 hover:underline"
                                >
                                  {TEST_TOKEN_ADDRESS.slice(0, 6)}...{TEST_TOKEN_ADDRESS.slice(-4)}
                                </a>
                              </div>
                            </div>
                          </div>
                          <DialogFooter className="mt-8">
                            <DialogClose asChild>
                              <Button
                                variant="outline"
                                className="w-full sm:w-auto border-tf-base-bg2-lmode dark:border-tf-base-bg2 hover:bg-tf-base-bg2-lmode/10 dark:hover:bg-tf-base-bg2/10"
                              >
                                Cancel
                              </Button>
                            </DialogClose>
                            <Button
                              disabled={isInvesting}
                              onClick={async () => {
                                if (!selectedCrypto || !investAmount) return;

                                // 检查是否安装了 OKX Wallet
                                if (typeof window.okxwallet === 'undefined') {
                                  alert('Please install OKX Wallet first!');
                                  return;
                                }

                                try {
                                  // 请求连接钱包
                                  await window.okxwallet.request({ method: 'eth_requestAccounts' });

                                  // 创建 provider 和 signer
                                  const provider = new ethers.BrowserProvider(window.okxwallet);
                                  const signer = await provider.getSigner();

                                  // 获取当前网络
                                  const network = await provider.getNetwork();
                                  const chainId = network.chainId;

                                  // 如果不是 BSC Testnet，请求切换网络
                                  if (chainId !== 97n) {
                                    // BSC Testnet chainId
                                    try {
                                      await window.okxwallet.request({
                                        method: 'wallet_switchEthereumChain',
                                        params: [{ chainId: '0x61' }],
                                      });
                                    } catch (switchError: any) {
                                      // 如果网络不存在，添加网络
                                      if (switchError.code === 4902) {
                                        await window.okxwallet.request({
                                          method: 'wallet_addEthereumChain',
                                          params: [
                                            {
                                              chainId: '0x61',
                                              chainName: 'BSC Testnet',
                                              nativeCurrency: {
                                                name: 'BNB',
                                                symbol: 'BNB',
                                                decimals: 18,
                                              },
                                              rpcUrls: [
                                                'https://data-seed-prebsc-1-s1.binance.org:8545',
                                              ],
                                              blockExplorerUrls: ['https://testnet.bscscan.com'],
                                            },
                                          ],
                                        });
                                      }
                                    }
                                  }

                                  // 创建 Token 合约实例
                                  const tokenContract = new ethers.Contract(
                                    TEST_TOKEN_ADDRESS,
                                    ERC20_ABI,
                                    signer
                                  );

                                  // 检查授权额度
                                  const allowance = await tokenContract.allowance(
                                    await signer.getAddress(),
                                    FLOW_FUND_ADDRESS
                                  );
                                  const amount = ethers.parseEther(investAmount);

                                  // 如果授权额度不足，先请求授权
                                  if (allowance < amount) {
                                    const approveTx = await tokenContract.approve(
                                      FLOW_FUND_ADDRESS,
                                      amount
                                    );
                                    await approveTx.wait();
                                  }

                                  // 创建基金合约实例
                                  const fundContract = new ethers.Contract(
                                    FLOW_FUND_ADDRESS,
                                    FLOW_FUND_ABI,
                                    signer
                                  );

                                  // 调用合约的 invest 函数
                                  const investTx = await fundContract.invest(amount);

                                  // 等待交易确认
                                  const receipt = await investTx.wait();

                                  // 获取投资信息
                                  const investorInfo = await fundContract.getInvestorInfo(
                                    await signer.getAddress()
                                  );
                                  const totalInvestment = ethers.formatEther(investorInfo[0]);

                                  // 设置成功状态，触发撒花效果
                                  setShowConfetti(true);
                                  setTotalInvestment(totalInvestment);
                                  setTransactionHash(receipt.hash);
                                  setShowSuccessDialog(true);
                                  // 延长显示时间到30秒
                                  setTimeout(() => {
                                    setShowConfetti(false);
                                    setShowSuccessDialog(false);
                                  }, 30000);
                                } catch (err: any) {
                                  console.error('Investment failed:', err);
                                } finally {
                                  setIsInvesting(false);
                                }
                              }}
                              type="button"
                              disabled={!selectedCrypto || !investAmount || isInvesting}
                              className={`w-full sm:w-auto relative ${
                                !selectedCrypto || !investAmount
                                  ? 'opacity-50 cursor-not-allowed bg-gray-400'
                                  : 'bg-gradient-to-r from-tf-gradient-1-from to-tf-gradient-1-to hover:opacity-90'
                              }`}
                            >
                              {isInvesting ? (
                                <div className="flex items-center justify-center">
                                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                  Investing...
                                </div>
                              ) : (
                                'Confirm'
                              )}
                            </Button>

                            <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
                              <DialogContent className="bg-white dark:bg-tf-base-bg2 border-0">
                                <DialogHeader>
                                  <DialogTitle>Investment Successful!</DialogTitle>
                                  <DialogDescription>
                                    <p className="mb-4">
                                      You have successfully invested {investAmount} TF Tokens. Your
                                      total investment is now {totalInvestment} TF Tokens.
                                    </p>
                                    <p className="text-sm">
                                      View transaction on BSCScan:{' '}
                                      <a
                                        href={`https://testnet.bscscan.com/tx/${transactionHash}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 hover:text-blue-600 hover:underline"
                                      >
                                        {transactionHash.slice(0, 6)}...{transactionHash.slice(-4)}
                                      </a>
                                    </p>
                                  </DialogDescription>
                                </DialogHeader>
                                <DialogFooter>
                                  <Button type="button" onClick={() => setShowSuccessDialog(false)}>
                                    Done
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                    <Button variant="outline" className="w-full">
                      Request Withdrawal
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Tabs Section */}
          <Tabs defaultValue="transactions" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="transactions">
                <Activity className="w-4 h-4 mr-2" />
                Transactions
              </TabsTrigger>
              <TabsTrigger value="discussion">
                <MessageCircle className="w-4 h-4 mr-2" />
                Discussion
              </TabsTrigger>
            </TabsList>

            <TabsContent value="transactions">
              <Card>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-tf-base-bg2-lmode dark:border-tf-base-bg2">
                        <th className="text-left p-4 text-tf-base-subtext-lmode dark:text-tf-base-subtext font-medium">
                          Investor
                        </th>
                        <th className="text-left p-4 text-tf-base-subtext-lmode dark:text-tf-base-subtext font-medium">
                          Type
                        </th>
                        <th className="text-left p-4 text-tf-base-subtext-lmode dark:text-tf-base-subtext font-medium">
                          Amount
                        </th>
                        <th className="text-left p-4 text-tf-base-subtext-lmode dark:text-tf-base-subtext font-medium">
                          Time
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-tf-base-bg2-lmode dark:divide-tf-base-bg2">
                      {transactions.map(tx => (
                        <tr
                          key={tx.id}
                          className="hover:bg-tf-base-bg2-lmode/50 dark:hover:bg-tf-base-bg2/50 transition-colors"
                        >
                          <td className="p-4">
                            <div className="flex items-center space-x-3">
                              <Avatar>
                                <AvatarImage src={tx.avatar} />
                              </Avatar>
                              <span className="font-medium text-tf-base-text-lmode dark:text-tf-base-text">
                                {tx.user}
                              </span>
                            </div>
                          </td>
                          <td className="p-4">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                tx.type === 'invest'
                                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                  : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                              }`}
                            >
                              {tx.type === 'invest' ? (
                                <>
                                  <ArrowUpRight className="w-3 h-3 mr-1" />
                                  Invest
                                </>
                              ) : (
                                <>
                                  <ArrowDownRight className="w-3 h-3 mr-1" />
                                  Withdraw
                                </>
                              )}
                            </span>
                          </td>
                          <td className="p-4">
                            <span className="font-medium text-tf-base-text-lmode dark:text-tf-base-text">
                              ${tx.amount.toLocaleString()}
                            </span>
                          </td>
                          <td className="p-4 text-tf-base-subtext-lmode dark:text-tf-base-subtext">
                            {new Date(tx.timestamp).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="discussion">
              <Card>
                <div className="p-6">
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-tf-base-text-lmode dark:text-tf-base-text mb-4">
                      Join the Discussion
                    </h3>
                    <div className="bg-tf-base-bg2-lmode/50 dark:bg-tf-base-bg2/50 rounded-lg p-4">
                      <textarea
                        className="w-full p-3 rounded-lg bg-white dark:bg-tf-base-bg2 text-tf-base-text-lmode dark:text-tf-base-text border border-tf-base-bg2-lmode dark:border-tf-base-bg2 focus:outline-none focus:ring-2 focus:ring-tf-accent-primary/20 resize-none"
                        placeholder="Share your thoughts about this trading strategy..."
                        rows={3}
                      />
                      <div className="mt-3 flex justify-between items-center">
                        <span className="text-sm text-tf-base-subtext-lmode dark:text-tf-base-subtext">
                          Be respectful and constructive
                        </span>
                        <Button variant="default" size="sm">
                          Post Comment
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-8">
                    {discussions.map(discussion => (
                      <div
                        key={discussion.id}
                        className="group relative bg-tf-base-bg2-lmode/30 dark:bg-tf-base-bg2/30 rounded-lg p-4 hover:bg-tf-base-bg2-lmode/50 dark:hover:bg-tf-base-bg2/50 transition-colors"
                      >
                        <div className="flex space-x-4">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={discussion.avatar} />
                          </Avatar>
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <span className="font-medium text-tf-base-text-lmode dark:text-tf-base-text">
                                  {discussion.user}
                                </span>
                                <span className="text-sm text-tf-base-subtext-lmode dark:text-tf-base-subtext">
                                  {new Date(discussion.timestamp).toLocaleString()}
                                </span>
                              </div>
                              <div className="flex items-center space-x-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="text-tf-base-subtext-lmode dark:text-tf-base-subtext hover:text-tf-accent-primary transition-colors">
                                  Reply
                                </button>
                                <button className="text-tf-base-subtext-lmode dark:text-tf-base-subtext hover:text-tf-accent-primary transition-colors">
                                  Share
                                </button>
                              </div>
                            </div>
                            <p className="text-tf-base-text-lmode dark:text-tf-base-text">
                              {discussion.content}
                            </p>
                            <div className="mt-2 flex items-center space-x-4">
                              <button className="text-sm text-tf-base-subtext-lmode dark:text-tf-base-subtext hover:text-tf-accent-primary">
                                {discussion.likes} Likes
                              </button>
                              <button className="text-sm text-tf-base-subtext-lmode dark:text-tf-base-subtext hover:text-tf-accent-primary">
                                {discussion.replies} Replies
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="strategy">
              <Card className="p-6">
                <h3 className="text-xl font-semibold text-tf-base-text-lmode dark:text-tf-base-text mb-4">
                  Strategy Overview
                </h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-medium text-tf-base-text-lmode dark:text-tf-base-text mb-2">
                      Grid Trading Explained
                    </h4>
                    <p className="text-tf-base-text-lmode dark:text-tf-base-text">
                      This strategy implements a grid trading system on Binance, automatically
                      buying low and selling high within predefined price ranges. The bot creates a
                      grid of orders above and below the current market price, profiting from price
                      volatility.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-medium text-tf-base-text-lmode dark:text-tf-base-text mb-2">
                      Key Parameters
                    </h4>
                    <ul className="list-disc list-inside space-y-2 text-tf-base-text-lmode dark:text-tf-base-text">
                      <li>Grid Width: 2%</li>
                      <li>Number of Grids: 20</li>
                      <li>Trading Pairs: BTC/USDT, ETH/USDT</li>
                      <li>Rebalancing Frequency: Every 4 hours</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-medium text-tf-base-text-lmode dark:text-tf-base-text mb-2">
                      Risk Management
                    </h4>
                    <ul className="list-disc list-inside space-y-2 text-tf-base-text-lmode dark:text-tf-base-text">
                      <li>Stop Loss: -5% from entry</li>
                      <li>Maximum Position Size: 10% of portfolio</li>
                      <li>Leverage: None (spot trading only)</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default FlowFundDetailPage;

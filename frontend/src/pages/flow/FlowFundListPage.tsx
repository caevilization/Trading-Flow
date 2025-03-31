import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Carousel } from 'antd';
import Navbar from '../../components/layout/Navbar';
import FlowFundThumbnail from './components/FlowFundThumbnail';
import poster1 from '../../../public/flows/poster1.jpg';
import poster2 from '../../../public/flows/poster2.jpg';
import flowThumbnail1 from '../../../public/flows/1.jpg';
import flowThumbnail2 from '../../../public/flows/2.jpg';
import flowThumbnail3 from '../../../public/flows/3.jpg';
import flowThumbnail4 from '../../../public/flows/4.jpg';
import flowThumbnail5 from '../../../public/flows/5.jpg';

// Demo data
const RISING_STARS = [
  {
    id: 5,
    title: 'AI-Powered Momentum Strategy',
    creator: {
      name: 'Emma Zhang',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
    },
    investors: [
      { name: 'Ryan Lee', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ryan' },
      { name: 'Nina Patel', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nina' },
    ],
    metrics: {
      roi: 45.8,
      tvl: 280000,
      carry: 15,
    },
    previewImage: flowThumbnail1,
  },
  {
    id: 6,
    title: 'Options Volatility Hunter',
    creator: {
      name: 'Marcus Wong',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus',
    },
    investors: [
      { name: 'Sophia Chen', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sophia' },
      { name: 'Lucas Kim', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lucas' },
    ],
    metrics: {
      roi: 52.3,
      tvl: 420000,
      carry: 18,
    },
    previewImage: flowThumbnail4,
  },
  {
    id: 7,
    title: 'Crypto Mean Reversion',
    creator: {
      name: 'Olivia Martinez',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Olivia',
    },
    investors: [
      { name: 'Ethan Park', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ethan' },
    ],
    metrics: {
      roi: 38.9,
      tvl: 150000,
      carry: 12,
    },
    previewImage: flowThumbnail3,
  },
  {
    id: 8,
    title: 'Futures Scalping Pro',
    creator: {
      name: 'Daniel Foster',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Daniel',
    },
    investors: [
      { name: 'Isabella Wang', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Isabella' },
      { name: 'James Liu', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James' },
    ],
    metrics: {
      roi: 41.5,
      tvl: 350000,
      carry: 16,
    },
    previewImage: flowThumbnail5,
  },
];

const DEMO_FUNDS = [
  {
    id: 1,
    title: 'Binance Grid Trading Bot',
    creator: {
      name: 'Alex Thompson',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    },
    investors: [
      { name: 'John Doe', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John' },
      { name: 'Jane Smith', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane' },
      { name: 'Mike Johnson', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike' },
      { name: 'Sarah Wilson', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah' },
    ],
    metrics: {
      roi: 28.5,
      tvl: 1250000,
      carry: 20,
    },
    previewImage: flowThumbnail1,
  },
  {
    id: 2,
    title: '3x Leverage ETF Strategy',
    creator: {
      name: 'Sarah Chen',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    },
    investors: [
      { name: 'Tom Brown', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Tom' },
      { name: 'Lisa Wang', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa' },
      { name: 'David Kim', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David' },
    ],
    metrics: {
      roi: 45.2,
      tvl: 890000,
      carry: 25,
    },
    previewImage: flowThumbnail2,
  },
  {
    id: 3,
    title: 'Telegram Signal Strategy',
    creator: {
      name: 'Michael Zhang',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
    },
    investors: [
      { name: 'Emma Davis', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma' },
      { name: 'James Wilson', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James' },
      { name: 'Sophie Taylor', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie' },
      { name: 'Oliver Brown', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Oliver' },
      { name: 'Isabella Lee', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Isabella' },
    ],
    metrics: {
      roi: 32.8,
      tvl: 1750000,
      carry: 15,
    },
    previewImage: flowThumbnail3,
  },
  {
    id: 4,
    title: 'AI-Powered Trading Flow',
    creator: {
      name: 'Emily Johnson',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
    },
    investors: [
      { name: 'William Chen', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=William' },
      { name: 'Sophia Martinez', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sophia' },
      { name: 'Daniel Lee', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Daniel' },
    ],
    metrics: {
      roi: 52.3,
      tvl: 2100000,
      carry: 30,
    },
    previewImage: flowThumbnail4,
  },
  {
    id: 5,
    title: 'Options Trading Strategy',
    creator: {
      name: 'Ryan Parker',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ryan',
    },
    investors: [
      { name: 'Lucas White', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lucas' },
      { name: 'Ava Brown', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ava' },
      { name: 'Mason Taylor', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mason' },
    ],
    metrics: {
      roi: 38.7,
      tvl: 1650000,
      carry: 22,
    },
    previewImage: flowThumbnail5,
  },
  {
    id: 6,
    title: 'DeFi Yield Farming',
    creator: {
      name: 'Olivia Wang',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Olivia',
    },
    investors: [
      { name: 'Ethan Lee', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ethan' },
      { name: 'Zoe Chen', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Zoe' },
      { name: 'Liam Johnson', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Liam' },
      { name: 'Mia Zhang', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mia' },
    ],
    metrics: {
      roi: 42.1,
      tvl: 1850000,
      carry: 18,
    },
    previewImage: flowThumbnail2,
  },
];

const FlowFundListPage: React.FC = () => {
  const [isAiOpen, setIsAiOpen] = useState(false);

  return (
    <div className="min-h-screen bg-tf-base-bg1-lmode dark:bg-tf-base-bg1">
      {/* Navbar */}
      <Navbar onAiToggle={() => setIsAiOpen(!isAiOpen)} isAiOpen={isAiOpen} />

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Left Side - Text and Search */}
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-tf-gradient-1-from to-tf-gradient-1-to bg-clip-text text-transparent">
                TradingFlow Marketplace
              </h1>
              <p className="text-xl text-tf-base-text-lmode dark:text-tf-base-text">
                Invest in proven trading strategies created by expert traders
              </p>
            </div>

            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search trading flows..."
                className="w-full pl-12 pr-4 py-3 bg-white dark:bg-tf-base-bg2 border border-tf-base-bg2-lmode dark:border-tf-base-bg2 rounded-xl text-tf-base-text-lmode dark:text-tf-base-text placeholder-tf-base-subtext-lmode dark:placeholder-tf-base-subtext focus:outline-none focus:ring-2 focus:ring-tf-accent-primary/20"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-tf-base-subtext-lmode dark:text-tf-base-subtext" />
            </div>
          </div>

          {/* Right Side - Carousel */}
          <div className="bg-tf-base-bg2-lmode dark:bg-tf-base-bg2 rounded-xl p-4">
            <Carousel autoplay>
              <div>
                <div
                  className="h-64 rounded-lg flex items-center justify-center"
                  style={{ backgroundImage: `url(${poster1})` }}
                >
                  <div className="text-center text-white p-8">
                    <h3 className="text-2xl font-bold mb-4">Start Trading Today</h3>
                    <p>Join thousands of traders using TradingFlow</p>
                  </div>
                </div>
              </div>
              <div>
                <div
                  className="h-64 rounded-lg flex items-center justify-center"
                  style={{ backgroundImage: `url(${poster2})` }}
                >
                  <div className="text-center text-white p-8">
                    <h3 className="text-2xl font-bold mb-4">Proven Strategies</h3>
                    <p>Invest in strategies with verified track records</p>
                  </div>
                </div>
              </div>
            </Carousel>
          </div>
        </div>

        {/* Trending Section */}
        <div className="space-y-8">
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <h2 className="text-2xl font-bold text-tf-base-text-lmode dark:text-tf-base-text">
                Trending
              </h2>
              <span className="text-sm font-medium text-tf-base-subtext-lmode dark:text-tf-base-subtext bg-tf-base-bg2-lmode dark:bg-tf-base-bg2 px-2 py-0.5 rounded-full">
                3k+
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {DEMO_FUNDS.map(fund => (
                <FlowFundThumbnail
                  key={fund.id}
                  {...fund}
                  onInvest={() => console.log('Invest in', fund.title)}
                  onDetail={() => console.log('View details of', fund.title)}
                  onWithdraw={() => console.log('Withdraw from', fund.title)}
                />
              ))}
            </div>
          </div>

          {/* Rising Stars Section */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <h2 className="text-2xl font-bold text-tf-base-text-lmode dark:text-tf-base-text">
                Rising Stars
              </h2>
              <span className="text-sm font-medium text-tf-base-subtext-lmode dark:text-tf-base-subtext bg-tf-base-bg2-lmode dark:bg-tf-base-bg2 px-2 py-0.5 rounded-full">
                New
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {RISING_STARS.map(fund => (
                <FlowFundThumbnail
                  key={fund.id}
                  {...fund}
                  onInvest={() => console.log('Invest in', fund.title)}
                  onDetail={() => console.log('View details of', fund.title)}
                  onWithdraw={() => console.log('Withdraw from', fund.title)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlowFundListPage;

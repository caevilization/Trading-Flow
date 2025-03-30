# TradingFlow - Decentralized Investment Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Solidity](https://img.shields.io/badge/Solidity-0.8.28-blue.svg)](https://soliditylang.org/)
[![BSC](https://img.shields.io/badge/Network-BSC-yellow.svg)](https://www.bnbchain.org/)

TradingFlow is a decentralized investment platform built on the Binance Smart Chain (BSC), enabling users to participate in professional quantitative trading strategies through smart contracts.

## Features

### FlowFund Smart Contract

- **Secure Investment Management**: Built on BSC with industry-standard security practices
- **Transparent Performance Fee**: 15% carry fee on profits, aligned with traditional fund structures
- **Flexible Investment Options**: Users can invest and withdraw at their convenience
- **Time-Locked Withdrawals**: 10-minute delay mechanism for enhanced security
- **Proportional Dividend Distribution**: Fair and transparent profit sharing

## Technical Stack

- **Smart Contract Development**:
  - Solidity v0.8.28
  - OpenZeppelin Contracts v5.0.1
  - Hardhat Development Framework

- **Testing and Deployment**:
  - Hardhat Test Suite
  - Chai Assertion Library
  - BSC Testnet/Mainnet Compatible

## Getting Started

### Prerequisites

```bash
node >= 18.0.0
npm >= 9.0.0
```

### Installation

1. Clone the repository
```bash
git clone https://github.com/caevilization/Trading-Flow.git
cd Trading-Flow
```

2. Install dependencies
```bash
npm install
```

3. Create `secrets.json` for deployment keys
```json
{
  "privateKey": "your_private_key_here"
}
```

### Testing

```bash
# Run all tests
npm run test

# Run local node
npm run node

# Run specific test
npm run test test/FlowFund.js
```

### Deployment

```bash
# Deploy to BSC testnet
npm run deploy:testnet

# Deploy to BSC mainnet
npm run deploy:mainnet
```

## Smart Contract Architecture

### FlowFund.sol

The main investment contract with the following key components:

- **Investment Management**
  - Track individual investments
  - Maintain total fund value
  - Handle multiple investments per user

- **Withdrawal System**
  - Time-locked withdrawal requests
  - Owner-approved processing
  - Security checks and validations

- **Dividend Distribution**
  - Proportional profit sharing
  - 15% carry fee mechanism
  - Automated distribution system

## Security

- Built with OpenZeppelin's battle-tested contracts
- Implements reentrancy protection
- Time-locked withdrawals
- Owner-controlled sensitive operations
- Comprehensive test coverage

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Project Link: [https://github.com/caevilization/Trading-Flow](https://github.com/caevilization/Trading-Flow)

## Acknowledgments

- [OpenZeppelin](https://www.openzeppelin.com/) for secure smart contract components
- [Hardhat](https://hardhat.org/) for the development framework
- [Binance Smart Chain](https://www.bnbchain.org/) for the blockchain platform

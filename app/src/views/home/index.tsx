// Next, React
import { FC, useEffect } from 'react';
import Link from 'next/link';

// Wallet
import { useWallet, useConnection } from '@solana/wallet-adapter-react';

// Components
import { RequestAirdrop } from '../../components/RequestAirdrop';
import pkg from '../../../package.json';

// Store
import useUserSOLBalanceStore from '../../stores/useUserSOLBalanceStore';

export const HomeView: FC = ({ }) => {
  const wallet = useWallet();
  const { connection } = useConnection();

  const balance = useUserSOLBalanceStore((s) => s.balance)
  const { getUserSOLBalance } = useUserSOLBalanceStore()

  useEffect(() => {
    if (wallet.publicKey) {
      console.log(wallet.publicKey.toBase58())
      getUserSOLBalance(wallet.publicKey, connection)
    }
  }, [wallet.publicKey, connection, getUserSOLBalance])

  return (
    <div className="md:hero mx-auto p-4">
      <div className="md:hero-content flex flex-col">
        <div className='mt-6'>
          <div className='text-sm font-normal align-bottom text-right text-slate-600 mt-4'>v{pkg.version}</div>
          <h1 className="text-center text-5xl md:pl-12 font-bold text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 to-fuchsia-500 mb-4">
            SOLIDITY ON SOLANA  
          </h1>
          <h3 className="text-center text-5xl md:pl-12 font-bold text-transparent bg-clip-text bg-gradient-to-br from-yellow-500 to-fuchsia-500 mb-4">
            Solidity Solana Full Stack dApp Boilerplate
          </h3>
        </div>
        <h4 className="md:w-full text-2x1 md:text-4xl text-center text-slate-300 my-2">
          <p>Welcome, Solidity Developers To Solana Ecosystem!</p>
          <p className='text-slate-500 text-2x1 leading-relaxed'>Build and deploy Solidity smart contracts on Solana with ease.</p>
        </h4>
        <div className="flex flex-col md:flex-row mt-2">
          <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-all duration-300 md:mr-2">
            <div className="p-4">
              <h4 className="text-2xl font-semibold text-gray-800">Tech Stack Used</h4>
              <ul className="list-disc list-inside mt-2 text-gray-600">
                <li>Solana</li>
                <li>Solidity</li>
                <li>Solang</li>
                <li>Nextjs</li>
                <li>Anchor</li>
              </ul>
            </div>
          </div>
          <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-all duration-300 mt-4 md:mt-0">
            <div className="p-4">
              <h4 className="text-2xl font-semibold text-gray-800">Balance:</h4>
              <div className="text-2xl font-bold text-indigo-600 mt-2">
                {wallet && (balance || 0).toLocaleString()} SOL
              </div>
              <RequestAirdrop />
            </div>
          </div>
        </div>
        <div className="md:w-full text-center my-4">
          <Link href="https://github.com/dProgrammingUniversity/solidity-solana-full-stack-dapp-nextjs-boilerplate" target="_blank" rel="noopener noreferrer">
            <div className="btn btn-primary btn-lg bg-indigo-500 transform hover:scale-110 transition-all">
              Get Started
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

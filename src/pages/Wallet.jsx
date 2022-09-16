import React from 'react';
import Header from '../components/Header';
import Table from '../components/Table';
import WalletForm from '../components/WalletForm';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <div className="white-container">
          <Header />
          <WalletForm />
        </div>
        <div className="display-blue-container">
          <div className="blue-container">
            <Table />
          </div>
        </div>
      </div>
    );
  }
}

export default Wallet;

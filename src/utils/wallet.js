import Web3 from 'web3';
import abi from '@/assets/abi.json';

export default class Wallet {
  constructor(instance) {
    this.instance = instance;
    if (typeof window.web3 !== 'undefined') {
      this.wallet = new Web3(window.web3.currentProvider);
    } else {
      instance.$message({
        type: 'error',
        message: 'No Web3 Provider Found, Consider MetaMask?',
      });
    }
    this.account = this.wallet.eth.accounts[0];
    this.wallet.eth.defaultAccount = this.account;
    const Contract = this.wallet.eth.contract(abi);
    /* this.contract = Contract.at('0x545ef6db327e0861f199222c0c2d162a0f63e723'); */
    this.contract = Contract.at('0xda909812030e16D39390E52B7AFEFA44e4E8C272');
  }

  toWei(price) {
    return this.wallet.toWei(Number(price), 'ether');
  }
}

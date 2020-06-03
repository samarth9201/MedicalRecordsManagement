import React from 'react';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';

import MedicalRecordsContract from './contracts/MedicalRecordsContract.json';

import getWeb3 from './Utils/getWeb3';
import Authorised from './Components/Authorised';
import User from './Components/User';
import AppNavbar from './Components/AppNavbar';
import web3Context from './Context/web3Context';


class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            web3: null,
            accounts: null,
            contract: null,
            isAuthorised: false
        };
    }

    componentDidMount = async () => {

        try {
            // Get web3 instance
            const web3 = await getWeb3();

            // Using web3 to get user's account i.e the account which you will see on Metamask
            const accounts = await web3.eth.getAccounts();

            // Using web3 to get contract instnce
            const networkId = await web3.eth.net.getId();
            const deployedNetwork = MedicalRecordsContract.networks[networkId];
            const instance = new web3.eth.Contract(
                MedicalRecordsContract.abi,
                deployedNetwork && deployedNetwork.address
            );
            const isAuth = await instance.methods.isAutherisedMedicalPersonnel(accounts[0]).call();

            this.setState({
                web3: web3,
                accounts: accounts,
                contract: instance,
                isAuthorised: isAuth,
            });
        }
        catch (error) {
            alert("Unable to load web3");
            console.log(error);
        }
    }

    isAuthorised = async () => {
        console.log("Here");
        const contract = this.state.contract;

        const isAuthorisedMedicalPersonnel = await contract.methods.isAuthorisedMedicalPersonnel(this.state.accounts).call();
        console.log(isAuthorisedMedicalPersonnel);
        return isAuthorisedMedicalPersonnel;
    }

    render() {
        let to;
        if (this.state.isAuthorised) {
            to = '/authorised'
        }
        else {
            to = '/user'
        }
        return (
            <web3Context.Provider value={this.state}>
                <Router>
                    <AppNavbar></AppNavbar>
                    <Redirect from="/" to={to}></Redirect>
                    <Route path="/authorised" component={Authorised}></Route>
                    <Route path="/user" component={User}></Route>
                </Router>
            </web3Context.Provider>
        );
    }
}

export default App;
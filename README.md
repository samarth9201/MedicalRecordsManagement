# MedicalRecordsManagement

Medical Records Management is a Decentralized Application where Users can ad there records and authorised accounts can access those records.
The Application is based on Ethereum and was built using Truffle Framework.

### How to Run Application ?

Make sure Metamask Extension is installed on your Browser.
Start Ganache.
Import Accounts from Ganache to Metamask. 
Clone this git repository and follow these steps:

1. We need to Compile and deploy Contracts. Open terminal and head to root directory of Project and deploy contracts with following command:
```
truffle migrate --reset
```
2. Go to 'client' directory by following command.

```
cd client/
```
  Make sure you have imported accounts from Ganache.

  By default first account in Ganache is an Authorised Account which can be used to authorise new accounts.
  
 3. To start App, use following command,
 
 ```
 npm run start
 ```
 
 4. If you have first Ganache account imported on your Metamask, you will see a webpage like this:

![alt Screenshot](https://github.com/samarth9201/Images/blob/master/Screenshot%20(20).png)

5. If you have any other account imported, u will get something like this:

![alt Screenshot](https://github.com/samarth9201/Images/blob/master/Screenshot%20(21).png)


Thank you.

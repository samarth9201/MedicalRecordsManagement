//SPDX-License-Identifier: Unlicensed
pragma solidity >= 0.4.0 < 0.7.0;
pragma experimental ABIEncoderV2;

contract MedicalRecordsContract{
    
    mapping (address => bool) public isAutherisedMedicalPersonnel;
    mapping (address => string[]) records;
    
    event ContractInitialized(address indexed _address);
    event RecordCreated(address indexed user);
    event NewPersonnelAuthorised(address indexed newAccount, address indexed AuthorisedBy);
    
    constructor() public {
        isAutherisedMedicalPersonnel[msg.sender] = true;
        emit ContractInitialized(msg.sender);
    }
    
    function authoriseAccount(address _account) public{
        require(isAutherisedMedicalPersonnel[msg.sender] == true, "Only authorised users can authorise new Accounts");
        
        isAutherisedMedicalPersonnel[_account] = true;
        emit NewPersonnelAuthorised(_account, msg.sender);
    }
    
    function accessRecords(address _user) public view returns (string[] memory){
        require(isAutherisedMedicalPersonnel[msg.sender] == true || msg.sender == _user, "Only Authorised users can access medical Information");
        
        return records[_user];
    }
    
    function createRecord(string memory _records) public returns (string memory){
        records[msg.sender].push(_records);
        emit RecordCreated(msg.sender);
    }
}
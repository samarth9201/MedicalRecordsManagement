var MedicalRecordsContract = artifacts.require("./MedicalRecordsContract.sol");

module.exports = function(deployer) {
  deployer.deploy(MedicalRecordsContract);
};

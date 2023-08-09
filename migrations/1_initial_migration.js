const Migrations = artifacts.require("DataStorage");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
};

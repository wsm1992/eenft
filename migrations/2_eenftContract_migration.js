const eenftContract = artifacts.require("eenftContract");

module.exports = function (deployer) {
  deployer.deploy(eenftContract);
};
const MyToken = artifacts.require('./MyToken.sol')

module.exports = (deployer) => {
  const initialSupply =
  deployer.deploy(MyToken, initialSupply)
}
const Solittery = artifacts.require('./Solittery.sol')

module.exports = deployer => {
  deployer.deploy(Solittery)
}

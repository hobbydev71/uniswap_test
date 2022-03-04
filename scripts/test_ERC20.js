// const {
//   utils
// } = require('ethers')

const { ethers, upgrades } = require("hardhat")
const assert = require('assert');

function expandTo18Decimals(n) {
  return ethers.BigNumber.from(n).mul(ethers.BigNumber.from(10).pow(18))
}

const TOTAL_SUPPLY = expandTo18Decimals(10000)

async function main() {

  const UniswapV2ERC20 = await ethers.getContractFactory('UniswapV2ERC20')
  uniswapV2ERC20 = await UniswapV2ERC20.deploy()
  await uniswapV2ERC20.deployed()
  console.log("UniswapV2ERC20 deployed to:", uniswapV2ERC20.address)

  const name = await uniswapV2ERC20.name()
  assert.equal(name, 'Uniswap V2');
  const balance = await uniswapV2ERC20.balanceOf("0x1144b522f45265c2dfdbaee8e324719e63a1694c");
  console.log(balance);
  assert(TOTAL_SUPPLY.eq(balance));
  // expect(await uniswapV2ERC20.symbol()).to.eq('UNI-V2')
  // expect(await uniswapV2ERC20.decimals()).to.eq(18)
  // expect(await uniswapV2ERC20.totalSupply()).to.eq(TOTAL_SUPPLY)
  // expect(await uniswapV2ERC20.balanceOf(wallet.address)).to.eq(TOTAL_SUPPLY)




  // const UniswapV2Pair = await ethers.getContractFactory('UniswapV2Pair')
  // uniswapV2Pair = await UniswapV2Pair.deploy()
  // await uniswapV2Pair.deployed()
  // console.log("UniswapV2Pair deployed to:", uniswapV2Pair.address)

  // const UniswapV2Factory = await ethers.getContractFactory('UniswapV2Factory')
  // uniswapV2Factory = await UniswapV2Factory.deploy("0x1144b522f45265c2dfdbaee8e324719e63a1694c")
  // await uniswapV2Factory.deployed()
  // console.log("UniswapV2Factory deployed to:", uniswapV2Factory.address)

  // UniswapV2ERC20 deployed to: 0x587CA4936F8495c63b6c4cC3ca84E67191286B7d
  // UniswapV2Pair deployed to: 0x57377699cf70D10648CA24e89933EA5C612A879d
  // UniswapV2Factory deployed to: 0xed5724bDcf8842d593B91E9106c816503B60Ed94
}

main()
.then(() => process.exit(0))
.catch((error) => {
    console.error(error)
    process.exit(1)
})
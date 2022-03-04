const { ethers } = require("hardhat")
const assert = require('assert');

let uniswapV2Factory;
const TEST_ADDRESSES = [
  '0x1000000000000000000000000000000000000000',
  '0x2000000000000000000000000000000000000000'
]
// async function createPair(tokens) {
//   const bytecode = `0x${UniswapV2Pair.evm.bytecode.object}`
//   const create2Address = getCreate2Address(uniswapV2Factory.address, tokens, bytecode)
//   await expect(factory.createPair(...tokens))
//     .to.emit(factory, 'PairCreated')
//     .withArgs(TEST_ADDRESSES[0], TEST_ADDRESSES[1], create2Address, bigNumberify(1))

//   await expect(factory.createPair(...tokens)).to.be.reverted // UniswapV2: PAIR_EXISTS
//   await expect(factory.createPair(...tokens.slice().reverse())).to.be.reverted // UniswapV2: PAIR_EXISTS
//   expect(await factory.getPair(...tokens)).to.eq(create2Address)
//   expect(await factory.getPair(...tokens.slice().reverse())).to.eq(create2Address)
//   expect(await factory.allPairs(0)).to.eq(create2Address)
//   expect(await factory.allPairsLength()).to.eq(1)

//   const pair = new Contract(create2Address, JSON.stringify(UniswapV2Pair.abi), provider)
//   expect(await pair.factory()).to.eq(factory.address)
//   expect(await pair.token0()).to.eq(TEST_ADDRESSES[0])
//   expect(await pair.token1()).to.eq(TEST_ADDRESSES[1])
// }

async function main() {

  const UniswapV2Factory = await ethers.getContractFactory('UniswapV2Factory')
  uniswapV2Factory = await UniswapV2Factory.deploy("0x1144b522f45265c2dfdbaee8e324719e63a1694c")
  await uniswapV2Factory.deployed()
  console.log("UniswapV2Factory deployed to:", uniswapV2Factory.address)

  const feeTo = await uniswapV2Factory.feeToSetter()
  assert.equal(feeTo.toUpperCase(), '0x1144b522f45265c2dfdbaee8e324719e63a1694c'.toUpperCase())

  let tx = await uniswapV2Factory.createPair(...TEST_ADDRESSES)
  console.log(tx);
  let receipt = await tx.wait({gasLimit: 6000000})
  console.log(receipt.events);
}

main()
.then(() => process.exit(0))
.catch((error) => {
    console.error(error)
    process.exit(1)
})
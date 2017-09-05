pragma solidity ^0.4.2;

contract Solittery {
  function run() returns(uint[5]) {
    uint seed = uint(block.blockhash(block.number - 1));

    uint[5] memory res;

    uint iterRes = seed + now;

    for (uint i; i < 5; i++) {
      iterRes = calc(iterRes);
      res[i] = (iterRes % 75) + 1;
    }

    return res;
  }

  // calculates xor*
  function calc(uint x) private returns (uint) {
    x ^= x >> 12;
    x ^= x << 25;
    x ^= x << 27;

    return x * 0x2545F4914F6CDD1D;
  }
}

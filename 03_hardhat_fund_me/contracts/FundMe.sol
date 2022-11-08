// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

import "./PriceConverter.sol";

error FundMe__NotOwner();

/**@title A sample Funding Contract
 * @author la
 * @notice This contract is for creating a sample funding contract
 * @dev This implements price feeds as our library
 */
contract FundMe {
    using PriceConverter for uint256;

    // 函数外赋值，且不会变化了，即值是编译期就确定了，可以加上 constant，可以省 gas，更方便读取，变量名习惯全大写
    uint256 public constant MINIMUM_USD = 50 * 1e18;

    address[] public s_funders;
    // s_ 前缀标识 storage 类型的变量
    mapping(address => uint256) public s_addressToAmountFunded;

    // 赋值和声明同一行，但只会赋值一次，加 immutable，变量名 i_ 开头，省 gas
    address public immutable i_owner;

    AggregatorV3Interface public s_priceFeed;

    modifier onlyOwner() {
        // require(msg.sender == i_owner, "Sender is not owner");
        // _; 用于指代函数体
        // 表示执行了 require 以后再接着执行函数函数的其它逻辑，_; 写在前面则表示先执行函数的逻辑，再去执行 require

        // 不用存储错误信息字符串，省 gas；v0.8.4 引入的特性
        if (msg.sender != i_owner) {
            revert FundMe__NotOwner();
        }
        _;
    }

    constructor(address priceFeedAddress) {
        // 方法里面才存在 msg.sender
        i_owner = msg.sender;
        s_priceFeed = AggregatorV3Interface(priceFeedAddress);
    }

    // 处理不通过调用 fund() 方法向合约转钱的情况

    receive() external payable {
        fund();
    }

    fallback() external payable {
        fund();
    }

    // https://data.chain.link/ethereum/mainnet/crypto-usd/eth-usd
    // https://eth-converter.com/
    function fund() public payable {
        // access the value field
        // msg.value 用作 getConversionRate 的第一个参数
        require(
            msg.value.getConversionRate(s_priceFeed) >= MINIMUM_USD,
            "Didn't send enough"
        );
        // msg.value / 1e18 是发送的 Eth 数量，decimals 18 位

        s_funders.push(msg.sender);
        s_addressToAmountFunded[msg.sender] = msg.value;
    }

    function withdraw() public onlyOwner {
        for (
            uint256 funderIndex = 0;
            funderIndex < s_funders.length;
            funderIndex++
        ) {
            address funder = s_funders[funderIndex];
            s_addressToAmountFunded[funder] = 0;
        }
        s_funders = new address[](0);

        // https://solidity-by-example.org/sending-ether/

        // 将合约的 balance 转给 withdraw 的调用者
        // 1. transfer，不成功返回报错
        // payable(msg.sender).transfer(address(this).balance);

        // 2. send，返回是否 send 成功
        // bool sendSuccess = payable(msg.sender).send(address(this).balance);
        // 没有 require 的话 send 失败不会 revert
        // require(sendSuccess, "Send failed");

        // 3. call
        (bool callSuccess, ) = payable(msg.sender).call{
            value: address(this).balance
        }("");
        require(callSuccess, "Call failed");
    }

    function cheaperWithdraw() public payable onlyOwner {
        address[] memory funders = s_funders;
        // mappings can't be in memory
        for (
            uint256 funderIndex = 0;
            funderIndex < funders.length;
            funderIndex++
        ) {
            address funder = funders[funderIndex];
            s_addressToAmountFunded[funder] = 0;
        }
        s_funders = new address[](0);
        (bool callSuccess, ) = payable(msg.sender).call{
            value: address(this).balance
        }("");
        require(callSuccess, "Call failed");
    }
}

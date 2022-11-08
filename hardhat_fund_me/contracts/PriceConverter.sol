// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

library PriceConverter {
    function getPrice(AggregatorV3Interface priceFeed)
        internal
        view
        returns (uint256)
    {
        // Rinkeby
        // AggregatorV3Interface priceFeed = AggregatorV3Interface(
        // 0x8A753747A1Fa494EC906cE90E9f37563A8AF630e
        // );
        (, int256 price, , , ) = priceFeed.latestRoundData();
        // decimals 8 位，真实的价格是 price / 1e8，将 price 的小数位和 Eth 转成相同的，换算成真实值时就可以统一除以 1e18
        return uint256(price * 1e10);
    }

    function getConversionRate(
        uint256 ethAmount,
        AggregatorV3Interface priceFeed
    ) internal view returns (uint256) {
        uint256 ethPrice = getPrice(priceFeed);
        uint256 ethAmountInUSD = (ethPrice * ethAmount) / 1e18; // 乘了两次 1e18，要除掉一个
        return ethAmountInUSD;
    }
}

// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity ^0.8.0;

/// ============ Imports ============

import "./IERC20.sol"; // ERC20 minified interface
import "@openzeppelin/contracts/token/ERC721/ERC721.sol"; // OZ: ERC721

/// @title MultiFaucet
/// @author Anish Agnihotri
/// @notice Drips DAI
contract MultiFaucetGoerli is ERC721 {

    /// ============ Immutable storage ============

    /// @notice DAI ERC20 token
    IERC20 public immutable DAI;

    /// ============ Mutable storage ============

    /// @notice Default NFT uri
    string public URI;
    /// @notice Count of minted NFTs
    uint256 public nftsMinted;
    /// @notice Number of ERC721 NFTs to mint
    uint256 public NFT_COUNT = 5;
    /// @notice DAI to disperse
    uint256 public DAI_AMOUNT = 5_000e18;
    /// @notice Addresses of approved operators
    mapping(address => bool) public approvedOperators;
    /// @notice Addresses of super operators
    mapping(address => bool) public superOperators;

    /// ============ Modifiers ============

    /// @notice Requires sender to be contract super operator
    modifier isSuperOperator() {
        // Ensure sender is super operator
        require(superOperators[msg.sender], "Not super operator");
        _;
    }

    /// @notice Requires sender to be contract approved operator
    modifier isApprovedOperator() {
        // Ensure sender is in approved operators or is super operator
        require(
            approvedOperators[msg.sender] || superOperators[msg.sender], 
            "Not approved operator"
        );
        _;
    }

    /// ============ Events ============

    /// @notice Emitted after faucet drips to a recipient
    /// @param recipient address dripped to
    event FaucetDripped(address indexed recipient);

    /// @notice Emitted after faucet drained to a recipient
    /// @param recipient address drained to
    event FaucetDrained(address indexed recipient);

    /// @notice Emitted after operator status is updated
    /// @param operator address being updated
    /// @param status new operator status
    event OperatorUpdated(address indexed operator, bool status);

    /// @notice Emitted after super operator is updated
    /// @param operator address being updated
    /// @param status new operator status
    event SuperOperatorUpdated(address indexed operator, bool status);

    /// ============ Constructor ============

    /// @notice Creates a new MultiFaucet contract
    /// @param _DAI address of DAI contract
    /// @param _URI string of token URI
    constructor(address _DAI, string memory _URI) 
        ERC721("MultiFaucet NFT", "MFNFT") 
    {
        DAI = IERC20(_DAI);
        URI = _URI;
        superOperators[msg.sender] = true;
    }

    /// ============ Functions ============

    /// @notice Drips and mints tokens to recipient
    /// @param _recipient to drip tokens to
    function drip(address _recipient) external isApprovedOperator {

        // Drip DAI
        require(DAI.transfer(_recipient, DAI_AMOUNT), "Failed dripping DAI");

        emit FaucetDripped(_recipient);
    }

    /// @notice Returns number of available drips by token
    /// @return daiDrips — available DAI drips
    function availableDrips() public view 
        returns (uint256 daiDrips) 
    {
        daiDrips = DAI.balanceOf(address(this)) / DAI_AMOUNT;
    }

    /// @notice Allows super operator to drain contract of tokens
    /// @param _recipient to send drained tokens to
    function drain(address _recipient) external isSuperOperator {
        // Drain all Ether
        (bool sent,) = _recipient.call{value: address(this).balance}("");
        require(sent, "Failed draining ETH");

        // Drain all DAI
        uint256 daiBalance = DAI.balanceOf(address(this));
        require(DAI.transfer(_recipient, daiBalance), "Failed draining DAI");

        emit FaucetDrained(_recipient);
    }

    /// @notice Allows super operator to update approved drip operator status
    /// @param _operator address to update
    /// @param _status of operator to toggle (true == allowed to drip)
    function updateApprovedOperator(address _operator, bool _status) 
        external 
        isSuperOperator 
    {
        approvedOperators[_operator] = _status;
        emit OperatorUpdated(_operator, _status);
    }

    /// @notice Allows super operator to update super operator
    /// @param _operator address to update
    /// @param _status of operator to toggle (true === is super operator)
    function updateSuperOperator(address _operator, bool _status) 
        external
        isSuperOperator
    {
        superOperators[_operator] = _status;
        emit SuperOperatorUpdated(_operator, _status);
    }

    /// @notice Override internal ERC721 function to return single image per NFT
    /// @param tokenId of ERC721 NFT
    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        // OpenZeppelin check: ensure token exists
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
        return URI;
    }

    /// @notice Allows super operator to update NFT uri
    /// @param _URI of collection
    function updateTokenURI(string memory _URI) external isSuperOperator {
        URI = _URI;
    }

    /// @notice Allows super operator to update drip amounts
    /// @param _daiAmount DAI to drip
    function updateDripAmounts(
        uint256 _daiAmount
    ) external isSuperOperator {
        DAI_AMOUNT = _daiAmount;
    }

    /// @notice Allows receiving ETH
    receive() external payable {}
}
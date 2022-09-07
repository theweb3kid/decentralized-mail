// SPDX-License-Identifier: MIT
/// @author theweb3kid <theweb3kid@gmail.com>

pragma solidity ^0.8.9;

contract DecentralizedMailer {

    struct Mail {
        address from;
        address to;
        string subject;
        string message;
        uint timestamp;
    }

    mapping (uint => Mail) private mailIDCollection;
    uint[] private mailDatabase;

    mapping (address => Mail[]) private sentMails;
    mapping (address => Mail[]) private receivedMails;

    mapping (address => uint) private sentMailsCount;
    mapping (address => uint) private receivedMailsCount;

    function sendMail(address _to, string memory _subject, string memory _message) public {

        Mail memory mail = Mail(msg.sender, _to, _subject, _message, block.timestamp);
        sentMails[msg.sender].push(mail);
        sentMailsCount[msg.sender]++;
        receivedMails[_to].push(mail);
        receivedMailsCount[_to]++;
    }

    function getSentMailsCount (address _user) public view returns (uint) {
        require(msg.sender == _user);
        return (sentMailsCount[_user]);
    }

    function getReceivedMailsCount (address _user) public view returns (uint) {
        require(msg.sender == _user);
        return (receivedMailsCount[_user]);
    }

    function getSentMails (address _user, uint id) public view returns (Mail memory) {
        require(msg.sender == _user);
        return (sentMails[_user][id]);
    }

    function getReceivedMails (address _user, uint id) public view returns (Mail memory) {
        require(msg.sender == _user);
        return (receivedMails[_user][id]);
    }

}
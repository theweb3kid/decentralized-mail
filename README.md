DecentralizedMailer

Do you still use web2 software's to send emails in web3? Get over it and use Ethereum addresses as email ids and send emails on-chain in a completely decentralized way! Not just emails, you can also make a completely decentralized chatting app using this!

Basic Explanation

You must be curious how the contract works, lets take a dive into it! The contract is in a early stage, a lot of features revolving around privacy, security, and storage limit are gonna be added into it very soon, till them give this a shot, and lemme know what more features would you like me to add into this!

Struct Mail

So, below we lay our format for the email, we basically have a from address, to address and then, subject, message and timestamp:

struct Mail {
        address from;
        address to;
        string subject;
        string message;
        uint timestamp;
    }
    
Storing Our Mails

Now, since we got the structure sorted we need to store all the incoming and outcoming mails, you might also ask why we need two have separate storage for incoming and outgoing mails, welp, this is the best and most gas optimized solution I could come up with so I followed this approach, lemme know if you know a better approach for it. So for now, we are storing it in form of address to array mapping, where for each user address we are storing their incoming and outgoing mails in two separate arrays of our struct Mail, and hey we are also storing the count of both the mails, you will know why in the next few sections:

mapping (address => Mail[]) private sentMails;
    mapping (address => Mail[]) private receivedMails;

    mapping (address => uint) private sentMailsCount;
    mapping (address => uint) private receivedMailsCount;
    }
    
Sending Mails

We got our structure and storage sorted, now lets send some on-chain mails! Using the below function, just tell it whom to send the mail, the subject and the message you want to share, that's it. It would take your (sender's) address and timestamp automatically and store it in our mappings and upgrade the counts as well, this is the only section where someone will have to bear the gas fees, rest all is free:

function sendMail(address _to, string memory _subject, string memory _message) public {

        Mail memory mail = Mail(msg.sender, _to, _subject, _message, block.timestamp);
        sentMails[msg.sender].push(mail);
        sentMailsCount[msg.sender]++;
        receivedMails[_to].push(mail);
        receivedMailsCount[_to]++;
    }
    
Fetch Those Damn Mails

These are the read functions, there are total of four functions: two for fetching the count of sent and received mails, and two for fetching the arrays. The catch here is I was not able to find a gasless way of fetching the complete data therefore in the frontend we need to run this function in a for loop and fetch each element of the array using the count of mails, and form a temporary array in frontend for displaying, if we do the same in our smart contract we will have to pay a lot of gas which is not ideal and the best part of these functions right now is that they don't require gas fees, which means; basically anyone you send mails to, will be able to read their on-chain mails for free, just by connecting their Ethereum wallet:

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
    
Demo App

Want to see it all working? here is the link to a very simple demo app I made to show you how this smart contract will work after deploying: https://decentralized-mail.web.app/

Updates That Are Coming

Notifications, notifying the users of new mails that they received, events in the smart contract, and also as I said earlier, a lot of features revolving around privacy, security, and storage limit are gonna be added into this very soon.

Contributing
You got some cool suggestion or think some amazing modification needs to be done or just want to connect with me? Feel free to shoot a mail at theweb3kid@gmail.com or 0xE56E98622cAf1cE34473B65658Af4722E06900F9 using the demo app above!

License
MIT

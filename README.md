# Short React Tech Task
 
#### Time estimate: 2 hours - i am not finish but spend more time
**Description**
We need to create a little messenger (chat) web application. The scope is limited to the screen which displays the message history between 2 users. The messages come from a JSON file which can be found below.
 
**Example message**:
```
    {
        "id": 1,
        "direction": "out",
        "status": "received",
        "timestamp": "1577834146",
        "text": "Hello! How’s it going?"
    }
```
### You should:
**Take into account the following aspectsDisplay all the messages from the JSON file. For every message the following data is displayed:**
1. Date and time (format of your choice)
2. Message text (no HTML possible)
3. For outgoing messages: message status (sent=one tick, received=two ticks, read=two blue ticks, or just display a letter to save time)
4. Incoming messages also come with a status, but it’s not displayed. It can be ‘received’ or ‘read’. Calculate the number of ‘received’ (=unread) messages and display the number in the header
5. User can type a message and ‘send’ it: the message appears in the chat history with the current timestamp and ‘sent’ status.
6. Initially the beginning of the conversation is shown. The user can scroll down to reach the further messages
7. Optional. Once an incoming unread message appears on the screen, it’s set to ‘read’. The unread messages count should reflect this change.
8. Optional. Add a small button to jump to the first unread message, if there are any.


**Take into account the following aspects:**
1. Should be React based
2. Feel free to use your favorite tooling (Task runners, unit test, linters or css pre-processors).
3. Design is not mandatory, feel free to present the data in whatever form you like. Simplify to save time.
4. Since there may be quite a big number of messages, the performance aspect may be evaluated
5. Will be tested in the following browsers: Chrome Desktop, Firefox Desktop, Chrome Android, Safari iOs. Should support a variety of screen resolutions.
6. The best practice is to show the chat in a small snippet on desktop and full screen on mobile (see examples below)
7. Optional points above are optional, but can be done if you have remaining time

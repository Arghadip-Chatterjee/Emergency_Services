import React, { useState } from 'react';
import tw from 'tailwind-styled-components';

const ChatWrapper = tw.div`bg-gray-300`;
const Input = tw.input`bg-white`;

const ChatSonicChat = () => {
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    var latlong = localStorage.getItem("currentLocation");
    // Make API request to ChatSonic
    if (userInput.search("nearest") > 0) {
      if (latlong) {
        latlong = JSON.parse(latlong); 
        setUserInput(userInput+`. My Current latitude is ${latlong.lat} and my longitude is ${latlong.lng}`);
      }
    }

    const response = await fetch('https://api.writesonic.com/v2/business/content/chatsonic?engine=premium&language=en', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': 'e50a69d5-e75a-434d-8b29-a14d66bd9a52'
      },
      body: JSON.stringify({ input_text: userInput, enable_google_results: true, enable_memory: true })
    });

    const data = await response.json();
    const message = data.message;

    setChatHistory([...chatHistory, { message: userInput, sent: true }, { message: message, sent: false }]);
    setUserInput('');
  };

  const convertHtmlToText = (html) => {
    const tempElement = document.createElement("div");
    tempElement.innerHTML = html;
    return tempElement.textContent || tempElement.innerText || "";
  };

  return (
    // <div>
    //   <div className="border-2 m-auto">
    //     {/* Render chat history */}
    //     {chatHistory.map((chat, index) => (
    //       <div key={index}>
    //         <p>
    //           {chat.sent ? "User: " : "AI: "}
    //           {convertHtmlToText(chat.message)}
    //         </p>
    //       </div>
    //     ))}
    //   </div>
    //   <form onSubmit={handleSubmit}>
    //     <Input type="text" value={userInput} onChange={(e) => setUserInput(e.target.value)} />
    //     <button type="submit">Send</button>
    //   </form>
    // </div>

    <ChatWrapper>
      <div className="border-2 m-auto">
        {/* Render chat history */}
        {chatHistory.map((chat, index) => (
          <div key={index}>
            <p>
              {chat.sent ? "User: " : "AI: "}
              {convertHtmlToText(chat.message)}
            </p>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <Input type="text" value={userInput} onChange={(e) => setUserInput(e.target.value)} />
        <button type="submit">Send</button>
      </form>
    </ChatWrapper>
  );
};

export default ChatSonicChat;
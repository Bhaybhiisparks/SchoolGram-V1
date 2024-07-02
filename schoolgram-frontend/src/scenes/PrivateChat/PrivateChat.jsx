import React from "react";
import HomePage from "../Homepage/Profilepage";





//CUSTOM IMPORTS
// custom image imports
import SearchHeader from "../../components/SearchHeader";






const PrivateChat = () => {
    return( 
        <>
            <SearchHeader></SearchHeader>
            <body className="private-chat-body">
                <div className="private-chat-content">
                    <p className="private-sender">Hi, I am a sender</p>
                    <p className="private-receiver">Hello, I received your message</p>
                    <h6 className="private-chat-day">Today</h6>
                </div>

                <div className="message-send"></div>
            </body>
        </>
 
    )
}


export default PrivateChat;

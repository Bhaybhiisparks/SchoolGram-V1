import React from "react";



//CUSTOM IMPORTS
// custom image imports
import toggle from "../scenes/misc images/coloured/status.svg"







export const ChatGroup = () => {
    return( 
     
                <div class="chat-or-group">
                    <h4 class="chat-name highlighted">Chat <span class="chat-number">3</span> </h4>
                    <h4 class="groups-name">Groups</h4>
                </div> 
             
        
 
    )
}


export const CallNAddFriend = () => {
    return( 
     
                                <>
                                <img src= {toggle} className="call-img" alt="Call Image" />
                                <br />
                                <img src= {toggle} className="add-new-friend" alt="Add new friend" />
                                </>
             
        
 
    )
}


// export default SearchHeaderChatGroup;

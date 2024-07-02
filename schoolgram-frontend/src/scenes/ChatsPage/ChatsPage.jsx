import React from "react";



//CUSTOM IMPORTS

import SearchHeader from "../../components/SearchHeader";
import { ChatGroup } from "../../components/SearchHeaderChatGroup";

// custom image imports
// import toggle from "./misc images/black and white/toggle-off.svg"
import  miniPicture from "../misc images/pictures/mini picture.jpg"
import notificationImage from "../misc images/black and white/notification-bing.svg"







const ChatsPage = () => {
    return( 
        <>
        <SearchHeader> </SearchHeader>
               <ChatGroup></ChatGroup>
            <div class="chat-body">
               
                <div class="chat-main main1">
                    <img src = {miniPicture} class="contact-photo contactOne" alt ="contact-photo" />
                    <div class="chat-main-body">
                        <h4 class="contact-name"> Dennis Morgan </h4>
                        {/* Embed continuity here */}
                        <p class="chat-content">Aw fa, you don submit your ass...</p>
                        <br />
                        <br/>
                    </div>
                    <div className="chat-notiEttime">
                         <img src = {notificationImage} alt="" class="chat-notification" />
                         <p class="chat-time">17:01</p>
                        </div>
                </div>

                <br />

                <div class="chat-main">
                    <img src = {miniPicture} class="contact-photo contactOne" alt="contact-photo" />
                    <div class="chat-main-body">
                        <h4 class="contact-name"> Perculiar Wisdom </h4>
                        {/* Embed continuity here */}
                        <p class="chat-content">Good morning. Please can i have Iyobosa's contact?.</p>
                        <br />
                        <br />
                    </div>
                    <div className="chat-notiEttime">
                         <img src = {notificationImage} alt="" class="chat-notification" />
                         <p class="chat-time">08:36</p>
                        </div>

                </div>
                <br />
                <div class="chat-main">
                    <img src = {miniPicture} class="contact-photo contactOne" alt ="contact-photo" />
                    <div class="chat-main-body">
                        <h4 class="contact-name"> Faith Osagioduwa </h4>
                        Embed continuity here
                        <p class="chat-content">Hellooooooo....</p>
                        <br />
                        <br/>
                    </div>
                    <div className="chat-notiEttime">
                         <img src = {notificationImage} alt="" class="chat-notification" />
                         <p class="chat-time">0218</p>
                        </div>
                </div>
                <br/>
                <div class="chat-main">
                    <img src = {miniPicture} class="contact-photo contactOne" alt="contact-photo" />
                    <div class="chat-main-body">
                        <h4 class="contact-name"> Perculiar Wisdom </h4>
                        {/* Embed continuity here */}
                        <p class="chat-content">Good morning. Please can i have Iyobosa's contact?.</p>
                        <br />
                        <br />
                    </div>
                    <div className="chat-notiEttime">
                         <img src = {notificationImage} alt="" class="chat-notification" />
                         <p class="chat-time">08:36</p>
                        </div>

                </div>
                <br />


                <div class="chat-bottom">

                </div>
            </div>

        </>
       )
}


export default ChatsPage;

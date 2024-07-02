import React from "react";





//CUSTOM IMPORTS
// custom image imports
import toggle from "../scenes/misc images/coloured/toggle (1).svg";
import goBack from "../scenes/misc images/black and white/arrow-left.svg"
import searchIcon from '../scenes/misc images/black and white/search-normal.svg'





const SearchHeader = () => {
    return( 
        <>
             <header className="chat-top">
             <img src = {goBack}  className="go-back" alt="arrow-left" />

             <div className="search-div">
             <img src = {searchIcon}  className="search-img"  alt="search-img" />
                <input type="text" className="search-input" placeholder="Search-chat" />
             </div>
               
             </header>
        </>
 
    )
}


export default SearchHeader;

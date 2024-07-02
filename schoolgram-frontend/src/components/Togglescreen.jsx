// import the CSS files here





// const Togglescreen = 
    // function loadMobileStyles() {
    //     const link = document.createElement('link');
    //     link.rel = 'stylesheet';
    //     link.type = 'text/css';
    //     // restructure your path to CSS later on
    //     link.href = '../mobileView.css'; 
      
    //     // Append the link element to the head when in mobile view
    //     document.head.appendChild(link);
    //   }
      
    //   function removeMobileStyles() {
    //     const links = document.head.querySelectorAll('link[rel="stylesheet"]');
    //     links.forEach(link => {
    //       if (link.href.includes('mobileView.css')) {
    //         link.remove();
    //       }
    //     });
    //   }
      
    //   function checkMobileView() {
    //     const isMobile = window.innerWidth <= 600; // Change the width value as needed
      
    //     if (isMobile) {
    //       loadMobileStyles();
    //     } else {
    //       removeMobileStyles();
    //     }
    //   }
      
    // // Call the function initially and listen for window resize events
    //   checkMobileView();
    //   window.addEventListener('resize', checkMobileView);
    
    
    //   refractored code to toggle screensize
    export function ToggleScreen() {
        const isMobile = window.innerWidth <= 600; // Change the width value later
        const linkExists = document.head.querySelector('link[href="../scenes/mobileView.css"]');
      
        if (isMobile && !linkExists) {
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.type = 'text/css';
          link.href = '../scenes/mobileView.css'; 
          document.head.appendChild(link);
        } else if (!isMobile && linkExists) {   //for desktop view
          linkExists.remove();
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.type = 'text/css';
          link.href = '../DesktopNew.css'; 
          document.head.appendChild(link);

        }
      }
      
      ToggleScreen();
      window.addEventListener('resize', ToggleScreen);



// export default ToggleScreen;
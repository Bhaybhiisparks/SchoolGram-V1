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
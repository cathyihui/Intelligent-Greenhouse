# Intelligent-Greenhouse
With the development of technologies, the greenhouse can be innovative by implementing sensor network and different web technologies like HTML, CSS, JavaScript, Socket.io, etc. Minimize the user's intervention and involvement in monitoring and controlling the greenhouse's environment can make greenhouse controller's life more efficient. The main objective of this project is to build a greenhouse model with automatic mode and manual mode. In automatic mode, environmental data like temperature, humidity, light and soil moisture are detected. When some specific environmental conditions are met, the greenhouse can perform some activities automatically. For example, the LED light in the greenhouse can automatically turn on when the greenhouse's light is lower than 50. In manual mode, the same actions' state can be toggled by clicking the buttons on the web page. Thus, by clicking the button on the web page, the LED light can also turn on in manual mode.  
The files layout is shown below:  
<image src = "clients/images/fileslayout.PNG" height = 350>

Use the CSS files and the HTML file in the "clients" folder to build the web page like this:  
<image src = "clients/images/finalwebpage.PNG" height = 350>  

copy the code in the file "ArduinoCode" to your Arduino file. This code sets the devices' connected pin, the data output format, and the input string that can toggle the status of the functionalities in the greenhouse. In the Greenhouse model, the sensors and devices' layout are shown as follows:  
<image src = "clients/images/pinlayour.PNG" height = 350>  
Use the socket.io application to enable the communication between the web server and the client browsers. The client browsers server the webpage we have designed. The sensors data are displayed on the webpage. The buttons on the webpage can control the status of the functionalities in the greenhouse.  
<image src = "clients/images/products layout.PNG" height = 350>
 <image src = "clients/images/11.jpg" height = 350> 
 
  


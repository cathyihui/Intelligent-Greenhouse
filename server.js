//the connection between arduino and server
var SerialPort = require('serialport');
var readline = require('@serialport/parser-readline');
var serial = SerialPort.serialPort;
var com = new SerialPort('com4',{baudRate:9600}, function(err){
    if (err) {
        return console.log('Error on com open: ', err.message);
      }
      console.log('com is connected!!');//if the COM port is sucessfully open
});

var state;
var water_state;
var fan_state;
var heater_state;

com.on('close',function(){
  console.log('com closed...'); // when COM port is close
 });
var parser = com.pipe(new readline()); 

//Can output all the data read from arduino here
parser.on('data', function(data) {

  var dataStr =data.toString();

  if(dataStr == "LED=1\r")
  {
        state = 1;
        io.emit('ledStateUpdate', {led:state});	
  } else if(dataStr == "LED=0\r")
  {
        state = 0;
        io.emit('ledStateUpdate', {led:state});	
  }

  else if(dataStr == "PUMP=1\r")
  {
      water_state = 0;
      io.emit('waterUpdate',{water:water_state});
  }
  else if(dataStr == "PUMP=0\r")
  {
    water_state = 1;
    io.emit('waterUpdate',{water:water_state});
  }

  else if(dataStr == "FAN=0\r")
  {
      fan_state = 0;
      io.emit('fanUpdate',{fan:fan_state});
  }
  else if(dataStr == "FAN=1\r")
  {
    fan_state = 1;
    io.emit('fanUpdate',{fan:fan_state});
  }

  else if(dataStr == "Heater=0\r")
  {
      heater_state = 0;
      io.emit('heaterUpdate',{heater:heater_state});
  }
  else if(dataStr == "Heater=1\r")
  {
    heater_state = 1;
    io.emit('heaterUpdate',{heater:heater_state});
  }

  else if(dataStr == "ModeManual\r")
  {
    io.emit('modeManualUpdate',{});
  }

  else if(dataStr == "ModeAuto\r")
  {
    io.emit('modeAutoUpdate',{});
  }

  else{
  var rec = dataStr.split(";",4);
 
  console.log(rec[0],rec[1],rec[2],rec[3]);	

  io.emit('sensorData',{temp:rec[0], humi:rec[1], moisture:rec[2], light:rec[3] });
  }

});

//connection between server and clients
var express =require("express"); // requrie Express app
var app = express(); //invoke express framework
var http = require('http').Server(app); //require HTTP and serve Express framework
var io = require('socket.io')(http);// use socket.io

http.listen(4000, function(){ // listen requist on port 4000

  console.log('listening on *:4000');
});

 app.use(express.static('clients')); //express app to serve the folder 'clients'

 //when the sockets are on connnection
  io.on('connection',function(socket){

    console.log('new connection:', socket.id);


    //when the light button is clicked
    socket.on('toggle_light',function(){

      com.write('togglelight\n', function(err) {
          if (err) {
            return console.log('Error on port write: ', err.message);
          }
          console.log('LED light message written!!!');
        });
      });
    
    //water button is clicked, write the message via port. 
    socket.on('toggle_water',function(){

      com.write('togglewater\n',function(err){
        if(err){
          return console.log('Error on port write: ', err.message);
        }
        console.log('Water pump message written!!!')
      });
    });

    socket.on('toggle_fan',function(){

      com.write('togglefan\n',function(err){
        if(err){
          return console.log('Error on port write: ', err.message);
        }
        console.log('Fan message written!!!')
      });
    });

    socket.on('toggle_heater',function(){

      com.write('toggleheater\n',function(err){
        if(err){
          return console.log('Error on port write: ', err.message);
        }
        console.log('heater message written!!!')
      });
    });

    socket.on('mode_manual',function(){

      com.write('manualmode\n',function(err){
        if(err){
          return console.log('Error on port write: ', err.message);
        }
        console.log('The mode has been changed to Manual')
      });
    });

    socket.on('mode_auto',function(){

      com.write('automode\n',function(err){
        if(err){
          return console.log('Error on port write: ', err.message);
        }
        console.log('The mode has been changed to Auto')
      });
    });
    
 });

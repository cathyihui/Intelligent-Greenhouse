$(document).ready(function () {

    //connect using socket.io  
    var socket = io();

    $("#button_manual").click(function(){
        //send toggle message when button pressed
        socket.emit('mode_manual',{});
    });

    $("#button_auto").click(function(){
        //send toggle message when button pressed
        socket.emit('mode_auto',{});
    });

    //led light button
    $("#LED").click(function(){
        //send toggle message when button pressed
        socket.emit('toggle_light',{});
    });

    $("#waterpump").click(function(){
        //send toggle message when button pressed
        socket.emit('toggle_water',{});
    });

    $("#Fan").click(function(){

        socket.emit('toggle_fan',{});
    }); 

    $("#Heater").click(function(){

        socket.emit('toggle_heater',{});
    });

    //output the LED value
    socket.on('ledStateUpdate',function(msg){
        $("#led_value").html('The state of LED is: '+ msg.led);
    });

    //output the state of water pump
    socket.on('waterUpdate',function(data1){
       
        $("#water_value").html('The state of water pump is: '+ data1.water);

    })

    socket.on('fanUpdate',function(data2){
       
        $("#fan_value").html('The state of water pump is: '+ data2.fan);

    })

    socket.on('heaterUpdate',function(data3){
       
        $("#heater_value").html('The state of water pump is: '+ data3.heater);

    })

    socket.on('modeManualUpdate', function(){

        $("#modeUptoDate").html('Manual');

    })

    socket.on('modeAutoUpdate',function(){
        
        $("#modeUptoDate").html('Auto');

    })

    
    socket.on('sensorData', function(data){
        $("#temperature").html('Temperature: ' + data.temp + ' &#8451;');
        $("#humidity").html('Humidity: ' + data.humi +'%');
        $("#moisture").html('Soil Moisture: ' + data.moisture + '%');
        $("#light").html('Light: ' + data.light);
    
    });


});

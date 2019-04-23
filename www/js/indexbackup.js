/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {

        var url = "https://api.nasa.gov/planetary/apod?api_key=BCVG2efRPIuuiUwaKwZdAa4LMUzVhvjakVRSH61Z";

        $("#loadImage").click(function(){
            $.ajax({
                url: url,
                success: handleResult
            });

            function handleResult(result){
                $("#spaceimage").attr("src", result.url);

                // Using http://responsiveimg.com library

                $("#spaceimage").responsiveImg();

                $("#copyright").text("Copyright: " + result.copyright) ;
                $("#desc").text(result.explanation);
            }
        });


        $("#randomImage").click(function(){
            $.ajax({
                url: url + "&date=" + randomDate(new Date(2015, 0, 1), new Date()),
                success: handleResult
            });

            function handleResult(result){
                $("#spaceimage").attr("src", result.url);

                //http://responsiveimg.com/

                $("#spaceimage").responsiveImg();

                $("#copyright").text("Copyright: " + result.copyright) ;
                $("#desc").text(result.explanation);
            }
        });  

        // based on https://gist.github.com/miguelmota/5b67e03845d840c949c4

        function randomDate(start, end) {
            var date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
            
            var dat = date.getDate();
            var month = date.getMonth() + 1;
            var yr = date.getFullYear();
            
            return yr + "-" + month + "-" + dat;
        }





        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();
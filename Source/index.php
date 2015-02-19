<HTML>
	<HEAD>
		<SCRIPT src="https://cdn.socket.io/socket.io-1.3.4.js"></SCRIPT>
		<SCRIPT src="MicroProtocolLib.js"></SCRIPT>
		<SCRIPT src="MicroProtocolRequest.js"></SCRIPT>
		<SCRIPT src="MicroProtocolQueue.js"></SCRIPT>
		<SCRIPT src="MicroProtocolBucket.js"></SCRIPT>
		<SCRIPT src="MicroProtocolFrame.js"></SCRIPT>
		<SCRIPT>
			
	// Initialize a connection
	var connection = new MicroProtocolLib({
		address: "http://socketio-proxy-fba69e23-1.teltech.cont.tutum.io",
		port:    80
	});
				
	// Register event handlers      
	connection.onConnected = function () {
		console.log("connection.onConnected");
	}
	connection.onConnectError = function (error) {
		console.log("connection.onConnectError: " + error);
	}
	connection.onReconnecting = function (attempt) {
		console.log("connection.onReconnecting: " + attempt);
	}
	connection.onRequestReceived = function (request) {
		console.log("connection.onRequestReceived");
	}
	connection.onSocketActivity = function (idle) {
		console.log("connection.onSocketActivity");
	}		
        
        
    function clickedAddRequest (priority) {
    
    	// Create the payload
		var payloadData = "data you want to send";
		
		// Create the request
		var request = new MicroProtocolRequest({
		            channel:  1,
		            method:   2,
		            resource: 3,
		            priority: priority,
		            payload:  payloadData
		    });
    	
    	// Send the request
	    connection.sendRequest(request, {
	        onDownloadProgress: function(progress) {
	            console.log("connection.sendRequest.onDownloadProgress");
	        },
	        onUploadProgress: function(progress) {
	            console.log("connection.sendRequest.onUploadProgress");
	        },
	        onResponse: function(response) {
	            console.log("connection.sendRequest.onResponse");
	        },
	        onTimeout: function() {
	            console.log("connection.sendRequest.onTimeout");
	        }
	    });
    }
        
    function clickedNextFrame() {
	    connection.debugNextFrame();
    }
    
    
		</SCRIPT>
	</HEAD>
<BODY>

<button onclick="clickedAddRequest(3)">Add a request with priority 3</button>
<button onclick="clickedAddRequest(1)">Add a request with priority 1</button>
<BR><BR>
<button onclick="clickedNextFrame()">Next frame</button>

</BODY>
</HTML>


function MicroProtocolLib (params) {

	this.address = params.address;
	this.port = params.port;
	if (!this.address || !this.port) {
		alert ("Error\n\nMicroProtocolLib needs to be initialized with an 'address' and 'port'");
		return;
	}
	
	// Setup the queue
	this.queue = new MicroProtocolQueue();
	
	// Setup the socket
	setupSocket(this);
	
	

		
		
/* ------------ PUBLIC METHODS ------------ */


	/**
	 *  Send a request to the server
	 *
	 *  @param request MicroProtocolRequest object
	 *  @param handler Object containing the event handlers
	 */
	this.sendRequest = function (request, handler) {
		this.queue.queueRequest(request, handler);
	}

//-----	
	this.debugNextFrame = function () {
		var frame = this.queue.nextFrame();
		if (frame) {
			console.log(frame);
		} else {
			console.log("------\nNO FRAMES\n------");
		}
	}
//-----
	
/* ------------ PRIVATE METHODS ------------ */


	/**
	 *  Setup the socket connection
	 */
	function setupSocket(self) {
		
		try {
			self.socket = io.connect(self.address + ":" + self.port);
			self.socket.reconnection = true;
			self.socket.reconnectionDelay = 1000;
			self.socket.reconnectionDelayMax = 5000;
			self.socket.timeout = 10000;
		} catch(err) {
			alert ("Error\n\nUnable to initialize socket. Did you include socket.io.js?");
			return;
		}

		self.socket.on('connect', function() {
			self.onConnected();
		});
		self.socket.on('connect_error', function(error) {
			self.onConnectError(error);
		});
		self.socket.on('reconnecting', function(number) {
			self.onReconnecting(number);
		});
		self.socket.on('', function(response) {
			console.log("Received response: " + response);
		});
	}
	
	
/* ------------ EVENTS ------------ */


	/**
	 *  Fired upon a successful connection
	 */
	this.onConnected = function () {
	}
	
	/**
	 *  Fired upon a connection error
	 */
	this.onConnectError = function (error) {
	}
	
	/**
	 *  Fired upon an attempt to reconnect
	 */
	this.onReconnecting = function (attempt) {
	}
	
	/**
	 *  Fired when a request is received from the server
	 */
	this.onRequestReceived = function (request) {
	}

	/**
	 *  Fired when the socket goes from an active to idle state or vice versa
	 */
	this.onSocketActivity = function (idle) {
	}
}
/*

	var request = new MicroProtocolRequest({
							channel:  1,
							method:   2,
							resource: 3,
							priority: 4,
							payload:  <payloadData>,
							timeout:  15
						}); 

*/

function MicroProtocolRequest (params) {

	this.defaultTimeout = 15;
	this.requestIdentifier = generateRequestIdentifier();
	this.currentFrame = 0;
	
	this.channel = (!params.channel) ? 0 : params.channel;
	this.method = (!params.method) ? 0 : params.method;
	this.resource = (!params.resource) ? 0 : params.resource;
	this.priority = (!params.priority) ? 0 : params.priority;
	this.payload = (!params.payload) ? "" : params.payload;
	this.timeout = (!params.timeout) ? this.defaultTimeout : params.timeout;
	
	console.log("Rquest ID: " + this.requestIdentifier);

/* ------------ PUBLIC METHODS ------------ */


	/**
	 *  Returns the next frame in the request
	 *
	 *  @return MicroProtocolFrame object or null if no frames are available
	 */
	this.nextFrame = function () {
		this.currentFrame++;
		if (this.currentFrame > 6) {
			return;
		} else {
			var frame = new MicroProtocolFrame();
			return frame;
		}
		
	}


/* ------------ PRIVATE METHODS ------------ */

	/**
	 *  Generate a request identifier
	 *
	 *  @return Request identifier
	 */
	function generateRequestIdentifier () {
		function s4() {
			return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
		}
		return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
	}
}

function MicroProtocolBucket (priority) {

	this.requests = [];
	this.priority = priority;
	this.currentRequest = 0;
	
	
/* ------------ PUBLIC METHODS ------------ */


	this.addRequest = function (request) {
		this.requests.push(request);
	}
	
	/**
	 *  Returns the next frame in the bucket
	 *
	 *  @return MicroProtocolFrame object or null if no frames are available
	 */
	this.nextFrame = function () {
		if (this.currentRequest >= this.requests.length) {
			this.currentRequest = 0;
		}
		var startingRequest = this.currentRequest;
		var revolution = false;
		while (this.requests.length > 0) {
			if (this.currentRequest >= this.requests.length) {
				this.currentRequest = 0;
				revolution = true;
				if (startingRequest == 0) {
					return;
				}
			}
			if ((revolution == true) && (startingRequest == this.currentRequest)) {
				this.currentRequest = 0;
				return;
			}
			var frame = this.requests[this.currentRequest].nextFrame();
			this.currentRequest++;
			if (frame) {
				return frame;
			}
		}
		return;
	}
}
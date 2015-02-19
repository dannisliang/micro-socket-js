/*

	var queue = new MicroProtocolQueue();

*/

function MicroProtocolQueue () {
	
	this.buckets = [];
	this.highestPriority = 15;
	this.currentBucket = this.highestPriority;
	this.framesFromBucket = 0;
	
	// Create all the buckets for all the different priority levels
	for (priority = 0; priority <= this.highestPriority; priority++) {
		var bucket = new MicroProtocolBucket(priority);
		this.buckets.push(bucket);
	}
		
		
/* ------------ PRIVATE METHODS ------------ */


	/**
	 *  Returns the bucket for the requested priority level
	 *
	 *  @param priority Priority level
	 *
	 *  @return MicroProtocolBucket object
	 */
	function getBucket (self, priority) {
		return self.buckets[priority];
	}
	
	
/* ------------ PUBLIC METHODS ------------ */


	/**
	 *  Add a request to the queue so it can be sent out
	 *
	 *  @param request MicroProtocolRequest object
	 *  @param handler Object containing the event handlers
	 */
	this.queueRequest = function (request, handler) {
		console.log("queuing request priority: " + request.priority);
		
		var bucket = getBucket(this, request.priority);
		bucket.addRequest(request);
		
		if (request.priority > this.currentBucket) {
			this.currentBucket = request.priority;
			this.framesFromBucket = 0;
		}
		
	}
	
	/**
	 *  Returns the next frame in the queue
	 *
	 *  @return MicroProtocolFrame object or null if no frames are available
	 */
	this.nextFrame = function () {
		// Loop through the buckets and locate the next frame
		for (x = 0; x <= this.highestPriority; x++) {
			var priority = this.currentBucket - x;
			if (priority < 0) priority = this.highestPriority + 1 + priority;
			var frame = getBucket(this, priority).nextFrame();
			if (frame) {
				this.framesFromBucket++;
				if (this.framesFromBucket > priority) {
					this.framesFromBucket = 0;
					priority--;
					if (priority < 0) priority = this.highestPriority + 1 + priority;
				}
				this.currentBucket = priority;
				return frame;
			} else {
				this.framesFromBucket = 0;
			}
		}
		
		// No more frames
		this.currentBucket = this.highestPriority;
		this.framesFromBucket = 0;
		return;
	}
	
}
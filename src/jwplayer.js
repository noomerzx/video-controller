/*
	JWPlayer video
*/
var JWPlayerVideo = function(video) {
	Video.call(this, video);
};

JWPlayerVideo.prototype = new Video();
JWPlayerVideo.prototype.constructor = JWPlayerVideo;
$.VideoController.addPlayer('JWPlayerVideo', JWPlayerVideo);

JWPlayerVideo.isType = function(video) {
	if (typeof video.attr('data-jwplayer-id') !== 'undefined' && typeof jwplayer !== 'undefined')
		return true;

	return false;
};

JWPlayerVideo.prototype._init = function() {
	var that = this,
		videoID = this.$video.attr('data-jwplayer-id');

	// get reference to the player
	this.player = jwplayer(videoID);

	this.player.onReady(function() {
		that.ready = true;
		that.trigger({type: 'ready'});
	
		that.player.onPlay(function() {
			if (that.started === false) {
				that.started = true;
				that.trigger({type: 'start'});
			}

			that.state = 'playing';
			that.trigger({type: 'play'});
		});

		that.player.onPause(function() {
			that.state = 'paused';
			that.trigger({type: 'pause'});
		});
		
		that.player.onComplete(function() {
			that.state = 'ended';
			that.trigger({type: 'ended'});
		});
	});
};

JWPlayerVideo.prototype.play = function() {
	this.player.play(true);
};

JWPlayerVideo.prototype.pause = function() {
	this.player.pause(true);
};

JWPlayerVideo.prototype.stop = function() {
	this.player.stop();
	this.state = 'stopped';
};

JWPlayerVideo.prototype.replay = function() {
	this.player.seek(0);
	this.player.play(true);
};
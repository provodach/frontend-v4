var
	crawley_config = {
		container: "crawley-container",
		amount: 10,
		url: "//api.nay.su/crawley",
		channel: "-1001079623045"
	},

	crawley_state = {
		currentPosition: 0,
		maxPosition: 0
	};

function crawley_textProcess(text) {
	var map = {
			'&': '&amp;',
			'<': '&lt;',
			'>': '&gt;',
			'"': '&quot;',
			"'": '&#039;'
		};
		
	text = text.replace(/[&<>"']/g, function(m) { return map[m]; });
	text = text.replace(new RegExp('(https?:\\/\\/([a-zA-Z0-9\\-\\.]+)\\/?[a-zA-Z0-9?&=.:;\\#\\/\\-_~%+]*)', 'gi'), '[<a href="$1" title="$1" target="_blank">$2</a>]');
	return text.replace(/\n/g, '<br>');
}

function crawley_getPosts(position, postId) {
	position = position || 0;

	var requestParams = {};

	if (postId) {
		var postIdParts = postId.split('_');

		if (postIdParts.length !== 2) {
			console.warn('Bad post ID, will not load:', postId);
			return;
		}

		if (postIdParts[0] !== crawley_config.channel) {
			console.warn('Bad post channel (mismatches with config), will not load:', postIdParts[0]);
			return;
		} else {
			requestParams = {
				channel: crawley_config.channel,
				post: +postIdParts[1] // + is added to prevent manipulations with this parameter
			}
		}
	} else {
		requestParams = {
			amount: crawley_config.amount,
			offset: position * crawley_config.amount,
			channel: crawley_config.channel
		};
	}

	$.ajax(crawley_config.url + "/post", {
		data: requestParams,
		cache: false,
		crossDomain: true,
		dataType: "json",
		success: crawley_processPosts
	});
}

function crawley_processPosts(res) {
	switch (res.status) {
		case 0:
			crawley_renderPosts(res.payload);
			break;
	}
}

function crawley_renderPosts(content) {
	var
		postsHtml = '<div id="crawley-feed">',
		posts = content.posts,
		isSingle = (posts.length === 1);

	for (var i = 0; i < posts.length; i++) {

		postsHtml +=
			'<div id="crawley-post-'+posts[i].id+'" class="crawley-post">' +
			'<div class="crawley-post-content">';

		if (posts[i].attachment) {
			switch (posts[i].attachment.type) {
				case 'photo' :
					postsHtml +=
						'<a href="'+posts[i].attachment.url+'" target="_blank">' +
						'<img src="'+posts[i].attachment.url+'" class="crawley-post-image' + (isSingle ? ' single' : '') + '" id="crawley-post-image-' + posts[i].attachment.id + '">' + 
						'</a>';
					break;

				case 'voice':
				case 'audio':
					postsHtml += 
						'<audio src="'+posts[i].attachment.url+'" id="crawley-post-' + posts[i].attachment.type + '-' + posts[i].attachment.id + '" class="crawley-post-audio' + (isSingle ? ' single' : '') + '" controls></audio>';
					break;

				default: 
					console.warn ("Unsupported attachment type " + posts[i].attachment.type);
					break;
			}
		}

		if (posts[i].text) {
			postsHtml +=
				'<div class="crawley-post-text">'+crawley_textProcess(posts[i].text)+'</div>';
		}

		var postDate = new Date(posts[i].timestamp*1000);

		postsHtml += 
			'<div class="crawley-post-metadata" id="crawley-post-metadata-' + posts[i].id + '>' +
			'<span class="crawley-post-metadata-time">' +
				postDate.getDate() + '.' + ('0' + (postDate.getMonth() + 1)).slice(-2) + '.' + postDate.getFullYear() +
			'</span>' + 
			'</div>';

		postsHtml += "</div></div>"
	}

	// TODO: pagination
	$("#" + crawley_config.container).html(postsHtml);
}

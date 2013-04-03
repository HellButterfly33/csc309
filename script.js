$.getJSON('favs.json', function (data) {
	var shtml;
        
        $.each(data, function() {
			
			shtml = create_portrait_view(this);
			$('#portrait').append(shtml);
			
			
			
			shtml = create_landscape_view(this);
			$('#landscape_info').append(shtml);
			$('.tweet_info').hide();
			
		})
		create_tap_events();
		create_swipe_delete_event();
		create_swipe_events();
    });
    
    /* Create a swipe delete event. If the user swipes a tweet, they have the
    * option to delete the tweet.
    */
    function create_swipe_delete_event() {
		$('.list_item').bind('swipe', function() {
			// Ask a confirmation before deleting.
			var response = window.confirm("Do you want to remove this from the list?");
			if (response) {
				// if yes, delete
				var id = this.id;
				$('.user_block#' + this.id).remove();
				$('#tweet_info_' + this.id).remove();
				$('.list_item#' + this.id).remove();
			}
		});
		$('.user_block').bind('swipe', function() {
			// Ask a confirmation before deleting.
			var response = window.confirm("Do you want to remove this from the list?");
			if (response) {
				var id = this.id;
				// if yes, delete
				$('.user_block#' + this.id).remove();
				$('#tweet_info_' + this.id).remove();
				$('.list_item#' + this.id).remove();
			}
		});
	}
	
	/* Create the swipe event for hiding tweet info box
	*/
    function create_swipe_events() {		
		// if they swipe the user info page to the left, it will close it
		$('.tweet_info').bind("swipeleft", function() {
			$(".tweet_info").hide();
		});
	}
    
    /* Create tab event. If user taps on a tweet, open the tweet info box.
    */
    function create_tap_events() {
		$('.list_item').bind('tap', function() {
			// show the tweet info box.
			$(".tweet_info").hide();
			$('#tweet_info_' + this.id).show();
		});
	}
    
    /* Create the landscape view
    */
    function create_landscape_view(data) {
		var shtml, media, user;
		add_to_list(data);
		
		media = data.entities.media;
		user = data.user;
		
		// Show the screen name, and the tweet
		shtml = '<div class="tweet_info" id="tweet_info_' + data.id + '">';
		shtml += '<h class="name"><b>' + data.user.screen_name + '</b></h>';
		// if there are links in the tweet, add the link and make it open
		// in a new window
		shtml += '<p class="tweet">' + add_link(data.text) + '</p>';
			
		if (media != null) {
			// add the images if they are available
			shtml += '<img class="image" src=' + media[0].media_url + ' alt=media_image><br>';
		}
		
		// Show the user's real name, location, and description.
		shtml += '</br><h>About the User</h>';
		shtml += '<p><b>Name:</b> ' + user.name + '</p>';
		shtml += '<p><b>Location:</b> ' + user.location + '</p>';
		shtml += '<p><b>Description:</b> ' + user.description + '</p>';
		
		shtml += '<p><b>Link:</b> <a href="' + user.url + '" target="_blank">Link</a></p>';
		
		shtml += '</div>';

		return shtml;
	}
	
	/* Add a new tweet to the list. This is not the full tweet. It is only
	* a condensed version of the full tweet up to a maximum character.
	*/
	function add_to_list(data) {
		var shtml, user;
		
		user = data.user;
		
		// Show the profile picture, screen name, and tweet(up to a maximum number of characters)
		shtml = '<li class="list_item" id="' + data.id + '">';
		shtml += '<img class=profile_pic_landscape src="' + user.profile_image_url + '" alt="picture of ' + user.screen_name + '"></img>';
		shtml += '<div class="name_landscape">' + user.screen_name + '</div>';
		shtml += '<div class="text">' + add_link(data.text) + '</div></li>';
		
		$('#tweet-list').append(shtml);
	}
    
    /* Create the portrait view
    */
    function create_portrait_view(data) {
		var shtml, user;
		
		user = data.user;
		shtml = '';
		
		// Create div block
		shtml += '<div class="user_block" id="' + data.id + '">'
		
		// Create profile picture
		shtml += '<img class=profile_pic_portrait src="' + user.profile_image_url + '" alt="picture of ' + user.screen_name + '"></img>';
		
		// Create user info link
		shtml += '<div class="user_info"><a id="user_link" href="#user_info_' + user.id + '">' + user.screen_name + '</a></div><br>';
		
		// Create compressed tweet
		shtml += "<a href='#popup_" + data.id + "' data-rel='popup'><div class='text'>" + data.text +"</div></a><br>";
		
		shtml += '</div>'
		// Create tweet info popup
		shtml += create_tweet_popup(data);
		
		// Create user info page
		create_user_info_page(user);
		
		
		
		return shtml;
	}
	
	/* Create the user info block.
	*/
	function create_user_info_page(user) {
		var shtml = '';
		
		// Start the user page;
		shtml += '<div data-role="page" id="user_info_' + user.id + '">';
		
		// show the picture, and screen name
		shtml += '<div class="user_page"><img class=profile_pic src="' + user.profile_image_url + '" alt="picture of ' + user.screen_name + '"></img>';
		shtml += '<div class="screen_name"><b>Screen Name:</b> ' + user.screen_name + '</div>';
		
		// show the user's real name, location, description, and a link to the user's url
		shtml += '<div class="name"><b>Name:</b> ' + user.name + '</div>';
		shtml += '<div class="location"><b>Location:</b> ' + user.location + '</div>';
		shtml += '<div class-"description"><b>Description:</b> ' + user.description + '</div>';
		// open the user's url in a new window
		shtml += '<a class="link" target="_blank" href=' + user.url + '><b>Link</b></a>';
		shtml += '<a href="#Main_Container" data-role="button">Go to Main Page</a></div></div>';
		
		// append to the page
		$(document.body).append(shtml);
	}
	
	/* Create a tweet info block for each tweet.
	*/
	function create_tweet_popup(data) {
		var shtml, media;
		
		// initialize the html and the media object
		shtml = '';
		media = data.entities.media;
		
		shtml += "<div data-role='popup' id='popup_" + data.id + "'>";
		shtml += add_link(data.text) + '<br>';
		
		// check if there are any media (photos) available
		if (media != null) {
			// add the images if they are available
			shtml += '<img class=media_image src=' + media[0].media_url + ' alt=media_image><br>';
		}
		shtml += '<div class=source>source: ' + data.source.replace("<a", '<a target="_blank"') + '</div></div>';
		return shtml;
	}
	
	/*
	* Take in a string of data. Replace any http: it finds with the
	* anchor tags to the link.
	*/
	function add_link(data) {
		// find the start of the link, starts with http:
		var found = data.indexOf("http:", 0);
		var theLink = "";
		
		while (found != -1) {
			
			// we need to find the end of the link, it will end with
			// a space(" "), or a new line character("\n")
			var spaceNext = data.indexOf(" ", found);
			var endNext = data.indexOf("\n", found);
			var end = 0;
			// if the new line character was found, and it appears
			// before the next space character, we will use the
			// location of the new line character to mark the end of the
			// link
			if ((spaceNext > endNext) && (endNext != -1)) {
				end = endNext;
			}
			// else, we know that the space appears before the new line
			// character, and we'll use that
			else {
				end = spaceNext;
				}
			// if the link was at the end of the tweet, ie no space or
			// no new line characters follow after, we have to continue
			// to the end
			if (end == -1) {
				end = data.length;
				}
				// the link
				theLink = data.substring(found, end);
				data = data.replace(theLink, "<a href=" + theLink + ' target="_blank">' + theLink + '</a>');
				// We must add 28 characters, because we did data.replace
				// and we replaced the link with an anchor tag
				// We have to skip over the anchor tag, so we add in
				// characters to skip. We replaced theLink with 28
				// characters, and 2 copies of theLink, which means we added
				// that many characters.
				found = data.indexOf("http:", end + 28 + theLink.length);
			}
		return data;
	}


$.getJSON('favs.json', function (data) {
	var shtml;
        
        $.each(data, function() {
			
			shtml = create_portrait_view(this);
			$('#portrait').append(shtml);
			
			
			
			shtml = create_landscape_view(this);
			$('#landscape_info').append(shtml);
			$('.tweet_info').hide();
			
			
			
		})
		create_click_events();
    });
    
    function create_click_events() {
		$('.list_item').click(function() {
			
			$(".tweet_info").hide();
			$('#tweet_info_' + this.id).show();
		});
	}
    
    function create_landscape_view(data) {
		var shtml, media, user;
		add_to_list(data);
		
		media = data.entities.media;
		user = data.user;
		
		shtml = '<div class="tweet_info" id="tweet_info_' + data.id + '">';
		shtml += '<h class="name">' + data.user.screen_name + '</h>';
		shtml += '<p class="tweet">' + data.text + '</p>';
			
		if (media != null) {
			// add the images if they are available
			shtml += '<img class="image" src=' + media[0].media_url + ' alt=media_image><br>';
		}
		
		shtml += '<h>About the User</h>';
		shtml += '<p>Name: ' + user.name + '</p>';
		shtml += '<p>Location: ' + user.location + '</p>';
		shtml += '<p>Description: ' + user.description + '</p>';
		
		shtml += '<p>Link: <a href="' + user.url + '" target="_blank">Link</a></p>';
		
		shtml += '</div>';

		return shtml;
	}
	
	function add_to_list(data) {
		var shtml, user;
		
		user = data.user;
		
		shtml = '<li class="list_item" id="' + data.id + '">';
		shtml += '<img class=profile_pic_landscape src="' + user.profile_image_url + '" alt="picture of ' + user.screen_name + '"></img>';
		shtml += '<div class="name_landscape">' + user.screen_name + '</div>';
		shtml += '<div class="text">' + data.text + '</div></li>';
		
		$('#tweet-list').append(shtml);
	}
    
    function create_portrait_view(data) {
		var shtml, user;
		
		user = data.user;
		shtml = '';
		
		// Create profile picture
		shtml += '<img class=profile_pic_portrait src="' + user.profile_image_url + '" alt="picture of ' + user.screen_name + '"></img>';
		
		// Create user info link
		shtml += '<a href="#user_info_' + user.id + '">' + user.screen_name + '</a><br>';
		
		// Create compressed tweet
		shtml += "<a href='#popup_" + data.id + "' data-rel='popup'><div class='text'>" + data.text +"</div></a><br>";
		
		// Create tweet info popup
		shtml += create_tweet_popup(data);
		
		// Create user info page
		create_user_info_page(user);
		
		
		
		return shtml;
	}
	
	function create_user_info_page(user) {
		var shtml = '';
		
		// Start the user page;
		shtml += '<div data-role="page" id="user_info_' + user.id + '">';
		
		shtml += '<img class=profile_pic src="' + user.profile_image_url + '" alt="picture of ' + user.screen_name + '"></img>';
		shtml += '<div class="screen_name">' + user.screen_name + '</div>';
		
		shtml += '<div class="name">name: ' + user.name + '</div>';
		shtml += '<div class="location">location: ' + user.location + '</div>';
		shtml += '<div class-"description">description: ' + user.description + '</div>';
		shtml += '<a class="link" target="_blank" href=' + user.url + '>link</a>';
		shtml += '<a href="#Main_Container" data-role="button">Go to Main Page</a></div>';
		
		$(document.body).append(shtml);
	}
	
	function create_tweet_popup(data) {
		var shtml, media;
		
		// initialize the html and the media object
		shtml = '';
		media = data.entities.media;
		
		shtml += "<div data-role='popup' id='popup_" + data.id + "'>";
		shtml += data.text + '<br>';
		
		// check if there are any media (photos) available
		if (media != null) {
			// add the images if they are available
			shtml += '<img class=media_image src=' + media[0].media_url + ' alt=media_image><br>';
		}
		shtml += '<div class=source>source: ' + data.source + '</div></div>';
		return shtml;
	}

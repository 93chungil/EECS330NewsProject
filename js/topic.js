let curr_topic = localStorage.getItem("topic");
let ids = {
	"trump": '967983229633548289',
	"blockchain": '967978827929571334',
	"epl": '967986768220950528',
	"interestrates": '967987167866834944',
	"crispr": '967987410884849664',
	"kendricklamar": '967987617710125057'
};

let t_feed = `<a class="twitter-timeline" data-dnt="true" href="https: //twitter.com/hashtag/${curr_topic}" data-widget-id=${ids[curr_topic]}>#${curr_topic} Tweets</a>`
//console.log(t_feed);

let twitter_sect = document.querySelector('.t_feed');
twitter_sect.insertAdjacentHTML('afterbegin', t_feed);

function get_articles() {
	let left = document.querySelector('.left-article');
	let right = document.querySelector('.right-article');

	var http = new XMLHttpRequest();
	http.addEventListener("load", res_listen);
	http.open('GET', `https://newsapi.org/v2/everything?q=${curr_topic}&pageSize=8&apiKey=cabb0d2395804edfbd4df9fe70fc10d8`, true);
	http.send(null);

	function res_listen() {
		const data = JSON.parse(this.responseText);
		//console.log(data.articles);
		display_articles(data);
	}

	function display_articles(data) {
		//left side
		for (let i = 0; i < 5; i++) {
			article = data.articles[i];
			let snippet = `<div class="article">
								<p class="article_title">${article.title}</p>
								<p class="article_headline">${article.description}</p>
								<a href="${article.url}" title="">See the full article</a>
							</div>
							<hr>`;
			left.insertAdjacentHTML('afterbegin', snippet);
		}
		//right side
		for (let i = 4; i < 9; i++) {
			article = data.articles[i];
			let snippet = `<div class="article">
								<p class="article_title">${article.title}</p>
								<p class="article_headline">${article.description}</p>
								<a href="${article.url}" title="">See the full article</a>
							</div>
							<hr>`;
			right.insertAdjacentHTML('afterbegin', snippet);
		}
	}
}
get_articles();

// Dynamic Comment Integration
var savedcomments = localStorage.getItem(curr_topic + "comments");
let comments_array;
let added_node;
let most_liked_node;

if (savedcomments == null) {
	comments_array = [{ userID: "chungLee", comment: "I think this website is awesome!", datetime: "Sat Mar 03 2018 21:07:02", likes: 1, dislikes: 0 }];
} else {
	comments_array = JSON.parse(savedcomments);
}
var savedJSON = localStorage.getItem("user_info" + window.name);
let userdata = JSON.parse(savedJSON);

let comments_like;
if (userdata != null) {
	var savedlikes = localStorage.getItem(userdata["username"] + curr_topic + "likes");
	if (savedlikes == null) {
		comments_like = {};
	} else {
		comments_like = JSON.parse(savedlikes);
	}
} else {
	comments_like = null;
}

function increase_like(ele) {
	if (userdata != null) {
		var comment = ele.id;
		comment = comment.split(";|,,")[0];
		for (var i = 0; i < comments_array.length; i++) {
			if (comments_array[i]["comment"] == comment) {
				if (comments_like[comment] == "none") {
					comments_array[i]["likes"]++;
					var numberSpan = document.getElementById(comment + ";|,,like");
					numberSpan.innerHTML = parseInt(comments_array[i]["likes"]);
					comments_like[comment] = "like";
				} else if (comments_like[comment] == "dislike") {
					comments_array[i]["dislikes"]--;
					comments_array[i]["likes"]++;
					var numberSpan = document.getElementById(comment + ";|,,like");
					numberSpan.innerHTML = parseInt(comments_array[i]["likes"]);
					var secondSpan = document.getElementById(comment + ";|,,dislike");
					secondSpan.innerHTML = parseInt(comments_array[i]["dislikes"]);
					comments_like[comment] = "like";
				} else {
					comments_array[i]["likes"]--;
					var numberSpan = document.getElementById(comment + ";|,,like");
					numberSpan.innerHTML = parseInt(comments_array[i]["likes"]);
					comments_like[comment] = "none";
				}

				savedlikes = JSON.stringify(comments_like);
				localStorage.setItem(userdata["username"] + curr_topic + "likes", savedlikes);

				break;
			}
		}

		sort_comments();
	}

}

function increase_dislike(ele) {
	if (userdata != null) {
		var comment = ele.id;
		comment = comment.split(";|,,")[0];
		for (var i = 0; i < comments_array.length; i++) {
			if (comments_array[i]["comment"] == comment) {
				if (comments_like[comment] == "none") {
					comments_array[i]["dislikes"]++;
					var numberSpan = document.getElementById(comment + ";|,,dislike");
					numberSpan.innerHTML = parseInt(comments_array[i]["dislikes"]);
					comments_like[comment] = "dislike";
				} else if (comments_like[comment] == "like") {
					comments_array[i]["likes"]--;
					comments_array[i]["dislikes"]++;
					var numberSpan = document.getElementById(comment + ";|,,like");
					numberSpan.innerHTML = parseInt(comments_array[i]["likes"]);
					var secondSpan = document.getElementById(comment + ";|,,dislike");
					secondSpan.innerHTML = parseInt(comments_array[i]["dislikes"]);
					comments_like[comment] = "dislike";
				} else {
					comments_array[i]["dislikes"]--;
					var numberSpan = document.getElementById(comment + ";|,,dislike");
					numberSpan.innerHTML = parseInt(comments_array[i]["dislikes"]);
					comments_like[comment] = "none";
				}

				savedlikes = JSON.stringify(comments_like);
				localStorage.setItem(userdata["username"] + curr_topic + "likes", savedlikes);

				break;
			}
		}

		sort_comments();
	}
}

function arraymove(arr, fromIndex, toIndex) {
	var element = arr[fromIndex];
	arr.splice(fromIndex, 1);
	arr.splice(toIndex, 0, element);
}

function sort_comments() {
	var topscore = -999999;
	var topindex;
	for (var i = 0; i < comments_array.length; i++) {
		var score = comments_array[i]["likes"] - comments_array[i]["dislikes"];
		if (score > topscore) {
			topindex = i;
			topscore = score;
		}
	}
	var ul = document.getElementById('commentListID');
	if (ul) {
		while (ul.firstChild) {
			ul.removeChild(ul.firstChild);
		}
	}
	arraymove(comments_array, topindex, 0);
	initialize_comments();
	savedcomments = JSON.stringify(comments_array);
	localStorage.setItem(curr_topic + "comments", savedcomments);
}

function dynamic_add(commentlist, i, added) {
	var node = document.createElement("LI");
	var textnode = document.createTextNode(comments_array[i]["userID"]);

	var userdiv = document.createElement('div');
	userdiv.className = 'usernameText';
	userdiv.appendChild(textnode);

	var div = document.createElement('div');
	div.className = 'commentText';
	var p = document.createElement('p');
	var commentnode = document.createTextNode(comments_array[i]["comment"])
	p.appendChild(commentnode);
	div.appendChild(p);
	var span = document.createElement('span');
	span.className = "date sub-text";
	var datenode = document.createTextNode(comments_array[i]["datetime"]);
	span.appendChild(datenode);
	div.appendChild(span);

	var likediv = document.createElement('div');
	likediv.className = 'reactWrapper';

	var thumbsup = document.createElement('input');
	thumbsup.style.width = "20px";
	thumbsup.style.height = "20px"
	thumbsup.type = "image";
	thumbsup.src = "images/thumbsup.jpg";
	thumbsup.id = commentnode.nodeValue + ";|,,likebutton";
	thumbsup.setAttribute("onclick", "increase_like(this)");

	var thumbsup_number = document.createElement('div');
	var likes = document.createTextNode(parseInt(comments_array[i]["likes"]));
	thumbsup_number.appendChild(likes);
	thumbsup_number.style.fontSize = "8px";
	thumbsup_number.style.paddingBottom = "8px";
	thumbsup_number.style.width = "20px";
	thumbsup_number.style.textAlign = "center";
	thumbsup_number.id = commentnode.nodeValue + ";|,,like";

	likediv.appendChild(thumbsup);
	likediv.appendChild(thumbsup_number);

	var dislikediv = document.createElement('div');
	dislikediv.className = 'reactWrapper';

	var thumbsdown = document.createElement('input');
	thumbsdown.style.width = "20px";
	thumbsdown.style.height = "20px";
	thumbsdown.type = "image";
	thumbsdown.src = "images/thumbsdown.jpg";
	thumbsdown.id = commentnode.nodeValue + ";|,,dislikebutton";
	thumbsdown.setAttribute("onclick", "increase_dislike(this)");

	var thumbsdown_number = document.createElement('div');
	var dislikes = document.createTextNode(parseInt(comments_array[i]["dislikes"]));
	thumbsdown_number.appendChild(dislikes);
	thumbsdown_number.style.fontSize = "8px";
	thumbsdown_number.style.paddingBottom = "8px";
	thumbsdown_number.style.width = "20px";
	thumbsdown_number.style.textAlign = "center";
	thumbsdown_number.id = commentnode.nodeValue + ";|,,dislike";

	dislikediv.appendChild(thumbsdown);
	dislikediv.appendChild(thumbsdown_number);

	node.appendChild(dislikediv);
	node.appendChild(likediv);
	node.appendChild(userdiv);

	node.appendChild(div);

	node.id = commentnode.nodeValue + ";|,,node";

	if (i ==0) {
		node.style.border = "2px solid purple";
	}

	commentlist.append(node);
}

function initialize_comments() {
	var commentlist = document.getElementById("commentListID");
	for (var i = 0; i < comments_array.length; i++) {
		dynamic_add(commentlist, i, false);
		if (comments_like != null && !(comments_array[i]["comment"] in comments_like)) {
			var comment = comments_array[i]["comment"]
			comments_like[comment] = "none";
		}
	}
}

function add_comment() {
	var status = localStorage.getItem("is_logged_in");

	if (status == "true") {
		var commentlist = document.getElementById("commentListID");

		if (userdata != null) {
			var commentInput = document.getElementById("commentInput").value;
			var username = userdata["username"];
			var commentdate = new Date().toString();

			var timeformat = commentdate.split(" ");

			commentdate = timeformat[0] + " " + timeformat[1] + " " + timeformat[2] + " " + timeformat[3] + " " + timeformat[4];

			var newcomment_dict = { userID: username, comment: commentInput, datetime: commentdate, likes: 0, dislikes: 0 };

			comments_like[commentInput] = "none";
			comments_array.splice(0, 0, newcomment_dict);
			append_comment(comments_array.length - 1);
			document.getElementById("commentInput").value = null;
			return false;
		} else {
			var error = document.getElementById("comment-error");
			error.innerHTML = "Please sign in before adding comments";
			error.style.opacity = '1';
			error.style.color = '#6EC867';
			return false;
		}
	} else {
		var error = document.getElementById("comment-error");
		error.innerHTML = "Please sign in before adding comments";
		error.style.opacity = '1';
		error.style.color = '#6EC867';
		return false;
	}
}

function append_comment(index) {
	var commentlist = document.getElementById("commentListID");
	dynamic_add(commentlist, index, true);
	sort_comments();
}

initialize_comments();
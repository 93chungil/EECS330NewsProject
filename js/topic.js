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
		console.log(data.articles);
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
var savedcomments = localStorage.getItem(curr_topic+"comments");
let comments_array;
if (savedcomments == null) {
	comments_array = [{userID: "chungLee", comment: "I think this website is awesome!", datetime: "Sat Mar 03 2018 21:07:02", likes: 100, dislikes: 1}];
}
else {
	comments_array = JSON.parse(savedcomments);
}

function initialize_comments() {
	var commentlist = document.getElementById("commentListID");
	for (i = 0; i < comments_array.length; i++) {
		var node = document.createElement("LI");
		var textnode = document.createTextNode(comments_array[i]["userID"]);
		node.appendChild(textnode);

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

		node.appendChild(div);

		commentlist.append(node);
	}
}

function add_comment() {
	var status = localStorage.getItem("is_logged_in");

	if (status == "true"){
		var commentlist = document.getElementById("commentListID");
		var savedJSON = localStorage.getItem("user_info" + window.name);
		var userdata = JSON.parse(savedJSON);

		var commentInput = document.getElementById("commentInput").value;
		var username = userdata["username"];
		var commentdate = new Date().toString();

		var timeformat = commentdate.split(" ");

		commentdate = timeformat[0] + " " + timeformat[1] + " " + timeformat[2] + " " + timeformat[3] + " " + timeformat[4];

		var newcomment_dict = {userID: username, comment: commentInput, datetime: commentdate, likes: 0, dislikes: 0};
		comments_array.push(newcomment_dict);
		append_comment(comments_array.length-1);
		savedcomments = JSON.stringify(comments_array);
		localStorage.setItem(curr_topic+"comments", savedcomments);
		return true;
	}
	else {
		var error = document.getElementById("comment-error");
		error.innerHTML = "Please sign in before adding comments";
		error.style.opacity = '1';
    	error.style.color = '#6EC867';
    	return false;
	}
}

function append_comment(index) {
	var i = index;
	var commentlist = document.getElementById("commentListID");
	var node = document.createElement("LI");
	var textnode = document.createTextNode(comments_array[i]["userID"]);
	node.appendChild(textnode);

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

	node.appendChild(div);

	commentlist.append(node);
}

initialize_comments();
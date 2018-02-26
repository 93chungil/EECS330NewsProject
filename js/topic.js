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
let curr_topic = localStorage.getItem("topic");
let ids = {
  "trump": '967983229633548289',
  "blockchain": '967978827929571334',
  "epl": '967986768220950528',
  "interestrates": '967987167866834944',
  "crispr": '967987410884849664',

}

let t_feed = `<a class="twitter-timeline" data-dnt="true" href="https: //twitter.com/hashtag/${curr_topic}" data-widget-id=${ids[curr_topic]}>#${curr_topic} Tweets</a>`
//console.log(t_feed);

let twitter_sect = document.querySelector('.t_feed');
twitter_sect.insertAdjacentHTML('afterbegin', t_feed);
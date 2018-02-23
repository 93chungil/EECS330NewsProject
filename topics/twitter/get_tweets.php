<?php
session_start();
require_once("twitteroauth/twitteroauth/twitteroauth.php"); //Path to twitteroauth library
 
$search = "Trump";
$notweets = 30;
$consumerkey = "7hjmXylyOWZcG1nTpj9g4xF5N";
$consumersecret = "MZJ51kvmUIA4Kkv8pvti8bTGeewomywyhvsBLI9WjjgrugRKJ3
";
$accesstoken = "916802786108542976-Er3SPE87eqVU5bwPuy9pAdKI8upPNMJ";
$accesstokensecret = "i6ftXDHqAwOtNsJr6lhFRRJCHiCrvIecEKv3A7yJdedV1
";
 
function getConnectionWithAccessToken($cons_key, $cons_secret, $oauth_token, $oauth_token_secret) {
  $connection = new TwitterOAuth($cons_key, $cons_secret, $oauth_token, $oauth_token_secret);
  return $connection;
}
 
$connection = getConnectionWithAccessToken($consumerkey, $consumersecret, $accesstoken, $accesstokensecret);
 
$search = str_replace("#", "%23", $search);
$tweets = $connection->get("https://api.twitter.com/1.1/search/tweets.json?q=".$search."&count=".$notweets);
 
echo json_encode($tweets);
?>
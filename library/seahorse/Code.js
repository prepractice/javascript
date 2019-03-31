/************************************
use case

var data = [{"key1","value1"},{"key2","value2"}...];
function get_match_data(){
  var obj = data;
  var text = "s";
  var pattern = "[〇〆々㐂-頻]+|[ぁ-ゟー]+|[゠-ヿ]+|[ｦ-ﾟ]+|[a-zA-Z0-9-]+|[ａ-ｚＡ-Ｚ０-９]+";
  var flag = "g";
  var regexp = new RegExp(pattern, flag);
  var match_obj = LIB.seahorse(obj, regexp, sentence);
  Logger.log(match_obj["match_data"]);
}
************************************/
var OBJ_HEADER;
var AND_REGEXP;

function seahorse(obj, regexp, sentence){
  OBJ_HEADER = Object.keys(obj[0])
  var match_words = get_match_words(regexp, sentence);
  get_and_regexp(match_words);
  var match_data = obj.filter(get_match_data);
  var match_obj = get_match_obj(match_words, match_data);
  return match_obj;
}

function get_match_obj(match_words, match_data){
  var obj = {}
  obj["match_words"] = match_words;
  obj["AND_REGEXP"] = AND_REGEXP;
  obj["match_data"] = match_data;
  return obj;
}

function get_match_words(regexp, sentence){
  var match_words = sentence.match(regexp);
  return match_words;
}

function get_and_regexp(match_words) {
  var and_pattern = "";
  for (var i = 0; i < match_words.length; i++) {
    and_pattern += "(?=.*" + match_words[i] + ")";
  }
  AND_REGEXP = new RegExp("^" + and_pattern);
}

function get_match_data(obj_i) {
  var row_values = "";
  for (var i = 0; i < OBJ_HEADER.length; i++) {
    row_values += obj_i[OBJ_HEADER[i]];
  }
  row_values = row_values.replace(/\n/g, "");
  var match_data = AND_REGEXP.test(row_values);
  return match_data;
}

function arrayUniqueCount(values) {
  var num = 0;
  var word = [];
  var count = [];
  var obj = {};
  values = values.sort();
  for (var i = 0; i < values.length; i++) {
    if(i == 0){
      word.push(values[i]);
      count.push(1);
      num = i;
    }else if(values[i] == values[(i-1)]) {
      count[num] = count[num] + 1;
    }else {
      word.push(values[i]);
      count.push(1);
      num = num + 1;
    }
    obj[values[i]] = count[num];
  }
  return obj;
}
angular.module('LaundryWaves')
  .filter('range', function () {
    //to use > | range:1:30
    return function (input, min, max) {
      min = parseInt(min);
      max = parseInt(max);
      for (var i = min; i <= max; i++)
        input.push(i);
      return input;
    };
  })
  
  .filter('abbrFilter', function () {
    return function (input) {
      var split_names = input.trim().split(" ");
      if (split_names.length > 1) {
        return (split_names[0].charAt(0) + " " + split_names[1].charAt(0));
      }
      return split_names;
    };
  });

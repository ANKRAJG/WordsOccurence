
var app = angular.module('words', []);
app.controller("mainCtrl", ['$scope', 'wordService', function($scope, wordService) {

    var words, count;
    wordService.getTopTenWords().then(function(res) {
        var wordOccurences = res.data;
        words = Object.keys(wordOccurences);
        count = _.values(wordOccurences);
        return wordService.getSynonymAndPos(words);
    })
    .then(function(res){
        var all_array = [];
        var words_json = []
        var arr_inner, word_obj, output, meaning, pos;
        res.forEach((item, index) => {
          arr_inner = [];
          output = [];
          word_obj = {};
          meaning = [];
          pos = [];
          arr_inner.push(words[index]);
          arr_inner.push(count[index]);
          word_obj.word = words[index];
          output.push(count[index]);
          item.data.def.forEach((x, i) => {
            pos.push(x.pos);
            x.tr.forEach((y, j) => {
              y.mean && y.mean.forEach((z, k) => {
                meaning.push(z.text);
              });
            });
          });
          arr_inner.push(meaning);
          arr_inner.push(pos);
          output.push(meaning);
          output.push(pos);
          word_obj.output = output;
          all_array.push(arr_inner);
          words_json.push(word_obj);
          $scope.wordsLoaded = true;
        });
        // First Output
        console.log('all_array = ', all_array);
        // Output for JSON Data
        console.log('words_json = ', words_json);
        createPieChart(words, count);
        $scope.firstOutput = all_array;
    });


    function createPieChart(words, count) {
        var ctx = document.getElementById('myChart').getContext('2d');
        var chart = new Chart(ctx, {
            // The type of chart we want to create
            type: 'pie',
            // The data for our dataset
            data: {
                datasets: [{
                    label: 'Words',
                    data: count,
                    backgroundColor: ["#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00", "#001f3f", "#39CCCC", "#01FF70", "#85144b", "#F012BE", "#3D9970", "#111111", "#AAAAAA"]
                }],
                labels: words
            },
            // Configuration options go here
            options: {
              responsive: true,
              maintainAspectRatio: false,
            }
        });
    }

}]);

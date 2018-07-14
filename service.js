
(function () {
    app.factory('wordService', ['$http', '$q', function ($http, $q) {
        return {
            getTopTenWords: function() {
                return $http.get('http://localhost:7000');
            },
            getSynonymAndPos: function(words) {
                var promises = words.map((word) => {
                  return $http.get('https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=dict.1.1.20170610T055246Z.0f11bdc42e7b693a.eefbde961e10106a4efa7d852287caa49ecc68cf&lang=en-ru&text=' + word);
                });
                return $q.all(promises);
            }
        };
    }]);
}) ();

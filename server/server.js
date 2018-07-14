
var http = require('http');
var request = require('request');


http.createServer(function(req, response){
  request('http://norvig.com/big.txt', function (error, res, body) {
    response.writeHead(200, {'Content-type':'text/plan', 'Access-Control-Allow-Origin':'*'});
    var tokens = processText(body);
    var dict = computeWordOccurences(tokens);
    var result = getTopOccuringWords(dict,10);
    response.write(JSON.stringify(result));
    response.end();
  })

}).listen(7000);

function getTopOccuringWords(dict,count){
  var keys = Object.keys(dict);
  keys = keys.sort((a,b)=>{
    return (dict[b] - dict[a]);
  });
  var temp =   keys.slice(0,count);
  var result = temp.reduce((acc,str)=>{
    acc[str] = dict[str];
    return acc;
  },{});
  return result;
}

function computeWordOccurences(tokens){
  var dict = {};
  for(var i = 0;i<tokens.length;i++){
    if(tokens[i].length<3)
      console.log(tokens[i])
    if(dict[tokens[i]]){
      dict[tokens[i]]++;
    }
    else{
      dict[tokens[i]] = 1;
    }
  }
  return dict;
}

function processText(text){
  var tokens = text.replace(/\/n/g," ")
                  .replace(/\,/g," ")
                  .split(" ")
                  .map((w)=>w.trim())
                  .map((w)=>w.toLowerCase())
                  .filter((w)=>w.length>2)
                  .filter((w)=>[
                    'a',
                    'about',
                    'above',
                    'across',
                    'after',
                    'again',
                    'against',
                    'all',
                    'almost',
                    'alone',
                    'along',
                    'already',
                    'also',
                    'although',
                    'always',
                    'among',
                    'an',
                    'and',
                    'another',
                    'any',
                    'anybody',
                    'anyone',
                    'anything',
                    'anywhere',
                    'are',
                    'area',
                    'areas',
                    'around',
                    'as',
                    'ask',
                    'asked',
                    'asking',
                    'asks',
                    'at',
                    'away',
                    'b',
                    'back',
                    'backed',
                    'backing',
                    'backs',
                    'be',
                    'became',
                    'because',
                    'become',
                    'becomes',
                    'been',
                    'before',
                    'began',
                    'behind',
                    'being',
                    'beings',
                    'best',
                    'better',
                    'between',
                    'big',
                    'both',
                    'but',
                    'by',
                    'c',
                    'came',
                    'can',
                    'cannot',
                    'case',
                    'cases',
                    'certain',
                    'certainly',
                    'clear',
                    'clearly',
                    'come',
                    'could',
                    'd',
                    'did',
                    'differ',
                    'different',
                    'differently',
                    'do',
                    'does',
                    'done',
                    'down',
                    'down',
                    'downed',
                    'downing',
                    'downs',
                    'during',
                    'e',
                    'each',
                    'early',
                    'either',
                    'end',
                    'ended',
                    'ending',
                    'ends',
                    'enough',
                    'even',
                    'evenly',
                    'ever',
                    'every',
                    'everybody',
                    'everyone',
                    'everything',
                    'everywhere',
                    'f',
                    'face',
                    'faces',
                    'fact',
                    'facts',
                    'far',
                    'felt',
                    'few',
                    'find',
                    'finds',
                    'first',
                    'for',
                    'four',
                    'from',
                    'full',
                    'fully',
                    'further',
                    'furthered',
                    'furthering',
                    'furthers',
                    'g',
                    'gave',
                    'general',
                    'generally',
                    'get',
                    'gets',
                    'give',
                    'given',
                    'gives',
                    'go',
                    'going',
                    'good',
                    'goods',
                    'got',
                    'great',
                    'greater',
                    'greatest',
                    'group',
                    'grouped',
                    'grouping',
                    'groups',
                    'h',
                    'had',
                    'has',
                    'have',
                    'having',
                    'he',
                    'her',
                    'here',
                    'herself',
                    'high',
                    'high',
                    'high',
                    'higher',
                    'highest',
                    'him',
                    'himself',
                    'his',
                    'how',
                    'however',
                    'i',
                    'if',
                    'important',
                    'in',
                    'interest',
                    'interested',
                    'interesting',
                    'interests',
                    'into',
                    'is',
                    'it',
                    'its',
                    'itself',
                    'j',
                    'just',
                    'k',
                    'keep',
                    'keeps',
                    'kind',
                    'knew',
                    'know',
                    'known',
                    'knows',
                    'l',
                    'large',
                    'largely',
                    'last',
                    'later',
                    'latest',
                    'least',
                    'less',
                    'let',
                    'lets',
                    'like',
                    'likely',
                    'long',
                    'longer',
                    'longest',
                    'm',
                    'made',
                    'make',
                    'making',
                    'man',
                    'many',
                    'may',
                    'me',
                    'member',
                    'members',
                    'men',
                    'might',
                    'more',
                    'most',
                    'mostly',
                    'mr',
                    'mrs',
                    'much',
                    'must',
                    'my',
                    'myself',
                    'n',
                    'necessary',
                    'need',
                    'needed',
                    'needing',
                    'needs',
                    'never',
                    'new',
                    'new',
                    'newer',
                    'newest',
                    'next',
                    'no',
                    'nobody',
                    'non',
                    'noone',
                    'not',
                    'nothing',
                    'now',
                    'nowhere',
                    'number',
                    'numbers',
                    'o',
                    'of',
                    'off',
                    'often',
                    'old',
                    'older',
                    'oldest',
                    'on',
                    'once',
                    'one',
                    'only',
                    'open',
                    'opened',
                    'opening',
                    'opens',
                    'or',
                    'order',
                    'ordered',
                    'ordering',
                    'orders',
                    'other',
                    'others',
                    'our',
                    'out',
                    'over',
                    'p',
                    'part',
                    'parted',
                    'parting',
                    'parts',
                    'per',
                    'perhaps',
                    'place',
                    'places',
                    'point',
                    'pointed',
                    'pointing',
                    'points',
                    'possible',
                    'present',
                    'presented',
                    'presenting',
                    'presents',
                    'problem',
                    'problems',
                    'put',
                    'puts',
                    'q',
                    'quite',
                    'r',
                    'rather',
                    'really',
                    'right',
                    'right',
                    'room',
                    'rooms',
                    's',
                    'said',
                    'same',
                    'saw',
                    'say',
                    'says',
                    'second',
                    'seconds',
                    'see',
                    'seem',
                    'seemed',
                    'seeming',
                    'seems',
                    'sees',
                    'several',
                    'shall',
                    'she',
                    'should',
                    'show',
                    'showed',
                    'showing',
                    'shows',
                    'side',
                    'sides',
                    'since',
                    'small',
                    'smaller',
                    'smallest',
                    'so',
                    'some',
                    'somebody',
                    'someone',
                    'something',
                    'somewhere',
                    'state',
                    'states',
                    'still',
                    'still',
                    'such',
                    'sure',
                    't',
                    'take',
                    'taken',
                    'than',
                    'that',
                    'the',
                    'their',
                    'them',
                    'then',
                    'there',
                    'therefore',
                    'these',
                    'they',
                    'thing',
                    'things',
                    'think',
                    'thinks',
                    'this',
                    'those',
                    'though',
                    'thought',
                    'thoughts',
                    'three',
                    'through',
                    'thus',
                    'to',
                    'today',
                    'together',
                    'too',
                    'took',
                    'toward',
                    'turn',
                    'turned',
                    'turning',
                    'turns',
                    'two',
                    'u',
                    'under',
                    'until',
                    'up',
                    'upon',
                    'us',
                    'use',
                    'used',
                    'uses',
                    'v',
                    'very',
                    'w',
                    'want',
                    'wanted',
                    'wanting',
                    'wants',
                    'was',
                    'way',
                    'ways',
                    'we',
                    'well',
                    'wells',
                    'went',
                    'were',
                    'what',
                    'when',
                    'where',
                    'whether',
                    'which',
                    'while',
                    'who',
                    'whole',
                    'whose',
                    'why',
                    'will',
                    'with',
                    'within',
                    'without',
                    'work',
                    'worked',
                    'working',
                    'works',
                    'would',
                    'x',
                    'y',
                    'year',
                    'years',
                    'yet',
                    'you',
                    'young',
                    'younger',
                    'youngest',
                    'your',
                    'yours',
                    'z'
                  ].indexOf(w)<0);
    return tokens;
  //console.log(split);
}

//$.ajax({
//  method: "GET",
//  url: "https://www.govtrack.us/api/v2/person",
//  success: function(data) {    
//    var nameCounts = {}    
//    data.objects.forEach(function(object) {
//      var firstName = object.firstname
//      // if we haven't yet seen this name, then 
//      // names[object.firstname] will be null. || 0 means to
//      // default to 0 if names[object.firstname] is null.
//      var numberOfPeopleWithName = nameCounts[firstName] || 0   
//      numberOfPeopleWithName += 1
//      nameCounts[firstName] = numberOfPeopleWithName
//    })
//    
//    // Now nameCounts is an object like {David: 5, John: 2, Mary: 1, and so on}.
//    // makeCloud takes an array of words as an argument, and we only have an object.
//    // So we can use Object.keys(nameCounts) to get all the "keys"
//    // in nameCounts, which, for the above example would be ["David", "John", "Mary"]
//    
//    // the second argument to makeCloud is a function which makeCloud uses
//    // to figure out how big it should make each word. In our case
//    // we want each word to be bigger if it nameCount has a bigger
//    // count for it. See what happens if you change "100" to something 
//    // smaller or larger.
//    
//    makeCloud(Object.keys(nameCounts), function(name) {
//      return nameCounts[name] * 100
//    })
//  }
//})

var fill = d3.scaleOrdinal(d3.schemeCategory20);

makeCloud(["there", "friedn", "Asdf"], function() {
  return Math.random() * 100
})
//
function makeCloud(words, wordSizeFunction) {
  var layout = d3.layout.cloud()
  .size([500, 500])
  .words(words.map(function(d) {
    return {text: d, size: wordSizeFunction(d)};
  }))
  .padding(5)
  .rotate(function() { return ~~(Math.random() * 2) * 90; })
  .font("Impact")
  .fontSize(function(d) { return d.size; })
  .on("end", draw);

  layout.start(); 

  function draw(words) {
    d3.select("body").append("svg")
      .attr("width", layout.size()[0])
      .attr("height", layout.size()[1])
      .append("g")
      .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
      .selectAll("text")
      .data(words)
      .enter().append("text")
      .style("font-size", function(d) { return d.size + "px"; })
      .style("font-family", "Impact")
      .style("fill", function(d, i) { return fill(i); })
      .attr("text-anchor", "middle")
      .attr("transform", function(d) {
      return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
    })
      .text(function(d) { return d.text; });
  }
}
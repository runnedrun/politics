$.ajax({
  method: "GET",
  url: "https://www.govtrack.us/api/v2/person",
  success: function(data) {    
    var names = {}    
    data.objects.forEach(function(object) {
      var firstName = object.firstname
      // if we haven't yet seen this name, then 
      // names[object.firstname] will be null. || 0 means to
      // default to 0 if names[object.firstname] is null.
      var numberOfPeopleWithName = names[firstName] || 0   
      numberOfPeopleWithName += 1
      names[firstName] = numberOfPeopleWithName
    })
    
    // now names is an object like {david: 5, John: 2, Mary, 1}
    
    makeCloud(
  }
})

var fill = d3.scaleOrdinal(d3.schemeCategory20);

makeCloud(["there", "friedn"], function() {
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
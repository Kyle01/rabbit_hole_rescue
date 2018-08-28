import React from 'react';
import * as d3 from 'd3'

const treeData =[
  {
    "website": "Slack",
    "id": 12,
    "url": "https://app-academy.slack.com/messages/GCG2HBD5M/details/",
    "description": "Group3 | Slack",
    "parent": "null",
    "children": [
      {
        "website": "Slack",
        "id": 13,
        "url": "https://app-academy.slack.com/messages/GCG2HBD5M/",
        "description": "Group5 | Slack",
        "parent": 12,
        "children": [
          {
            "website": "Slack",
            "id": 14,
            "url": "https://app-academy.slack.com/messages/GCG2HBD5M/",
            "description": "Group8 | Slack",
            "parent": 13,
          },
          {
            "website": "StackOverflow",
            "id": 15,
            "url": "https://stackoverflow.com/questions/38776517/how-to-discard-local-changes-and-pull-latest-from-github-repository",
            "description": "Group5 | Slack",
            "parent": 13,
          }
        ]
      },
      {
        "website": "Slack",
        "id": 16,
        "url": "https://app-academy.slack.com/messages/GCG2HBD5M/",
        "description": "Kavian Mojabe | Slack",
        "parent": 12,
      }
    ]
  }
];

class Show extends React.Component {

  componentDidUpdate(){

  }

  render() {
    console.log(treeData);
    var svg = d3.select("body").append("svg")
    	.attr("width", 960)
    	.attr("height", 500)
      .append("g")
    	.attr("transform", "translate(50,50)");

    // var margin = {top: 20, right: 120, bottom: 20, left: 120},
    // 	width = 960 - margin.right - margin.left,
    // 	height = 500 - margin.top - margin.bottom,
    //   g = svg.append("g").attr("transform", "translate(40,0)");

    var i = 0,
    	duration = 750,
    	root;

    var tree = d3.tree()
    	.size([860, 400]);

    root = treeData[0];
    root.x0 = 200;
    root.y0 = 0;

    update(root);

    function update(data){
      var treeRoot = d3.hierarchy(root);
      tree(treeRoot);
      // nodes
      var nodes = treeRoot.descendants();
      // links
      var links = treeRoot.links();
      console.log(links);

      var node = svg.selectAll(".node")
        .data(nodes)
        .enter()
        .append("g")
          .attr("class", "node")
          .attr("transform", function(d) { return "translate("+ d.x + "," + d.y + ")";});

      node.append("circle")
        .attr("r", 5)
        .attr("fill","blue");

      node.append("text")
        .text(function(d) { return d.data.website; });


      svg.selectAll(".link")
        .data(links)
        .enter()
        .append("path")
        .attr("class","link")
        .attr("fill","none")
        .attr("stroke","black")
        .attr("d", d3.linkVertical()
          .x(function(d) {
            return d.x; })
          .y(function(d) { return d.y; }));
    }


    return null;
  }
}

export default Show;

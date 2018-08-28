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
      },
      {
        "website": "Youtube",
        "id": 17,
        "url": "https://youtube.com",
        "description": "Kavian Mojabe | Youtube",
        "parent": 12,
        "children":[
          {
            "website": "Slack",
            "id": 24,
            "url": "https://app-academy.slack.com/messages/GCG2HBD5M/",
            "description": "Group8 | Slack",
            "parent": 17,
          },
          {
            "website": "Youtube",
            "id": 25,
            "url": "https://app-academy.slack.com/messages/GCG2HBD5M/",
            "description": "Group8 | Slack",
            "parent": 17,
          },
          {
            "website": "Youtube",
            "id": 26,
            "url": "https://app-academy.slack.com/messages/GCG2HBD5M/",
            "description": "Group8 | Slack",
            "parent": 17,
          }
        ]
      },
      {
        "website": "Google",
        "id": 18,
        "url": "https://www.google.com/search?q=why&oq=why&sourceid=chrome&ie=UTF-8",
        "description": "why - Google Search",
        "parent": 12,
      },
      {
        "website": "Myspace",
        "id": 19,
        "url": "https://www.google.com/search?q=why&oq=why&sourceid=chrome&ie=UTF-8",
        "description": "Kevinho - Myspace",
        "parent": 12,
        "children": [
          {
            "website": "Slack",
            "id": 20,
            "url": "https://app-academy.slack.com/messages/GCG2HBD5M/",
            "description": "Group8 | Slack",
            "parent": 19,
          },
          {
            "website": "StackOverflow",
            "id": 21,
            "url": "https://stackoverflow.com/questions/38776517/how-to-discard-local-changes-and-pull-latest-from-github-repository",
            "description": "Group5 | Slack",
            "parent": 19,
            "children": [
              {
                "website": "Yahoo",
                "id": 22,
                "url": "https://app-academy.slack.com/messages/GCG2HBD5M/",
                "description": "Group8 | Slack",
                "parent": 21,
              },
              {
                "website": "Yahoo",
                "id": 23,
                "url": "https://app-academy.slack.com/messages/GCG2HBD5M/",
                "description": "Group8 | Slack",
                "parent": 21,
              }
            ]
          }
        ]
      }
    ]
  }
];

class Show extends React.Component {

  componentDidUpdate(){

  }

  render() {
    function radialPoint(x, y) {
      return [(y = +y) * Math.cos(x -= Math.PI / 2), y * Math.sin(x)];
    }
    var svg = d3.select("body").append("svg")
    	.attr("width", 800)
    	.attr("height", 700)
      .append("g")
    	.attr("transform", "translate(" + (800 / 2 ) + "," + (700 / 2 + 40) + ")");

    var i = 0,
    	duration = 750,
    	root;

    var tree = d3.tree()
    	.size([2*Math.PI, 350])
      .separation(function(a, b) {
        // debugger
        return (a.parent == b.parent ? 1 : 2) / a.depth;
      });

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

      var node = svg.selectAll(".node")
        .data(nodes)
        .enter()
        .append("g")
          .attr("class", function(d) { return "node" + (d.children ? " node--internal" : " node--leaf"); })
          .attr("transform", function(d) { return "translate(" + radialPoint(d.x, d.y) + ")"; });

      node.append("circle")
        .attr("r", 6);

      node.append("text")
        .attr("dy", "0.31em")
        .attr("x", function(d) { return d.x < Math.PI === !d.children ? 7 : -7; })
        .attr("text-anchor", function(d) { return d.x < Math.PI === !d.children ? "start" : "end"; })
        .attr("transform", function(d) { return "rotate(" + (d.x < Math.PI ? d.x - Math.PI / 2 : d.x + Math.PI / 2) * 180 / Math.PI + ")"; })
        .text(function(d) { return d.data.website; });

      svg.selectAll(".link")
        .data(links)
        .enter()
        .append("path")
        .attr("class","link")
        .attr("fill","none")
        .attr("stroke","grey")
        .attr("d", d3.linkRadial()
          .angle(function(d) { return d.x; })
          .radius(function(d) { return d.y; }));

    }


    return null;
  }
}

export default Show;

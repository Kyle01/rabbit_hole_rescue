import React from 'react';
import * as d3 from 'd3';
import { BFSDisplay } from './tree_algorithms';
import { createTree } from '../../reducers/tree_organizer';

const treeData =[
  {
    "webname": "Slack",
    "id": 12,
    "url": "https://app-academy.slack.com/messages/GCG2HBD5M/details/",
    "description": "Group3 | Slack",
    "parent": "null",
    "children": [
      {
        "webname": "Slack",
        "id": 13,
        "url": "https://app-academy.slack.com/messages/GCG2HBD5M/",
        "description": "Group5 | Slack",
        "parent": 12,
        "children": [
          {
            "webname": "Slack",
            "id": 14,
            "url": "https://app-academy.slack.com/messages/GCG2HBD5M/",
            "description": "Group8 | Slack",
            "parent": 13,
          },
          {
            "webname": "StackOverflow",
            "id": 15,
            "url": "https://stackoverflow.com/questions/38776517/how-to-discard-local-changes-and-pull-latest-from-github-repository",
            "description": "Group5 | Slack",
            "parent": 13,
          }
        ]
      },
      {
        "webname": "Slack",
        "id": 16,
        "url": "https://app-academy.slack.com/messages/GCG2HBD5M/",
        "description": "Kavian Mojabe | Slack",
        "parent": 12,
      },
      {
        "webname": "Youtube",
        "id": 17,
        "url": "https://youtube.com",
        "description": "Kavian Mojabe | Youtube",
        "parent": 12,
        "children":[
          {
            "webname": "Slack",
            "id": 24,
            "url": "https://app-academy.slack.com/messages/GCG2HBD5M/",
            "description": "Group8 | Slack",
            "parent": 17,
          },
          {
            "webname": "Youtube",
            "id": 25,
            "url": "https://app-academy.slack.com/messages/GCG2HBD5M/",
            "description": "Group8 | Slack",
            "parent": 17,
          },
          {
            "webname": "Youtube",
            "id": 26,
            "url": "https://app-academy.slack.com/messages/GCG2HBD5M/",
            "description": "Group8 | Slack",
            "parent": 17,
          }
        ]
      },
      {
        "webname": "Google",
        "id": 18,
        "url": "https://www.google.com/search?q=why&oq=why&sourceid=chrome&ie=UTF-8",
        "description": "why - Google Search",
        "parent": 12,
      },
      {
        "webname": "Myspace",
        "id": 19,
        "url": "https://www.google.com/search?q=why&oq=why&sourceid=chrome&ie=UTF-8",
        "description": "Kevinho - Myspace",
        "parent": 12,
        "children": [
          {
            "webname": "Slack",
            "id": 20,
            "url": "https://app-academy.slack.com/messages/GCG2HBD5M/",
            "description": "Group8 | Slack",
            "parent": 19,
          },
          {
            "webname": "StackOverflow",
            "id": 21,
            "url": "https://stackoverflow.com/questions/38776517/how-to-discard-local-changes-and-pull-latest-from-github-repository",
            "description": "Group5 | Slack",
            "parent": 19,
            "children": [
              {
                "webname": "Yahoo",
                "id": 22,
                "url": "https://app-academy.slack.com/messages/GCG2HBD5M/",
                "description": "Group8 | Slack",
                "parent": 21,
              },
              {
                "webname": "Yahoo",
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

  constructor(props) {
    super(props);
    this.state = {
      treeData: {},
      windows: props.windows,
      views: props.views
    };
  }

  renderTree(props){
    function radialPoint(x, y) {
      return [(y = +y) * Math.cos(x -= Math.PI / 2), y * Math.sin(x)];
    }

    function click(d){
      var modal_list = document.getElementById("modalist");
      while (modal_list.firstChild) {
          modal_list.removeChild(modal_list.firstChild);
      }
      let nodes = BFSDisplay(d.data);
      nodes.forEach(node => {
        let li = document.createElement('li');
        let link = document.createElement('a');
        let span = document.createElement('span');
        span.appendChild(document.createTextNode(node.webname));
        link.href = node.url;
        link.appendChild(document.createTextNode(node.description));
        link.appendChild(span);
        li.appendChild(link);
        modal_list.appendChild(li);
      });
    }
    var svg = d3.select("#svg-container").append("svg")
    	.attr("width", 800)
    	.attr("height", 700)
      .append("g")
    	.attr("transform", "translate(" + (800 / 2 ) + "," + (700 / 2 + 40) + ")");

    var duration = 750,
    	root;

    var tree = d3.tree()
    	.size([2*Math.PI, 350])
      .separation(function(a, b) {
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
        .attr("r", 8)
        .on("mouseover", function(d) {
            d3.select(this).attr("r", 15);
            d3.select(this).attr("class", "chosen-one");
          })
        .on("mouseout", function(d) {
            // click(d);
            d3.select(this).attr("r", 8);
            d3.select(this).attr("class", " ");
          })
        .on("click", click);

      node.append("text")
        .attr("dy", "0.31em")
        .attr("x", function(d) { return d.x < Math.PI === !d.children ? 9 : -9; })
        .attr("text-anchor", function(d) { return d.x < Math.PI === !d.children ? "start" : "end"; })
        .attr("transform", function(d) { return "rotate(" + (d.x < Math.PI ? d.x - Math.PI / 2 : d.x + Math.PI / 2) * 180 / Math.PI + ")"; })
        .text(function(d) { return d.data.webname; });

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
  }

  componentDidMount(nextProps){
    this.renderTree(nextProps);
    
    // Promise.all([
    //   this.props.fetchWindows(this.props.date)
    // ]).then(
    //   ([res1]) => {
    //     Object.keys(this.state.windows).forEach(windowId => {
    //       this.props.fetchVisits(windowId);
    //     });
    //   });
  }

  render() {
    var retDiv = (
      <div id="showme-money" className="show-page">
        <svg width="800" height="700" ref={node => this.node = node} id="svg-container"></svg>
        <div id="modal">
          <h3>Websites You've Visited:</h3>
          <ul id="modalist"></ul>
        </div>
      </div>
    );
    


    return retDiv;
  }
}

export default Show;

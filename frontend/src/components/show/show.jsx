import React from 'react';
import * as d3 from 'd3';
import { BFSDisplay } from './tree_algorithms';
import { createTree, getVisits } from '../../reducers/tree_organizer';


class Show extends React.Component {

  constructor(props) {
    super(props);

  }

  renderTree(props){
    console.log("in render tree")
    let treeStruct = createTree(this.props,"Sun Sep 02 2018");
    
    console.log(treeStruct);
    var treeData = [treeStruct];
    function radialPoint(x, y) {
      return [(y = +y) * Math.cos(x -= Math.PI / 2), y * Math.sin(x)];
    }

    function click(d){
      var modal_list = document.getElementById("modalist");
      while (modal_list.firstChild) {
          modal_list.removeChild(modal_list.firstChild);
      }
      let nodes = BFSDisplay(d.data);
      nodes.reverse().forEach(node => {
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
    	.attr("width", 900)
    	.attr("height", 1150)
      .append("g")
    	.attr("transform", "translate(" + (900 / 2 - 50) + "," + (1150 / 2 - 200 ) + ")");

    var duration = 750,
    	root;

    var tree = d3.tree()
    	.size([2*Math.PI, 315])
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
        .attr("r", 6)
        .on("mouseover", function(d) {
            d3.select(this).attr("r", 15);
            d3.select(this).attr("class", "chosen-one");
          })
        .on("mouseout", function(d) {
            d3.select(this).attr("r", 6);
            d3.select(this).attr("class", " ");
          })
        .on("click", click);

      node.append("text")
        .attr("dy", "0.31em")
        .attr("x", function(d) { return d.x < Math.PI === !d.children ? 7 : -7; })
        .attr("text-anchor", function(d) { return d.x < Math.PI === !d.children ? "start" : "end"; })
        .attr("transform", function(d) { return "rotate(" + (d.x < Math.PI ? d.x - Math.PI / 2 : d.x + Math.PI / 2) * 180 / Math.PI + ")"; });
        // .text(function(d) { return d.data.webname; });

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

  componentWillMount(){
    this.props.fetchWindows(this.props.username);
  }

  receiveVisits(){
    // console.log(this.props.windows);
    Object.keys(this.props.windows).forEach( windowId => {
      this.props.fetchVisits(windowId);
    })
  }

  componentDidMount(nextProps){

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

    if (!(Object.keys(this.props.windows).length > 0)){
      return retDiv;
    } else if ((Object.keys(this.props.windows).length > 0) && (!(Object.keys(this.props.visits).length > 0))){
      this.receiveVisits();
      return retDiv;
    }
    
    this.renderTree(this.props);

    return retDiv;
  }
}

export default Show;

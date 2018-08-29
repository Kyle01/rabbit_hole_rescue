export const BFSDisplay = function(node){
  if (!node.children){
    return [node];
  }
  let result = [];
  let children = node.children;
  children.forEach( (child) => {
    let done = BFSDisplay(child);
    result = result.concat(done);
  });
  delete node["children"];
  result.push(node);
  return result;
}

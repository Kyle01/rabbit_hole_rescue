export const BFSDisplay = function(node){
  if (!node.children){
    return [node];
  }
  let me = Object.assign({},node);
  let result = [];
  let children = node.children;
  children.forEach( (child) => {
    let done = BFSDisplay(child);
    result = result.concat(done);
  });
  delete me["children"];
  result.push(me);
  return result;
}

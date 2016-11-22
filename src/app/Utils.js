
function getNodePathFromMapping (node, nodeMap) {
  let nodePathParts = [];
  let currentParent = nodeMap[node.parentId];

  while (currentParent) {
    nodePathParts.push(currentParent.title);
    currentParent = nodeMap[currentParent.parentId];
  }

  return nodePathParts.reverse().join('/');
}

export function flattenBookmarksTree (tree) {
  let bookmarks = [];

  if (tree.length > 0) {
    let nodeStack = tree;
    let nodeMap = {};

    while (nodeStack.length > 0) {

      let currentNode = nodeStack.pop();

      if (!currentNode.url) {
        nodeMap[currentNode.id] = currentNode;
      }

      currentNode.path = getNodePathFromMapping(currentNode, nodeMap);
      bookmarks.push(currentNode);

      if (currentNode.children && currentNode.children.length > 0) {
        currentNode.children.forEach(childNode => {
          nodeStack.push(childNode);
        });
      }
    }
  }

  return bookmarks;
};


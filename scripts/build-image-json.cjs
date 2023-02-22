const fs        = require("fs");

const directory = "./public/images";

function build_file_tree(dir, prefix=dir) {
  /*** 
   * Builds a tree structure of the file structure of 'dir'
   *** Example: 
   *    {"files":
   *      {"dir": "./public/images", 
   *       "tree":
   *          [{"file": "Mexico", "type": "dir", 
   *            "subTree":
   *            [
   *              {"file": "IMG_20230212_164817.jpg", "type": "file"}]}]}} 
   ***/

  let subDir = dir.substr(prefix.length + 1);
  let topDir = subDir.substr(subDir.lastIndexOf("/")+1);

  let files = [];
  let retTree = {};

  const dirFiles = fs.readdirSync(dir);

  for (const f of dirFiles) {
    const stat = fs.lstatSync(dir + "/" + f);

    if (stat.isDirectory()) {
      // Recurse through the file structure, on return add each subTree to the
      // files tree
      // The returned tree has folder name as key, to avoid creating a subKey
      // with the same name, we take the [f] subTree of the returned result
      subTree = build_file_tree(dir + "/" + f, prefix)[f]; 

      files.push({"file": f, "type": "dir", subTree });
    }
    else {
      let fileName = f.toLowerCase();
      if (fileName.endsWith(".jpg") || fileName.endsWith(".jpeg") || fileName.endsWith(".png")) {
        files.push({"file": f, "type": "image"});
      } else if (fileName.endsWith(".json")) {
        files.push({"file": f, "type": "json"});
      } else {
        files.push({"file": f, "type": "file"});
      }
    }
  }

  // Top level dir will match 'prefix' and thus topDir will be empty
  if (topDir === "") {
    retTree["files"] = {
      "dir": dir.substr(dir.lastIndexOf("/")+1),
      "tree": files
    };
  }
  else {
    retTree[topDir] = files;
  }

  return retTree;
}

tree = build_file_tree(directory);

fs.writeFile("data/image_meta.json", JSON.stringify(tree, null, 2), function(err) {
  if (err) {
    return console.log(err);
  }
  console.log("Success!");
});

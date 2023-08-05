function regex_matches(regex, input, regex_flags) {
  try {
    query = new RegExp(regex, regex_flags);
    return input.matchAll(query);
  } catch (error) {
    console.log("invalid regexp: " + regex);
  }
}
function marked(regex, input, regex_flags) {
  const matches = regex_matches(regex, input, regex_flags);
  let output = "";
  let cur = 0;
  if (matches == undefined) return;
  for (const match of matches) {
    output += input.slice(cur, match.index) + `<mark>${match[0]}</mark>`;
    cur = match.index + match[0].length;
    //console.log( `Found ${match[0]} start=${match.index} end=${match.index + match[0].length}.`,);
  }
  if (cur < input.length) {
    output += input.slice(cur);
  }
  return output;
}
function add_dowload_data(matches, download_id) {
  var csv = "";
  var link = document.getElementById(download_id);
  //console.log(matches);
  for (match of matches) {
    csv += match[0] + "\n";
  }
  console.log(csv);
  data = new Blob([csv]);
  var url = URL.createObjectURL(data);
  if (link != undefined) link.href = url;
}
function matches(regex, input, regex_flags) {
  const matches = regex_matches(regex, input, regex_flags);
  let output = "<ul>";
  if (matches == undefined) return; 
  for (const match of matches) {
    let matchArr = [...match];
    console.log(matchArr, matchArr.length);
    output += `<li class ="matched">${matchArr[0]}`;
    /*  if (matchArr.length  > 1){
            output += "<ol>";
            for (let i = 1; i++; i<matchArr.length){
              if (matchArr[i] == undefined){console.log(matchArr[i]);break;}
              output += `<li class ="matched">${matchArr[i]}</li>`
            }
            output += "</ol>";
          } */
    output += "</li>";
  }
  output += "</ul";
  add_dowload_data(regex_matches(regex, input, regex_flags), "download");
  return output;
}

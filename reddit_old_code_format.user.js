// ==UserScript==
// @name     		Old Reddit Code Formatting
// @version  		0.1.0
// @grant    		none
// @namespace		https://raw.githubusercontent.com/therealzanfar/iptool/main/
// @description Enable tripple-backtick formatting in Old Reddit
// @match				http://old.reddit.com/*
// @match				https://old.reddit.com/*
// @require https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js
// ==/UserScript==

function highlight(e, color) {
  e.css({
    "border-width": "1px",
    "border-style": "solid",
    "border-color": color,
  });
}

function find_user_posts() {
  return $(".usertext-body")
}

function find_code_blocks(post) {
  var all_blocks = [];
  var current_block = [];
  var inside_block = false;
  
  post.find("div.md p").each(
    function() {
      // highlight($(this), "blue");
      
      if ($(this).text().startsWith("```")) {
        // highlight($(this), "green");
        if (inside_block) {
          // Found the start of a new block,
          // abandon the existing one and start over
          // (TODO)
        } else {
          // Found the start of a block
          
          current_block = [];
          inside_block = true;
          
          current_block.push($(this));
          
          // console.log("+ Start")
          // console.log("  Current:", current_block);
          // console.log("  All:", all_blocks);
        }
      }
      
      else if ($(this).text().endsWith("```")) {
        if (inside_block) {
          // The block has ended,
          // move it to the completed array
          // highlight($(this), "red");
          
          current_block.push($(this));
          all_blocks.push(current_block);
          
          current_block = [];
          inside_block = false;
          
          // console.log("! End")
          // console.log("  Current:", current_block);
          // console.log("  All:", all_blocks);
        }
      }
      
      else if (inside_block) {
        // highlight($(this), "yellow");
        
        current_block.push($(this));
          
        // console.log("- Continuing")
        // console.log("  Current:", current_block);
        // console.log("  All:", all_blocks);
      }
    }
  );
  
  if (all_blocks.length > 0) {
    return all_blocks;
  }
  
  else return [];
}

function format_code_block(b) {
  /* 
  for (var idx=0; idx<b.length; idx++) {
    if (idx == 0) {
      highlight(b[idx], "green");
    }
    
    else if (idx < b.length-1) {
      highlight(b[idx], "yellow");
    }
    
    else {
      highlight(b[idx], "red");
    }
  }
  */
  
  var pre = $("<pre></pre>")
  pre.insertBefore(b[0]);
  
  var code = $("<code></code>")
  pre.append(code)
  
  b.forEach(
    function(p) {
      code.append(p);
    }
  );
      
}

function format_code_paragraphs() {
  find_user_posts().each(
    function() {
      // highlight($(this), "red");
      
      blocks = find_code_blocks($(this));
      
      blocks.forEach(
        function(b) {
          format_code_block(b);
        }
      );
    }
  );
}

format_code_paragraphs();

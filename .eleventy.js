const navigationPlugin = require("@11ty/eleventy-navigation")
const syntaxHighlightingPlugin = require("@11ty/eleventy-plugin-syntaxhighlight")
const markdownIt = require('markdown-it');
const tableOfContentsPlugin = require('@uncenter/eleventy-plugin-toc');
const markdownItClass = require('@toycode/markdown-it-class');
const markdownItAnchor = require('markdown-it-anchor')
const library = require('@fortawesome/fontawesome-svg-core').library;
const icon = require('@fortawesome/fontawesome-svg-core').icon;
const fas = require('@fortawesome/free-solid-svg-icons').fas;
const { execSync } = require('child_process');

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(navigationPlugin)
  eleventyConfig.addPlugin(syntaxHighlightingPlugin)

  eleventyConfig.addPassthroughCopy("assets")
  eleventyConfig.addPassthroughCopy("fonts")
  eleventyConfig.addPassthroughCopy("src/CNAME")

  // Font Awesome Icons
  library.add(fas)
  eleventyConfig.addShortcode("fas_icon", function(args) { 
    var fas_svg = icon({ prefix: 'fas', iconName: args }); 
    return `${fas_svg.html}`; 
  });

  const mapping = {
    h2: 'content-title',h3: 'content-title',h4: 'content-title',h5: 'content-title',h6: 'content-title',
    table: 'table',
    blockquote: 'alert'
  };
  
  const mdOptions = { linkify: false, html: true };
  const mdAnchorOpts = { 
    permalink: markdownItAnchor.permalink.headerLink(),
    permalinkClass: 'ml-5', permalinkSymbol: '#', level: [1, 2, 3, 4] 
  }
  
  eleventyConfig.setLibrary(
    'md',
    markdownIt(mdOptions)
      .use(markdownItClass, mapping)
      .use(markdownItAnchor, mdAnchorOpts)
  )
  
  eleventyConfig.addPairedShortcode("admonition", function(content, type, title) {
    let titleStr = "";
    if(title) {
      titleStr = title;
    } else if(type) {
      titleStr = type.substring(0, 1).toUpperCase() + type.substring(1).toLowerCase();
    } else {
      titleStr = "Info";
    }
    
    return `<div class="admonition${type ? ` ${type.toLowerCase()}` : ""}">
      <div class="admonition-title">
        <span class="admonition-icon${type ? ` ${type.toLowerCase()}` : ""}"></span>
        ${titleStr}
      </div>
      <div class="admonition-content">${content}</div>
    </div>`
  });

  eleventyConfig.addPlugin(tableOfContentsPlugin, {
    tags: ['h2', 'h3'],
    wrapper: function(toc){
      toc = toc.replaceAll("<a","<a class='sidebar-link'");
      return `${toc}`;
    }
  })

  eleventyConfig.on('eleventy.after', () => {
    execSync(`npx pagefind`, { encoding: 'utf-8' })
  })
  
  return {
    dir: {
      input: "content"
    }
  }
}

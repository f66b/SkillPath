import React, { useState, useEffect } from 'react'

const HTMLCSSCourse = () => {
  const [currentPart, setCurrentPart] = useState(1)
  const [currentLesson, setCurrentLesson] = useState(1)
  const [completedLessons, setCompletedLessons] = useState({})
  const [partScores, setPartScores] = useState({})
  const [showFinalQuiz, setShowFinalQuiz] = useState(false)
  const [finalQuizAnswers, setFinalQuizAnswers] = useState({})
  const [courseProgress, setCourseProgress] = useState(0)

  // Course data structure
  const courseData = {
    1: {
      title: "Introduction to HTML & CSS",
      lessons: [
        {
          id: 1,
          title: "What is HTML?",
          content: "HTML (HyperText Markup Language) is the standard markup language used to create web pages. It provides the structure and content of a webpage by using tags to define different elements like headings, paragraphs, images, and links. Think of HTML as the skeleton that gives a webpage its basic form and organization.",
          quiz: {
            question: "What does HTML stand for?",
            options: [
              "High Tech Modern Language",
              "HyperText Markup Language",
              "Home Tool Markup Language",
              "Hyperlink and Text Markup Language"
            ],
            correct: 1
          }
        },
        {
          id: 2,
          title: "What is CSS?",
          content: "CSS (Cascading Style Sheets) is a styling language that controls the visual appearance of HTML elements. It allows you to change colors, fonts, spacing, layout, and other design aspects of your web pages. CSS works alongside HTML to transform plain content into beautifully styled websites.",
          quiz: {
            question: "What is the primary purpose of CSS?",
            options: [
              "To create the structure of web pages",
              "To control the visual appearance and styling",
              "To add functionality to web pages",
              "To store data on web pages"
            ],
            correct: 1
          }
        },
        {
          id: 3,
          title: "How the Web Works",
          content: "When you visit a website, your browser sends a request to a web server, which responds with HTML and CSS files. The browser then interprets these files to display the webpage. HTML provides the content structure, while CSS determines how that content looks and is arranged on the screen.",
          quiz: {
            question: "What happens when you visit a website?",
            options: [
              "The website downloads to your computer permanently",
              "Your browser requests files from a server and displays them",
              "The website creates new files on your computer",
              "Nothing happens until you click a link"
            ],
            correct: 1
          }
        },
        {
          id: 4,
          title: "HTML Elements and Tags",
          content: "HTML elements are the building blocks of web pages, defined by tags. Tags come in pairs: opening tags like `<p>` and closing tags like `</p>`. The content between these tags becomes the element. Some elements, like images, use self-closing tags that don't need a closing tag.",
          quiz: {
            question: "What are HTML elements defined by?",
            options: [
              "CSS rules",
              "JavaScript code",
              "Tags",
              "File names"
            ],
            correct: 2
          }
        },
        {
          id: 5,
          title: "HTML Attributes",
          content: "Attributes provide additional information about HTML elements and are placed inside the opening tag. Common attributes include 'id' for unique identification, 'class' for grouping elements, and 'src' for specifying image sources. Attributes help make elements more specific and functional.",
          quiz: {
            question: "Where are HTML attributes placed?",
            options: [
              "In the closing tag",
              "Inside the opening tag",
              "Between the opening and closing tags",
              "Outside the element"
            ],
            correct: 1
          }
        },
        {
          id: 6,
          title: "Basic CSS Syntax",
          content: "CSS uses a simple syntax: selectors target HTML elements, and declaration blocks contain property-value pairs that define styles. For example, `p { color: blue; }` makes all paragraph text blue. CSS rules can target elements by tag name, class, or ID.",
          quiz: {
            question: "What does the CSS rule 'p { color: blue; }' do?",
            options: [
              "Makes all text blue",
              "Makes all paragraph text blue",
              "Makes the background blue",
              "Creates a blue border"
            ],
            correct: 1
          }
        },
        {
          id: 7,
          title: "CSS Selectors",
          content: "CSS selectors determine which HTML elements will be styled. Tag selectors target elements by name (like 'p' for paragraphs), class selectors use a dot (like '.highlight'), and ID selectors use a hash (like '#header'). Selectors help you apply styles to specific elements.",
          quiz: {
            question: "Which selector targets elements with a specific class?",
            options: [
              "Tag selector (p)",
              "Class selector (.classname)",
              "ID selector (#idname)",
              "Universal selector (*)"
            ],
            correct: 1
          }
        },
        {
          id: 8,
          title: "CSS Properties and Values",
          content: "CSS properties define what aspect of an element to style, while values specify how to style it. Common properties include 'color' for text color, 'font-size' for text size, and 'background-color' for background color. Values can be keywords, numbers, or specific units.",
          quiz: {
            question: "What do CSS properties define?",
            options: [
              "The HTML element to target",
              "What aspect of an element to style",
              "The file name",
              "The browser to use"
            ],
            correct: 1
          }
        },
        {
          id: 9,
          title: "Inline vs External CSS",
          content: "CSS can be written inline within HTML tags, internally in the head section, or externally in separate files. External CSS files are preferred because they keep styling separate from content, making websites easier to maintain and allowing styles to be reused across multiple pages.",
          quiz: {
            question: "Why are external CSS files preferred?",
            options: [
              "They load faster",
              "They keep styling separate from content",
              "They use less memory",
              "They work in all browsers"
            ],
            correct: 1
          }
        },
        {
          id: 10,
          title: "Your First HTML Page",
          content: "Every HTML page needs a basic structure with DOCTYPE declaration, html, head, and body tags. The head contains metadata like the page title, while the body contains the visible content. This structure provides the foundation for all web pages and ensures proper rendering by browsers.",
          quiz: {
            question: "Which section contains the visible content of a webpage?",
            options: [
              "The head section",
              "The body section",
              "The title section",
              "The meta section"
            ],
            correct: 1
          }
        }
      ],
      finalQuiz: [
        {
          question: "What does HTML stand for?",
          options: [
            "High Tech Modern Language",
            "HyperText Markup Language",
            "Home Tool Markup Language",
            "Hyperlink and Text Markup Language"
          ],
          correct: 1
        },
        {
          question: "What is the primary purpose of CSS?",
          options: [
            "To create the structure of web pages",
            "To control the visual appearance and styling",
            "To add functionality to web pages",
            "To store data on web pages"
          ],
          correct: 1
        },
        {
          question: "What are HTML elements defined by?",
          options: [
            "CSS rules",
            "JavaScript code",
            "Tags",
            "File names"
          ],
          correct: 2
        },
        {
          question: "Where are HTML attributes placed?",
          options: [
            "In the closing tag",
            "Inside the opening tag",
            "Between the opening and closing tags",
            "Outside the element"
          ],
          correct: 1
        },
        {
          question: "What does the CSS rule 'p { color: blue; }' do?",
          options: [
            "Makes all text blue",
            "Makes all paragraph text blue",
            "Makes the background blue",
            "Creates a blue border"
          ],
          correct: 1
        },
        {
          question: "Which selector targets elements with a specific class?",
          options: [
            "Tag selector (p)",
            "Class selector (.classname)",
            "ID selector (#idname)",
            "Universal selector (*)"
          ],
          correct: 1
        },
        {
          question: "What do CSS properties define?",
          options: [
            "The HTML element to target",
            "What aspect of an element to style",
            "The file name",
            "The browser to use"
          ],
          correct: 1
        },
        {
          question: "Why are external CSS files preferred?",
          options: [
            "They load faster",
            "They keep styling separate from content",
            "They use less memory",
            "They work in all browsers"
          ],
          correct: 1
        },
        {
          question: "Which section contains the visible content of a webpage?",
          options: [
            "The head section",
            "The body section",
            "The title section",
            "The meta section"
          ],
          correct: 1
        },
        {
          question: "What happens when you visit a website?",
          options: [
            "The website downloads to your computer permanently",
            "Your browser requests files from a server and displays them",
            "The website creates new files on your computer",
            "Nothing happens until you click a link"
          ],
          correct: 1
        }
      ]
    },
    2: {
      title: "Structure of a Web Page",
      lessons: [
        {
          id: 1,
          title: "HTML Headings",
          content: "Headings are used to create titles and subtitles on web pages, providing structure and hierarchy. HTML offers six heading levels from `<h1>` (most important) to `<h6>` (least important). Headings help both users and search engines understand the organization of your content.",
          quiz: {
            question: "Which heading tag represents the most important heading?",
            options: [
              "<h6>",
              "<h3>",
              "<h1>",
              "<h2>"
            ],
            correct: 2
          }
        },
        {
          id: 2,
          title: "Paragraphs and Text",
          content: "Paragraphs are the most common way to display text content on web pages. The `<p>` tag creates paragraph elements that automatically add spacing before and after the text. You can also use other text elements like `<strong>` for bold text and `<em>` for italic text to add emphasis.",
          quiz: {
            question: "Which tag is used to create a paragraph?",
            options: [
              "<text>",
              "<p>",
              "<paragraph>",
              "<div>"
            ],
            correct: 1
          }
        },
        {
          id: 3,
          title: "Creating Lists",
          content: "HTML provides two main types of lists: ordered lists (`<ol>`) with numbered items and unordered lists (`<ul>`) with bullet points. Each list item is wrapped in `<li>` tags. Lists help organize information in a structured, easy-to-read format.",
          quiz: {
            question: "Which tag creates a bulleted list?",
            options: [
              "<ol>",
              "<ul>",
              "<li>",
              "<list>"
            ],
            correct: 1
          }
        },
        {
          id: 4,
          title: "Adding Links",
          content: "Links connect web pages together and are created using the `<a>` tag with an `href` attribute that specifies the destination URL. Links can point to other pages on your site, external websites, or specific sections within a page. They're essential for web navigation.",
          quiz: {
            question: "Which attribute specifies where a link should go?",
            options: [
              "src",
              "href",
              "link",
              "url"
            ],
            correct: 1
          }
        },
        {
          id: 5,
          title: "Inserting Images",
          content: "Images are added to web pages using the `<img>` tag with a `src` attribute that points to the image file. The `alt` attribute provides alternative text for accessibility and SEO. Images can be stored locally or referenced from external URLs.",
          quiz: {
            question: "Which tag is used to insert an image?",
            options: [
              "<image>",
              "<img>",
              "<pic>",
              "<photo>"
            ],
            correct: 1
          }
        },
        {
          id: 6,
          title: "The Head Section",
          content: "The `<head>` section contains metadata about the webpage that isn't visible to users. It includes the page title, character encoding, viewport settings, and links to external resources like CSS files. This information helps browsers and search engines understand your page.",
          quiz: {
            question: "What is the purpose of the head section?",
            options: [
              "To display visible content",
              "To contain metadata and page information",
              "To create navigation menus",
              "To add images to the page"
            ],
            correct: 1
          }
        },
        {
          id: 7,
          title: "The Body Section",
          content: "The `<body>` section contains all the visible content of your webpage, including text, images, links, and other elements that users see and interact with. Everything that appears on the screen when someone visits your page goes inside the body tags.",
          quiz: {
            question: "Where does the visible content of a webpage go?",
            options: [
              "In the head section",
              "In the body section",
              "In the title section",
              "In the meta section"
            ],
            correct: 1
          }
        },
        {
          id: 8,
          title: "Semantic HTML",
          content: "Semantic HTML uses meaningful tags that clearly describe their purpose, like `<header>`, `<nav>`, `<main>`, `<article>`, and `<footer>`. These tags improve accessibility, SEO, and code readability by making the structure of your page more obvious to browsers and screen readers.",
          quiz: {
            question: "What is the benefit of using semantic HTML?",
            options: [
              "It makes pages load faster",
              "It improves accessibility and SEO",
              "It reduces file size",
              "It adds more styling options"
            ],
            correct: 1
          }
        },
        {
          id: 9,
          title: "Comments in HTML",
          content: "HTML comments allow you to add notes to your code that won't be displayed on the webpage. Comments start with `<!--` and end with `-->`. They're useful for explaining your code, marking sections, or temporarily hiding content during development.",
          quiz: {
            question: "How do you create an HTML comment?",
            options: [
              "<!-- comment -->",
              "// comment",
              "/* comment */",
              "<!-- comment"
            ],
            correct: 0
          }
        },
        {
          id: 10,
          title: "Basic Page Structure",
          content: "Every well-structured HTML page follows a consistent pattern: DOCTYPE declaration, html tag, head section with metadata, and body section with content. This structure ensures your page renders correctly across different browsers and provides a solid foundation for adding content and styling.",
          quiz: {
            question: "What is the correct order of basic HTML structure?",
            options: [
              "html, head, body, DOCTYPE",
              "DOCTYPE, html, head, body",
              "head, DOCTYPE, html, body",
              "body, head, html, DOCTYPE"
            ],
            correct: 1
          }
        }
      ],
      finalQuiz: [
        {
          question: "Which heading tag represents the most important heading?",
          options: [
            "<h6>",
            "<h3>",
            "<h1>",
            "<h2>"
          ],
          correct: 2
        },
        {
          question: "Which tag is used to create a paragraph?",
          options: [
            "<text>",
            "<p>",
            "<paragraph>",
            "<div>"
          ],
          correct: 1
        },
        {
          question: "Which tag creates a bulleted list?",
          options: [
            "<ol>",
            "<ul>",
            "<li>",
            "<list>"
          ],
          correct: 1
        },
        {
          question: "Which attribute specifies where a link should go?",
          options: [
            "src",
            "href",
            "link",
            "url"
          ],
          correct: 1
        },
        {
          question: "Which tag is used to insert an image?",
          options: [
            "<image>",
            "<img>",
            "<pic>",
            "<photo>"
          ],
          correct: 1
        },
        {
          question: "What is the purpose of the head section?",
          options: [
            "To display visible content",
            "To contain metadata and page information",
            "To create navigation menus",
            "To add images to the page"
          ],
          correct: 1
        },
        {
          question: "Where does the visible content of a webpage go?",
          options: [
            "In the head section",
            "In the body section",
            "In the title section",
            "In the meta section"
          ],
          correct: 1
        },
        {
          question: "What is the benefit of using semantic HTML?",
          options: [
            "It makes pages load faster",
            "It improves accessibility and SEO",
            "It reduces file size",
            "It adds more styling options"
          ],
          correct: 1
        },
        {
          question: "How do you create an HTML comment?",
          options: [
            "<!-- comment -->",
            "// comment",
            "/* comment */",
            "<!-- comment"
          ],
          correct: 0
        },
        {
          question: "What is the correct order of basic HTML structure?",
          options: [
            "html, head, body, DOCTYPE",
            "DOCTYPE, html, head, body",
            "head, DOCTYPE, html, body",
            "body, head, html, DOCTYPE"
          ],
          correct: 1
        }
      ]
    },
    3: {
      title: "Creating a Basic Layout",
      lessons: [
        {
          id: 1,
          title: "Using Div Containers",
          content: "The `<div>` tag is a container element used to group and organize other HTML elements. Divs don't have any visual appearance by themselves but are essential for creating layout structure. You can nest divs inside each other to create complex page layouts and organize content into logical sections.",
          quiz: {
            question: "What is the primary purpose of the div tag?",
            options: [
              "To create visual styling",
              "To group and organize other elements",
              "To add text content",
              "To create links"
            ],
            correct: 1
          }
        },
        {
          id: 2,
          title: "Understanding the Box Model",
          content: "Every HTML element is treated as a box with content, padding, border, and margin. Content is the actual text or images, padding is the space inside the element, border is the line around the element, and margin is the space outside the element. Understanding this model is crucial for layout design.",
          quiz: {
            question: "Which part of the box model is the space inside an element?",
            options: [
              "Margin",
              "Border",
              "Padding",
              "Content"
            ],
            correct: 2
          }
        },
        {
          id: 3,
          title: "CSS Width and Height",
          content: "The `width` and `height` properties control the size of elements. You can use pixels (px), percentages (%), or other units. Setting `width: 100%` makes an element take up the full width of its container, while `height: 200px` gives it a fixed height of 200 pixels.",
          quiz: {
            question: "What does width: 100% do?",
            options: [
              "Makes an element 100 pixels wide",
              "Makes an element take the full width of its container",
              "Makes an element invisible",
              "Makes an element centered"
            ],
            correct: 1
          }
        },
        {
          id: 4,
          title: "CSS Margins and Padding",
          content: "Margins create space outside elements, while padding creates space inside elements. You can set these properties for all sides at once or individually (top, right, bottom, left). For example, `margin: 20px` adds 20 pixels of space around all sides of an element.",
          quiz: {
            question: "What does margin create?",
            options: [
              "Space inside an element",
              "Space outside an element",
              "A border around an element",
              "Background color"
            ],
            correct: 1
          }
        },
        {
          id: 5,
          title: "CSS Borders",
          content: "Borders add lines around elements and can be customized with different styles, widths, and colors. Common border styles include solid, dashed, dotted, and none. You can set borders for all sides or individual sides using properties like `border-top` or `border-left`.",
          quiz: {
            question: "Which border style creates a solid line?",
            options: [
              "dashed",
              "dotted",
              "solid",
              "none"
            ],
            correct: 2
          }
        },
        {
          id: 6,
          title: "Basic Positioning",
          content: "CSS positioning controls how elements are placed on the page. The `position` property can be set to static (default), relative, absolute, or fixed. Relative positioning moves an element relative to its normal position, while absolute positioning removes it from the normal document flow.",
          quiz: {
            question: "What is the default CSS position value?",
            options: [
              "relative",
              "absolute",
              "static",
              "fixed"
            ],
            correct: 2
          }
        },
        {
          id: 7,
          title: "Introduction to Flexbox",
          content: "Flexbox is a modern CSS layout method that makes it easy to create flexible, responsive layouts. It allows you to control how elements are distributed, aligned, and sized within a container. Flexbox is especially useful for creating navigation menus, card layouts, and centering content.",
          quiz: {
            question: "What is the main benefit of using flexbox?",
            options: [
              "It makes text bold",
              "It creates flexible, responsive layouts",
              "It adds colors to elements",
              "It creates animations"
            ],
            correct: 1
          }
        },
        {
          id: 8,
          title: "Flexbox Properties",
          content: "Key flexbox properties include `display: flex` to create a flex container, `justify-content` to control horizontal alignment, and `align-items` to control vertical alignment. `flex-direction` determines whether items are arranged in a row or column.",
          quiz: {
            question: "Which property controls horizontal alignment in flexbox?",
            options: [
              "align-items",
              "justify-content",
              "flex-direction",
              "flex-wrap"
            ],
            correct: 1
          }
        },
        {
          id: 9,
          title: "Creating Simple Layouts",
          content: "You can create basic page layouts by combining divs with CSS properties. A common layout includes a header, navigation, main content area, and footer. Using flexbox or simple positioning, you can arrange these sections to create a professional-looking webpage structure.",
          quiz: {
            question: "What is a common layout structure for web pages?",
            options: [
              "Header, navigation, main content, footer",
              "Title, body, end",
              "Top, middle, bottom",
              "Start, content, finish"
            ],
            correct: 0
          }
        },
        {
          id: 10,
          title: "Responsive Design Basics",
          content: "Responsive design ensures your website looks good on all devices. You can use CSS media queries to apply different styles based on screen size. For example, you might use a single column layout on mobile devices and a multi-column layout on desktop computers.",
          quiz: {
            question: "What is the purpose of responsive design?",
            options: [
              "To make websites load faster",
              "To ensure websites look good on all devices",
              "To add more colors to websites",
              "To reduce file sizes"
            ],
            correct: 1
          }
        }
      ],
      finalQuiz: [
        {
          question: "What is the primary purpose of the div tag?",
          options: [
            "To create visual styling",
            "To group and organize other elements",
            "To add text content",
            "To create links"
          ],
          correct: 1
        },
        {
          question: "Which part of the box model is the space inside an element?",
          options: [
            "Margin",
            "Border",
            "Padding",
            "Content"
          ],
          correct: 2
        },
        {
          question: "What does width: 100% do?",
          options: [
            "Makes an element 100 pixels wide",
            "Makes an element take the full width of its container",
            "Makes an element invisible",
            "Makes an element centered"
          ],
          correct: 1
        },
        {
          question: "What does margin create?",
          options: [
            "Space inside an element",
            "Space outside an element",
            "A border around an element",
            "Background color"
          ],
          correct: 1
        },
        {
          question: "Which border style creates a solid line?",
          options: [
            "dashed",
            "dotted",
            "solid",
            "none"
          ],
          correct: 2
        },
        {
          question: "What is the default CSS position value?",
          options: [
            "relative",
            "absolute",
            "static",
            "fixed"
          ],
          correct: 2
        },
        {
          question: "What is the main benefit of using flexbox?",
          options: [
            "It makes text bold",
            "It creates flexible, responsive layouts",
            "It adds colors to elements",
            "It creates animations"
          ],
          correct: 1
        },
        {
          question: "Which property controls horizontal alignment in flexbox?",
          options: [
            "align-items",
            "justify-content",
            "flex-direction",
            "flex-wrap"
          ],
          correct: 1
        },
        {
          question: "What is a common layout structure for web pages?",
          options: [
            "Header, navigation, main content, footer",
            "Title, body, end",
            "Top, middle, bottom",
            "Start, content, finish"
          ],
          correct: 0
        },
        {
          question: "What is the purpose of responsive design?",
          options: [
            "To make websites load faster",
            "To ensure websites look good on all devices",
            "To add more colors to websites",
            "To reduce file sizes"
          ],
          correct: 1
        }
      ]
    },
    4: {
      title: "Styling with CSS",
      lessons: [
        {
          id: 1,
          title: "CSS Colors",
          content: "CSS offers multiple ways to specify colors: color names (red, blue), hexadecimal codes (#ff0000), RGB values (rgb(255, 0, 0)), and RGBA values with transparency. Understanding color theory helps you create visually appealing and accessible color schemes for your websites.",
          quiz: {
            question: "Which color format includes transparency?",
            options: [
              "Color names",
              "Hexadecimal codes",
              "RGB values",
              "RGBA values"
            ],
            correct: 3
          }
        },
        {
          id: 2,
          title: "Typography and Fonts",
          content: "CSS provides extensive control over text appearance through properties like `font-family`, `font-size`, `font-weight`, and `line-height`. You can use web-safe fonts or import custom fonts from services like Google Fonts to create unique typography for your websites.",
          quiz: {
            question: "Which property controls the font family?",
            options: [
              "font-size",
              "font-family",
              "font-weight",
              "line-height"
            ],
            correct: 1
          }
        },
        {
          id: 3,
          title: "Text Styling Properties",
          content: "Beyond basic typography, CSS offers properties for text alignment, decoration, and transformation. `text-align` controls horizontal alignment, `text-decoration` adds underlines or strikethroughs, and `text-transform` can make text uppercase, lowercase, or capitalized.",
          quiz: {
            question: "Which property controls text alignment?",
            options: [
              "text-decoration",
              "text-align",
              "text-transform",
              "font-style"
            ],
            correct: 1
          }
        },
        {
          id: 4,
          title: "CSS Classes and IDs",
          content: "Classes and IDs are selectors that allow you to target specific elements. Classes (using a dot) can be applied to multiple elements, while IDs (using a hash) should be unique to one element. Classes are perfect for reusable styles, while IDs are great for unique elements.",
          quiz: {
            question: "Which selector can be applied to multiple elements?",
            options: [
              "ID selector (#)",
              "Class selector (.)",
              "Tag selector",
              "Universal selector (*)"
            ],
            correct: 1
          }
        },
        {
          id: 5,
          title: "CSS Specificity",
          content: "CSS specificity determines which styles are applied when multiple rules target the same element. ID selectors have higher specificity than class selectors, which have higher specificity than tag selectors. Understanding specificity helps you write more predictable and maintainable CSS.",
          quiz: {
            question: "Which selector has the highest specificity?",
            options: [
              "Tag selector (p)",
              "Class selector (.highlight)",
              "ID selector (#header)",
              "Universal selector (*)"
            ],
            correct: 2
          }
        },
        {
          id: 6,
          title: "CSS Pseudo-classes",
          content: "Pseudo-classes allow you to style elements based on their state or position. Common pseudo-classes include `:hover` for mouse-over effects, `:active` for clicked states, and `:first-child` for targeting the first element in a group. These add interactivity to your websites.",
          quiz: {
            question: "Which pseudo-class creates a mouse-over effect?",
            options: [
              ":active",
              ":hover",
              ":first-child",
              ":last-child"
            ],
            correct: 1
          }
        },
        {
          id: 7,
          title: "CSS Transitions",
          content: "Transitions create smooth animations when CSS properties change, such as when hovering over a button. The `transition` property specifies which properties to animate and how long the animation should take. Transitions make websites feel more polished and interactive.",
          quiz: {
            question: "What do CSS transitions create?",
            options: [
              "Static effects",
              "Smooth animations when properties change",
              "Instant changes",
              "Background images"
            ],
            correct: 1
          }
        },
        {
          id: 8,
          title: "Background Properties",
          content: "CSS background properties control the appearance behind elements. You can set background colors, images, positioning, and repetition. Background images can be positioned, sized, and repeated to create various visual effects and patterns.",
          quiz: {
            question: "Which property sets a background image?",
            options: [
              "background-color",
              "background-image",
              "background-position",
              "background-size"
            ],
            correct: 1
          }
        },
        {
          id: 9,
          title: "CSS Units",
          content: "CSS supports various units for sizing elements: pixels (px) for fixed sizes, percentages (%) for relative sizes, em and rem for font-relative sizes, and viewport units (vw, vh) for screen-relative sizes. Choosing the right units is crucial for responsive design.",
          quiz: {
            question: "Which unit is relative to the font size?",
            options: [
              "px",
              "%",
              "em",
              "vw"
            ],
            correct: 2
          }
        },
        {
          id: 10,
          title: "CSS Best Practices",
          content: "Good CSS practices include using meaningful class names, organizing your code logically, avoiding overly specific selectors, and commenting your code. Following these practices makes your CSS more maintainable, readable, and easier to debug.",
          quiz: {
            question: "What is a good CSS practice?",
            options: [
              "Using very specific selectors",
              "Using meaningful class names",
              "Avoiding comments",
              "Putting all styles in one file"
            ],
            correct: 1
          }
        }
      ],
      finalQuiz: [
        {
          question: "Which color format includes transparency?",
          options: [
            "Color names",
            "Hexadecimal codes",
            "RGB values",
            "RGBA values"
          ],
          correct: 3
        },
        {
          question: "Which property controls the font family?",
          options: [
            "font-size",
            "font-family",
            "font-weight",
            "line-height"
          ],
          correct: 1
        },
        {
          question: "Which property controls text alignment?",
          options: [
            "text-decoration",
            "text-align",
            "text-transform",
            "font-style"
          ],
          correct: 1
        },
        {
          question: "Which selector can be applied to multiple elements?",
          options: [
            "ID selector (#)",
            "Class selector (.)",
            "Tag selector",
            "Universal selector (*)"
          ],
          correct: 1
        },
        {
          question: "Which selector has the highest specificity?",
          options: [
            "Tag selector (p)",
            "Class selector (.highlight)",
            "ID selector (#header)",
            "Universal selector (*)"
          ],
          correct: 2
        },
        {
          question: "Which pseudo-class creates a mouse-over effect?",
          options: [
            ":active",
            ":hover",
            ":first-child",
            ":last-child"
          ],
          correct: 1
        },
        {
          question: "What do CSS transitions create?",
          options: [
            "Static effects",
            "Smooth animations when properties change",
            "Instant changes",
            "Background images"
          ],
          correct: 1
        },
        {
          question: "Which property sets a background image?",
          options: [
            "background-color",
            "background-image",
            "background-position",
            "background-size"
          ],
          correct: 1
        },
        {
          question: "Which unit is relative to the font size?",
          options: [
            "px",
            "%",
            "em",
            "vw"
          ],
          correct: 2
        },
        {
          question: "What is a good CSS practice?",
          options: [
            "Using very specific selectors",
            "Using meaningful class names",
            "Avoiding comments",
            "Putting all styles in one file"
          ],
          correct: 1
        }
      ]
    },
    5: {
      title: "Final Project – Build a Personal Portfolio",
      lessons: [
        {
          id: 1,
          title: "Project Planning",
          content: "Before coding, plan your portfolio structure and content. Decide what sections you want (about, skills, projects, contact), what information to include, and how to organize it. Sketch a basic layout to guide your development process and ensure a cohesive final product.",
          quiz: {
            question: "What should you do before starting to code your portfolio?",
            options: [
              "Start coding immediately",
              "Plan the structure and content",
              "Choose colors first",
              "Add images first"
            ],
            correct: 1
          }
        },
        {
          id: 2,
          title: "Creating the HTML Structure",
          content: "Build the HTML skeleton for your portfolio using semantic tags like `<header>`, `<nav>`, `<main>`, `<section>`, and `<footer>`. Include all the content sections you planned, using appropriate headings, paragraphs, and lists to organize your information clearly.",
          quiz: {
            question: "Which semantic tag should contain the main content?",
            options: [
              "<header>",
              "<nav>",
              "<main>",
              "<footer>"
            ],
            correct: 2
          }
        },
        {
          id: 3,
          title: "Adding Navigation",
          content: "Create a navigation menu that links to different sections of your portfolio. Use an unordered list with links that point to section IDs. This allows users to jump to specific parts of your page and creates a professional, user-friendly experience.",
          quiz: {
            question: "What should navigation links point to?",
            options: [
              "External websites",
              "Section IDs on the same page",
              "Email addresses",
              "Social media profiles"
            ],
            correct: 1
          }
        },
        {
          id: 4,
          title: "Styling the Header",
          content: "Style your header section to create a strong first impression. Use CSS to add background colors, typography, and spacing. Consider adding a profile image or logo, and make sure the header is visually appealing and reflects your personal brand.",
          quiz: {
            question: "What should the header create?",
            options: [
              "A strong first impression",
              "Confusion",
              "A long loading time",
              "Technical errors"
            ],
            correct: 0
          }
        },
        {
          id: 5,
          title: "Creating Content Sections",
          content: "Style each content section with appropriate spacing, typography, and visual hierarchy. Use CSS to create clear separation between sections, consistent styling throughout, and an easy-to-read layout. Consider using cards or containers to organize information.",
          quiz: {
            question: "What helps create clear separation between sections?",
            options: [
              "Using the same colors everywhere",
              "Appropriate spacing and visual hierarchy",
              "Making everything the same size",
              "Using only one font"
            ],
            correct: 1
          }
        },
        {
          id: 6,
          title: "Adding Images and Media",
          content: "Include relevant images, such as project screenshots, profile photos, or skill icons. Use the `<img>` tag with proper alt text for accessibility. Consider using CSS to control image sizes, add borders, or create hover effects to make your portfolio more interactive.",
          quiz: {
            question: "Why is alt text important for images?",
            options: [
              "It makes images load faster",
              "It improves accessibility",
              "It reduces file size",
              "It adds colors"
            ],
            correct: 1
          }
        },
        {
          id: 7,
          title: "Responsive Design Implementation",
          content: "Make your portfolio responsive by using CSS media queries and flexible layouts. Ensure it looks good on mobile devices, tablets, and desktop computers. Use relative units, flexbox, and responsive images to create a consistent experience across all screen sizes.",
          quiz: {
            question: "What should responsive design ensure?",
            options: [
              "The site looks good on all devices",
              "The site loads very fast",
              "The site uses many colors",
              "The site has many animations"
            ],
            correct: 0
          }
        },
        {
          id: 8,
          title: "Adding Interactive Elements",
          content: "Enhance your portfolio with interactive elements like hover effects, smooth scrolling navigation, and CSS transitions. These small details make your portfolio feel more polished and engaging. Use pseudo-classes and transitions to create subtle but effective interactions.",
          quiz: {
            question: "What do interactive elements add to a portfolio?",
            options: [
              "More text content",
              "A more polished and engaging feel",
              "Slower loading times",
              "Technical complexity"
            ],
            correct: 1
          }
        },
        {
          id: 9,
          title: "Testing and Debugging",
          content: "Test your portfolio across different browsers and devices to ensure it works correctly. Check for broken links, responsive behavior, and visual consistency. Debug any issues you find and make adjustments to improve the user experience and functionality.",
          quiz: {
            question: "What should you test across different browsers?",
            options: [
              "Only the colors",
              "The functionality and appearance",
              "Only the text content",
              "Only the images"
            ],
            correct: 1
          }
        },
        {
          id: 10,
          title: "Final Polish and Launch",
          content: "Add final touches like a favicon, meta tags for SEO, and any additional content or styling. Review your portfolio for consistency, accessibility, and professional presentation. Once satisfied, your portfolio is ready to showcase your HTML and CSS skills to the world!",
          quiz: {
            question: "What should you add for final polish?",
            options: [
              "More text content",
              "A favicon and meta tags",
              "More images",
              "More colors"
            ],
            correct: 1
          }
        }
      ],
      finalQuiz: [
        {
          question: "What should you do before starting to code your portfolio?",
          options: [
            "Start coding immediately",
            "Plan the structure and content",
            "Choose colors first",
            "Add images first"
          ],
          correct: 1
        },
        {
          question: "Which semantic tag should contain the main content?",
          options: [
            "<header>",
            "<nav>",
            "<main>",
            "<footer>"
          ],
          correct: 2
        },
        {
          question: "What should navigation links point to?",
          options: [
            "External websites",
            "Section IDs on the same page",
            "Email addresses",
            "Social media profiles"
          ],
          correct: 1
        },
        {
          question: "What should the header create?",
          options: [
            "A strong first impression",
            "Confusion",
            "A long loading time",
            "Technical errors"
          ],
          correct: 0
        },
        {
          question: "What helps create clear separation between sections?",
          options: [
            "Using the same colors everywhere",
            "Appropriate spacing and visual hierarchy",
            "Making everything the same size",
            "Using only one font"
          ],
          correct: 1
        },
        {
          question: "Why is alt text important for images?",
          options: [
            "It makes images load faster",
            "It improves accessibility",
            "It reduces file size",
            "It adds colors"
          ],
          correct: 1
        },
        {
          question: "What should responsive design ensure?",
          options: [
            "The site looks good on all devices",
            "The site loads very fast",
            "The site uses many colors",
            "The site has many animations"
          ],
          correct: 0
        },
        {
          question: "What do interactive elements add to a portfolio?",
          options: [
            "More text content",
            "A more polished and engaging feel",
            "Slower loading times",
            "Technical complexity"
          ],
          correct: 1
        },
        {
          question: "What should you test across different browsers?",
          options: [
            "Only the colors",
            "The functionality and appearance",
            "Only the text content",
            "Only the images"
          ],
          correct: 1
        },
        {
          question: "What should you add for final polish?",
          options: [
            "More text content",
            "A favicon and meta tags",
            "More images",
            "More colors"
          ],
          correct: 1
        }
      ]
    }
  }

  // Helper functions
  const markLessonComplete = (partId, lessonId) => {
    setCompletedLessons(prev => ({
      ...prev,
      [`${partId}-${lessonId}`]: true
    }))
  }

  const handleFinalQuizAnswer = (partId, questionIndex, selectedAnswer) => {
    setFinalQuizAnswers(prev => ({
      ...prev,
      [`${partId}-${questionIndex}`]: selectedAnswer
    }))
  }

  const calculateFinalQuizScore = (partId) => {
    const partQuiz = courseData[partId].finalQuiz
    let correctAnswers = 0
    
    partQuiz.forEach((question, index) => {
      const userAnswer = finalQuizAnswers[`${partId}-${index}`]
      if (userAnswer === question.correct) {
        correctAnswers++
      }
    })
    
    return Math.round((correctAnswers / partQuiz.length) * 100)
  }

  const submitFinalQuiz = (partId) => {
    const score = calculateFinalQuizScore(partId)
    setPartScores(prev => ({
      ...prev,
      [partId]: score
    }))
    
    if (score >= 60) {
      setCurrentPart(prev => Math.min(prev + 1, 5))
      setCurrentLesson(1)
      setShowFinalQuiz(false)
      setFinalQuizAnswers({})
    }
  }

  const canAccessPart = (partId) => {
    if (partId === 1) return true
    return partScores[partId - 1] >= 60
  }

  const getLessonsToShow = (partId) => {
    const lessons = courseData[partId].lessons
    const completedCount = lessons.filter(lesson => 
      completedLessons[`${partId}-${lesson.id}`]
    ).length
    
    return Math.min(completedCount + 1, lessons.length)
  }

  const nextLesson = (partId) => {
    const lessonsToShow = getLessonsToShow(partId)
    if (currentLesson < lessonsToShow) {
      setCurrentLesson(prev => prev + 1)
    } else if (lessonsToShow === courseData[partId].lessons.length) {
      setShowFinalQuiz(true)
    }
  }

  // Lesson Component
  const LessonComponent = ({ lesson, partId, onComplete }) => {
    const [selectedAnswer, setSelectedAnswer] = useState(null)
    const [showResult, setShowResult] = useState(false)

    const handleAnswerSelect = (answerIndex) => {
      setSelectedAnswer(answerIndex)
      setShowResult(true)
      
      setTimeout(() => {
        setShowResult(false)
        setSelectedAnswer(null)
        onComplete()
      }, 2000)
    }

    return (
      <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
        <h3 className="text-xl font-semibold mb-4 text-gray-900">
          Lesson {lesson.id} – "{lesson.title}"
        </h3>
        
        <div className="mb-6">
          <p className="text-gray-700 leading-relaxed">{lesson.content}</p>
        </div>
        
        <div className="border-t pt-6">
          <h4 className="font-medium mb-4 text-gray-900">Quiz:</h4>
          <p className="mb-4 text-gray-700">{lesson.quiz.question}</p>
          
          <div className="space-y-3">
            {lesson.quiz.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={showResult}
                className={`w-full text-left p-3 rounded-lg border transition-colors ${
                  selectedAnswer === index
                    ? showResult
                      ? index === lesson.quiz.correct
                        ? 'bg-green-100 border-green-300 text-green-800'
                        : 'bg-red-100 border-red-300 text-red-800'
                      : 'bg-blue-100 border-blue-300 text-blue-800'
                    : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                }`}
              >
                {String.fromCharCode(65 + index)}) {option}
                {showResult && index === lesson.quiz.correct && (
                  <span className="ml-2">✅</span>
                )}
                {showResult && selectedAnswer === index && index !== lesson.quiz.correct && (
                  <span className="ml-2">❌</span>
                )}
              </button>
            ))}
          </div>
          
          {showResult && (
            <div className="mt-4 p-3 rounded-lg bg-gray-50">
              <p className="text-sm text-gray-600">
                {selectedAnswer === lesson.quiz.correct 
                  ? "Correct! Well done!" 
                  : `Incorrect. The correct answer is: ${String.fromCharCode(65 + lesson.quiz.correct)}) ${lesson.quiz.options[lesson.quiz.correct]}`
                }
              </p>
            </div>
          )}
        </div>
      </div>
    )
  }

  // Final Quiz Component
  const FinalQuizComponent = ({ partId, onSubmit }) => {
    const getAnswers = () => {
      const answers = {}
      courseData[partId].finalQuiz.forEach((_, index) => {
        answers[index] = finalQuizAnswers[`${partId}-${index}`] || null
      })
      return answers
    }

    const handleAnswerChange = (questionIndex, answerIndex) => {
      handleFinalQuizAnswer(partId, questionIndex, answerIndex)
    }

    const submitQuiz = () => {
      onSubmit()
    }

    const answers = getAnswers()
    const allAnswered = Object.values(answers).every(answer => answer !== null)

    return (
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-xl font-semibold mb-6 text-gray-900">
          Final Quiz – Part {partId}: {courseData[partId].title}
        </h3>
        
        <div className="space-y-6">
          {courseData[partId].finalQuiz.map((question, questionIndex) => (
            <div key={questionIndex} className="border-b pb-4">
              <p className="font-medium mb-3 text-gray-900">
                {questionIndex + 1}. {question.question}
              </p>
              
              <div className="space-y-2">
                {question.options.map((option, optionIndex) => (
                  <label key={optionIndex} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name={`question-${questionIndex}`}
                      value={optionIndex}
                      checked={answers[questionIndex] === optionIndex}
                      onChange={() => handleAnswerChange(questionIndex, optionIndex)}
                      className="text-blue-600"
                    />
                    <span className="text-gray-700">
                      {String.fromCharCode(65 + optionIndex)}) {option}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 pt-4 border-t">
          <button
            onClick={submitQuiz}
            disabled={!allAnswered}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              allAnswered
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Submit Quiz
          </button>
        </div>
      </div>
    )
  }

  // Calculate overall progress
  useEffect(() => {
    let totalLessons = 0
    let completedTotal = 0
    
    Object.keys(courseData).forEach(partId => {
      const part = courseData[partId]
      totalLessons += part.lessons.length
      
      part.lessons.forEach(lesson => {
        if (completedLessons[`${partId}-${lesson.id}`]) {
          completedTotal++
        }
      })
    })
    
    setCourseProgress(Math.round((completedTotal / totalLessons) * 100))
  }, [completedLessons])

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            HTML & CSS Basics: Build Your First Web Page
          </h1>
          <p className="text-gray-600">
            Master the fundamentals of web development with this interactive course
          </p>
          <div className="mt-4">
            <div className="bg-gray-200 rounded-full h-2 max-w-md mx-auto">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${courseProgress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-500 mt-2">{courseProgress}% Complete</p>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {Object.keys(courseData).map(partId => (
            <button
              key={partId}
              onClick={() => {
                if (canAccessPart(parseInt(partId))) {
                  setCurrentPart(parseInt(partId))
                  setCurrentLesson(1)
                  setShowFinalQuiz(false)
                }
              }}
              disabled={!canAccessPart(parseInt(partId))}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                currentPart === parseInt(partId)
                  ? 'bg-blue-600 text-white'
                  : canAccessPart(parseInt(partId))
                  ? 'bg-white text-gray-700 hover:bg-gray-50 border'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Part {partId}
              {partScores[partId] && (
                <span className="ml-2 text-xs">
                  ({partScores[partId]}%)
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Current Part Content */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Part {currentPart}: {courseData[currentPart].title}
          </h2>
          
          {showFinalQuiz ? (
            <FinalQuizComponent 
              partId={currentPart}
              onSubmit={() => submitFinalQuiz(currentPart)}
            />
          ) : (
            <div>
              {courseData[currentPart].lessons
                .slice(0, getLessonsToShow(currentPart))
                .map(lesson => (
                  <LessonComponent
                    key={lesson.id}
                    lesson={lesson}
                    partId={currentPart}
                    onComplete={() => {
                      markLessonComplete(currentPart, lesson.id)
                      if (lesson.id === getLessonsToShow(currentPart)) {
                        nextLesson(currentPart)
                      }
                    }}
                  />
                ))}
              
              {getLessonsToShow(currentPart) < courseData[currentPart].lessons.length && (
                <div className="text-center mt-6">
                  <p className="text-gray-600 mb-4">
                    Complete the current lesson to unlock the next one
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Course Completion */}
        {courseProgress === 100 && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
            <h3 className="text-xl font-semibold text-green-800 mb-2">
              🎉 Congratulations!
            </h3>
            <p className="text-green-700">
              You've completed the HTML & CSS Basics course! You now have the skills to build your own web pages.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default HTMLCSSCourse 
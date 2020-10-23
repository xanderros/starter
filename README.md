# Setup project
Static site workflow using GULP 4 with Sass and Nunjucks.

## Dependencies
- Node.js (>=6.0.0)
- Gulp

#### Installing Gulp

Enter this into your terminal:

```
npm install --global gulp-cli
```

## Setting up the project
Run: 
```
npm install
```

Then run:
```
gulp
```

Then open one of this links in your browser:
```
   Local: http://localhost:3000
```

## Usage
#### Production ready files
- Production ready files can be built using:
```
gulp --env production
```
#### The Project
- `build` folder contains all the compiled files
- `src` folder contains all the source files
#### Insert SVG icons
- Put the SVG file in folder `src/icons/`
- Use this template to insert SVG icons into HTML:
```
<svg class="inline-svg" src="../icons/main-icon.svg"></svg>
```
In this case, the SVG icons will be inserted directly into the HTML code.

#### HTML templates
- The source html-templates for all pages are in folder `src/templates`
- Basic template for all pages - `src/templates/layouts/_layout.html`

#### Images for social networks
`socialImg: social-main_blog-1.jpg` -------------------- 1200x630px

`socialImgSquare: social-square_blog-1.jpg` ---------- 500x500px

`socialImgTwitter: social-twitter_blog-1.jpg` ------ 1200x600px



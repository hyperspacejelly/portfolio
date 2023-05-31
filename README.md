# My professional portfolio

This is the public repo for my portfolio website. It was built using **React.js** and a small PHP/JSON backend. 

Web design / UI is by myself. This site is responsive. 

**This repo only contains the front-end code.**

## Info
All the content is fetched from my small PHP API. Said content is fetched when initially loading the site and whenever the site language is switched.

There is very simple routing implemented (using react-router-dom), with the index being the french version and "/en" it's english version.

The site's main section is composed of 4 "tab" components that take another component as a prop (the content that is displayed when they are opened.)

The site also contains a contact form that communicates with my API to send me a message directly in my inbox (that part was built using [PHPmailer](https://github.com/PHPMailer/PHPMailer).

All the icons used were from [Feather Icons](https://feathericons.com/).

- **__Lucien Jély__**

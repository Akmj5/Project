const { name } = require("ejs");

const form = [...document.querySelector('.form').children];
form.forEach((item,i)=>{
    setTimeout(() => {
        item.getElementsByClassName.opacity = 1;

    }, i*100);
})
    
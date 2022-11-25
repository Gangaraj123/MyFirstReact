//countdown timer
/* const countdown = () => {
    const countDate = new Date('January 05, 2022 00:00:00').getTime();
    const now = new Date().getTime();
    const gap = countDate - now;

    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const textDay = Math.floor(gap / day);
    const textHour = Math.floor((gap % day) / hour);
    const textMinute = Math.floor((gap % hour) / minute);
    const textSecond = Math.floor((gap % minute) / second);

    document.querySelector('.dayVal').innerHTML = textDay; 
    document.querySelector('.hourVal').innerHTML = textHour; 
    document.querySelector('.minuteVal').innerHTML = textMinute; 
    document.querySelector('.secondVal').innerHTML = textSecond; 
}
setInterval(countdown, 1000);
 */

//slideshow
const mainPhoto = document.querySelector(".image-holder");
const slidePrev = document.querySelector('.slide-prev');
const slideNext = document.querySelector('.slide-next');
slidePrev.addEventListener('click', slidePrevImg);
slideNext.addEventListener('click', slideNextImg);
const slides = [
    {
        image: '/youthrun/img1.jpg'
    },
    {
        image: '/youthrun/img2.jpg'
    },
    {
        image: '/youthrun/img3.jpg'
    },
    {
        image: '/youthrun/img4.jpg'
    },
    {
        image: '/youthrun/img5.jpg'
    }
];

let i = 1;
function show()
{
    mainPhoto.style.background = "url('" + slides[i].image + "')";
    mainPhoto.style.backgroundSize = "cover";
    mainPhoto.style.backgroundRepeat = "no-repeat";
    mainPhoto.style.borderRadius = '1rem';
    mainPhoto.style.transition = 'ease-in 0.5s';
}
show();

function slideNextImg() {
    i++;
    if (i > slides.length - 1) {
        i = 0;
    } 
    show();
}

function slidePrevImg() {
    i--;
    if (i < slides.length - slides.length) {
    i = slides.length - 1;
    } 
    show();
}

setInterval(slideNextImg, 5000);

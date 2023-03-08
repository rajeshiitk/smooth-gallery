const images = document.querySelector(".images");

window.onmousedown = (e) => {
    console.log(images.dataset);
    images.dataset.mouseDownAt = e.clientX;
}

window.onmousemove = (e) => {
    if (images.dataset.mouseDownAt == 0) return;

    const mouseChange = parseFloat(images.dataset.mouseDownAt) - e.clientX;
    const maxChange = window.innerWidth / 2;

    const percentage = (mouseChange) / maxChange * -100;
    const nextPercentageFree = parseFloat(images.dataset.prevPercentage) + percentage;
    const nextPercentage = Math.max(Math.min(nextPercentageFree, 0), -100);
    console.log(percentage);
    images.dataset.percentage = nextPercentage;
    images.style.transform = `translate(${nextPercentage}%, -50%)`;

    images.animate({
        transform: `translate(${nextPercentage}%, -50%)`
    }, { duration: 1200, fill: "forwards" });

    for (const image of images.getElementsByClassName("image")) {
        image.animate({
            objectPosition: `${100 + nextPercentage}% center`
        }, { duration: 1200, fill: "forwards" });
    }
}


window.onmouseup = () => {
    images.dataset.mouseDownAt = "0";
    images.dataset.prevPercentage = images.dataset.percentage
}
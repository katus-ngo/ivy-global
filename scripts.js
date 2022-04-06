const mobileNavbar = $('#mobile-navbar')
const ivyHamburgerIcon = $('#ivy-hamburger-icon')
const desktopRegisterForm = $('#register-form-desktop')
const mobileRegisterForm = $('#mobile')
const desktopRegisterButton = $('#desktop-register-button')
const mobileRegisterButton = $('#mobile-register-button')

const navbar = $(".menu");
const sticky = navbar.offset().top;
window.onscroll = function() {
    console.log('sticky',sticky)
    console.log('window.scrollY',window.scrollY)
    if (window.scrollY > sticky) {
        navbar.addClass("sticky")
    } else {
        navbar.removeClass("sticky");
    }
};


ivyHamburgerIcon.click(function () {
    if (mobileNavbar.hasClass('active')) {
        mobileNavbar.removeClass('active')
    } else {
        mobileNavbar.addClass('active')
    }
})

function onRegister(name, phone, email, address) {
    const errors = []

    if (name.trim() == '') {
        errors.push("Vui lòng điền Họ & tên phụ huynh!");
    }
    if (phone.trim() == '') {
        errors.push("Vui lòng điền số điện thoại!");
    }
    if (email.trim() == '') {
        errors.push("Vui lòng điền email!");
    }
    if (address.trim() == '') {
        errors.push("Vui lòng điền khu vực!");
    }

    if (errors.length > 0) {
        swal({
            title: "Lỗi",
            text: errors[0],
            icon: "warning",
        })
        return
    }

    let data = {
        'entry.784569663': name,
        'entry.43756091': phone,
        'entry.409555455': email,
        'entry.2041786407': address,
    }

    let queryString = new URLSearchParams(data)
    queryString = queryString.toString()

    let url = 'https://docs.google.com/forms/u/4/d/e/1FAIpQLSdIv2idjAUuxfCWSKAjIi9Kg-xI-iVe_F9g6kjn6OOO-TSBvw/formResponse?pli=1'
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true)
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        swal({
            title: "Chúc mừng",
            text: "Bạn đã đăng kí thành công",
            icon: "success",
        })
    }
    xhr.send(queryString)

}

desktopRegisterButton.click(function () {
    const name = $('#name-desktop').val();
    const phone = $('#phone-desktop').val();
    const email = $('#email-desktop').val();
    const address = $('#address-desktop').val();
    onRegister(name, phone, email, address);

})

mobileRegisterButton.click(function () {
    const name = $('#name-mobile').val();
    const phone = $('#phone-mobile').val();
    const email = $('#email-mobile').val();
    const address = $('#address-mobile').val();
    onRegister(name, phone, email, address);
})

const easeInCubic = function (t) {
    return t * t * t
}

const scrollToElem = (startTime, currentTime, duration, scrollEndElemTop, startScrollOffset) => {
    const runtime = currentTime - startTime;
    let progress = runtime / duration;

    progress = Math.min(progress, 1);

    const ease = easeInCubic(progress);

    window.scroll(0, startScrollOffset + (scrollEndElemTop * ease));
    if (runtime < duration) {
        requestAnimationFrame((timestamp) => {
            const currentTime = timestamp || new Date().getTime();
            scrollToElem(startTime, currentTime, duration, scrollEndElemTop, startScrollOffset);
        })
    }
}

const scrollElems = document.querySelectorAll('.smooth-scroll');
for (let i = 0; i < scrollElems.length; i++) {
    const elem = scrollElems[i];

    elem.addEventListener('click', function (e) {
        e.preventDefault();
        const elemHref = elem.getAttribute("href")
        // 1. Get the element id to which you want to scroll
        const scrollElemId = elemHref.split('#')[1];

        const scrollEndElem = document.getElementById(scrollElemId);

        const anim = requestAnimationFrame((timestamp) => {
            const stamp = timestamp || new Date().getTime();
            const duration = 1200;
            const start = stamp;

            const startScrollOffset = window.scrollY;
            const scrollEndElemTop = scrollEndElem.getBoundingClientRect().top;

            scrollToElem(start, stamp, duration, scrollEndElemTop, startScrollOffset);
        })
    })
}



const navItemMobile = document.querySelectorAll('.nav-item-mobile');

for (let i = 0; i < scrollElems.length; i++) {
    const elem = scrollElems[i];
    elem.addEventListener('click', function (e) {
        e.preventDefault();

        mobileNavbar.removeClass('active')
    })
}
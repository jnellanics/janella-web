function isAdmin() {
    return localStorage.getItem("isAdmin") === "true";
}

// ================= INIT =================
if (localStorage.getItem("isAdmin") === null) {
    localStorage.setItem("isAdmin", "false");
}

// AUTO LOAD PER PAGE
window.onload = function () {
    if (document.getElementById("blogList")) loadBlogs();
    if (document.getElementById("photoGallery")) loadPhotos();
    if (document.getElementById("learnList")) loadLearn();


};

//
// ================= BLOG =================
//
function addBlog() {
    let title = document.getElementById("blogTitle");
    let content = document.getElementById("blogContent");

    if (!title || !content) return;

    if (!title.value || !content.value) return;

    let blogs = JSON.parse(localStorage.getItem("blogs")) || [];
    blogs.push({ title: title.value, content: content.value });

    localStorage.setItem("blogs", JSON.stringify(blogs));

    title.value = "";
    content.value = "";

    loadBlogs();
}

function loadBlogs() {
    let blogList = document.getElementById("blogList");
    if (!blogList) return;

    blogList.innerHTML = "";

    let blogs = JSON.parse(localStorage.getItem("blogs")) || [];

    blogs.forEach((blog, index) => {
        let div = document.createElement("div");

        let buttons = "";
        if (isAdmin()) {
            buttons = `
                <button onclick="editBlog(${index})">Edit</button>
                <button onclick="deleteBlog(${index})">Delete</button>
            `;
        }

        div.innerHTML = `
            <h3>${blog.title}</h3>
            <p>${blog.content}</p>
            ${buttons}
        `;

        blogList.appendChild(div);
    });
}

function deleteBlog(index) {
    if (!isAdmin()) return;

    let blogs = JSON.parse(localStorage.getItem("blogs")) || [];
    blogs.splice(index, 1);
    localStorage.setItem("blogs", JSON.stringify(blogs));

    loadBlogs();
}

function editBlog(index) {
    if (!isAdmin()) return;

    let blogs = JSON.parse(localStorage.getItem("blogs")) || [];

    let newTitle = prompt("Edit title:", blogs[index].title);
    let newContent = prompt("Edit content:", blogs[index].content);

    if (newTitle && newContent) {
        blogs[index].title = newTitle;
        blogs[index].content = newContent;

        localStorage.setItem("blogs", JSON.stringify(blogs));
        loadBlogs();
    }
}

//
// ================= PHOTOS =================
//
function addPhoto() {
    let input = document.getElementById("photoInput");
    if (!input || !input.files[0]) return;

    let file = input.files[0];

    let reader = new FileReader();
    reader.onload = function (e) {
        let photos = JSON.parse(localStorage.getItem("photos")) || [];
        photos.push(e.target.result);

        localStorage.setItem("photos", JSON.stringify(photos));
        loadPhotos();
    };

    reader.readAsDataURL(file);
}

function loadPhotos() {
    let gallery = document.getElementById("photoGallery");
    if (!gallery) return;

    gallery.innerHTML = "";

    let photos = JSON.parse(localStorage.getItem("photos")) || [];

    photos.forEach((photo, index) => {
        let div = document.createElement("div");

        let buttons = "";
        if (isAdmin()) {
            buttons = `<button onclick="deletePhoto(${index})">Delete</button>`;
        }

        div.innerHTML = `
            <img src="${photo}">
            <br>
            ${buttons}
        `;

        gallery.appendChild(div);
    });
}

function deletePhoto(index) {
    if (!isAdmin()) return;

    let photos = JSON.parse(localStorage.getItem("photos")) || [];
    photos.splice(index, 1);

    localStorage.setItem("photos", JSON.stringify(photos));
    loadPhotos();
}

//
// ================= LEARNED =================
//
function addLearn() {
    let input = document.getElementById("learnInput");
    if (!input || !input.value) return;

    let learns = JSON.parse(localStorage.getItem("learns")) || [];
    learns.push(input.value);

    localStorage.setItem("learns", JSON.stringify(learns));

    input.value = "";
    loadLearn();
}

function loadLearn() {
    let list = document.getElementById("learnList");
    if (!list) return;

    list.innerHTML = "";

    let learns = JSON.parse(localStorage.getItem("learns")) || [];

    learns.forEach((item, index) => {
        let li = document.createElement("li");

        let buttons = "";
        if (isAdmin()) {
            buttons = `
                <button onclick="editLearn(${index})">Edit</button>
                <button onclick="deleteLearn(${index})">Delete</button>
            `;
        }

        li.innerHTML = `${item} ${buttons}`;
        list.appendChild(li);
    });
}

function deleteLearn(index) {
    if (!isAdmin()) return;

    let learns = JSON.parse(localStorage.getItem("learns")) || [];
    learns.splice(index, 1);

    localStorage.setItem("learns", JSON.stringify(learns));
    loadLearn();
}

function editLearn(index) {
    if (!isAdmin()) return;

    let learns = JSON.parse(localStorage.getItem("learns")) || [];

    let newValue = prompt("Edit item:", learns[index]);

    if (newValue) {
        learns[index] = newValue;

        localStorage.setItem("learns", JSON.stringify(learns));
        loadLearn();
    }
}


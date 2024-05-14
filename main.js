let eluserTemplate = document.querySelector(".user-template").content;
let userFragment = new DocumentFragment();
let eluserList = document.querySelector(".comments__users-list");

let elPostsList = document.querySelector(".comments__posts-lists");
let elPostsFragment = document.querySelector(".post-template").content;
let postFragment = document.createDocumentFragment();

let elCommentsList = document.querySelector(".comments__list");
let elCommentsFragment = document.querySelector(".comments-fragmet").content;
let commentFragment = document.createDocumentFragment();

const POSTS__URL = "https://jsonplaceholder.typicode.com/posts";
const USERS__URL = "https://jsonplaceholder.typicode.com/users";

function getData(url) {
  fetch(url)
    .then((res) => {
      if (!res.ok) throw new Error("fetched data is not valid");

      return res.json();
    })
    .then((data) => renderUserData(data, eluserList))
    .catch((error) => console.log(error));
}
getData(USERS__URL);

function renderUserData(data, node) {
  node.innerHtml = "";
  data.forEach((item, i) => {
    let clone = eluserTemplate.cloneNode(true);
    clone.querySelector(".user__item").dataset.userId = item.id;
    clone.querySelector(".user__id").textContent = ++i;
    clone.querySelector(".user__name").textContent = item.username;
    clone.querySelector(".user__email").textContent = item.email;
    clone.querySelector(
      ".user-address-data"
    ).textContent = `${item.address?.street}, ${item.address?.city}`;
    clone.querySelector(".user__phone").textContent = item.phone
      .split("")
      .slice(0, 13)
      .join("");
    userFragment.appendChild(clone);
  });

  node.appendChild(userFragment);
}

eluserList.addEventListener("click", (e) => {
  if (!e.target.matches(".user__btn")) return;
  let userId = e.target.closest(".user__item").dataset.userId;
  fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
    .then((res) => {
      if (!res.ok) throw new Error("error in posts");
      return res.json();
    })
    .then((data) => renderPosts(data, elPostsList))
    .catch((error) => console.log(error));
});

function renderPosts(data, node) {
  node.innerHTML = "";
  data.forEach((item, i) => {
    let clone = elPostsFragment.cloneNode(true);
    clone.querySelector(".posts__item").dataset.postId = item.id;
    clone.querySelector(".post__id").textContent = ++i;
    clone.querySelector(".post__body").textContent = item.body;

    postFragment.appendChild(clone);
  });

  node.appendChild(postFragment);
}

elPostsList.addEventListener("click", (e) => {
  if (!e.target.matches(".post__btn")) return;

  let postId = e.target.closest(".posts__item").dataset.postId;

  fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
    .then((res) => {
      if (!res.ok) throw new Error("error in posts");
      return res.json();
    })
    .then((data) => renderComments(data, elCommentsList))
    .catch((error) => console.log(error));
});

function renderComments(data, node) {
  node.innerHTML = "";
  data.forEach((item, i) => {
    let clone = elCommentsFragment.cloneNode(true);
    clone.querySelector(".com__id").textContent = ++i;
    clone.querySelector(".com__name").textContent = item.name;
    clone.querySelector(".com-desc").textContent = item.body;
    clone.querySelector(".com__email").textContent = item.email;

    commentFragment.appendChild(clone);
  });

  node.appendChild(commentFragment);
}

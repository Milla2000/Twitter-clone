function fetchUser() {
  fetch("https://jsonplaceholder.typicode.com/users/4")
    .then((response) => response.json())
    .then((user) => {
      // Build User Profile Page
      var profileHtml = `
                <h1>${user.name}</h1>
                <img class="user-img" src="/Gold_new.jpg.twimg.1920.jpg" alt="${user.username}">
                <p>Email: ${user.email}</p>
                <p>Username: ${user.username}</p>
                <p>Phone: ${user.phone}</p>
                <p>Website: ${user.website}</p>
            `;
      document.getElementById("profile").innerHTML = profileHtml;

      fetchPosts(user.id);
    })
    .catch((error) => {
      console.error("Error fetching user:", error);
    });
}

function fetchPosts(userId) {
  fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
    .then((response) => response.json())
    .then((posts) => {
      var postsHtml = "";
      posts.forEach((post) => {
        postsHtml += `
          <div class="post">
            <h3>${post.title}</h3>
            <img class="user-img" src="/Gold_new.jpg.twimg.1920.jpg" alt="Post Image">
            <p>${post.body}</p>
            <button class="btn" onclick="fetchComments(${post.id})">Show Comments</button>
            <div id="comments_${post.id}" class="comments-box"></div>
          </div>
        `;
      });
      document.getElementById("posts").innerHTML = postsHtml;
    })
    .catch((error) => {
      console.error("Error fetching posts:", error);
    });
}
//this is the code for the comments to be displayed in the popup window
function fetchComments(postId) {
  var popup = document.getElementById("popup");

  if (!popup) {
    popup = document.createElement("div");
    popup.className = "popup";
    popup.id = "popup";

    var commentsContainer = document.createElement("div");
    commentsContainer.id = `comments_${postId}`;

    fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
      .then((response) => response.json())
      .then((comments) => {
        var commentsHtml = "";
        comments.forEach((comment) => {
          commentsHtml += `
            <p><strong>${comment.name}</strong>: ${comment.body}</p>
          `;
        });
        commentsContainer.innerHTML = commentsHtml;
        popup.appendChild(commentsContainer);

        var closeButton = document.createElement("button");
        closeButton.innerText = "Close Comments";
        closeButton.addEventListener("click", togglePopupVisibility);
        popup.appendChild(closeButton);

        document.body.appendChild(popup);
        popup.style.display = "block";
      })
      .catch((error) => {
        console.error("Error fetching comments:", error);
      });
  } else {
    togglePopupVisibility();
  }

  function togglePopupVisibility() {
    if (popup.style.display === "none") {
      popup.style.display = "block";
      closeButton.innerText = "Hide Comments";
    } else {
      popup.style.display = "none";
      closeButton.innerText = "Show Comments";
    }
  }
  //this is the code for the comments to be displayed in the same page
  // function fetchComments(postId) {
  //   var commentsContainer = document.getElementById(`comments_${postId}`);

  //   if (commentsContainer.innerHTML.trim().length === 0) {
  //     fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
  //       .then((response) => response.json())
  //       .then((comments) => {
  // Display Comments
  //       var commentsHtml = "";
  //       comments.forEach((comment) => {
  //         commentsHtml += `
  //                             <p><strong>${comment.name}</strong>: ${comment.body}</p>
  //                         `;
  //       });
  //       commentsContainer.innerHTML = commentsHtml;
  //       commentsContainer.style.display = "block";
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching comments:", error);
  //     });
  // } else {
  // Toggle Comments Visibility
  //     commentsContainer.style.display =
  //       commentsContainer.style.display === "none" ? "block" : "none";
  //   }
  // }
}

fetchUser();

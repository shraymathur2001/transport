// document.addEventListener("DOMContentLoaded", function () {
//     const userTableBody = document.getElementById("user-table-body");

//     // Fetch user data from the server
//     fetch('/users')
//         .then(response => response.json())
//         .then(data => {
//             // Iterate through each user and add a row to the table
//             data.forEach(user => {
//                 const row = document.createElement("tr");
//                 row.innerHTML = `
//                     <td>${user.name}</td>
//                     <td>${user.email}</td>
//                     <td><button onclick="deleteUser('${user._id}')">Delete</button></td>
//                 `;
//                 userTableBody.appendChild(row);
//             });
//         })
//         .catch(error => console.error('Error fetching user data:', error));
// });

// function deleteUser(userId) {
//     // Send a DELETE request to the server to delete the user
//     fetch(`/users/${userId}`, {
//         method: 'DELETE'
//     })
//     .then(response => {
//         if (response.ok) {
//             // Remove the row from the table
//             const row = document.querySelector(`tr[data-user-id="${userId}"]`);
//             if (row) {
//                 row.remove(); // Remove the row from the table if found
//             }
//             // Refresh the table data after deletion
//             fetchUserTableData();
//         } else {
//             throw new Error('Failed to delete user');
//         }
//     })
//     .catch(error => console.error('Error deleting user:', error));
// }

// function fetchUserTableData() {
//     const userTableBody = document.getElementById("user-table-body");

//     // Clear existing table data
//     userTableBody.innerHTML = "";

//     // Fetch user data from the server
//     fetch('/users')
//         .then(response => response.json())
//         .then(data => {
//             // Iterate through each user and add a row to the table
//             data.forEach(user => {
//                 const row = document.createElement("tr");
//                 row.innerHTML = `
//                     <td>${user.name}</td>
//                     <td>${user.email}</td>
//                     <td><button onclick="deleteUser('${user._id}')">Delete</button></td>
//                 `;
//                 userTableBody.appendChild(row);
//             });
//         })
//         .catch(error => console.error('Error fetching user data:', error));
// }

document.addEventListener("DOMContentLoaded", function () {
    const userTableBody = document.getElementById("user-table-body");
    const sortButton = document.getElementById("sort-button");
    const logoutButton = document.getElementById("logout-button");
    const searchInput = document.getElementById("search-input");
    const backButton = document.getElementById("back-button");
    const sendMessageButton = document.getElementById("send-message-button");

    // Fetch user data from the server and display it
    fetchAndDisplayUserData();

    // Event listener for sort button
    // Sort button event listener
sortButton.addEventListener("click", function () {
    // Fetch user data sorted by name
    fetch('/users/sortByName')
        .then(response => response.json())
        .then(data => {
            // Display sorted user data in the table
            displayUserData(data);
        })
        .catch(error => console.error('Error fetching sorted user data:', error));
});


    // Event listener for logout button
    logoutButton.addEventListener("click", function () {
        // Redirect to the login page or perform logout action
        window.location.href = '/index.html';
    });

    // Event listener for back button
    backButton.addEventListener("click", function () {
        // Redirect back to the index.html page
        window.location.href = '/index.html';
    });

    // Event listener for search input
    searchInput.addEventListener("input", function () {
        filterTable(searchInput.value.toLowerCase());
    });

    // event listener for the "Send Message" button:
    sendMessageButton.addEventListener("click", function () {
        const message = prompt("Enter your message:"); // Prompt the admin to enter a message
        if (message) {
            sendMessageToUsers(message);
        }
    });
    

    // Function to fetch user data from the server and display it
    function fetchAndDisplayUserData(sorted = false) {
        let url = '/users';
        if (sorted) {
            url += '?sortBy=name';
        }
        fetch(url)
            .then(response => response.json())
            .then(data => {
                displayUserData(data);
            })
            .catch(error => console.error('Error fetching user data', error));
    }

    // Function to display user data in the table
    function displayUserData(data) {
        // Clear existing table data
        userTableBody.innerHTML = "";

        // Iterate through each user and add a row to the table
        data.forEach(user => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.city}</td>
                <td><button onclick="confirmDelete('${user._id}')">Delete</button></td>
            `;
            userTableBody.appendChild(row);
        });
    }

    // Function to filter table based on search input
    function filterTable(searchText) {
        const rows = userTableBody.getElementsByTagName("tr");
        for (let row of rows) {
            const nameCell = row.getElementsByTagName("td")[2];
            if (nameCell) {
                const name = nameCell.textContent.toLowerCase();
                if (name.includes(searchText)) {
                    row.style.display = "";
                } else {
                    row.style.display = "none";
                }
            }
        }
    }
});

// Function to confirm user deletion
function confirmDelete(userId) {
    const confirmed = confirm("Are you sure you want to delete this user?");
    if (confirmed) {
        deleteUser(userId);
    }
}

// // Function to delete a user
// function deleteUser(userId) {
//     // Send a DELETE request to the server to delete the user
//     fetch(`/users/${userId}`, {
//         method: 'DELETE'
//     })
//     .then(response => {
//         if (response.ok) {
//             // Remove the row from the table
//             const row = document.querySelector(`tr[data-user-id="${userId}"]`);
//             if (row) {
//                 row.remove(); // Remove the row from the table if found
//             }
//             // Refresh the user data in the table
//             fetchAndDisplayUserData();
//         } else {
//             throw new Error('Failed to delete user');
//         }
//     })
//     .catch(error => console.error('Error deleting user:', error));
// }



// Function to delete a user
function deleteUser(userId) {
    // Check if the user id is the id of the admin user
    if (userId === "663097e3607f7182d055062d") {
        alert("You cannot delete the admin user.");
        return; // Prevent further execution
    }

//     // Send a DELETE request to the server to delete the user
//     fetch(`/users/${userId}`, {
//         method: 'DELETE'
//     })
//     .then(response => {
//         if (response.ok) {
//             // Remove the row from the table
//             const row = document.querySelector(`tr[data-user-id="${userId}"]`);
//             if (row) {
//                 row.remove(); // Remove the row from the table if found
//             }
//             // Refresh the user data in the table
//             fetchAndDisplayUserData();
//         } else {
//             throw new Error('Failed to delete user');
//         }
//     })
//     .catch(error => console.error('Error deleting user:', error));
// }


// Send a DELETE request to the server to delete the user
// fetch(`/users/${userId}`, {
//     method: 'DELETE'
// })
// .then(response => {
//     if (response.ok) {
//         // Remove the row from the table
//         const row = document.querySelector(`tr[data-user-id="${userId}"]`);
//         if (row) {
//             row.remove(); // Remove the row from the table if found
//         }
//         // Refresh the user data in the table
//         fetchAndDisplayUserData(); // <-- This function fetches and displays user data
//     } else {
//         throw new Error('Failed to delete user');
//     }
// })
// .catch(error => console.error('Error deleting user:', error));
// }

// Send a DELETE request to the server to delete the user
fetch(`/users/${userId}`, {
    method: 'DELETE'
})
.then(response => {
    if (response.ok) {
        // Remove the row from the table
        const row = document.querySelector(`tr[data-user-id="${userId}"]`);
        if (row) {
            row.remove(); // Remove the row from the table if found
        }
        // Refresh the page to update the table
        location.reload();
    } else {
        throw new Error('Failed to delete user');
    }
})
.catch(error => console.error('Error deleting user:', error));
}

// Function to send message to users
function sendMessageToUsers(message) {
    // Send a POST request to the server to send message to users
    fetch('/users/sendMessage', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: message })
    })
    .then(response => {
        if (response.ok) {
            alert("Message sent successfully!");
        } else {
            throw new Error('Failed to send message');
        }
    })
    .catch(error => console.error('Error sending message:', error));
}



// // Event listener for show messages button
// const showMessagesButton = document.getElementById("show-messages-button");
// showMessagesButton.addEventListener("click", function () {
//     fetchAndDisplayMessages();
// });

// // Function to fetch and display messages sent by the admin
// // Function to fetch and display messages sent by the admin
// function fetchAndDisplayMessages() {
//     fetch('/messages')
//         .then(response => response.json())
//         .then(messages => {
//             // Clear existing message display
//             const messageContainer = document.getElementById("message-container");
//             messageContainer.innerHTML = "";

//             // Display messages
//             messages.forEach(message => {
//                 const messageElement = document.createElement("div");
//                 messageElement.textContent = message.message;
//                 messageContainer.appendChild(messageElement);
//             });
//         })
//         .catch(error => console.error('Error fetching messages:', error));
// }


// // Function to delete a message sent by the admin
// function deleteMessage(messageId) {
//     fetch(`/messages/${messageId}`, {
//         method: 'DELETE'
//     })
//     .then(response => {
//         if (response.ok) {
//             // Remove the message from the display
//         } else {
//             throw new Error('Failed to delete message');
//         }
//     })
//     .catch(error => console.error('Error deleting message:', error));
// }


// Event listener for show messages button
const showMessagesButton = document.getElementById("show-messages-button");
showMessagesButton.addEventListener("click", function () {
    window.location.href = "adminmsg.html"; // Redirect to adminmsg.html
});

// adminmsg.js:
document.addEventListener("DOMContentLoaded", function () {
    fetchAndDisplayMessages();
});

// Function to fetch and display messages sent by the admin
function fetchAndDisplayMessages() {
    fetch('/messages')
        .then(response => response.json())
        .then(messages => {
            // Get the message table body element
            const messageTableBody = document.getElementById("message-table-body");

            // Clear existing message rows
            messageTableBody.innerHTML = "";

            // Display messages
            messages.forEach(message => {
                const messageRow = document.createElement("tr");
                messageRow.innerHTML = `
                    <td>${message.message}</td>
                    <td>${new Date(message.timestamp).toLocaleString()}</td>
                    <td><button onclick="deleteMessage('${message._id}')">Delete</button></td>
                `;
                messageTableBody.appendChild(messageRow);
            });
        })
        .catch(error => console.error('Error fetching messages:', error));
}

// Function to delete a message sent by the admin
function deleteMessage(messageId) {
    fetch(`/messages/${messageId}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            // Refresh messages after successful deletion
            fetchAndDisplayMessages();
        } else {
            throw new Error('Failed to delete message');
        }
    })
    .catch(error => console.error('Error deleting message:', error));
}



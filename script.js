const searchBtn = document.getElementById('searchBtn');
const usernameInput = document.getElementById('username');
const resultDiv = document.getElementById('result');

searchBtn.addEventListener('click', () => {
  const username = usernameInput.value.trim();

  if (username === '') {
    resultDiv.innerHTML = '<p>Please Enter a GitHub username</p>';
    return;
  }

  fetchUser(username);
});

// Fetch GitHub user data
async function fetchUser(username) {
  try {
  
    const response = await fetch(`https://api.github.com/users/${username}`);

    if (!response.ok) {
      throw new Error('User not found');
    }

    const user = await response.json();

    resultDiv.innerHTML = `
      <div class="user-card">
        <img src="${user.avatar_url}" alt="${user.login}" class="avatar">
        <h3>${user.name || user.login}</h3>
        <p>${user.bio || 'No bio available'}</p>
        <p><strong>Followers:</strong> ${user.followers} | <strong>Following:</strong> ${user.following}</p>
        <p><strong>Public Repos:</strong> ${user.public_repos}</p>
        <a href="${user.html_url}" target="_blank">View Profile</a>
      </div>
    `;
  } catch (error) {
    resultDiv.innerHTML = `<p style="color: red;">${error.message}</p>`;
  }
}


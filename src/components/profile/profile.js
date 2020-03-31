import './profile.scss';

function Follow(follow) {
  if (!(follow instanceof Element)) {
    throw new Error('No follow button found!');
  }

  this.followBtn = follow.querySelector('.button-follow');

  // Event Listener
  this.followBtn.addEventListener('click', this.onFollowHandler);
}

Follow.prototype.onFollowHandler = function(e) {
  let self = this;
  let isActive = 'is-active';

  e.preventDefault();
  self.classList.toggle(isActive);
  self.textContent = 'Following'

  if (!(self.classList.contains(isActive))) {
    self.textContent = 'Follow'
  }
}

const profileButton = new Follow(document.querySelector('.profile-card'));
const anotherProfileButton = new Follow(document.querySelector('.second-card'));

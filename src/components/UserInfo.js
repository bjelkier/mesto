export class UserInfo {
  constructor({ userNameSelector, userDescriptionSelector, userPicSelector }) {
    this._userNameElement = document.querySelector(userNameSelector)
    this._userDescriptionElement = document.querySelector(userDescriptionSelector)
    this._userPicElement = document.querySelector(userPicSelector)
  }

  getUserInfo() {
    return {
      name: this._userNameElement.textContent,
      about: this._userDescriptionElement.textContent
    };
  }

  setUserInfo = ({ name, about, avatar }) => {
    this._userNameElement.textContent = name;
    this._userDescriptionElement.textContent = about;
    if (avatar != null) this.setAvatar(avatar);
  }

  setAvatar = (avatar) => {
    this._userPicElement.src = avatar;
  }
}

export class UserInfo {
  constructor({ userNameSelector, userDescriptionSelector }) {
    this._userNameElement = document.querySelector(userNameSelector)
    this._userDescriptionElement = document.querySelector(userDescriptionSelector)
  }

  getUserInfo() {
    return {
      name: this._userNameElement.textContent,
      job: this._userDescriptionElement.textContent
    }
  }

  setUserInfo(title, job) {
    this._userNameElement.textContent = title
    this._userDescriptionElement.textContent = job
  }
}

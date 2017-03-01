export class UnAuthedException {
  name = 'UnAuthedException'

  constructor (message = 'not authed') {
    this.message = message
  }
}

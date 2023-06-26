export default class Observable {
  observers = new Set();

  subscribe(observer) {
    this.observers.add(observer);
  }

  unsubscribe(observer) {
    this.observers = this.observers.filter((_observer) => _observer !== observer);
  }

  notify(data) {
    this.observers.forEach((observer) => observer(data));
  }
}

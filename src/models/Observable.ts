type Observer = () => void;

export default class Observable {
  observers: Observer[] = [];

  subscribe(observer: Observer) {
    this.observers.push(observer);
  }

  unsubscribe(observer: Observer) {
    this.observers = this.observers.filter((_observer) => _observer !== observer);
  }

  notify() {
    this.observers.forEach((observer) => observer());
  }
}

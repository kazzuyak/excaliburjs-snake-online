export class GameLoop {
  private serverInterval?: NodeJS.Timeout;
  private listeners: (() => void)[] = [];

  public addListener(callback: () => void) {
    this.listeners.push(callback);
  }

  public startLoop() {
    if (this.serverInterval !== undefined) {
      return;
    }

    let lastUpdate = Date.now();


    this.serverInterval = setInterval(() => {
      this.listeners.forEach((listener) => listener());
      let now = Date.now();
      console.log(now - lastUpdate);
      lastUpdate = now;
    }, 150);
  }

  public stopLoop() {
    if (this.serverInterval === undefined) {
      return;
    }

    clearInterval(this.serverInterval);
    this.serverInterval = undefined;
  }
}

import { htmlGenerator } from "./warmup";

export class Clock {
  constructor() {
    const currentTime = new Date();

    this.hours = currentTime.getHours();
    this.minutes = currentTime.getMinutes();
    this.seconds = currentTime.getSeconds();
    // ensure our clock is always on the page and doesn't have to wait for 
    // the first tick
    htmlGenerator(this.printTime(), clockElement);
    // Schedule the tick at 1 second intervals.
    setInterval(this._tick.bind(this), 1000);
  }

  printTime() {
    // Format the time in HH:MM:SS
    const timeString = [this.hours, this.minutes, this.seconds].join(":");

    // Now we'll return the string instead of printing it.
    return timeString;
  }

  _tick() {
    this._incrementSeconds();
    // append our clock HTML
    htmlGenerator(clock.printTime(), clockElement);
  }

  _incrementSeconds() {
    // 1. Increment the time by one second.
    this.seconds += 1;
    if (this.seconds === 60) {
      this.seconds = 0;
      this._incrementMinutes();
    }
  }

  _incrementMinutes() {
    this.minutes += 1;
    if (this.minutes === 60) {
      this.minutes = 0;
      this._incrementHours();
    } 
  }

  _incrementHours() {
    this.hours = (this.hours + 1) % 24;
  }
}

// Grab onto the Element we want to use for the Clock.
const clockElement = document.getElementById('clock');
const clock = new Clock();
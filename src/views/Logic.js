let objectPosition = [{ x: 0, y: 0 }];
let observers = [];

function emitChange() {
  observers.forEach(o => o && o(objectPosition));
}

export function listenChanges(o) {
  observers.push(o);
  emitChange();

  return () => {
    observers = observers.filter(t => t !== o)
  }
}

export function canMoveObject(toX, toY) {
  return true;
}

export function moveObject(x, y) {
  objectPosition = [{ x, y }]
  emitChange();
}
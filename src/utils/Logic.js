let objectPosition = [];
let observers = [];

function emitChange() {
  observers.forEach(o => o && o(objectPosition));
}

export function processChanges(mainObject, o) {
  objectPosition = [...mainObject];
  observers.push(o);
  emitChange();

  return () => {
    observers = observers.filter(t => t !== o)
  }
}

export function canMoveObject(toX, toY) {
  return true;
}

export function moveObject(objectPosition, x, y) {
  objectPosition = [...objectPosition, { x, y, prefix: 'yo' }]
  emitChange();
}
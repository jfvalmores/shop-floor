const Utils = () => {

  const getPrefix = (s) => {
    return s.replace(/[0-9]/g, '').trim();
  }

  const getNextPrefixCount = (list, prefix = 'Default') => {
    let nextCount = 0;
    list.forEach(item => {
      if (prefix === getPrefix(item.fname)) {
        const section = item.fname.split(' ');
        const curr = parseInt(section[section.length - 1]);
        if (curr > nextCount) nextCount = curr;
      }
    });

    return nextCount += 1;
  }

  const trimFloor = (list, width, height) => {
    return list.filter(item => item.x <= width - 1 && item.y <= height - 1);
  }

  const getIndexFromList = (list, x, y) => {
    return list.findIndex(o => o.x === x && o.y === y);
  }

  const getObjectFromIndex = (list, x, y) => {
    return list[getIndexFromList(list, x, y)];
  }

  return {
    getPrefix,
    trimFloor,
    getNextPrefixCount,
    getIndexFromList,
    getObjectFromIndex,
  };
};

export default Utils;
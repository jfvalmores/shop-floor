const Utils = () => {

  const getPrefix = (s) => {
    return s.replace(/[0-9]/g, '').trim();
  }

  const getNextPrefixCount = (list, prefix = 'Default') => {
      let nextCount = 0;
      list.forEach(item => {
          const section = item.fname.split(' ');
          const prefixSection = section.slice(0, section.length - 1);
          if (prefix === prefixSection.join(' ')) {
              const curr = parseInt(section[section.length - 1]);
              if (curr > nextCount) nextCount = curr;
          }
      });

      return (nextCount += 1);
  };

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
    getIndexFromList,
    getNextPrefixCount,
    getObjectFromIndex,
  };
};

export default Utils;
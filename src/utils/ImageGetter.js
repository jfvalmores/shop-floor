import * as image from '../images';

function ImageGetter() {
  const imageList = [
    {
      data: '0000',
      label: 'Default',
      prefix: 'Table',
    },
    {
      data: '0001',
      label: 'Seat',
      prefix: 'Seat',
    },
    {
      data: '0002',
      label: 'Large Table',
      prefix: 'Table',
    },
    {
      data: '0003',
      label: 'Masseuse',
      prefix: 'Masseuse',
    },
    {
      data: '0004',
      label: 'Customer',
      prefix: 'Customer',
    },
    {
      data: '0005',
      label: 'Doctor',
      prefix: 'Doctor',
    },
    {
      data: '0006',
      label: 'Barber',
      prefix: 'Barber',
    },
    {
      data: '0007',
      label: 'Room',
      prefix: 'Room',
    },
    {
      data: '0008',
      label: 'Vehicle',
      prefix: 'Vehicle',
    },
    {
      data: '0009',
      label: 'Workstation',
      prefix: 'Workstation',
    },
    {
      data: '0010',
      label: 'Machine',
      prefix: 'Machine',
    },
  ];

  const getImage = (id) => {
    switch (id) {
      case '0001':
        return image.Seat;

      case '0002':
        return image.LargeTable;

      case '0003':
        return image.Masseuse;

      case '0004':
        return image.Customer;

      case '0005':
        return image.Doctor;

      case '0006':
        return image.Barber;

      case '0007':
        return image.Room;

      case '0008':
        return image.Vehicle;

      case '0009':
        return image.Workstation;

      case '0010':
        return image.Machine;

      default:
        return image.Default;

    }
  }

  return {
    getImage,
    imageList,
  };
}

export default ImageGetter;
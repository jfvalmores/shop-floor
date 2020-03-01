import * as image from '../images';

function ImageGetter() {
  const imageList = [
    { data: 'default', label: 'Default' },
    { data: 'seat', label: 'Seat' },
    { data: 'largeTable', label: 'Large Table' },
    { data: 'masseuse', label: 'Masseuse' },
    { data: 'customer', label: 'Customer' },
    { data: 'doctor', label: 'Doctor' },
    { data: 'barber', label: 'Barber' },
    { data: 'room', label: 'Room' },
    { data: 'vehicle', label: 'Vehicle' },
    { data: 'workstation', label: 'Workstation' },
    { data: 'machine', label: 'Machine' },
  ];

  const getImage = (id) => {
    switch (id) {
      case 'seat':
        return image.Seat;

      case 'largeTable':
        return image.LargeTable;

      case 'masseuse':
        return image.Masseuse;

      case 'customer':
        return image.Customer;

      case 'doctor':
        return image.Doctor;

      case 'barber':
        return image.Barber;

      case 'room':
        return image.Room;

      case 'vehicle':
        return image.Vehicle;

      case 'workstation':
        return image.Workstation;

      case 'machine':
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
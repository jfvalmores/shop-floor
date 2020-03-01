import * as image from '../images';

function ImageGetter() {
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
  };
}

export default ImageGetter;
import Default from '../images/table_00.png';
import Seat from '../images/table_01.png';
import LargeTable from '../images/table_02.png';
import Masseuse from '../images/table_03.png';
import Customer from '../images/table_04.png';
import Doctor from '../images/table_05.png';
import Barber from '../images/table_06.png';
import Room from '../images/table_07.png';
import Vehicle from '../images/table_08.png';
import Workstation from '../images/table_09.png';
import Machine from '../images/table_10.png';

function ImageGetter() {
  const getImage = (id) => {
    switch (id) {
      case 'seat':
        return Seat;

      case 'largeTable':
        return LargeTable;

      case 'masseuse':
        return Masseuse;

      case 'customer':
        return Customer;

      case 'doctor':
        return Doctor;

      case 'barber':
        return Barber;

      case 'room':
        return Room;

      case 'vehicle':
        return Vehicle;

      case 'workstation':
        return Workstation;

      case 'machine':
        return Machine;

      default:
        return Default;

    }
  }

  return {
    getImage,
  };
}

export default ImageGetter;
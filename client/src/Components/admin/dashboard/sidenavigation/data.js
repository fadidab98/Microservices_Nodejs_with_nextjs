
import {SiDoordash} from "react-icons/si"
import { FaUsers } from 'react-icons/fa';
import { BsHouseDoorFill } from 'react-icons/bs';
import { BiCategory } from 'react-icons/bi';
import { MdContactPhone } from 'react-icons/md';
<<<<<<< HEAD
import { LuSettings } from "react-icons/lu";
=======
>>>>>>> 802321716b56db79acec7e66d8e6f9c17aac17eb

const data = [
  {
    title: 'Dashboard',
    icon: <SiDoordash size="20px" />,
    link: '/dashboard',
  },
  {
    title: 'Users',
    icon: <FaUsers size="20px"  />,
    link: '/dashboard/users',
  },
  {
    title: 'Category',
    icon: <BiCategory size="20px" />,
    link: '/dashboard/category',
  },
  {
    title: 'Houses',
    icon: <BsHouseDoorFill size="20px" />,
    link: '/dashboard/houses',
  },
  {
<<<<<<< HEAD
    title: 'Setting',
    icon: <LuSettings size="20px" />,
    link: '/dashboard/setting',
  },
  {
=======
>>>>>>> 802321716b56db79acec7e66d8e6f9c17aac17eb
    title: 'Contacts',
    icon: <MdContactPhone size="20px" />,
    link: '/admin/contacts',
  }
];

export default data;

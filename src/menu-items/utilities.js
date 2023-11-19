// assets
import {
  AntDesignOutlined,
  BgColorsOutlined,
  PayCircleOutlined,
  LoadingOutlined,
  DollarOutlined,
  AppstoreAddOutlined,
  UserOutlined
} from '@ant-design/icons';


// icons
const icons = {
  UserOutlined,
  DollarOutlined,
  PayCircleOutlined,
  BgColorsOutlined,
  AntDesignOutlined,
  LoadingOutlined,
  AppstoreAddOutlined
};

const utilities = {
  id: 'utilities',
  title: 'Tools',
  type: 'group',
  children: [
 

    {
      id: 'util-item',
      title: 'Experts',
      type: 'item',
      url: '/experts',
      icon: icons.UserOutlined
    },

    {
      id: 'util-detect',
      title: 'Disease Detector',
      type: 'item',
      url: '/detect',
      icon: icons.BgColorsOutlined
    },

    {
      id: 'util-assist',
      title: 'Assistant',
      type: 'item',
      url: '/chatbot',
      icon: icons.BgColorsOutlined
    },


    

    
  
  ]
};

export default utilities;

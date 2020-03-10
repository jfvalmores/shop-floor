import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';

import AddIcon from '@material-ui/icons/Add';
import { Slide } from '@material-ui/core';
import ShopFloor from './ShopFloor';
import FabIcon from '../components/FabIcon';
import CInterface from '../core/CInterface';
import DataGrid from '../components/DataGrid';

const { getShopFloorList } = CInterface();

const ShopFloorList = () => {
  const [mList, setList] = useState([]);
  const [isDetail, showDetail] = React.useState(false);
  const [mKeys, setKey] = React.useState(null);
  const [formState, setFormState] = React.useState('VIEW');

  const def = [
    { header: 'ID', datafield: 'id' },
    { header: 'Name', datafield: 'floorName', type: 'hyperlink' },
    { header: 'Active', datafield: 'activeFlagDisplay' },
  ]

  useEffect(() => {
    if (!isDetail) getShopFloor();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDetail]);

  const addShopFloor = () => {
    setKey(null);
    setFormState('NEW');
    showDetail(true);
  }

  const getShopFloor = async () => {
    let list = await getShopFloorList();
    if (!list.length) list = [];
    list = formatList(list);
    setList(list);
  }

  const formatList = (list) => {
    return list.map(item => {
      return {
        ...item,
        activeFlagDisplay: item['activeFlag'] ? 'Yes' : 'No',
      };
    })
  }

  const handleRowClick = (index) => {
    setFormState('VIEW');
    const selectedItem = mList[index];
    setKey(selectedItem);
    showDetail(true);
  }

  return (
    <React.Fragment>
      <Slide
        direction={'right'}
        in={!isDetail} mountOnEnter unmountOnExit>
        <div>
          <Sidebar
            noSide
            title="Shop Floor List"
          >
          <DataGrid
            list={mList}
            def={def}
            onClick={handleRowClick}
          />
            <FabIcon 
              right={2}
              title="Add"
              onClick={addShopFloor}>
              <AddIcon />
            </FabIcon>
          </Sidebar>
        </div>
      </Slide>
      <Slide
        direction={'left'}
        in={isDetail} mountOnEnter unmountOnExit>
        <div>
          <ShopFloor
            formState={formState}
            setFormState={setFormState}
            mKeys={mKeys}
            back={() => showDetail(false)}/>
        </div>
      </Slide>
    </React.Fragment>
  );
}

export default ShopFloorList;
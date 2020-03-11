import React, { useState, useEffect } from 'react';
import AddIcon from '@material-ui/icons/Add';
import CInterface from '../core/CInterface';
import ShopFloor from './ShopFloor.js';
import { Slide } from '@material-ui/core';
import {
  Sidebar,
  FabIcon,
  DataGrid
} from '../components/';

const ShopFloorList = (props) => {
  const [mList, setList] = useState([]);
  const [isDetail, showDetail] = React.useState(false);
  const [mSelected, setSelected] = React.useState(null);
  const [formState, setFormState] = React.useState('VIEW');

  const def = [
    { header: 'ID', datafield: 'id' },
    { header: 'Name', datafield: 'fname', type: 'hyperlink' },
    { header: 'Active', datafield: 'activeFlagDisplay' },
  ]

  useEffect(() => {
    if (!isDetail) getShopFloor();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDetail]);

  const addShopFloor = () => {
    setSelected(null);
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
        activeFlagDisplay: item['factive_flag'] ? 'Yes' : 'No',
      };
    })
  }

  const handleRowClick = (index) => {
    setFormState('VIEW');
    const selectedItem = mList[index];
    setSelected(selectedItem);
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
            mKeys={mSelected}
            popupMessage={props.popupMessage}
            back={() => showDetail(false)} />
        </div>
      </Slide>
    </React.Fragment>
  );
}

const { getShopFloorList } = CInterface();

export default ShopFloorList;
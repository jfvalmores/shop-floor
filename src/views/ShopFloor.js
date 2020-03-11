/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';
import ImageGetter from '../utils/ImageGetter';
import CInterface from '../core/CInterface';
import {
  Floor,
  FloorForm,
  TableProperties,
} from './ShopFloor/';
import {
  FabIcon,
  Sidebar,
  AlertDialog,
  ControlButtons,
} from '../components/';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

function ShopFloor(props) {
  const [mTable, setTableList] = useState([]);
  const [mParams, setParams] = useState({});
  const [deleteAlert, showDeleteAlert] = useState(false);
  const [discardAlert, showDiscardAlert] = useState(false);
  const [tablePropModal, showTablePropModal] = useState(false);
  const [selectedTable, setSelectedTable] = useState(null);

  const defaultParams = {
    fwidth: 6,
    fheight: 6,
    fname: '',
    fbackground: '#97D6F8',
    factive_flag: true,
    farrange_mode_flag: false,
    fupdate_mode_flag: true,
    fimage_type: imageList[0],
    fprefix: 'Table',
  };

  useEffect(() => {
    if (props.formState === 'NEW') {
      setDefault(); 
    } else {
      formatData(props.mKeys);
    }
  }, [props.mKeys, props.formState]);

  const setDefault = () => {
    setParams(defaultParams);
  }

  const handleChange = (id, value) => {
    if (id === 'MULTIPLE') {
      setParams({
        ...mParams,
        ...value
      });
      return;
    }

    setParams({
      ...mParams,
      [id]: value
    });
  }

  const formatData = (data) => {
    if (!data) return;

    let settings = {};
    const { objectList } = data;
    ({ ...settings } = data);
    setTableList(objectList);
    delete settings['objectList'];

    const newParams = {
      ...defaultParams,
      ...settings,
    };

    console.log(newParams);
    console.log(objectList);
    setParams(newParams);
  }

  const removeExceedingObjects = () => {
    const list = mTable.slice();
    setTableList(list.filter(item => item.x <= mParams.fwidth - 1 && item.y <= mParams.fheight - 1));
  }

  const updateObjects = (x, y) => {
    if (!mParams.fupdate_mode_flag || props.formState === 'VIEW') {
      const obj = getObjectFromIndex(x, y);
      if (!obj) return;
      showObjectProperties(obj);
    } else if (props.formState !== 'VIEW') {
      const list = mTable.slice();
      const index = getIndexFromList(x, y);

      if (index < 0) {
        list.push(setNewEntry(x, y, mParams));
      } else {
        list.splice(index, 1);
      }
      setTableList(list);
    }
  }

  const setNewEntry = (x, y, params) => {
    return {
      x, y,
      fpax: 4,
      fimage_type: params.fimage_type,
      fname: params.fprefix + ' ' + getNextPrefixCount(params.fprefix)
    };
  }

  const showObjectProperties = (item) => {
    setSelectedTable(item);
    showTablePropModal(true);
  }

  const getNextPrefixCount = (prefix = 'Default') => {
    let nextCount = 0;
    const list = mTable.slice();
    list.forEach(item => {
      if (prefix === getPrefix(item.fname)) {
        const section = item.fname.split(' ');
        const curr = parseInt(section[section.length - 1]);
        if (curr > nextCount) nextCount = curr;
      }
    });

    return nextCount += 1;
  }

  const getPrefix = (s) => {
    return s.replace(/[0-9]/g, '').trim();
  }

  const performMoveObject = (item, destination) => {
    const { mKeys } = item;
    const list = mTable.slice();
    const index = getIndexFromList(mKeys.x, mKeys.y);
    list[index]['x'] = destination.x;
    list[index]['y'] = destination.y;
    setTableList(list);
  }

  const performCanMoveObject = (x, y) => {
    if (!mParams.farrange_mode_flag) return false;
    if (getIndexFromList(x, y) > -1) return false;

    return true;
  }

  const getIndexFromList = (x, y) => {
    return mTable.findIndex(o => o.x === x && o.y === y);
  }

  const getObjectFromIndex = (x, y) => {
    return mTable[getIndexFromList(x, y)];
  }

  const handleDelete = () => {
    showDeleteAlert(true);
  }

  const handleEdit = () => {
    props.setFormState('EDIT');
  }

  const handleCancel = () => {
    showDiscardAlert(true);
  }

  const handleSave = async () => {
    if (mParams.fname === '') {
      props.popupMessage('Please enter Floor Name.');
      return false;
    }

    removeExceedingObjects();
    const {
      fprefix,
      fimage_type,
      fupdate_mode_flag,
      farrange_mode_flag,
      factive_flagDisplay,
      ...params
    } = mParams;
    params['objectList'] = mTable;
    let response;

    if (params.id) {
      response = await updateShopFloor(params.id, params);
    } else {
      response = await postShopFloor(params);
    }

    if (response) {
      console.log(typeof response);
      console.log(response);
      props.back();
      props.popupMessage('Successfully saved record.');
    }
  }

  const deleteRecord = async () => {
    console.log(props.mKeys);
    const res = await deleteShopFloor(props.mKeys.id);

    if (JSON.stringify(res) === '{}') {
      showDeleteAlert(false);
      props.back();
      props.popupMessage('Successfully deleted record.');
    }
  }

  const discardChanges = () => {
    props.setFormState('VIEW');
    showDiscardAlert(false)
    if (props.mKeys) {
      formatData(props.mKeys);
    } else {
      props.back();
    }
  }

  const saveTableProperties = (obj) => {
    const list = mTable.slice();
    const index = getIndexFromList(obj.x, obj.y);
    list[index] = obj;
    setTableList(list);
    props.popupMessage('Successfully updated table.');
    showTablePropModal(false);
  }

  return (
    <React.Fragment>
      <Sidebar
        title="Shop Floor"
        sidebarForm={
          <FloorForm
            formState={props.formState}
            handleChange={handleChange}
            mParams={mParams}
            controlButtons={
              <ControlButtons
                formState={props.formState}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
                handleCancel={handleCancel}
                handleSave={handleSave}
              />
            }
          />
        }
      >
        <DndProvider backend={Backend}>
          {mParams &&
            <Floor
              formState={props.formState}
              mParams={mParams}
              mTable={mTable}
              updateObjects={updateObjects}
              performMoveObject={performMoveObject}
              performCanMoveObject={performCanMoveObject} />
          }
        </DndProvider>
        <FabIcon
          right={2}
          title="Back"
          onClick={props.back}>
          <ArrowBackIcon />
        </FabIcon>
      </Sidebar>

      <AlertDialog
        open={deleteAlert}
        handleClose={() => showDeleteAlert(false)}
        handleConfirm={() => deleteRecord()}>
        Are you sure you want to delete this record?
      </AlertDialog>

      <AlertDialog
        open={discardAlert}
        handleClose={() => showDiscardAlert(false)}
        handleConfirm={() => discardChanges()}>
        Do you want to discard unsaved changes?
      </AlertDialog>

      <TableProperties
        open={tablePropModal}
        mKeys={selectedTable}
        formState={props.formState}
        popupMessage={props.popupMessage}
        handleClose={() => showTablePropModal(false)}
        handleSave={(obj) => saveTableProperties(obj)} />
    </React.Fragment>
  )
}

const { imageList } = ImageGetter();
const { deleteShopFloor, updateShopFloor, postShopFloor } = CInterface();

export default ShopFloor;
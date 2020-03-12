/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';
import ImageGetter from '../utils/ImageGetter';
import CInterface from '../core/CInterface';
import Utils from '../utils/Utils';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
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

const ShopFloor = (props) => {
  const [mTableList, setTableList] = useState([]);
  const [mParams, setParams] = useState({});
  const [deleteAlert, showDeleteAlert] = useState(false);
  const [discardAlert, showDiscardAlert] = useState(false);
  const [tablePropModal, showTablePropModal] = useState(false);
  const [selectedTable, setSelectedTable] = useState(null);

  const defaultParams = {
    fwidth: 6,
    fheight: 6,
    fname: '',
    fbackground: '#83F8B8',
    factive_flag: true,
    fupdate_mode_flag: true,
    farrange_mode_flag: false,
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

    let params, objectList;
    ({ objectList, ...params } = data);
    setTableList(objectList);

    const newParams = {
      ...defaultParams,
      ...params,
    };

    setParams(newParams);
  }

  const updateObjects = (x, y) => {
    if (!mParams.fupdate_mode_flag || props.formState === 'VIEW') {
      // View table properties
      const obj = getObjectFromIndex(mTableList, x, y);
      if (!obj) return;
      showTableProperties(obj);
    } else if (props.formState !== 'VIEW') {
      // Add or remove table
      const list = mTableList.slice();
      const index = getIndexFromList(mTableList, x, y);

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
      fname: `${params.fprefix} ${getNextPrefixCount(mTableList.slice(), params.fprefix)}`
    };
  }

  const showTableProperties = (item) => {
    setSelectedTable(item);
    showTablePropModal(true);
  }

  const performMoveObject = (item, destination) => {
    const { mKeys } = item;
    const { x: toX, y: toY } = destination;
    const list = mTableList.slice();
    const index = getIndexFromList(mTableList, mKeys.x, mKeys.y);
    list[index]['x'] = toX;
    list[index]['y'] = toY;
    setTableList(list);
  }

  const performCanMoveObject = (x, y) => {
    if (!mParams.farrange_mode_flag) return false;
    if (getIndexFromList(mTableList, x, y) > -1) return false;

    return true;
  }

  const validateForm = () => {
    if (mParams.fname === '') {
      props.popupMessage('Please enter Floor Name.');
      return false;
    }
    return true;
  }

  const handleSave = async () => {
    if (!validateForm()) return;

    const {
      fprefix,
      fimage_type,
      fupdate_mode_flag,
      farrange_mode_flag,
      factive_flagDisplay,
      ...params
    } = mParams;
    params['objectList'] = trimFloor(mTableList, mParams.fwidth, mParams.fheight);
    let response;

    if (params.id) {
      response = await updateShopFloor(params.id, params);
    } else {
      response = await postShopFloor(params);
    }

    if (response) {
      props.back();
      props.popupMessage('Successfully saved record.');
    }
  }

  const deleteRecord = async () => {
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
    const list = mTableList.slice();
    const index = getIndexFromList(mTableList, obj.x, obj.y);
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
                handleDelete={() => showDeleteAlert(true)}
                handleEdit={() => props.setFormState('EDIT')}
                handleCancel={() => showDiscardAlert(true)}
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
              mTableList={mTableList}
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

const {
  trimFloor,
  getIndexFromList,
  getObjectFromIndex,
  getNextPrefixCount,
} = Utils();
const { imageList } = ImageGetter();
const { deleteShopFloor, updateShopFloor, postShopFloor } = CInterface();

export default ShopFloor;
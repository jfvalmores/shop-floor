/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Floor from '../components/Floor';
import Sidebar from '../components/Sidebar';
import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';
import { makeStyles } from '@material-ui/core/styles';
import FloorForm from '../components/FloorForm';
import FabIcon from '../components/FabIcon';
import ArrowBackIosSharpIcon from '@material-ui/icons/ArrowBackIosSharp';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
import BlockIcon from '@material-ui/icons/Block';
import EditIcon from '@material-ui/icons/Edit';
import ImageGetter from '../utils/ImageGetter';
import DeleteIcon from '@material-ui/icons/Delete';
import AlertDialog from '../components/AlertDialog';
import CInterface from '../core/CInterface';

function ShopFloor(props) {
  const [mObject, setObjectList] = useState([]);
  const [mParams, setParams] = useState({});
  const [deleteAlert, showDeleteAlert] = useState(false);
  const [discardAlert, showDiscardAlert] = useState(false);

  const defaultParams = {
    width: 6,
    height: 6,
    floorName: '',
    background: '#99FFBB',
    activeFlag: true,
    arrangeObject: false,
    addRemoveObject: true,
    image: imageList[0],
    prefix: 'Table',
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
    if (id === 'image') {
      const prefix = value.label === 'Default' ? 'Table' : value.label;
      setParams({
        ...mParams,
        prefix,
        [id]: value
      });
    } else {
      setParams({
        ...mParams,
        [id]: value
      });
    }
  }

  const formatData = (data) => {
    let settings = {};
    const { objectList } = data;
    ({ ...settings } = data);
    setObjectList(objectList);
    delete settings['objectList'];

    const newParams = { 
      ...defaultParams,
      ...settings,
    };

    console.log(newParams);
    setParams(newParams);
  }

  const removeExceedingObjects = (width, height) => {
    const list = mObject.slice();
    setObjectList(list.filter(item => item.x <= width && item.y <= height));
  }

  const updateObjects = (x, y) => {
    if (!mParams.addRemoveObject) return;

    const list = mObject.slice();
    const index = checkIndex(x, y, list);

    if (index < 0) {
      list.push({
        x, y,
        image: mParams.image,
        prefix: mParams.prefix + ' ' + getNextPrefixCount(mParams.prefix)
      });
    } else {
      list.splice(index, 1);
    }
    setObjectList(list);
  }

  const checkIndex = (x, y, list) => {
    for (let i = 0; i < list.length; i++) {
      if (list[i]['x'] === x && list[i]['y'] === y)
        return i;
    }

    return -1;
  }

  const getNextPrefixCount = (prefix = 'Default') => {
    let nextCount = 0;
    const list = mObject.slice();
    list.forEach(item => {
      if (prefix === getPrefix(item.prefix)) {
        const section = item.prefix.split(' ');
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
    const list = mObject.slice();
    const index = list.findIndex(obj => obj.x === item.x && obj.y === item.y);
    list[index]['x'] = destination.x;
    list[index]['y'] = destination.y;
    setObjectList(list);
  }

  const performCanMoveObject = (x, y) => {
    if (!mParams.arrangeObject) return false;
    if (mObject.findIndex(obj => obj.x === x && obj.y === y) > -1) return false;

    return true;
  }

  const handleDelete = () => {
    showDeleteAlert(true);
  }

  const handleEdit = () => {
    props.setFormState('EDIT');
  }

  const handleCancel = () => {
    // TODO check changes
    showDiscardAlert(true);
  }

  const handleSave = async () => {
    // TODO
    const {arrangeObject, addRemoveObject, image, prefix, activeFlagDisplay, ...params} = mParams;
    params['objectList'] = mObject;
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
    }
  }

  const deleteRecord = async () => {
    console.log(props.mKeys);
    const res = await deleteShopFloor(-1);
    
    if (JSON.stringify(res) === '{}') {
      showDeleteAlert(false);
      props.back();
    }
  }

  const discardChanges = () => {
    props.setFormState('VIEW');
    if (props.mKeys) {
      formatData(props.mKeys);
    } else {
      props.back();
    }
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
              mObject={mObject}
              updateObjects={updateObjects}
              performMoveObject={performMoveObject}
              performCanMoveObject={performCanMoveObject} />
          }
        </DndProvider>
        <FabIcon
          right={2}
          title="Back"
          onClick={props.back}>
          <ArrowBackIosSharpIcon />
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
    </React.Fragment>
  )
}

const ControlButtons = (props) => {
  const classes = styles();

  return (
    <div className={classes.ctrlButtons}>
      {props.formState === 'VIEW' &&
        <React.Fragment>
          <Button
            variant="contained"
            color="default"
            onClick={props.handleDelete}
          >
            <DeleteIcon />{` Delete`}
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={props.handleEdit}
          >
            <EditIcon />{` Edit`}
          </Button>
        </React.Fragment>
      }
      {props.formState !== 'VIEW' &&
        <React.Fragment>
          <Button
            variant="contained"
            color="default"
            onClick={props.handleCancel}
          >
            <BlockIcon />{` Cancel`}
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={props.handleSave}
          >
            <SaveIcon />{` Save`}
          </Button>
        </React.Fragment>
      }
    </div>
  );
}

const { imageList } = ImageGetter();
const { deleteShopFloor, updateShopFloor, postShopFloor } = CInterface();

const styles = makeStyles({
  ctrlButtons: {
    padding: 16,
    '& button': {
      margin: 3
    }
  }
});

export default ShopFloor;
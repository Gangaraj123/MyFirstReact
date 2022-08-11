import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Item from './components/Item';
import {
  SortableContainer,
  SortableElement,
  SortableHandle
} from "react-sortable-hoc";



function App() {
  const [modalShow, setModalShow] = React.useState(false);
  const [list, setlist] = useState([])
  var cursor_pos = 1
  //Drag area
  const SortableList = SortableContainer(({ items }) => {
    return <div >{

      list.map((it, index) => (
        <Item key={`item-${it.id}`} index={index} value={it} setFunc={setLevel} delFunc={deleteElement} />
      ))

    }</div>;
  });
  const setLevel = (index, newlevel) => {
    var newarr = [...list]
    newarr[index].level = newlevel
    setlist(newarr)

  }

  const onsortEnd = ({ oldIndex, newIndex }) => {
    const [removed] = list.splice(oldIndex, 1)
    list.splice(newIndex, 0, removed)
    setlist(list)
  };
  const AddElement = (text) => {
    setModalShow(false)
     var ele = {
      id: list.length
      ,
      text: text,
      level: cursor_pos
    }
    setlist([...list, ele])
  }
  const deleteElement=(index)=>{
     var delCount=1
     for(let x=index+1;x<list.length;x++)
     {
       if(list[x].level<=list[index].level) break;
       delCount++;
      }
    var newlist=[...list]
     newlist.splice(index,delCount)
      setlist(newlist)
  }

  return (
    <div className="App d-flex justify-content-center">
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        addelement={AddElement}
      />
      <div className='container my-5 w-75 '>
        <Header></Header>
        <SortableList items={list} onSortEnd={onsortEnd} useDragHandle />
        <button className='btn text-light w-100 my-4 rounded' style={{ backgroundColor: '#337AB7' }}
          onClick={() => setModalShow(true)}>
          <i className=" fas fa-plus px-2"></i>
          Add a Standard
        </button>
      </div>

    </div >
  );
}

export default App;

const arrayMove = (array, from, to) => {
  array = array.slice();
  array.splice(to < 0 ? array.length + to : to, 0, array.splice(from, 1)[0]);
  return array;
};

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
    show={props.show} onHide={props.onHide}
      size="m"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <div className='container m-2 p-3 text-center'>
        <h4 className='text-center'>Enter Standard text</h4>
        <div className='d-flex justify-content-center'>
        <input type="email" className="form-control" id="text"  placeholder="Type standard text...." />
        <br></br>
          <Button className='btn btn-success mx-2'
          onClick={()=>{
            var text=document.getElementById('text').value
            props.addelement(text)
          }}
          >Add</Button>
        </div>
      </div>
    </Modal>
  );
}
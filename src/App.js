import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Item from './components/Item';
import {
  SortableContainer
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
    if (index > 0 && list[index - 1].level >= newlevel - 1) {
      newarr[index].level = newlevel
      setlist(newarr)
    }
  }

  const onsortEnd = ({ oldIndex, newIndex }) => {
    var delCount = 1
    var newarr = [...list]
    for (let x = oldIndex + 1; x < list.length; x++) {
      if (list[x].level <= list[oldIndex].level) break;
      delCount++;
    }
    const removed = newarr.splice(oldIndex, delCount)
    if (newIndex == 0) {
      var diff = removed[0].level - 1
      for (let x = 0; x < removed.length; x++)
        removed[x].level -= diff
    }
    newarr.splice(newIndex, 0, ...removed)
    setlist(newarr)
  };

  const AddElement = (text) => {
    setModalShow(false)
    if (list.length > 0)
      cursor_pos = list[list.length - 1].level
    var ele = {
      id: list.length
      ,
      text: text,
      level: cursor_pos
    }
    setlist([...list, ele])
  }

  const deleteElement = (index) => {
    var delCount = 1
    for (let x = index + 1; x < list.length; x++) {
      if (list[x].level <= list[index].level) break;
      delCount++;
    }
    var newlist = [...list]
    newlist.splice(index, delCount)
    setlist(newlist)
  }

  const downloadFile = () => {
    const fileName = "Standards";
    const json = JSON.stringify(list, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const href = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = href;
    link.download = fileName + ".json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  }

  const LoadFromFile = () => {
    let input = document.createElement('input');
    input.type = 'file';
    input.accept = ".json"
    input.onchange = _ => {
      let file = Array.from(input.files);
      if (file && file[0]) {
        var reader = new FileReader()
        try {

          reader.onload = function (e) {
            var data = JSON.parse(e.target.result)
            var isvalid = true;
            for (var x in data) {
              var el = data[x]
              if (!('id' in el && 'text' in el && 'level' in el)) {
                isvalid = false;
                break;
              }
            }
            if (isvalid) {
              setlist(data)
            }
            else window.alert("Invalid file data")
          }
          reader.readAsText(file[0])
        }
        catch {
          window.alert("Invalid file data")
        }
      }
    };
    input.click();
  }

  return (
    <div className="App d-flex justify-content-center">
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)
        }
        addelement={AddElement}
      />
      <div className='container my-5 w-75 '>
        <Header saveFunc={downloadFile} loadFunc={LoadFromFile} ></Header>
        <SortableList items={list} onSortEnd={onsortEnd} useDragHandle />
        <button className='btn text-light w-100 my-4 rounded' style={{ backgroundColor: '#337AB7' }}
          onClick={() => {
            setModalShow(true);
            setTimeout(() => {
              document.getElementById('text').addEventListener('keypress', function (event) {
                if (event.key == 'Enter') {
                  event.preventDefault()
                  document.getElementById('myBtn').click()
                }
              })

            }, 1000);
          }}>
          <i className=" fas fa-plus px-2"></i>
          Add a Standard
        </button>
      </div>

    </div >
  );

}

export default App;

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      show={props.show} onHide={props.onHide}
      size="m"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <div className='container m-2 p-3 text-center'>
        <Modal.Header closeButton>
          <h4 className='text-center'>Enter Standard text</h4>
        </Modal.Header>
        <div className='d-flex justify-content-center'>
          <input type="email" className="form-control" autoFocus id="text" placeholder="Type standard text...." />
          <br></br>
          <Button className='btn btn-success mx-2' id="myBtn"
            onClick={() => {
              var text = document.getElementById('text').value
              if (text.trim() != "")
                props.addelement(text)
              else props.onHide()
            }}
          >Add</Button>
        </div>
      </div>
    </Modal>
  );
}

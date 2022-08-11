import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import {
    SortableContainer,
    SortableElement,
    SortableHandle
} from "react-sortable-hoc";

const styles = {
    1: { color: '#00bfff', fontSize: 20, fontWeight: 800 },
    2: { color: '#000000', fontSize: 17, fontWeight: 600 },
    3: { color: '#808080', fontSize: 15, fontWeight: 400 },
    4: { color: '#338099', fontSize: 15, fontWeight: 400 },
    5: { color: '#755757', fontSize: 15, fontWeight: 400 }
}
export default class Item extends Component {
    constructor(props) {
        super(props)
        this.state = { padd: 50 }
    }

    DragHandle = SortableHandle(() => (
        <OverlayTrigger
            delay={{ hide: 450, show: 300 }}
            overlay={(props) => (
                <Tooltip {...props}>
                    Move
                </Tooltip>
            )}
            placement="top"
        >
            <i className="IconGrab fa fa-arrows"></i>

        </OverlayTrigger>

    ))

    SortableItem = SortableElement(({ value }) => (
        <div className='d-flex border-top border-bottom'>
            <div className='d-flex '>
                <this.DragHandle />
                <OverlayTrigger
                    delay={{ hide: 450, show: 300 }}
                    overlay={(props) => (
                        <Tooltip {...props}>
                            outdent
                        </Tooltip>
                    )}
                    placement="top"
                >
                    <i className="Icon fa fa-arrow-left" onClick={this.decrease} />
                </OverlayTrigger>
                <OverlayTrigger
                    delay={{ hide: 450, show: 300 }}
                    overlay={(props) => (
                        <Tooltip {...props}>
                            indent
                        </Tooltip>
                    )}
                    placement="top"
                >
                    <i className="Icon fa fa-arrow-right" onClick={this.increase} />

                </OverlayTrigger>
                <OverlayTrigger
                    delay={{ hide: 450, show: 300 }}
                    overlay={(props) => (
                        <Tooltip {...props}>
                            Delete
                        </Tooltip>
                    )}
                    placement="top"
                >

                    <i className="Icon fa fa-trash" onClick={this.deleteElement} />

                </OverlayTrigger>
                <div className="seperator"
                    style={{ marginLeft: 40 + this.props.value.level * 20 }}>
                </div>

                <p className='align-middle my-2 mx-4' style={styles[this.props.value.level]}>
                    {this.props.value.text}
                </p>

            </div>
        </div>
    ))

    increase = () => {
        if (this.props.value.level < 5) {
            this.props.setFunc(this.props.index, this.props.value.level + 1)
        }
    }
    deleteElement = () => {
        this.props.delFunc(this.props.index)
    }
    decrease = () => {
        if (this.props.value.level > 1) {
            this.props.setFunc(this.props.index, this.props.value.level - 1)
        }
    }


    render() {
        return (
            <this.SortableItem index={this.props.index} value={this.props.value} />
        )
    }
}

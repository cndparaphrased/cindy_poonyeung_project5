import React, { Component } from 'react';
import './_doNowList.scss';

class DoNowList extends Component {
  handleClick = (e) => {
    e.preventDefault();
    this.props.deleteItemFromNow(e.target.id);
  }
  strikethroughComplete = (e) => {
    this.props.doNowCompleteAll(e.target.id);
  }

  render(){
    return(
      <section className="doNowContainer">
        <p className="textblock textblock--bolder">Complete as many as you can.</p>
        
        <form className="listForm">
          <ul className="doNowList">
            {(this.props.doNowList).map((item) => {
              return (
                <li className={`listForm__item doNowList__item ${item.complete ? "doNowList__item--active" : ""} `} key={item.tempKey}>
                
                <span className="listForm__label listForm__label--doNow" onClick={this.strikethroughComplete} id={item.tempKey}>{item.listItem}</span>
                
                  <button className="btn btn--delete"><i onClick={this.handleClick} id={item.tempKey} className="far fa-trash-alt"></i></button>
                </li>
              )
            })}
          </ul>
        </form>
        <div className="btnContainer">
          <button className="btn">I'm finished.<br /><strong>Delete all items.</strong></button>
          <button className="btn">I'm finished.<br /><strong>Shelve all unmarked.</strong></button>
        </div>
      </section>
    )
  }
}

export default DoNowList;
import React, { Component } from 'react';
import './App.css';
import firebase from './firebase';

// COMPONENTS
import Header from './components/Header/Header';
import InputForm from './components/Form/InputForm';
import OriginalList from './components/OriginalList/OriginalList';
import DoNowList from './components/DoNowList/DoNowList';
import DoLaterList from './components/DoLaterList/DoLaterList';
import Footer from './components/Footer/Footer';

const userOriginalRef = firebase.database().ref('/userOriginal');
const userNowRef = firebase.database().ref('/userNow');
const userLaterRef = firebase.database().ref('/userLater');

class App extends Component {
  constructor(){
    super();
    this.state = {
      userList: [],
      doNowList: [],
      doLaterList: []
    }
  } 
  addItemToDb = (userInput) => {
    if (userInput.length > 0) {
      userOriginalRef.push({
        listItem: userInput,
        complete: false
      });
    }
  }
  componentDidMount(){
    userOriginalRef.on('value', (snapshot) => {
      this.sortItems(snapshot.val());
    });
    userNowRef.on('value', (snapshot) => {
      if (snapshot.val() !== null) {
        const doNowList = Object.entries(snapshot.val()).map((item) => {
          return ({
            tempKey: item[0],
            itemKey: item[1].itemKey,
            listItem: item[1].listItem,
            complete: item[1].complete
          })
        });
        this.setState({
          doNowList
        });
      } else {
        this.setState({
          doNowList: []
        })
      }
    });
    userLaterRef.on('value', (snapshot) => {
      if (snapshot.val() !== null) {
        const doLaterList = Object.entries(snapshot.val()).map((item) => {
          return ({
            tempKey: item[0],
            itemKey: item[1].itemKey,
            listItem: item[1].listItem,
            complete: item[1].complete
          })
        });
        this.setState({
          doLaterList
        });
      } else {
        this.setState({
          doLaterList: []
        });
      }
    });
  }
  sortItems = (listItemObject) => {
    if (listItemObject === null){
      listItemObject = {}
    }
    const listItemArray = Object.entries(listItemObject).map((item) => {
      return ({
        itemKey: item[0],
        listItem: item[1].listItem,
        complete: item[1].complete
      })
    });
    this.setState({
      userList: listItemArray
    });
  }
  deleteItemFromDb = (item) => {
    const itemDbRef = firebase.database().ref(`userOriginal/${item}`);
    itemDbRef.remove();
  }
  toggleComplete = (item) => {
    const itemToComplete = this.state.userList.find((key) => {
      return key.itemKey === item
    })
    itemToComplete.complete === false ? 
    userOriginalRef.child(`${item}`).update({complete:true}) :
    userOriginalRef.child(`${item}`).update({complete:false})
  }

  // THIS STARTS THE SEPARATION OF LISTS
  handleGrouping = () => {
    const createNowList = this.state.userList.filter(item => item.complete)
    createNowList.forEach((item) => {
      userNowRef.push({
        itemKey: item.itemKey,
        listItem: item.listItem,
        complete: false
      });
    });

    const createLaterList = this.state.userList.filter(item => !item.complete)
    createLaterList.forEach((item) => {
      userLaterRef.push(item);
    });

  // THIS RESETS THE ORIGINAL LIST'S COMPLETE TOGGLE
    this.state.userList.map((item) => {
      item.complete === true ? 
      userOriginalRef.child(`${item.itemKey}`).update({complete:false}) : null
    });
  }
  
  // THIS DELETES EACH LIST SEPARATELY BUT KEEPS THE ORIGINAL LIST
  deleteItemFromNow = (item) => {
    const itemNowDbRef = firebase.database().ref(`userNow/${item}`);
    itemNowDbRef.remove();
  }
  deleteItemFromLater = (item) => {
    const itemLaterDbRef = firebase.database().ref(`userLater/${item}`);
    itemLaterDbRef.remove();
  }

  // THIS TOGGLES COMPLETE FOR ORIGINAL AND LATER LIST
  toggleCompleteAll = (item) => {
    const completedLater = this.state.doLaterList.find((key) => {
      return key.tempKey === item
    })
    const completedBoth = completedLater.itemKey;
  
    completedLater.complete === false ? 
    userLaterRef.child(`${item}`).update({complete:true}) :
    userLaterRef.child(`${item}`).update({complete:false})

    completedLater.complete === false ?
    userOriginalRef.child(completedBoth).update({complete:true}) :
    userOriginalRef.child(completedBoth).update({complete:false})
  }
  // THIS TOGGLES STRIKETHROUGH FOR NOW LIST AND COMPLETE FOR ORIGINAL LIST
  doNowCompleteAll = (item) => {
    const completedNow = this.state.doNowList.find((key) => {
      return key.tempKey === item
    })
    const completedBoth = completedNow.itemKey;

    completedNow.complete === false ?
    userNowRef.child(`${item}`).update({complete:true}) :
    userNowRef.child(`${item}`).update({complete:false})

    completedNow.complete === false ?
    userOriginalRef.child(completedBoth).update({complete:true}) :
    userOriginalRef.child(completedBoth).update({complete:false})

  }

  // ==============================
  // THIS STARTS THE PAGE RENDER
  // ==============================
  render() {
    return (
      <body className="App">
        <div className="grid">
          <Header />
          <main className="mainApp">
            <InputForm addItemToDb={this.addItemToDb} />

            <OriginalList userOriginalList={this.state.userList} deleteItemFromDb={this.deleteItemFromDb} toggleComplete={this.toggleComplete} />

            <button className="btn" onClick={this.handleGrouping}><strong>Shelve everything else.</strong></button>

            <DoNowList doNowList={this.state.doNowList} deleteItemFromNow={this.deleteItemFromNow} doNowCompleteAll={this.doNowCompleteAll} />

            <DoLaterList doLaterList={this.state.doLaterList} deleteItemFromLater={this.deleteItemFromLater} toggleCompleteAll={this.toggleCompleteAll} />
          </main>
          <Footer />
        </div>
      </body>
    );
  }
}

export default App;


// a delete or toggle on the original list also does the same for its copies
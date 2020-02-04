import React, { Component } from 'react';
import { bindActionCreators, Action } from 'redux';
import { connect } from 'react-redux';
import Modal from 'react-modal';

import actions, { fetchData } from './actions'
import { Gnome, IGnomeProp } from '../gnome/gnome';
import GnomeDetail from '../gnomeDetail/gnomeDetail';
import './styles.css';
import _ from 'lodash';

export interface IGnomeListProps {
    state: IGnomeListState,
    actions: IGnomeListActions,
    getData: () => Action;
}

export interface IGnomeListState {
    data: Array<IGnomeProp>,
    showModal: boolean,
    gnomeDetails?: IGnomeProp,
    gnomeDetailsFriends: Array<IGnomeProp>,
    filteredData: Array<IGnomeProp>
}

export interface IGnomeListActions {
    saveData: (data: Array<IGnomeProp>) => Action;
    showGnomeDetails: (gnome: IGnomeProp, friends: Array<IGnomeProp>) => Action;
    closeModal: () => Action;
    setFilteredData: (filteredData: Array<IGnomeProp>) => Action;
    
}
class GnomeList extends Component<IGnomeListProps> {

    componentDidMount() {
        this.props.getData();
        Modal.setAppElement('body');
    }

    getGnomes() {
        const { data, filteredData } = this.props.state;

        if (!_.isEmpty(filteredData)) {
            return filteredData.map((gnome, key) =>
                <Gnome key={key} {...gnome} onPress={() => this.showGnomeDetails(gnome)}></Gnome>)
        } else if (!_.isEmpty(data)) {
            return data.map((gnome, key) =>
                <Gnome key={key} {...gnome} onPress={() => this.showGnomeDetails(gnome)}></Gnome>)
        }
        else {
            return null
        }
    }

    showGnomeDetails(gnome: IGnomeProp): void {
        const friends = this.getFriendsData(gnome.friends)
        this.props.actions.showGnomeDetails(gnome, friends);
    }


    getGnomeDataByName(name: string): IGnomeProp {
        const gnome = this.props.state.data.filter((gnome) => gnome.name === name)
        return  gnome[0] as IGnomeProp
    }

    getFriendsData(friends: Array<string>): Array<IGnomeProp> {
        return friends.map<IGnomeProp>(friend =>{ return this.getGnomeDataByName(friend)})
    }

    searchByName = _.debounce((text: string) => {
        const { data } = this.props.state;
        const filteredData = data.filter( gnome => gnome.name.toLowerCase().includes(text.toLowerCase()))
        this.props.actions.setFilteredData(filteredData);
    }, 700)

    render() {
        const { showModal, gnomeDetails, gnomeDetailsFriends } = this.props.state;

        return (
            <div className="scroll">
                <div className='searchBar'>
                    <img className="searchIcon" src={require('../resources/search.png')} />
                    <input type="text"
                        placeholder="Search by name"
                        onChange={event => {
                            this.searchByName(event.target.value)
                        }}>
                    </input>
                </div>
                <h1>Brastlewark</h1>
                <div className="gnomeList">
                    {this.getGnomes()}
                    {gnomeDetails && <Modal
                        isOpen={showModal}
                        onRequestClose={() => this.props.actions.closeModal()}
                        style={customStyles}
                        contentLabel="gnome details"
                    >
                        <img style={{
                            position: 'absolute', cursor: 'pointer'}}
                        src={require('../resources/close.png')} 
                        onClick={() => this.props.actions.closeModal()}
                        alt={'close button'} />
                        <GnomeDetail 
                            gnome={gnomeDetails} 
                            friendsDetails={gnomeDetailsFriends} 
                            onFriendPress={this.showGnomeDetails.bind(this)}>
                        </GnomeDetail>
                    </Modal>}
                </div>
            </div>
        );
    }
   
}

function mapStateToProps(state: any) {
    return { state: state.gnomeList };
}

function mapDispatchToProps(dispatch: any) {
    return {
        actions: {
            ...bindActionCreators<IGnomeListActions, any>(actions, dispatch)
        },
        getData: () => dispatch(fetchData())
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(GnomeList);

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-50%, -50%)'
    }
};
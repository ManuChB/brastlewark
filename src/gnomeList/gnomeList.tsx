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
    dataToShow: Array<IGnomeProp>,
    rawData: Array<IGnomeProp>,
    showModal: boolean,
    gnomeDetails?: IGnomeProp,
    gnomeDetailsFriends: Array<IGnomeProp>,
    filteredData: Array<IGnomeProp>,
    activePage: number
}

export interface IGnomeListActions {
    saveData: (data: Array<IGnomeProp>) => Action;
    showGnomeDetails: (gnome: IGnomeProp, friends: Array<IGnomeProp>) => Action;
    closeModal: () => Action;
    setFilteredData: (filteredData: Array<IGnomeProp>) => Action;
    setDataToShow: (dataToshow: Array<IGnomeProp>) => Action;
    setActivePage: (page: number) => Action;
    
}

const GNOMES_IN_PAGE = 20;

class GnomeList extends Component<IGnomeListProps> {

    componentDidMount() {
        this.props.getData();
        Modal.setAppElement('body');
    }

    getGnomes() {
        const { dataToShow } = this.props.state;

        if (!_.isEmpty(dataToShow)) {
            return dataToShow.map((gnome, key) =>
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
        const gnome = this.props.state.rawData.filter((gnome) => gnome.name === name)
        return  gnome[0] as IGnomeProp
    }

    getFriendsData(friends: Array<string>): Array<IGnomeProp> {
        return friends.map<IGnomeProp>(friend =>{ return this.getGnomeDataByName(friend)})
    }

    searchByName = _.debounce((text: string) => {
        const { rawData } = this.props.state;
        const filteredData = rawData.filter( gnome => gnome.name.toLowerCase().includes(text.toLowerCase()))
        this.props.actions.setFilteredData(filteredData);
        this.filterByPagination(1);
    }, 700)

    setPagination() {
        const { activePage, filteredData, rawData } = this.props.state;
        const pages = !_.isEmpty(filteredData) ? 
            Math.ceil(filteredData.length / GNOMES_IN_PAGE) : 
            Math.ceil(rawData.length / GNOMES_IN_PAGE);
        const pageNumbers = [];
        if (pages !== null) {
            for (let i = 1; i <= pages; i++) {
                pageNumbers.push(i);
            }
            return pageNumbers.map(number => {
                let classes = activePage === number ? "active" : '';
                if (number >= activePage - 2 && number <= activePage + 2) {
                    return (
                        <span key={number} className={classes} 
                            onClick={() => this.filterByPagination(number)}>{number}
                        </span>
                    );
                }
            });
        }
    }

    filterByPagination(page: number) {
        const { rawData, filteredData } = this.props.state;

        this.props.actions.setActivePage(page);
        if (!_.isEmpty(filteredData)) {
            this.props.actions.setDataToShow(filteredData.slice((page - 1) * GNOMES_IN_PAGE, page * GNOMES_IN_PAGE))
        }
        else if (!_.isEmpty(rawData)) {
            this.props.actions.setDataToShow(rawData.slice((page - 1) * GNOMES_IN_PAGE, page * GNOMES_IN_PAGE))
        }
        else {
            return null
        } 
    }

    render() {
        const { showModal, gnomeDetails, gnomeDetailsFriends, filteredData, rawData } = this.props.state;
        const pages = !_.isEmpty(filteredData) ?
            Math.ceil(filteredData.length / GNOMES_IN_PAGE) :
            Math.ceil(rawData.length / GNOMES_IN_PAGE);
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
                <div className={"pagination"}>
                    <span onClick={() => this.filterByPagination(1)}>&laquo;</span>
                    {this.setPagination()}
                    <span onClick={() => this.filterByPagination(pages)}>&raquo;</span>
                </div>
                
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
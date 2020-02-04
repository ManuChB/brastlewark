import React, { Component } from 'react';

import { IGnomeProp } from '../gnome/gnome';
import './styles.css';
import _ from 'lodash';
import { Professions } from '../professions/professions';

interface IGnomeDetailProps {
    gnome: IGnomeProp,
    friendsDetails: Array<IGnomeProp>,
    onFriendPress: (gnome: IGnomeProp) => void;
}

class GnomeDetail extends Component<IGnomeDetailProps> {

    getFriends() {
        const { friendsDetails, onFriendPress } = this.props;

        return friendsDetails ? (friendsDetails.map((friendDetail, key) =>
            {
            const { thumbnail, name } = friendDetail;

                return (
                    <div key={key} onClick={() => onFriendPress(friendDetail)} className="friend">
                        <h4>{name}</h4>
                        <img src={thumbnail} className="friendImage" alt={'friend gnome thumbnail'} />
                        <Professions professions={friendDetail.professions} maxShown={1}>
                        </Professions>
                    </div>)
            }
        )) : null;

    }

    render() {
        const { thumbnail, name, hair_color, height, professions, weight, age, friends } = this.props.gnome;
        return (
            <div className='mainDiv'>
                <h3 style={{paddingTop: 10, textAlign: 'center'}}>{name}</h3>
                <div className='gnomeInfo'>
                    <img src={thumbnail} className='gnomeImage' alt={'gnome thumbnail'} />
                    <div>
                        <h5>{`Age: ${age}`}</h5>
                        <h5>{`Hair colour: ${hair_color}`}</h5>
                        <h5>{`Height: ${Number(height).toFixed(2)} cm`}</h5>
                        <h5>{`Weight: ${Number(weight).toFixed(2)} kg`}</h5>
                        <h5>{`Professions:`}<Professions professions={professions} maxShown={professions.length}></Professions></h5>
                    </div>
                </div>
                {!_.isEmpty(friends) && <h3>{'Friends: '}</h3>}
                <div className='friends'>
                    {this.getFriends()}
                </div>
            </div>
        );
    }

}

export default GnomeDetail;


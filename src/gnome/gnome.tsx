import React, { StatelessComponent, CSSProperties } from 'react';
import { Professions } from '../professions/professions';

export const Gnome: StatelessComponent<IGnomeProp> = (
    { name, thumbnail, professions, onPress, imgStyle }
) => (
        <div onClick={onPress} style={styles.divStyle}>
            <img src={thumbnail} 
                style={imgStyle ? imgStyle : { width: 250, height: 250 }}
                alt={'gnome thumbnail'}/>
            <h3>{name}</h3>
            <Professions professions={professions} maxShown={3}></Professions> 
        </div>
    );

export interface IGnomeProp {
    id: number;
    name: string;
    thumbnail?: string;
    age?: number;
    weight?: number;
    height?: number;
    hair_color?: string;
    professions: Array<string>;
    friends: Array<string>;
    onPress: () => void;
    imgStyle?: CSSProperties;
}

const styles = {
    divStyle: {
        alignItems: 'center', 
        border: "1px solid #788a94", 
        margin: 10,
        width: 250, 
        backgroundColor: 'white', 
        cursor: 'pointer',
        paddingBottom: 30
    }
}

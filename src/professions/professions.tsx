import React, { StatelessComponent, CSSProperties } from 'react';

export const Professions: StatelessComponent<IProfessionsProp> = (
    { professions, maxShown}
) => (
    <div style={styles.professions}>
            {professions ? (
                professions
                .slice(0, maxShown)
                .map((profession, key) =>
                    <div key={key} style={styles.profession}>
                        {profession}
                    </div>
        )) : null}
            {professions.length > maxShown && 
                <div style={styles.profession}>
                {`+${professions.length - maxShown}`}
            </div>}
    </div>
    );

export interface IProfessionsProp {
    professions: Array<string>;
    maxShown: number;
}

const styles = {
    professions: {
        display: 'flex',
        justifyContent: 'space-evenly',
        flexWrap: "wrap"
    } as CSSProperties,
    profession: {
        boxShadow: "1px 2px 1px #9e9e9e",
        backgroundColor: '#a1bbbf',
        display: 'initial',
        padding: 3,
        margin: 5
    } as CSSProperties
}

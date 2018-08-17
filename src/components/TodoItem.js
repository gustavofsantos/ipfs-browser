import React from 'react';
import { StyleSheet, css } from 'aphrodite';

export default props => (
    <div className={css(styles.card)}>
        <h1 className={css(styles.text)}>{props.text}</h1>
        <p className={css(styles.hash)}>{props.hash}</p>
    </div>
);

const styles = StyleSheet.create({
    card: {
        textAlign: 'justify',
        backgroundColor: '#FFF',
        padding: '0.5rem',
        margin: '0.5rem',
        borderBottom: '1px rgba(0,0,0,1)'
        // borderRadius: '0.2rem',
        // boxShadow: '0px 4px 29px -5px rgba(0,0,0,0.75)',
    },
    text: {
        fontWeight: 'bold'
    },
    hash: {
        fontSize: 12
    }
});
import React from 'react';
import { StyleSheet, css } from 'aphrodite';

export default props => (
    <div className={css(styles.card)}>
        <h3 className={css(styles.text)}>{props.text}</h3>
        <p className={css(styles.hash)}>{props.hash}</p>
    </div>
);

const styles = StyleSheet.create({
    card: {
        textAlign: 'justify',
        // backgroundColor: '#F0F0F0',
        padding: '0.3rem',
        margin: '0.5rem',
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
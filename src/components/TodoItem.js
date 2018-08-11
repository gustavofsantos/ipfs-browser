import React from 'react';
import { StyleSheet, css } from 'aphrodite';

export default props => (
    <div className={css(styles.card)}>
        <p className={css(styles.text)}>{props.text}</p>
        <p className={css(styles.hash)}>{props.hash}</p>
    </div>
);

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#005792',
        padding: '0.3rem',
        marginTop: '0.5rem',
        marginDown: '0.5rem',
        borderRadius: '0.2rem',
        boxShadow: '0px 4px 29px -5px rgba(0,0,0,0.75)',
    },
    text: {
        fontSize: 18
    },
    hash: {
        fontSize: 12
    }
});
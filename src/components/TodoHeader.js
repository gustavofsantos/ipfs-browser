import React from 'react';
import { StyleSheet, css } from 'aphrodite';

export default props => (
    <div className={css(styles.container)}>
        <header className={css(styles.header)}>Todo App</header>
        <p className={css(styles.p)}>
            IPFS 
            <span 
                className={props.status === 'online' ? 
                    css(styles.statusOnline) : css(styles.statusOffline)}>
                {props.status}
            </span>
        </p>
    </div>
);

const styles = StyleSheet.create({
    container: {
        marginTop: '8px',
        marginDown: '8px'
    },
    header: {
        fontSize: 22
    },
    p: {
        fontSize: 14
    },
    statusOnline: {
        background: '#00818a',
        color: '#74dac6'
    },
    statusOffline: {
        background: '#be3030',
        color: '#ff9393'

    }
})
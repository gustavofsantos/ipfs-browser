import React from 'react';
import { StyleSheet, css } from 'aphrodite';

export default props => (
    <div className={css(styles.bar)}>
        <div className={css(styles.container)}>
            <div className={css(styles.leftSide)}>
                <header className={css(styles.header)}>Todo App</header>
            </div>
            <div className={css(styles.rightSide)}>
                <button onClick={props.importButtonHandler}>importar</button>
                {/* <p className={css(styles.p)}>
                    IPFS
                    <span
                        className={props.status === 'online' ?
                            css(styles.statusOnline) : css(styles.statusOffline)}>
                    </span>
                </p> */}
            </div>
        </div>
    </div>
);


const styles = StyleSheet.create({
    bar: {
        background: '#FFF',
        borderBottom: '1px solid #d4dadf',
        boxShadow: '0 1px 1px 0 rgba(116, 129, 141, 0.1)',
        zIndex: 20,
        alignItems: 'stretch',
        position: 'relative',
        display: 'flex',
        flex: '0 80px',
        flexFlow: 'row nowrap',
        marginDown: '0.4rem'
    },
    container: {
        alignItems: 'center',
        maxWidth: '30rem'
    },
    rightSide: {
        position: 'relative',
        flex: '0 1 auto'
    },
    leftSide: {
        position: 'relative',
        flex: '0 1 auto'
    },
    header: {
        alignItems: 'stretch',
        fontSize: 22,
        padding: '0.8rem'
    },
    p: {
        fontSize: 14
    },
    statusOnline: {
        backgroundColor: '#00818a',
        height: '10px',
        width: '10px',
        borderRadius: '50%',
        display: 'inline-block',
    },
    statusOffline: {
        backgroundColor: '#be3030',
        height: '25px',
        width: '25px',
        borderRadius: '50%',
        display: 'inline-block',
    }
})
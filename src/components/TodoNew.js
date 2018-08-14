import React from 'react';
import { StyleSheet, css } from 'aphrodite';

export default props => (
    <form
        onSubmit={props.handleTextSubmit}>
        <div className="row">
            <input
                className={css(styles.inputText)}
                type="text" value={props.texto} onChange={props.handleTextChange} />
        </div>
        <div className="row">
            <input
                className={css(styles.inputButton)}
                type="submit" value="Adicionar" />
        </div>
    </form>
)

const styles = StyleSheet.create({
    form: {
        display: 'inline-block',
        flex: '0 0 100%',
        background: '#FFF',
        borderRadius: '0.2rem',
        boxShadow: '0px 4px 29px -5px rgba(0,0,0,0.75)',
        maxWidth: '32rem',
        width: '100%',
        marginDown: '1rem',
        marginTop: '1rem',
        padding: '1rem'
    },
    inputText: {
        background: '#F0F0F0',
        color: '#1A1A1A',
        width: '90%',
        padding: '1rem',
        borderStyle: 'none',
        borderRadius: '0.5rem'
    },
    inputButton: {
        background: '#1A1A1A',
        color: '#F0F0F0',
        boxShadow: '0px 4px 29px -5px rgba(0,0,0,0.75)',
        padding: '1rem',
        marginLeft: '0.5rem',
        borderStyle: 'none',
        borderRadius: '0.5rem'
    }
})
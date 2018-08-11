import React from 'react';
import { StyleSheet, css } from 'aphrodite';

export default props => (
    <form 
        className={css(styles.form)}
        onSubmit={props.handleTextSubmit}>
        <input 
            className={css(styles.inputText)}
            type="text" value={props.texto} onChange={props.handleTextChange} />
        <input 
            className={css(styles.inputButton)} 
            type="submit" value="Adicionar" />
    </form>
)

const styles = StyleSheet.create({
    form: {
        display: 'inline-block',
        flex: '0 0 100%',
        background: '#005792',
        borderRadius: '0.2rem',
        boxShadow: '0px 4px 29px -5px rgba(0,0,0,0.75)',
        maxWidth: '24rem',
        width: '100%',
        marginDown: '1rem',
        marginTop: '1rem',
        padding: '1rem'
    },
    inputText: {
        background: '#f6f6e9',
        color: '#13334c',
        padding: '1rem',
        borderStyle: 'none'
    },
    inputButton: {
        background: '#fd5f00',
        color: '#f6f6e9',
        padding: '1rem',
        borderStyle: 'none'
    }
})
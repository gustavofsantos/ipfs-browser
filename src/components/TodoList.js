import React from 'react';
import TodoItem from './TodoItem';
import TodoListEmpty from './TodoListEmpty';

import { genKey } from '../lib/utils';

export default props => {
    if (props.items && props.items.length > 0) {
        return props.items.map(item => 
            <TodoItem text={item.text}
                hash={item.hash} 
                key={genKey()} />
            );
    } else {
        return <TodoListEmpty />
    }
};
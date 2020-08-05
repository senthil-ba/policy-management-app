import React from 'react';
import { FormControl } from '@material-ui/core';

const Purchase = () => {
    return (
        <FormControl spacing={2}>
            <TextField id="policy" label="po" onChange={inputHandler} />
            <TextField id="password" type="password" label="Password" />
            <Button className={styles.Button}>SIGN IN</Button>
        </FormControl>
    );
};

export default Purchase;
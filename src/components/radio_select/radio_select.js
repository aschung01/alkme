import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

export const RadioSelect = (props) => {
  const {value, values, onChange} = props;

  return (
    <FormControl component="fieldset">
      <RadioGroup value={value} onChange={onChange}>
        {
          values.map(e => {
            return <FormControlLabel key={e} value={e} control={<Radio />} label={e} />
          })
        }
      </RadioGroup>
    </FormControl>
  );
}
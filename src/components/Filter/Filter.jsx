import React from 'react';
import { Label, Field } from './Filter.styled';

import { useDispatch } from 'react-redux';
import { setFilter } from 'redux/filter/filterSlice';

export const Filter = () => {
  const dispatch = useDispatch();
  
  return (
    <Label>
      Find contacts by name
      <Field type="text"  onChange={e=>dispatch(setFilter(e.target.value))} />
    </Label>
  );
};

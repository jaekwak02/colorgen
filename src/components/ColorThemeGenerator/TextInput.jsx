import React from 'react';
import styled from 'styled-components';

const InputDiv = styled.input``;

function TextInput({ value, onChange }) {
	return <InputDiv type="text" value={value} onChange={e => onChange(e.target.value)} />;
}

export default TextInput;

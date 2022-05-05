import React, { useState } from 'react'

const InputAutoComplete = ({data, fieldSearch, placeholder, className}) => {
    const [text, setText] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const onChangeHandler = (e) => {
        const text = e.target.value;
        let matches = [];
        if(text.length>0){
            matches = data.filter(d => {
                const regex = new RegExp(`${text}`,'gi');
                return d[fieldSearch].match(regex)
            })
        }
        setSuggestions(matches);
        setText(text);
    }
  return (
    <input 
        className={className}
        type="text" 
        placeholder={placeholder} 
        aria-label="default input example"
        onChange={onChangeHandler}
        value={text}
    />
  )
}

export default InputAutoComplete
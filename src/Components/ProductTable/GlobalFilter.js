import React from 'react'

export function GlobalFilter ({filter, setFilter}){
    return <span>
        Buscar: {''}
        <input value={filter || ''} onChange={e => setFilter(e.target.value)}></input>
    </span>
}
import React from 'react'

const style = {
    backgroundColor: '#BED1F9',
    height: '75px',
    width: '150px',
    fontFamily: 'Lexend Deca',
    fontSize: '23px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '20px',
    marginTop: '1rem',
    cursor: 'pointer'
}

const OptionTab = ({ name, onClick }) => {

    return (
        <div style={style} onClick={() => onClick}>            
            {name}
        </div>
    )
}

export default OptionTab
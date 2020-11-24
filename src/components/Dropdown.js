import React, { useState, useEffect, useRef } from 'react'

const Dropdown = ({ label, options, selected, handleSelectedChange }) => {
    const [active, setActive] = useState(false)
    const ref = useRef()

    useEffect(() => {
        const handleBodyClick = (e) => {
            if (ref.current?.contains(e.target)) {
                return
            }

            setActive(false)
        }

        document.body.addEventListener('click', handleBodyClick)

        return () => {
            document.body.removeEventListener('click', handleBodyClick)
        }
    }, [])

    const renderedOptions = options.map((option) => {
        if (option.value === selected.value) {
            return null
        }

        return (
            <div
                key={option.value}
                className="item"
                onClick={() => handleSelectedChange(option)}
            >
                {option.label}
            </div>
        )
    })

    return (
        <div ref={ref} className="ui form">
            <div className="field">
                <label className="label">{label}</label>
                <div
                    className={`ui selection dropdown ${
                        active ? 'visible active' : ''
                    }`}
                    onClick={() => setActive(!active)}
                >
                    <i className="dropdown icon"></i>
                    <div className="text">{selected.label}</div>
                    <div
                        className={`menu ${active ? 'visible transition' : ''}`}
                    >
                        {renderedOptions}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dropdown

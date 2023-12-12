import React from 'react'

const Backdrop = ({ open, setOpen, children }) => {
    if (open) {
        return (
            <div className='backdrop'>
                <div onClick={() => setOpen(false)} className='closer'></div>
                <div className="model">
                    {children}
                </div>
            </div>
        )
    }
}

export default Backdrop
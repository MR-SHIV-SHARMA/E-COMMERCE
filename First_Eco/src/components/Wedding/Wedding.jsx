import React from 'react'

function Wedding() {
    return (
        <>
            <div className="relative overflow-hidden min-h-96 w-full">
                <img
                    src="https://images.pexels.com/photos/307008/pexels-photo-307008.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt=""
                    className="absolute inset-0 -z-10 min-h-screen w-full"
                />
            </div>
            <div className='flex flex-wrap flex-col mt-2 leading-8 items-center'>
                <h1 className='text-5xl text-center font-extrabold'>WEAR TO WEDDING</h1>
                <p className='text-xl text-center p-3'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempora, fuga?</p>
                <button className='bg-black text-white px-12 mb-7 py-3 rounded-full'>See Details</button>
            </div>
        </>
    )
}

export default Wedding
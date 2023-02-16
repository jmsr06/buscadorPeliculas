import React from 'react'

const Loader = () => {
    return (
        <div class="fixed bg-[#181818BF] inset-0 z-50 w-full flex justify-center items-center h-screen">
            <div class="lds-roller">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}

export default Loader

import React, { useState } from 'react';

const ImageWithCheckbox = ({ image, index, handleDragStart, handleDragOver, handleImageSelectionToDelete,isChecked }) => {
    const [isImgSelectBtnVisible, setIsImgSelectBtnVisible] = useState(false)
    

    return (
        <div draggable
            onDragStart={(e) => handleDragStart(e, image)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDragOver(e, image)}
            onMouseEnter={() => setIsImgSelectBtnVisible(true)}
            onMouseLeave={() => setIsImgSelectBtnVisible(false)}
            className={`${index === 0 ? "col-span-2 row-span-2" : "col-span-1 row-span-1"} border rounded-lg relative `}>
            <img
                className='rounded-lg w-full h-full'
                src={image} alt=''
            />
            <div className={`absolute z-50   rounded-lg opacity-50 top-0 right-0 left-0 bottom-0 w-full  ${isChecked ? 'bg-slate-50' : 'hover:bg-gray-700'}`}>
                {(isImgSelectBtnVisible || isChecked) && <input checked={isChecked} onChange={() => {
                    handleImageSelectionToDelete(image, !isChecked)
                }} className='w-4 h-4 m-3 rounded ' type='checkbox'></input>}
            </div>

        </div>
    );
};

export default ImageWithCheckbox;
import { useState } from 'react';
import './App.css';
import { AiOutlinePicture } from "react-icons/ai";


function App() {
  const [selectedImages, setSelectedImages] = useState([])
  const handleSelectedImages = (event) => {
    const selectedFiles = event.target.files
    const selectedFilesArray = Array.from(selectedFiles)
    console.log(selectedFiles)
    console.log(selectedFilesArray)
    const imageArray = selectedFilesArray.map(image => URL.createObjectURL(image))
    setSelectedImages(imageArray)
  }
  return (
    <div>
      <div className='md:w-2/3 mx-3 md:mx-auto my-9 shadow min-h-screen rounded'>
        <div className='h-11 shadow text-xl font-bold p-2 '>
          Gallery
        </div>
        <div className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5  p-10 gap-5'>
          {
            selectedImages &&
            selectedImages.map((image, index) =>
              <img className={`${index===0 ? "col-span-2 row-span-2": "col-span-1 row-span-1"} border rounded`} src={image} alt='' />
            )
          }
          <div>
          <label className='border-dashed border p-5 rounded cursor-pointer'>
            <span>
              {/* <AiOutlinePicture /> */}
              Add Images
              <input type='file' name="images" multiple onChange={handleSelectedImages} accept='image/png , image/jpeg , image/jpg , image/webp' className='hidden ' />
            </span>
          </label>
        </div>
        </div>
        

      </div>
    </div>
  );
}

export default App;

import { useState } from 'react';
import './App.css';
import { AiOutlinePicture } from "react-icons/ai";
import ImageWithCheckbox from './components/ImageWithCheckbox';


function App() {
  const [uploadedImages, setUploadedImages] = useState([])
  const [selectedImagesToDelete, setSelectedImagesToDelete] = useState([])
  const [draggedImage, setDraggedImage] = useState(null)


  const handleSelectedImagesForUpload = (event) => {
    console.log(uploadedImages)
    const selectedFiles = event.target.files
    const selectedFilesArray = Array.from(selectedFiles)
    const imageArray = selectedFilesArray.map(image => URL.createObjectURL(image))
    setUploadedImages([...uploadedImages, ...imageArray])
  }

  const handleDeletionOfSelectedImages = () => {
    const temp = [...uploadedImages]
    selectedImagesToDelete.map(img => {
      const imgIndex = uploadedImages.indexOf(img)
      temp.splice(imgIndex, 1)
    })
    setUploadedImages(temp)
    setSelectedImagesToDelete([])
  }

  const handleImageSelectionToDelete = (image, isChecked) => {

    const temp = [...selectedImagesToDelete]
    if (isChecked) {
      setSelectedImagesToDelete([...selectedImagesToDelete, image])
    } else {
      if (temp.includes(image)) {
        const unSelectedImgIndex = temp.indexOf(image)
        temp.splice(unSelectedImgIndex, 1)
      }
      setSelectedImagesToDelete(temp)
      return true
    }


  }


  const handleDragStart = (e, item) => {
    setDraggedImage(item);
  };


  const handleDragOver = (e, item) => {
    if (draggedImage === null) return;
    if (item === draggedImage) return;

    const newItems = [...uploadedImages];
    const draggedIndex = uploadedImages.indexOf(draggedImage);
    const itemIndex = uploadedImages.indexOf(item);

    newItems.splice(draggedIndex, 1);
    newItems.splice(itemIndex, 0, draggedImage);

    setUploadedImages(newItems);
    setDraggedImage(null);
  };


  return (
    <div>
      <div className='md:w-2/3 mx-3 md:mx-auto my-9 shadow min-h-[500px] rounded-xl'>
        <div className='h-14 shadow flex justify-between px-8 place-items-center rounded-t-lg'>
          <div className='  text-xl font-bold  '>
            {
              selectedImagesToDelete.length > 0 ? <span><input className='w-4 h-4 mr-2' type='checkbox' checked/>{selectedImagesToDelete.length} files selected</span> : <span>Gallery</span>
            }
          </div>
          <div><button onClick={handleDeletionOfSelectedImages} className='text-red-500 font-semibold hover:underline'>Delete files</button></div>
        </div>
        <div className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5  p-10 gap-5'>
          {
            uploadedImages &&
            uploadedImages.map((image, index) =>
              <ImageWithCheckbox image={image} index={index} handleDragOver={handleDragOver} handleDragStart={handleDragStart} handleImageSelectionToDelete={handleImageSelectionToDelete} isChecked={selectedImagesToDelete.includes(image)} />
            )
          }
          <div className='border-dashed border p-5 rounded cursor-pointer bg-slate-50 '>
            <label className=' flex flex-col justify-center items-center w-full h-full'>
                <AiOutlinePicture className='text-lg'/>
                <br/>
                <span className='md:font-semibold text-center'>Add Images</span>
              <input type='file' name="images" multiple onChange={handleSelectedImagesForUpload} accept='image/png , image/jpeg , image/jpg , image/webp' className='hidden h-full w-full' />

            </label>
          </div>
        </div>


      </div>
    </div>
  );
}

export default App;

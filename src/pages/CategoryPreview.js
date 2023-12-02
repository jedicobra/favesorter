import '../css/CategoryPreview.css'
import { useNavigate } from "react-router-dom"

export default function CategoryPreview({category}){
    const navigate = useNavigate();

    let photos = []
    let numPhotos = 5
    if(category.filenames.length < 5)
        numPhotos = category.filenames.length

    for(let i=0; i < numPhotos; i++){
        photos.push(category.filenames[i])
    }

    function startGame(){
        navigate('/game', { state: { categoryData: category } })

            
    }    

    return <>
        <div onClick={startGame} className="previewMain">

          {
          photos.map((photo, index) => {
              return (
                <img key={index} width='100' height='100' alt="Preview" 
                    style={{opacity: 0.5}}
                    className="previewImg" src={"images/" + category.foldername + '/' + photo} 
                />
              )
          })
          }
        
          <div className='previewLabel'>{category.prettyname} &nbsp; <i style={{opacity: 0.4}}>{category.filenames.length} items</i> </div>

        </div>
        

    </>
}
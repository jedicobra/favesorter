import { useState } from 'react';
import '../css/EditTemplate.css';


function EditTemplate() {
  const [thumbnails, setThumbnails] = useState([])



  const mainMenu = <>
    <label>
        Upload thumbnails:
        <br></br>
        <input id='fileUpload' type='file' onChange={() => setThumbnails(document.getElementById("fileUpload").files)} multiple accept='image/*' />
    </label>
  </>

  const editor = <>
    <table>
      <tbody>
        {Array.from(thumbnails).map(file => {
          return (
            <tr key={file.name}>
              <td>
                <img alt="thumbnail" src={URL.createObjectURL(file)}></img>
              </td>
              <td>
                <input type="text" placeholder={file.name}></input>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </>


  if(thumbnails.length === 0)
    return mainMenu
  else
    return editor
}


export default EditTemplate;

import './Model.css';
import { useState, useRef, useEffect } from 'react';
//import * as mobilenet from "@tensorflow-models/mobilenet";
import * as cocoSsd from "@tensorflow-models/coco-ssd";

import "@tensorflow/tfjs-backend-cpu";
import { isPromise } from '@tensorflow/tfjs-core/dist/util_base';
import Carousel from '../Carousel/Carousel';
import { getCategories } from '../../Actions/products';
import { useDispatch, useSelector } from 'react-redux';
//import "@tensorflow/tfjs-backend-webgl";




function Model() {
  
    const [imageData, setImageData] = useState(null)
    const imageRef = useRef()
    const [results, setResults] = useState(null)
    const [recommendedProducts, setRecommendedProducts] = useState([])
    const fileInputRef = useRef()
    const dispatch = useDispatch()

    let categorias = useSelector((state) => state.productsReducer.categories)
    const categoriasDet = new Set()
    
    //HardCode porque las categorias del modelo salen en ingles
    useEffect(() => {
      if(results){
          for (let i = 0; i < results.length; i++) {
            if (results[i].class === "couch") {
              categoriasDet.add("Sillones")
            }else if (results[i].class === "chair") {
              categoriasDet.add("Sillas")
          } else if (results[i].class === "potted plant") {
            categoriasDet.add("Macetas")
          } 
      }

    let recommend = [...categoriasDet];
    console.log("recom", recommend)
    let aux = categorias?.filter(item => recommend.includes(item.nombre));
    console.log("aux", aux)
    setRecommendedProducts(aux)
    console.log(recommendedProducts)
    } 
    }, [results])

    useEffect(() => {
      dispatch(getCategories())
  }, [])
    
    const normalizePredictions = (results, imgSize) => {
      if(!results || !imgSize || !imageRef) return results || []
      
      return results.map((prediction) => {
        const {bbox} = prediction;
        const oldX = bbox[0]
        const oldY = bbox[1]
        const oldWidth = bbox[2]
        const oldHeight = bbox[3] 

        const imgWidth = imageRef.current.width
        const imgHeight = imageRef.current.height

        const x = (oldX * imgWidth / imgSize.width)
        const y = (oldY * imgHeight / imgSize.height)
        const width = (oldWidth * imgWidth / imgSize.width) 
        const height = (oldHeight * imgHeight / imgSize.height)

        return {...prediction, bbox: [x, y, width, height]}
      })
    }

    const uploadImage = (e) => {
      if(fileInputRef.current) fileInputRef.current.click()
    }

    const onSelectImage = async(e) => {
      const file = e.target.files[0]
      const imgData = await readImage(file)
      setImageData(imgData)

      const imageElement = document.createElement("img");
      imageElement.src = imgData

      imageElement.onload = async() => {
        const imgSize = { width: imageElement.width, height: imageElement.height}
        await detectObjects(imageElement, imgSize)  
      }
    }

    const readImage = (file) => {
      return new Promise((rs, rj) => {
          const fileReader = new FileReader();
          fileReader.onload = () => rs(fileReader.result);
          fileReader.onerror = () => rj(fileReader.error)
          fileReader.readAsDataURL(file);
      })
    }

    
    

    const detectObjects =  async(imageElement, imgSize) => {
      alert("Esto puede demorar unos segundos...")

      //const model = await mobilenet.load()
      const model = await cocoSsd.load({});
      const predictions = await model.detect(imageElement, 10);
      //const predictions = await model.classify(imageRef.current) //mobileNet ==>> img classifier
      
       
      setResults(normalizePredictions(predictions, imgSize))
      console.log("resultados del modelo", predictions)
    }

    

    
    

    
  return (
    <div className="ObjectDetectorContainer">
      <h1 className='header'>Sin ideas?</h1>
      <h4 className='header'>Subi una foto de un ambiente o producto y dejá que nosotros te recomendemos</h4> 
      <div className='SelectButtonTS'>
            <button onClick={uploadImage}className='btn btn-outline-secondary'>Subi tu imagen</button>

      </div>
      <div className='DetectorContainer'>
        {imageData && <img className='TargetImg' src={imageData} alt="product" ref={imageRef}/>}
        
        {results && results?.map(el => (
          

                  <div style={{
                    position: "absolute",
                    left: el.bbox[0] + "px",
                    top: el.bbox[1] + "px",
                    width: el.bbox[2] + "px",
                    height: el.bbox[3] + "px",

                    border: "4px solid #1ac71a",
                    backgroundcolor: "transparent",
                    zindex: "20",
                  }}>
                                        <p className='pbox'>
                                          {el.class +"   " + el.score}
                                        </p>
                  </div>
                
          ))}
      </div>    
      <input type="file" className='HiddenFileInput' ref={fileInputRef} onChange={onSelectImage}/>

      <div className="odRecommendedProducts">
      {
          recommendedProducts && recommendedProducts?.map((elem) => (
            <div>
                  <Carousel idCategory={elem.id} category={elem.nombre}  />

            </div>
          ))
      }    
      </div>            

      
    </div>
  );
}

export default Model;

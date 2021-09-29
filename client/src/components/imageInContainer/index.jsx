import {useState} from 'react';
import './style.css';

const Index = ({imageSrc}) => {

    const [heigth, setHeight] = useState(null);
    const [width, setWidth] = useState(null);

    const onImageLoad = ({target:img}) => {
        setHeight(img.offsetHeight);
        setWidth(img.offsetWidth);
    }

    return (
        <img onLoad={onImageLoad} className={ (heigth > width)?'image-in-container-height': 'image-in-container-width'} src={imageSrc} alt="" />
    )
}

export default Index;

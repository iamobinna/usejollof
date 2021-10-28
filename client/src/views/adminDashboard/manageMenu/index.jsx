import {useState, useEffect} from 'react';
import './styles/style.css';
import { getCategories, updateCategories } from '../../../services/axios/category';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import { TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

const Index = () => {

    const [categories, setCategories] = useState();
    // const [change, setChange] = useState(false);
    const [first, setFirst] = useState(true);
    const [val, setVal] = useState('')

    const fetch = async () => {
        const _data = await getCategories();
        if(_data)
        {
            setCategories(_data);
            console.log(_data);
        }
        setFirst(false);
    }

    const update = async (e) => {
        e.preventDefault();
        let obj = {...categories};
        let cat = obj.categories;
        console.log(cat);
        obj.categories = [...cat, val];
        const _data = await updateCategories(obj);
        if(_data){
            console.log(_data);
            setVal('')
            setCategories(obj);
            // setChange(false);
        }
    }

    const deleteCat = async (index) => {
        let obj = {...categories};
        let cat = obj.categories;
        cat.splice(index, 1);
        obj.categories = cat;
        const _data = await updateCategories(obj);
        if(_data){
            setCategories(obj);
        }
    }

    useEffect(() => {
        fetch();
    }, []);

    return (
        <div className="admin-users">
            <h3>Categories</h3>
            <div className="card flex admin-categories">
                <form onSubmit={update} className="flex">
                    <TextField value={val} onChange={(e) => setVal(e.target.value)} required label='category name' size='small' />
                    <button type='submit' style={{
                        outline: 'none',
                        border: 'none'
                    }} className='button button-hover'>
                        <div className="button-bg" style={{background: 'green', zIndex: '0'}} ></div>
                        <h4 className="button-text" style={{position: 'relative'}}>Add</h4>
                        <ChangeCircleIcon className='button-icon' style={{position: 'relative'}}/>
                    </button>
                </form>
                {categories?.categories?.map((category, index)=>(
                    <div className="box admin-category flex" style={{
                        justifyContent: 'space-between'
                    }} >
                        <span>{category}</span>
                        <IconButton aria-label="delete" onClick={() => deleteCat(index)} color='primary'>
                            <DeleteIcon />
                        </IconButton>
                    </div>
                ))}
            </div>
            {/* {
                change && 
                <div style={{
                    marginTop: '20px'
                }} className='button button-hover fit' onClick={() => update() }>
                        <div className="button-bg" style={{background: 'green', zIndex: '0'}} ></div>
                        <h4 className="button-text" style={{position: 'relative'}}>Update</h4>
                        <ChangeCircleIcon className='button-icon' style={{position: 'relative'}}/>
                    </div>
            } */}
        </div>
    )
}

export default Index;
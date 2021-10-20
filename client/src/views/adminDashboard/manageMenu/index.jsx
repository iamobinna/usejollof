import {useState} from 'react';
import './styles/style.css';

const Index = () => {

    const [categories, setCategories] = useState([
        'Burgers', 'Rice', 'Pizza', 'Juices', 'Soft Drinks'
    ]);

    return (
        <div className="admin-users">
            <h3>Categories</h3>
            <div className="card flex admin-categories">
                {categories.map((category)=>(
                    <div className="box admin-category">
                        <span>{category}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Index;
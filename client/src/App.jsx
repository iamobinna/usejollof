import "./app.css";
import Button1 from "./components/Button1";
import Button2 from "./components/Button2";
import Button3 from "./components/Button3";
import Table from "./components/table";

function App() {
    return (
        <div className="app">
            <div className="buttons">
                <Button1 />
                <Button2 />
                <Button3 />
            </div>
            <div className="card">
                <Table/>
            </div>
        </div>
    );
}

export default App;

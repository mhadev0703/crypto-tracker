import { BrowserRouter, Routes, Route } from "react-router-dom";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";
//import Chart from "routes/Chart";
//import Price from "routes/Price";

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Coins />}></Route>
                <Route path="/:coinId" element={<Coin />}></Route>
            </Routes>
        </BrowserRouter>
    );
}
export default Router;

import './App.css';
import HeaderComponent from "./components/header/header.component";
import BillboardComponent from "./components/billboard/billboard.component";
import PictureBannerComponent from "./components/picture-banner/pictureBanner.component";
import TopActivity from './components/top-activity/topActivity.component';

function App() {
  return (
    <div className="App">
      <HeaderComponent />
      <main className="main">
        <div className="container">
          <BillboardComponent />
          <PictureBannerComponent />
          <TopActivity />
        </div>
      </main>
    </div>
  );
}

export default App;

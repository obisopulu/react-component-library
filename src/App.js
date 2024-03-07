import Accordion from './components/Accordion';
import ColorGenerator from './components/ColorGenerator';
import Rating from './components/Rating';

function App() {
  return (
    <div className="App">
      <Rating stars={10}/>
      <ColorGenerator />
      <Accordion />
    </div>
  );
}

export default App;

import './App.css'
import PhoneBook from './components/phoneBook'
import reducer from './components/store/reducer'
import {Provider} from 'react-redux'
import '@fontsource/roboto/300.css';

function App() {

  return (
    <Provider store={reducer}>
      <PhoneBook />
    </Provider>
  )
}

export default App

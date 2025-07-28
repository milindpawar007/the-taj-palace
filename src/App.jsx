
import styled from 'styled-components'
import GlobalStyle from './styles/GlobalStyles'
import Button from './ui/Button'
import Input from './ui/Input'
function App() {

  return (
    <>
      <GlobalStyle />
      <div>

        <Input></Input>
        <Button onClick={() => { alert('wass up') }}>
          chceck in
        </Button>
      </div>

    </>
  )
}

export default App

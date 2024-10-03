import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from './components/theme-provider'

import ClienteFormPage from './layout/compra/compraFormPage' 
import ProductoFormPage from './layout/producto/productoFormPage'
import ProductoListPage from './layout/producto/productoListPage'
import ClienteListPage from './layout/cliente/clienteListPage'
import CompraListPage from './layout/compra/compraList'

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ClienteFormPage/>} />
          <Route path="/producto/form" element={<ProductoFormPage/>} />
          <Route path="/producto/list" element={<ProductoListPage/>} />
          <Route path="/cliente/list" element={<ClienteListPage/>} />
          <Route path="/compra/list" element={<CompraListPage/>} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App

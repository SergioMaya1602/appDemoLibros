/*
  We have here the Routes of access routes's pages and will be render into index
*/
import { BrowserRouter, Route, Routes } from 'react-router-dom'; //importamos los componentes de react-router-dom
import Layout from './views/components/headers/Layout';
import PageLogin from './views/pages/PageLogin';
import PageFacturas from './views/pages/PageFacturas';
import PageClientes from './views/pages/PageClientes';
import PagePerfiles from './views/pages/PagePerfiles';
import PageResetPassword from './views/pages/PageResetPassword';
import PageNewPassword from './views/pages/PageNewPassword';
import PageNotFound from './views/pages/PageNotFound';
import './App.css';

import PageLibros from './views/pages/PageLibros';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route exact path='/' element={<PageLogin />} />
          <Route exact path='/libros' element={<PageLibros />} />
          <Route exact path='/facturas' element={<PageFacturas />} />
          <Route exact path='/clientes' element={<PageClientes />} />
          <Route exact path='/perfiles' element={<PagePerfiles />} />
          <Route exact path='/resetPassword' element={<PageResetPassword />} />
          <Route exact path='/newPassword' element={<PageNewPassword />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;

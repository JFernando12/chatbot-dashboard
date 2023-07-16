import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { themeSettings } from './theme';
import Login from './pages/login';
import Layout from './pages/layout';
import StatusWhatsapp from './pages/statusWhatsapp';
import RequireAuth from './features/auth/RequireAuth';
import ProductList from './pages/productList';
import ProductCreate from './pages/productCreate';
import ProductUpdate from './pages/productUpdate';
import FirstMessage from './pages/firstMessage';

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/login" element={<Login />}></Route>
            <Route element={<RequireAuth />}>
              <Route element={<Layout />}>
                <Route
                  path="/"
                  element={<Navigate to="/statuswhatsapp" replace></Navigate>}
                ></Route>
                <Route
                  exact
                  path="/statuswhatsapp"
                  element={<StatusWhatsapp />}
                />
                <Route exact path="/products" element={<ProductList />} />
                <Route
                  exact
                  path="/productcreate"
                  element={<ProductCreate />}
                />
                <Route
                  exact
                  path="/productupdate/:id"
                  element={<ProductUpdate />}
                />
                <Route exact path="/firstmessage" element={<FirstMessage />} />
              </Route>
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;

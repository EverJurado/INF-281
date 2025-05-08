import { Routes, Route, Navigate } from 'react-router-dom'
import { Inicio } from '../pages/Inicio'
import { Contacto } from '../pages/Contacto'
import { Button } from '../components/Button'
import { Register } from '../pages/Register'
import { ConfirmarCuenta } from '../pages/ConfirmarCuenta'
import { Acceso } from '../pages/Acceso'
import { Recuperacion } from '../pages/Recuperacion'
import { ResetPassword } from '../pages/Reset'
import Eventos from '../pages/Eventos';
import CrearEvento from '../pages/CrearEvento';
import Agenda from '../pages/Agenda'
import Chat from '../pages/chat';
export const AppRouter = () => {
    return (
        <Routes>
            <Route path='/' element={<Inicio/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/contacto' element={<Contacto/>}/>
            <Route path='/eventos' element={<Eventos />} /> {/* ✅ NUEVA RUTA */}
            <Route path="/crear-evento" element={<CrearEvento />} />
            <Route path="/agenda" element={<Agenda/>} />

            {/*<Route path='/*' element={<Navigate to='/'/>}/>*/}
            <Route path='/*' element={<h1>Error 404</h1>}/>
            <Route path='/button' element={<Button/>} />
            <Route path="/confirmar/:token" element={<ConfirmarCuenta />} />
            <Route path="/login" element={<Acceso/>}/>
            <Route path="/recuperacion" element={<Recuperacion/>}/>
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/chat" element={<Chat />} />
        </Routes>
    )
}
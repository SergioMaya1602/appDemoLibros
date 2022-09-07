import React from "react";
import FiltroPerfil from "../perfiles/FiltroPerfil";
import FiltroCliente from "../clientes/FiltroCliente";
import FiltroFactura from "../facturas/FiltroFactura";
import FiltroLibro from "../libros/FiltroLibro";
import FiltroFacturaLibros from "../facturas/FiltroFacturaLibros"

function FiltroGeneral(props) {

    //we obtain their props
    const { pageOrigin, handleChangeFiltroNombre, filtroNombre, handleChangeFiltroCorreo, filtroCorreo, handleChangeFiltroRol, filtroRol,
        handleChangeFiltroDireccion, filtroDireccion, handleChangeFiltroTelefono, filtroTelefono, handleChangeFiltroIdFactura, filtroIdFactura,
        handleChangeFiltroIsbnIssnLibro, filtroIsbnIssnLibro, handleChangeFiltroTituloLibro, filtroTituloLibro, handleChangeFiltroAutorLibro, filtroAutorLibro,
        handleChangeFiltroEditorialLibro, filtroEditorialLibro, handleChangeFiltroAnioLibro, filtroAnioLibro,
        handleChangeFiltroLugarPublicacionLibro, filtroLugarPublicacionLibro, handleChangeFiltroGeneralLibro, filtroGeneralLibro, 
        handleChangeFiltroGeneralFacturaLibro, filtroGeneralFacturaLibro } = props;

    const filterMenu = () => {

        switch (pageOrigin) {

            case "libros":
                return <FiltroLibro handleChangeFiltroIsbnIssnLibro={handleChangeFiltroIsbnIssnLibro} filtroIsbnIssnLibro={filtroIsbnIssnLibro}
                    handleChangeFiltroTituloLibro={handleChangeFiltroTituloLibro} filtroTituloLibro={filtroTituloLibro}
                    filtroAutorLibro={filtroAutorLibro} handleChangeFiltroAutorLibro={handleChangeFiltroAutorLibro}
                    filtroEditorialLibro={filtroEditorialLibro} handleChangeFiltroEditorialLibro={handleChangeFiltroEditorialLibro}
                    filtroAnioLibro={filtroAnioLibro} handleChangeFiltroAnioLibro={handleChangeFiltroAnioLibro}
                    filtroLugarPublicacionLibro={filtroLugarPublicacionLibro} handleChangeFiltroLugarPublicacionLibro={handleChangeFiltroLugarPublicacionLibro}
                    filtroGeneralLibro={filtroGeneralLibro} handleChangeFiltroGeneralLibro={handleChangeFiltroGeneralLibro} />


            case "facturas":
                return <FiltroFactura handleChangeFiltroIdFactura={handleChangeFiltroIdFactura} filtroIdFactura={filtroIdFactura}
                    handleChangeFiltroNombre={handleChangeFiltroNombre} filtroNombre={filtroNombre}
                    handleChangeFiltroCorreo={handleChangeFiltroCorreo} filtroCorreo={filtroCorreo}
                    handleChangeFiltroDireccion={handleChangeFiltroDireccion} filtroDireccion={filtroDireccion}
                    handleChangeFiltroTelefono={handleChangeFiltroTelefono} filtroTelefono={filtroTelefono} />

            case "clientes":
                return <FiltroCliente handleChangeFiltroNombre={handleChangeFiltroNombre} filtroNombre={filtroNombre}
                    handleChangeFiltroCorreo={handleChangeFiltroCorreo} filtroCorreo={filtroCorreo}
                    handleChangeFiltroDireccion={handleChangeFiltroDireccion} filtroDireccion={filtroDireccion}
                    handleChangeFiltroTelefono={handleChangeFiltroTelefono} filtroTelefono={filtroTelefono} />

            case "perfiles":
                return <FiltroPerfil handleChangeFiltroNombre={handleChangeFiltroNombre} filtroNombre={filtroNombre}
                    handleChangeFiltroCorreo={handleChangeFiltroCorreo} filtroCorreo={filtroCorreo}
                    handleChangeFiltroRol={handleChangeFiltroRol} filtroRol={filtroRol} />

            case "facturas/libros":
                return <FiltroFacturaLibros filtroGeneralFacturaLibro={filtroGeneralFacturaLibro} handleChangeFiltroGeneralFacturaLibro={handleChangeFiltroGeneralFacturaLibro} />

            default:
                return null;
                break;

        }

    }

    return (
        <>
            {
                filterMenu()
            }
        </>
    )

}


export default FiltroGeneral;
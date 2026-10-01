import { useState } from 'react';
import { FormProducto } from './FormProducto';

export const FormProductosContainer = () => {
  // Tus estados originales para los datos del producto
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: '',
    precio: '',
    stock: '',
    categoria: '',
    descripcion: '',
    imagen: ''
  });

  // Estados extra para manejar el archivo de imagen y el indicador de carga
  const [imagenFile, setImagenFile] = useState(null);
  const [cargando, setCargando] = useState(false);

  // Manejador para los inputs de texto / numéricos / textarea
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoProducto({
      ...nuevoProducto,
      [name]: value
    });
  };

  // Manejador para cuando seleccionas un archivo de imagen en el input file
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImagenFile(e.target.files[0]);
    }
  };

  // Lógica de envío que sube la imagen a ImgBB y luego procesa el producto
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validamos que se haya seleccionado una imagen si es obligatoria
    if (!imagenFile) {
      alert('Por favor, selecciona una imagen para el producto.');
      return;
    }

    setCargando(true);
    const apiKey = "05253b8db7a6d8eac8765def013a98b5"; // Tu API Key de ImgBB
    const formData = new FormData();
    formData.append("image", imagenFile);

    try {
      console.log("Subiendo imagen a Imgbb...");
      const respuestaImgbb = await fetch(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const datosImgbb = await respuestaImgbb.json();

      if (datosImgbb.success) {
        const imageUrl = datosImgbb.data.url;
        console.log("Imagen subida con éxito. URL:", imageUrl);

        // Armamos el objeto final combinando tus datos con la URL obtenida de ImgBB
        const productoFinal = {
          ...nuevoProducto,
          id: Date.now(), // ID único temporal
          imagen: imageUrl // Guardamos la URL directa de ImgBB
        };

        console.log("Producto completo listo para guardar:", productoFinal);
        alert(`¡Producto "${productoFinal.nombre}" creado con éxito!`);

        // Limpiamos el formulario después de enviar
        setNuevoProducto({
          nombre: '',
          precio: '',
          stock: '',
          categoria: '',
          descripcion: '',
          imagen: ''
        });
        setImagenFile(null);

      } else {
        throw new Error("La subida de la imagen a Imgbb falló.");
      }

    } catch (error) {
      console.error("Error en el proceso:", error);
      alert("Hubo un error al subir la imagen o registrar el producto.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <FormProducto
      nuevoProducto={nuevoProducto}
      handleInputChange={handleInputChange}
      handleFileChange={handleFileChange}
      handleSubmit={handleSubmit}
      cargando={cargando}
      imagenFile={imagenFile}
    />
  );
};

export default FormProductosContainer;